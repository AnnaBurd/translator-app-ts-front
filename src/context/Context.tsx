import { createContext } from "react";
import { DocxDocument } from "../pages/Editor/DocxManager/useDocxManager";

export interface Context {
  uploadedDocuments: DocxDocument[];
  addDocument: (doc: DocxDocument) => void;
}

/**
 * Context is accessible to all React components within <ContextProvider> parent, to access it use useContext() hook.
 */
const contextDefaults: Context = {
  uploadedDocuments: [],
  addDocument: () => null,
};
const context = createContext<Context>(contextDefaults);

export default context;
