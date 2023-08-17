import Search from "./Search";
import Document from "./Document";
import NewDocument from "./NewDocument";

import { Doc } from "../../../@types/doc";
import DeleteDocumentModal from "./DeleteDocumentModal";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIntersection } from "@mantine/hooks";
import { localeContains } from "./search-helper";

type DocumentsProps = {
  docs: Array<Doc> | null | undefined;
  isLoading?: boolean;
  errorLoading?: string;
  deleteDocument: (slug: string) => Promise<void>;
  onEndOfViewport: () => void;
};

const Documents: React.FC<DocumentsProps> = ({
  docs,
  isLoading,
  errorLoading,
  deleteDocument,
  onEndOfViewport,
}) => {
  // Listen when user scrolls past the last loaded document and
  // trigger loading more documents
  const lastDocRef = useRef<HTMLSpanElement>(null);
  const { ref: observedReference, entry } = useIntersection({
    root: lastDocRef.current,
    threshold: 1,
    rootMargin: "800px",
  });
  if (entry?.isIntersecting) onEndOfViewport();

  // Keep track of which document user wants to delete
  const [documentSlugToDelete, setDocumentSlugToDelete] = useState("");
  const [docTitleToDelete, setDocTitleToDelete] = useState("");

  const handleDelete = async (slug: string) => {
    const docTitle = docs?.find((doc) => doc.slug === slug)?.title;
    setDocumentSlugToDelete(slug);
    setDocTitleToDelete(docTitle || "");
  };

  // Ask user confirmation before deleting document
  const handleDeleteSubmit = async () => {
    // Delete document from state and in the database
    await deleteDocument(documentSlugToDelete);
    setDocumentSlugToDelete("");
  };

  // Filter documents according to the entered search query
  const [searchQuery, setSearchQuery] = useState("");
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
          searchQuery !== query && setSearchQuery(query);
        }}
        searchQuery={searchQuery}
      ></Search>

      {!isLoading && errorLoading && <div>Error TO HANDLE: {errorLoading}</div>}
      {!isLoading && !errorLoading && <NewDocument />}

      {!isLoading && !errorLoading && (
        <AnimatePresence mode="popLayout">
          {(filteredDocs as Array<Doc>)?.map((doc) => (
            <Document key={doc.slug} doc={doc} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      )}

      <DeleteDocumentModal
        visible={documentSlugToDelete ? true : false}
        onClose={() => {
          setDocumentSlugToDelete("");
        }}
        onDelete={handleDeleteSubmit}
        documentTitle={
          docTitleToDelete ? `"${docTitleToDelete}"` : "untitled document"
        }
      />

      <span ref={observedReference} className="h-0 w-0"></span>
    </motion.div>
  );
};

export default Documents;
