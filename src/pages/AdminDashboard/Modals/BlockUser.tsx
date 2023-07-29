import { AnimatePresence, motion } from "framer-motion";
import Modal from "../../../components/UI/Modal";
import DotLoader from "../../../components/Loaders/DotLoader";
import { useState } from "react";
import useFetchPrivate from "../../../hooks/useFetchPrivate";
import ErrorNotification from "../../Editor/TextEditor/Notifications/ErrorNotification";

// TODO: also fix positioning of the delete document modal and new document modal

// TODO: also fix the closing of the user profile modal!!!

type BlockUserModalProps = {
  email: string;
  onClose: () => void;
  onSuccess: () => void;
};

const BlockUserModal: React.FC<BlockUserModalProps> = ({
  email,
  onClose,
  onSuccess,
}) => {
  const fetchPrivate = useFetchPrivate();
  const [isFetching, setIsFetching] = useState(false);
  const [errorBlockingUser, setErrorBlockingUser] = useState("");

  const blockUserHandler = async () => {
    try {
      setIsFetching(true);
      setErrorBlockingUser("");
      await fetchPrivate(`users/${email}`, "PATCH", {
        isBlocked: true,
      });

      onSuccess();
      setIsFetching(false);
    } catch (error) {
      setErrorBlockingUser(
        (error as Error)?.message || "Ups! Could not block user."
      );
      setIsFetching(false);
    }
  };

  const closeModalHandler = () => {
    onClose();
    setErrorBlockingUser("");
  };

  return (
    <Modal
      isVisible={email.length > 0}
      isClosable={!isFetching}
      onClose={closeModalHandler}
      titleElement={
        <h3 className="text-md pointer-events-none font-medium text-slate-800">
          Block user activity
        </h3>
      }
    >
      <div className="mb-6 text-sm text-slate-800">
        Block access to tokens usage for user{" "}
        <span className="text-indigo-800">{email}</span>?
      </div>
      <motion.div className="flex flex-wrap items-center justify-end gap-1">
        {!isFetching && errorBlockingUser && (
          <div className="flex-1">
            <ErrorNotification
              message={
                "Error blocking user, please contact your administrator if error persists"
              }
            />
          </div>
        )}

        <motion.button
          layout
          onClick={blockUserHandler}
          className=" inline-block w-fit shrink-0 overflow-hidden rounded-lg border border-indigo-400 bg-indigo-400 px-6 py-2 text-xs font-medium text-white transition focus:outline-none  focus:ring disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200"
        >
          <AnimatePresence mode="wait">
            {!isFetching && !errorBlockingUser && (
              <motion.span
                key="accept"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
              >
                OK
              </motion.span>
            )}

            {isFetching && !errorBlockingUser && (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 3 },
                }}
                exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
              >
                Blocking
                <DotLoader />
              </motion.span>
            )}

            {!isFetching && errorBlockingUser && (
              <motion.span
                key="error"
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

        {!isFetching && !errorBlockingUser && (
          <motion.button
            onClick={closeModalHandler}
            className=" inline-block w-fit shrink-0 rounded-lg border border-slate-400 bg-slate-400 px-6 py-2 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
          >
            Cancel
          </motion.button>
        )}
      </motion.div>
    </Modal>
  );
};

export default BlockUserModal;
