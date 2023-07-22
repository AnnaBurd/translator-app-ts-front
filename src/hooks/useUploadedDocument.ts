import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Context from "../context/Context";
import { DocxDocument } from "../pages/Editor/DocxManager/useDocxManager";

const useUploadedDocument = (title: string) => {
  const [searchParams] = useSearchParams();

  const [document, setDocument] = useState<DocxDocument | null>(null);

  const { uploadedDocuments } = useContext(Context);

  useEffect(() => {
    const hasUploaded =
      searchParams.get("upload") === "true" && uploadedDocuments.length > 0;

    if (!hasUploaded) return;

    // TODO: how to identify uploaded documents?
    const doc = uploadedDocuments.find((doc) => doc.title === title || true);
    if (!doc) return;

    setDocument(doc);
  }, [searchParams, title, uploadedDocuments]);

  return document;
};

export default useUploadedDocument;
