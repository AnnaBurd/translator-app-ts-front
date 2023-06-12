import { useCallback, useContext, useEffect, useState } from "react";
import { AppAuthContext } from "../../../auth/AuthProvider";
import { Link } from "react-router-dom";
import Search from "./Search";
import Document from "./Document";
import NewDocument from "./NewDocument";
import { DocumentPreviewData } from "../../../@types/doc";

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
  const { user } = useContext(AppAuthContext);
  const [documents, setDocuments] = useState(DUMMY_DOCS);

  console.log("rendering user docs", user);

  const fetchDocuments = useCallback(async () => {}, []);

  useEffect(() => {
    console.log("fetching user docs");

    return () => {
      console.log(
        "fetch cleanup (before component dismounts -> should cansel ongoing requests"
      );
    };
  }, []);

  return (
    <div className="grid w-2/3 grid-cols-3 gap-y-4">
      <Search></Search>
      <NewDocument />
      <Document docdata={DUMMY_DOCS[0]} />
      <Document docdata={DUMMY_DOCS[1]} />
      <Document docdata={DUMMY_DOCS[0]} />
      <Document docdata={DUMMY_DOCS[1]} />
    </div>
  );
};

export default Documents;
