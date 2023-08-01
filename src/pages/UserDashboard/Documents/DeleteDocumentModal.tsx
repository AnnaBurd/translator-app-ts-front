import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import DotLoader from "../../../components/Loaders/DotLoader";
import Modal from "../../../components/UI/Modal";
import ErrorNotification from "../../Editor/TextEditor/Notifications/ErrorNotification";

// TODO: add localization for form labels/error messages

type DeleteDocumentModalProps = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  documentTitle?: string;
};

const DeleteDocumentModal: React.FC<DeleteDocumentModalProps> = ({
  visible,
  onClose,
  onDelete,
  documentTitle,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [errorDeletingUser, setErrorDeletingUser] = useState("");

  const closeFormHandler = () => {
    onClose();
    setErrorDeletingUser("");
  };

  const deleteDocHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      setErrorDeletingUser("");
      setIsFetching(true);

      await onDelete();

      setIsFetching(false);
    } catch (error) {
      // Framer motion has a but when animation state is changed too fast (although state isFetching is already false, it still animates the fetching state) => a small delay is added as a workaround
      setTimeout(() => {
        setIsFetching(false);
        setErrorDeletingUser(
          ((error as Error).message as string) || "Unknown error"
        );
      }, 500);
    }
  };

  return (
    <Modal
      isVisible={visible}
      isClosable={!isFetching}
      onClose={closeFormHandler}
      titleElement={
        <h3 className="text-md pointer-events-none font-medium text-slate-800  ">
          Delete {documentTitle}?
        </h3>
      }
    >
      <div className="mt-6 flex w-full flex-wrap justify-end  gap-1 md:ml-auto md:w-[20vw] md:min-w-fit md:max-w-lg">
        {!isFetching && errorDeletingUser && (
          <div className="flex-1">
            <ErrorNotification
              message={
                "Error deleting user, please contact your administrator if error persists"
              }
            />
          </div>
        )}

        <motion.button
          layout
          onClick={deleteDocHandler}
          className=" inline-block w-fit shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-6 py-2 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200"
        >
          <AnimatePresence mode="wait">
            {!isFetching && !errorDeletingUser && (
              <motion.span
                key="accept-delete-user-btn"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
              >
                OK
              </motion.span>
            )}

            {isFetching ? (
              <motion.span
                key="loading-delete-user-btn"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 3 },
                }}
                exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
              >
                Deleting
                <DotLoader />
              </motion.span>
            ) : (
              ""
            )}

            {!isFetching && errorDeletingUser && (
              <motion.span
                key="error-delete-user-btn"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 3 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                Retry
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {!isFetching && !errorDeletingUser && (
          <motion.button
            onClick={closeFormHandler}
            className=" inline-block w-fit shrink-0 rounded-lg border border-slate-400 bg-slate-400 px-6 py-2 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
          >
            Cancel
          </motion.button>
        )}
      </div>
    </Modal>
  );
};

export default DeleteDocumentModal;
