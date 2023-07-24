import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Context from "../../../context/Context";
import { DocxDocument } from "./useDocxManager";

const useUploadedDocument = (slug: string | undefined) => {
  const [searchParams] = useSearchParams();

  const [document, setDocument] = useState<DocxDocument | null>(null);

  const { uploadedDocuments, getDocument } = useContext(Context);

  useEffect(() => {
    const hasUploaded =
      searchParams.get("upload") === "true" || uploadedDocuments.length > 0;

    if (!hasUploaded || !slug) return;
    const doc = getDocument(slug);
    if (!doc) return;

    setDocument(doc);
  }, [getDocument, searchParams, slug, uploadedDocuments]);

  return document;
};

export default useUploadedDocument;
