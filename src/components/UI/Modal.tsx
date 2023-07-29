import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

type ModalProps = {
  isVisible: boolean;
  isClosable?: boolean | null;
  onClose: () => void;
  titleElement?: React.ReactNode;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isVisible,
  isClosable = true,
  onClose,
  titleElement,
  children,
}) => {
  const closeModalHandler = () => {
    isClosable && onClose && onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <div className="fixed left-0 top-0 z-[500] flex h-full w-full items-center justify-center p-4">
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 h-full w-full bg-slate-400"
            onClick={closeModalHandler}
          ></motion.div>

          <motion.div
            initial={{
              opacity: 0,
              translateY: "-40%",
              translateX: "10%",
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
              translateX: "10%",
              scale: 0.7,
              transition: { duration: 0.15, ease: "easeIn" },
            }}
            layout
            className="z-[600] mb-[8vh] w-full max-w-full content-center justify-center rounded-2xl border border-blue-100 bg-white p-3 shadow-lg sm:w-fit sm:p-4"
            role="alert"
          >
            <div className="mb-3 grid grid-cols-[minmax(0,1fr),min-content] items-center">
              {titleElement}
              {isClosable !== null && (
                <button
                  type="button"
                  className="-mr-1 inline-flex items-center justify-center self-start justify-self-end rounded-xl bg-white  p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400"
                  onClick={closeModalHandler}
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
              )}
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("modals") as HTMLElement
  );
};

export default Modal;
