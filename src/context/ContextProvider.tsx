import { ReactNode, useState } from "react";
import Context from "./Context";
import { DocxDocument } from "../pages/Editor/DocxManager/useDocxManager";

/**
 * Context Provider is a React component that plays role of a parent that provides common Context to child components.
 */
const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<DocxDocument[]>(
    []
  );

  const addUploadedDocument = (doc: DocxDocument) => {
    setUploadedDocuments((prev) => [...prev, doc]);
  };

  return (
    <Context.Provider
      value={{ uploadedDocuments, addDocument: addUploadedDocument }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
