import { AnimatePresence, motion } from "framer-motion";
import DotLoader from "../../../../components/Loaders/DotLoader";

type GenerateControlProps = {
  onClick: () => void;
  errorMessage: string;
  isFirstGeneration: boolean;
  isLoading: boolean;
  currentInfoMessage: string;
  isDisabled?: boolean;
};

const GenerateControl: React.FC<GenerateControlProps> = ({
  onClick,
  isFirstGeneration,
  isLoading,
  errorMessage,
  isDisabled = false,
}) => {
  const errorLoadingMessage = errorMessage;

  return (
    <>
      <button
        onClick={onClick}
        className="relative inline-block shrink-0 justify-self-center rounded-md border border-indigo-400 bg-indigo-400 px-4 py-2 text-xs font-medium text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300 disabled:pointer-events-none disabled:opacity-90"
        disabled={isDisabled}
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
              Generating translation
              <DotLoader />
            </motion.span>
          )}
          {!isLoading && errorLoadingMessage && (
            <motion.span
              key="btn-error"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 4 },
              }}
            >
              {isDisabled ? "Out of tokens" : "Retry"}
            </motion.span>
          )}
          {!isLoading && !errorLoadingMessage && (
            <motion.span
              key="btn-create"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              {isFirstGeneration
                ? "Generate AI translation"
                : "Update AI translation"}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  );
};

export default GenerateControl;
