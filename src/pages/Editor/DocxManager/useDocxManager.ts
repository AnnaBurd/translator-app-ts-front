import { XMLBuilder, XMLParser } from "fast-xml-parser";
import JSZip from "jszip";
import { useContext } from "react";
import Context from "../../../context/Context";
import saveAs from "file-saver";

const unzipFileContent = async (file: File) => {
  // Under the hood docx file is a zip archive of xml files together with images etc.
  const unzipped = await JSZip.loadAsync(file);
  return unzipped;
};

const getXMLContent = async (unzipped: JSZip) => {
  // Although docx archive contains multiple files with formats and settings, all text content can be found in the word/document.xml file
  const xmlContent = await unzipped.file("word/document.xml")?.async("text");

  if (!xmlContent) throw new Error("🔥🔥🔥getXMLContent: no xml content");
  return xmlContent;
};

const representXMLContentAsJS = (xmlContent: string) => {
  // To navigate through XML in JS, parse XML into a large (and complicated) js object
  const parser = new XMLParser({
    ignoreAttributes: false,
    preserveOrder: true,
    ignoreDeclaration: false,
    trimValues: false,
  });

  const documentContentXMLobj = parser.parse(xmlContent);
  return documentContentXMLobj;
};

// Extract text content from the XML JS object and remember positions of each text node
export type Paragraph = {
  text: string;
  position: {
    containingXMLParagraphNodeNum: number;
    containingXMLRunNodeNum: number;
    containingXMLTextNodeNum: number;
    numberOfTextSubNodes: number;
  };
};

export type DocxDocument = {
  title?: string;
  slug?: string;
  paragraphs: Paragraph[];
  documentContentXMLobj: any;
  unzippedFile: JSZip;
};

const getParagraphsContent = (documentContentXMLobj: any) => {
  const paragraphsContent: Paragraph[] = [];

  const documentBody = documentContentXMLobj[1]["w:document"][0]["w:body"];

  documentBody.forEach((childNode: any, bodyChildNodeNum: number) => {
    const paragraphNode = childNode["w:p"];
    if (!paragraphNode) return;

    const paragraph = {
      text: "",
      position: {
        containingXMLParagraphNodeNum: bodyChildNodeNum,
        containingXMLRunNodeNum: -1,
        containingXMLTextNodeNum: -1,
        numberOfTextSubNodes: 0,
      },
    };

    paragraphNode.forEach((childNode: any, paragraphChildNodeNum: number) => {
      const textNode = childNode["w:t"];

      if (textNode) {
        throw new Error("🔥🔥🔥getParagraphsContent: unhandled case");
      }

      // Note - "run", or <xml:run> is a container node for text <xml:t>, formatting <xml:rPr> and other nodes
      const runNode = childNode["w:r"];

      if (runNode) {
        runNode.forEach((childNode: any, runChildNodeNum: number) => {
          const textNode = childNode["w:t"];
          if (!textNode || textNode?.length === 0) return;

          const text = textNode[0]["#text"];
          if (!text) return;

          // Found text content within the xml paragraph, save it
          paragraph.text += text;
          paragraph.position.numberOfTextSubNodes += 1;
          // And remember the position of the first text node within the xml paragraph
          if (paragraph.position.containingXMLRunNodeNum === -1) {
            paragraph.position.containingXMLRunNodeNum = paragraphChildNodeNum;
            paragraph.position.containingXMLTextNodeNum = runChildNodeNum;
          }
        });
      }
    });

    // Has looped over all nodes in the xml paragraph, now add resulting paragraph to the array of paragraphs (skip empty paragraphs)
    if (paragraph.text.trim() !== "") paragraphsContent.push(paragraph);
  });

  // Has looped over all nodes in the xml document, all found text content is in the array of paragraphs (paragraphsContent)
  return paragraphsContent;
};

const readDocumentContent = async (file: File): Promise<DocxDocument> => {
  if (!file) throw new Error("🔥🔥🔥handleDocumentUpload: no file");

  const unzippedFile = await unzipFileContent(file);
  const documentContentXML = await getXMLContent(unzippedFile);
  const documentContentXMLobj = representXMLContentAsJS(documentContentXML);
  const paragraphsContent = getParagraphsContent(documentContentXMLobj);

  return {
    title: file.name,
    paragraphs: paragraphsContent,
    documentContentXMLobj,
    unzippedFile,
  };
};

const generateUpdatedDocument = async (
  originalDocument: DocxDocument,
  updates: string[]
) => {
  const documentBody =
    originalDocument.documentContentXMLobj[1]["w:document"][0]["w:body"];

  originalDocument.paragraphs.forEach((paragraph, paragraphNum) => {
    const {
      containingXMLParagraphNodeNum: bodyChildNum,
      containingXMLRunNodeNum: paragraphChildNum,
      containingXMLTextNodeNum: runChildNum,
      numberOfTextSubNodes,
    } = paragraph.position;

    const paragraphNode = documentBody[bodyChildNum]["w:p"];
    const runNode = paragraphNode[paragraphChildNum]["w:r"];
    const textNode = runNode[runChildNum]["w:t"];
    if (updates[paragraphNum]) textNode[0]["#text"] = updates[paragraphNum];

    // Clear other nodes with text content (incertion into the first node only for simplicity, but in such case the styles changes within the paragraph are not preserved)

    if (numberOfTextSubNodes > 1) {
      const paragraphNodeCropped = paragraphNode.slice(
        0,
        paragraphChildNum + 1
      );
      documentBody[bodyChildNum]["w:p"] = paragraphNodeCropped;
    }
  });

  // Generate XML string from the JS XML object
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    preserveOrder: true,
  });
  const newDocumentContent = builder.build(
    originalDocument.documentContentXMLobj
  );

  // Replace old XML with updated XML content and apply zip compression
  const document = await originalDocument.unzippedFile
    .file("word/document.xml", newDocumentContent)
    .generateAsync({ type: "blob" });

  return document;
};

const useDocxManager = () => {
  const { addDocument, getDocument } = useContext(Context);

  const uploadHandler = async (file: File) => {
    const doc = await readDocumentContent(file);

    // Save document in memory
    return addDocument(doc);
  };

  const downloadHandler = async (title: string) => {
    // TODO: how to identify back paragraphs which were translated?
    // If some paragraphs were deleted the whole order is messed up
    // As of now, the temporary solution is to query content of the editor output and plug out as it is

    // Get the array with translation texts
    const divElementsWithText = document
      .querySelector(".output-editor")
      ?.querySelectorAll(".ce-paragraph");

    const translatedTexts = Array.from(divElementsWithText || []).map(
      (div) => div.textContent || ""
    );

    // console.log("translatedTexts: ", translatedTexts);

    // console.log("downloadHandler has  uploadedDocuments: ", uploadedDocuments);
    // TODO: how to identify uploaded documents?
    const uploadedDoc = getDocument(title);
    if (!uploadedDoc) return;

    // Generate updated docx file
    const newDocument = await generateUpdatedDocument(
      uploadedDoc,
      translatedTexts
    );

    // Allow user to save the updated file
    saveAs(newDocument, `${uploadedDoc.title}-translated.docx`);
  };

  return { uploadHandler, downloadHandler };
};

export default useDocxManager;
