import Search from "./Search";
import Document from "./Document";
import NewDocument from "./NewDocument";

import useDataPrivate from "../../../hooks/useDataPrivate";
import { Doc } from "../../../@types/doc";
import DeleteDocumentModal from "./DeleteDocumentModal";
import { useState } from "react";

const localeContains = (str: string, substr: string) => {
  if (substr === "") return true;
  if (!substr || !str.length) return false;
  substr = "" + substr;
  if (substr.length > str.length) return false;

  const ascii = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  return ascii(str).includes(ascii(substr));
};

const Documents = () => {
  const [docs, isLoading, error, deleteDocument] =
    useDataPrivate<Array<Doc>>(`docs`);

  const [documentIDToDelete, setDocumentIDToDelete] = useState("");
  const [docTitleToDelete, setDocTitleToDelete] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  // const handleChange

  const handleDelete = async (id: string) => {
    setDocumentIDToDelete(id);
    const docTitle = docs?.find((doc) => doc._id === id)?.title;

    setDocTitleToDelete(docTitle || "");
  };

  // Make sure the user wants to delete the document
  const handleDeleteSubmit = async () => {
    // console.log("SUBMITTED DELETE DOCUMENT");

    // Delete document from state and in the database
    // TODO: handle delete error
    try {
      await deleteDocument(documentIDToDelete);
      setDocumentIDToDelete("");

      // setTimeout(() => {
      //   setDocumentIDToDelete("");
      // }, 1000);
    } catch (error) {
      console.log("Error deleting document", error);
    }
  };

  // console.log("Documents component body", docs);

  // TODO: pagination!

  let filteredDocs;
  if (searchQuery) {
    filteredDocs = docs?.filter((doc) =>
      localeContains(doc.title, searchQuery)
    );
  } else {
    filteredDocs = docs;
  }

  return (
    <div className=" relative grid w-full gap-x-4 gap-y-4 md:w-3/5 md:grid-cols-2 xl:w-2/3 xl:grid-cols-3">
      <Search
        onSearch={(query) => {
          console.log("Searching", query);

          searchQuery !== query && setSearchQuery(query);
        }}
        searchQuery={searchQuery}
      ></Search>
      {isLoading && (
        <div>TODO: wait a little bit, your documents are loading</div>
      )}
      {!isLoading && error && <div>Error: {error}</div>}
      {!isLoading && !error && <NewDocument />}
      {!isLoading &&
        !error &&
        (filteredDocs as Array<Doc>)?.map((doc) => (
          <Document key={doc._id} doc={doc} onDelete={handleDelete} />
        ))}
      <DeleteDocumentModal
        visible={documentIDToDelete ? true : false}
        onClose={() => {
          setDocumentIDToDelete("");
        }}
        onDelete={handleDeleteSubmit}
        documentTitle={`"${docTitleToDelete}"`}
        // documentIndex={0}
      />
    </div>
  );
};

export default Documents;
