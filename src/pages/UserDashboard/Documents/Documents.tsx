import Search from "./Search";
import Document from "./Document";
import NewDocument from "./NewDocument";
// import { DocumentPreviewData } from "../../../@types/doc";
import useDataPrivate from "../../../hooks/useDataPrivate";

// const DUMMY_DOCS: DocumentPreviewData[] = [
//   {
//     title: "Document1",
//     text: "Here are the first line from original text",
//     translation: "Here is the line from translation",
//     originLang: "Ru",
//     translationLang: "Vn",
//   },
//   {
//     title: "Document :)",
//     text: "Hersdfsdfsdfiginal text",
//     translation: "sdfsd fd sdf sdf n",
//     originLang: "En",
//     translationLang: "Vn",
//   },
// ];

const Documents = () => {
  const [docs, isLoading, error] = useDataPrivate(`docs`);

  console.log("Documents component body", docs);

  // TODO: pagination

  return (
    <div className="relative grid w-2/3 grid-cols-3 gap-y-4">
      <Search></Search>
      {isLoading && (
        <div>TODO: wait a little bit, your documents are loading</div>
      )}

      {!isLoading && error && <div>Error: {error}</div>}

      {!isLoading && !error && <NewDocument />}

      {!isLoading &&
        !error &&
        (
          docs as Array<{
            _id: string;
            title: string;
            originLang: string;
            translationLang: string;
          }>
        )?.map((doc) => <Document key={doc._id} docdata={doc} />)}
    </div>
  );
};

export default Documents;
