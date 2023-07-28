import { MouseEventHandler, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import DotLoader from "../../../components/animations/DotLoader";
import { createPortal } from "react-dom";

// TODO: add localization for form labels/error messages

type BlockUserModalProps = {
  visible: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  onAction: () => Promise<void>;
  userEmail?: string;
};

const BlockUserModal: React.FC<BlockUserModalProps> = ({
  visible,
  onClose,
  onAction,
  userEmail,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const closeFormHandler = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event);

    console.log("closeFormHandler");
  };

  const deleteDocHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      await onAction();
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      // TODO: show error message
      // Hide loading indicator
    }
  };

  return (
    <AnimatePresence>
      {visible ? (
        <>
          {createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              className="fixed left-0 top-0 z-[300] h-screen w-screen bg-slate-400 opacity-20"
              onClick={closeFormHandler}
            ></motion.div>,
            document.getElementById("overlays") as HTMLElement
          )}

          {createPortal(
            <div className="fixed left-0 top-0 z-[200] flex h-full w-full items-center justify-center px-4">
              <motion.div
                initial={{
                  opacity: 0,
                  translateY: "-40%",
                  translateX: "20%",
                  scale: 0.3,
                }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                  translateX: 0,
                  scale: 1,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  translateY: "-20%",
                  translateX: "20%",
                  scale: 0.7,
                  transition: { duration: 0.15, ease: "easeIn" },
                }}
                className="z-[400] h-min w-full max-w-full content-center justify-center rounded-2xl border border-blue-100 bg-white p-3 shadow-lg"
                role="alert"
              >
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-md pointer-events-none font-medium text-slate-800">
                    Block tokens usage for {userEmail}?
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-white p-2 text-slate-500 hover:bg-slate-50  hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400"
                    onClick={closeFormHandler}
                  >
                    <span className="sr-only">Close</span>

                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-end gap-1">
                  <motion.button
                    layout="preserve-aspect"
                    onClick={deleteDocHandler}
                    className=" inline-block w-fit shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-6 py-2 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200"
                  >
                    <AnimatePresence mode="wait">
                      {isLoading && (
                        <motion.span
                          key="btn-loading"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 4 },
                          }}
                        >
                          Blocking
                          <DotLoader />
                        </motion.span>
                      )}
                      {!isLoading && (
                        <motion.span
                          key="btn-create"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        >
                          OK
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  {!isLoading && (
                    <motion.button
                      onClick={closeFormHandler}
                      className=" inline-block w-fit shrink-0 rounded-lg border border-slate-400 bg-slate-400 px-6 py-2 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-slate-200 disabled:bg-slate-200"
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>,
            document.getElementById("modals") as HTMLElement
          )}
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default BlockUserModal;
