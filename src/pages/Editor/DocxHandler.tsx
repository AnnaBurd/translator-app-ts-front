import { XMLBuilder, XMLParser } from "fast-xml-parser";
import JSZip from "jszip";
import { ChangeEvent, SetStateAction, useState } from "react";
import { saveAs } from "file-saver";

type TextParagraphContentItem = {
  text: string;
  position: {
    containingXMLParagraphNodeNum: number;
    containingXMLRunNodeNum: number;
    containingXMLTextNodeNum: number;
    numberOfTextSubNodes: number;
  };
};

const DocxHandler = () => {
  const [file, setFile] = useState<File>();

  const [docxFile, setDocxFile] = useState<JSZip>();
  const [documentContentXMLobj, setDocumentContentXMLobj] =
    useState<Array<any>>();

  const [documentContent, setDocumentContent] = useState<
    Array<TextParagraphContentItem>
  >([]);

  const handleDocumentUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Document Upload");
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    console.log(e.target.files);

    const documentTextParagraphs: Array<TextParagraphContentItem> = [];

    const archive = await JSZip.loadAsync(e.target.files![0]);
    setDocxFile(archive);

    // console.log("archive content", archive);

    // Docx archive contains multiple files with formats and settings, as well as images, but all text content is stored in the word/document.xml file
    const documentContent = await archive.files["word/document.xml"].async(
      "text"
    );

    // console.log("documentContent", documentContent);

    // Generate JS XML object from the string with document XML content
    const parser = new XMLParser({
      ignoreAttributes: false,
      preserveOrder: true,
      ignoreDeclaration: false,
      trimValues: false,
    });

    const documentContentXMLobj = parser.parse(documentContent);

    setDocumentContentXMLobj(documentContentXMLobj);

    // Extract text content from the document
    const documentBody = documentContentXMLobj[1]["w:document"][0]["w:body"];

    // console.log(documentBody);

    documentBody.forEach((node: { [x: string]: any }, i: number) => {
      const paragraph = node["w:p"];

      if (!paragraph) return;

      const textParagraphContentItem = {
        text: "",
        position: {
          containingXMLParagraphNodeNum: -1,
          containingXMLRunNodeNum: -1,
          containingXMLTextNodeNum: -1,
          numberOfTextSubNodes: 0,
        },
      };

      paragraph.forEach((node: { [x: string]: any }, j: number) => {
        // console.log("\n+++ doc-node", i, " par-node", j, node);
        const run = node["w:r"];
        const text = node["w:t"];
        // console.log("--- run", run);
        // console.log("--- text", text);

        if (!run && !text) return;

        if (run) {
          run.forEach((node: { [x: string]: any }, k: number) => {
            // console.log("------ run-node", k, node);
            const textNode = node["w:t"];
            if (!textNode || textNode?.length === 0) return;
            // console.log(textNode);
            const text = textNode[0]["#text"];
            textParagraphContentItem.text += text;
            textParagraphContentItem.position.numberOfTextSubNodes++;
            // Remember position of the first node in the paragraph with the text
            if (
              textParagraphContentItem.position.containingXMLRunNodeNum === -1
            ) {
              textParagraphContentItem.position.containingXMLParagraphNodeNum =
                i;
              textParagraphContentItem.position.containingXMLRunNodeNum = j;
              textParagraphContentItem.position.containingXMLTextNodeNum = k;
            }
            // console.log(`paragraph ${i} run ${j} ------ text ${k}`, textNode, text);

            // if (text.toString().includes("VIETSOVPETRO")) {
            //   console.log("FOUND IT");
            //   textNode[0]["#text"] = "NEW_VIETSOVPETRO!!!";
            // }
          });
        }

        if (text) {
          console.log("🔥🔥🔥------ text", text);
          throw new Error("🔥🔥🔥unhandled case ");
        }
      });

      if (textParagraphContentItem.text.length === 0) return;
      documentTextParagraphs.push(textParagraphContentItem);

      // Get the paragraph text and check if it is splitted into different xml nodes (subparagraphs)
      console.log(
        `paragraph ${i} numer of subparagraphs: ${textParagraphContentItem.position.numberOfTextSubNodes} text: ${textParagraphContentItem.text}`
      );
    });

    setDocumentContent(documentTextParagraphs);
  };

  const handleDocumentDownload = async () => {
    console.log("Document Download");
    console.log("documentContent", documentContent);

    const documentTextParagraphs: Array<TextParagraphContentItem> =
      documentContent;

    if (!documentContentXMLobj) return;
    // Extract text content from the document
    const documentBody = documentContentXMLobj[1]["w:document"][0]["w:body"];

    // Update text content for each of the paragraphs and save changed to the JS XML object
    // If the text of the paragraph is split into multiple nodes, replace all them with a single node.

    documentTextParagraphs.forEach((textParagraphContentItem, i) => {
      // if (i > 5) return;
      // console.log("\n\n");
      // console.log("textParagraphContentItem", textParagraphContentItem);

      const {
        containingXMLParagraphNodeNum,
        containingXMLRunNodeNum,
        containingXMLTextNodeNum,
        numberOfTextSubNodes,
      } = textParagraphContentItem.position;

      const paragraph = documentBody[containingXMLParagraphNodeNum]["w:p"];
      // console.log("paragraph", paragraph);

      const run = paragraph[containingXMLRunNodeNum]["w:r"];
      // console.log("run", run);

      const text = run[containingXMLTextNodeNum]["w:t"];
      // console.log("text", text);

      text[0]["#text"] = textParagraphContentItem.text + "🎉";

      // console.log("numberOfTextSubNodes", numberOfTextSubNodes);

      // Delete other nodes with text
      if (numberOfTextSubNodes > 1) {
        console.log("\n\n");
        console.log("textParagraphContentItem", textParagraphContentItem);
        console.log("delete other nodes with text", paragraph);

        const updatedParagraph = paragraph.slice(
          0,
          containingXMLRunNodeNum + 1
        );
        documentBody[containingXMLParagraphNodeNum]["w:p"] = updatedParagraph;
      }
    });

    // Generate string from the JS XML object
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      preserveOrder: true,
    });
    const newDocumentContent = builder.build(documentContentXMLobj);

    // The old and new xml of the document should be the same except for the changed text
    console.log("\n\n\n");
    console.log("document content as text: ", documentContent.slice(0, 200));
    console.log("\n");
    console.log(
      "newDocumentContent as text: ",
      newDocumentContent.slice(0, 200)
    );

    if (!docxFile) return;

    docxFile
      .file("word/document.xml", newDocumentContent)
      .generateAsync({ type: "blob" })
      .then((blob) => {
        saveAs(blob, "newDocument.docx");
      });
  };

  return (
    <div>
      <input type="file" onChange={handleDocumentUpload} />
      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleDocumentDownload}>
        Download updated document
      </button>
    </div>
  );
};

export default DocxHandler;
