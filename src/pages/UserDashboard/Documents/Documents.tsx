import Search from "./Search";
import Document from "./Document";
import NewDocument from "./NewDocument";

import { Doc } from "../../../@types/doc";
import DeleteDocumentModal from "./DeleteDocumentModal";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIntersection } from "@mantine/hooks";

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

type DocumentsProps = {
  docs: Array<Doc> | null | undefined;
  isLoading?: boolean;
  error?: string;
  deleteDocument: (slug: string) => Promise<void>;
  onEndOfViewport: () => void;
};

const Documents: React.FC<DocumentsProps> = ({
  docs,
  isLoading,
  error,
  deleteDocument,
  onEndOfViewport,
}) => {
  // const [docs, isLoading, error, deleteDocument] =
  //   useDataPrivate<Array<Doc>>(`docs`);

  // console.log(docs);

  const [documentSlugToDelete, setDocumentSlugToDelete] = useState("");
  const [docTitleToDelete, setDocTitleToDelete] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const lastDocRef = useRef<HTMLSpanElement>(null);
  const { ref: observedReference, entry } = useIntersection({
    root: lastDocRef.current,
    threshold: 1,
    rootMargin: "800px",
  });

  console.log("DOCUMENTS COMP");
  console.log(lastDocRef.current);
  console.log(observedReference);
  console.log(entry);

  if (entry?.isIntersecting) {
    console.log("💖🎉SHOULD FETCH MORE");
    console.log(observedReference, entry);
    onEndOfViewport();
  }

  // const handleChange

  const handleDelete = async (slug: string) => {
    setDocumentSlugToDelete(slug);
    const docTitle = docs?.find((doc) => doc.slug === slug)?.title;

    setDocTitleToDelete(docTitle || "");
  };

  // Make sure the user wants to delete the document
  const handleDeleteSubmit = async () => {
    // console.log("SUBMITTED DELETE DOCUMENT");

    // Delete document from state and in the database
    // TODO: handle delete error
    try {
      await deleteDocument(documentSlugToDelete);
      setDocumentSlugToDelete("");

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
    <motion.div
      className=" relative z-10 grid w-full gap-x-4 gap-y-4 md:w-3/5 md:grid-cols-2 xl:w-2/3 xl:grid-cols-3"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          opacity: { duration: 1.2, ease: "backInOut" },
          scale: { duration: 1.2, ease: "backInOut" },
          x: { duration: 2, ease: "easeInOut", delay: 0.8 },
        },
      }}
      exit={{
        opacity: 0,
        x: "-20vw",
        transition: { duration: 1, ease: "backOut" },
      }}
    >
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

      {!isLoading && !error && (
        <AnimatePresence mode="popLayout">
          {(filteredDocs as Array<Doc>)?.map((doc) => (
            <Document key={doc._id} doc={doc} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      )}
      {/* </AnimatePresence> */}
      <DeleteDocumentModal
        visible={documentSlugToDelete ? true : false}
        onClose={() => {
          setDocumentSlugToDelete("");
        }}
        onDelete={handleDeleteSubmit}
        documentTitle={`"${docTitleToDelete}"`}
        // documentIndex={0}
      />
      {/* <div className="col-span-3 -mt-2 justify-self-end ">
        <Pagination />
      </div> */}
      <span ref={observedReference} className="h-0 w-0"></span>
    </motion.div>
  );
};

export default Documents;
