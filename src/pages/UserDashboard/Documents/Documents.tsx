import Search from "./Search";
import Document from "./Document";
import NewDocument from "./NewDocument";

import useDataPrivate from "../../../hooks/useDataPrivate";
import { Doc } from "../../../@types/doc";

const Documents = () => {
  const [docs, isLoading, error] = useDataPrivate(`docs`);

  console.log("Documents component body", docs);

  // TODO: pagination!

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
        (docs as Array<Doc>)?.map((doc) => (
          <Document key={doc._id} doc={doc} />
        ))}
    </div>
  );
};

export default Documents;
