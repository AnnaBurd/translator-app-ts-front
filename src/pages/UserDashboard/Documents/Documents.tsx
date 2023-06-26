import Search from "./Search";
import Document from "./Document";
import NewDocument from "./NewDocument";

import useDataPrivate from "../../../hooks/useDataPrivate";
import { Doc } from "../../../@types/doc";

const Documents = () => {
  const [docs, isLoading, error, deleteDocument] =
    useDataPrivate<Array<Doc>>(`docs`);

  const handleDelete = async (id: string) => {
    // Make sure the user wants to delete the document

    // Delete document from state and in the database
    // TODO: handle delete error
    await deleteDocument(id);
  };

  // console.log("Documents component body", docs);

  // TODO: pagination!

  return (
    <div className=" relative grid gap-x-4 gap-y-4 md:w-3/5 md:grid-cols-2 xl:w-2/3 xl:grid-cols-3">
      <Search></Search>
      {isLoading && (
        <div>TODO: wait a little bit, your documents are loading</div>
      )}

      {!isLoading && error && <div>Error: {error}</div>}

      {!isLoading && !error && <NewDocument />}

      {!isLoading &&
        !error &&
        (docs as Array<Doc>)?.map((doc) => (
          <Document key={doc._id} doc={doc} onDelete={handleDelete} />
        ))}
    </div>
  );
};

export default Documents;
