import { AnimatePresence, motion } from "framer-motion";
import DotLoader from "../../../../components/animations/DotLoader";

type GenerateControlProps = {
  onClick: () => void;
  //   state: string;
  errorMessage: string;
  isFirstGeneration: boolean;
  isLoadingTranslation: boolean;
};

const GenerateControl: React.FC<GenerateControlProps> = ({
  onClick,
  //   state,
  errorMessage,
  isFirstGeneration,
  isLoadingTranslation,
}) => {
  //   const isLoadingTranslation = state === "loading";
  const errorLoadingTranslation = errorMessage;

  return (
    <button
      onClick={onClick}
      className="inline-block shrink-0 justify-self-center rounded-md border border-indigo-400 bg-indigo-400 px-4 py-2 text-xs font-medium text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300 disabled:pointer-events-none disabled:opacity-90"
      disabled={isLoadingTranslation}
    >
      <AnimatePresence mode="wait">
        {isLoadingTranslation && (
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
        {!isLoadingTranslation && errorLoadingTranslation && (
          <motion.span
            key="btn-error"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 4 },
            }}
          >
            {/* TODO: show messages in popup below, not in the button */}
            {errorLoadingTranslation.includes("tokens")
              ? "Ups! You have run out of tokens, please contact administrator to increase limits."
              : "Ups! Could not generate translation, please check connection and try again later."}
          </motion.span>
        )}
        {!isLoadingTranslation && !errorLoadingTranslation && (
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
  );
};

export default GenerateControl;
