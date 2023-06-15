import { useContext } from "react";
import AuthContext from "../../../auth/AuthContext";

import Search from "./Search";
import Document from "./Document";
import NewDocument from "./NewDocument";
import { DocumentPreviewData } from "../../../@types/doc";
import useData from "../../../hooks/useData";

const DUMMY_DOCS: DocumentPreviewData[] = [
  {
    title: "Document1",
    text: "Here are the first line from original text",
    translation: "Here is the line from translation",
    originLang: "Ru",
    translationLang: "Vn",
  },
  {
    title: "Document :)",
    text: "Hersdfsdfsdfiginal text",
    translation: "sdfsd fd sdf sdf n",
    originLang: "En",
    translationLang: "Vn",
  },
];

const Documents = () => {
  const { user } = useContext(AuthContext);
  const [docs, isLoading, error] = useData(`docs`);

  console.log("Rendering user documents component, documents=", docs);

  return (
    <div className="grid w-2/3 grid-cols-3 gap-y-4">
      <Search></Search>
      {isLoading && (
        <div>TODO: wait a little bit, your documents are loading</div>
      )}

      {!isLoading && error && <div>Error: {error}</div>}

      {!isLoading && !error && <NewDocument />}
      {!isLoading && !error && <Document docdata={DUMMY_DOCS[0]} />}
      {!isLoading && !error && <div>OK DOCS LOADED</div>}
    </div>
  );
};

export default Documents;
