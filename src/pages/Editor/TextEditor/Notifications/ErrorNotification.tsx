import { AnimatePresence, motion } from "framer-motion";

type ErrorNotificationProps = {
  message: string;
};

const notificationVariants = {
  initial: {
    opacity: 0,
    y: -10,
    scale: 0.7,
    transition: { duration: 0.2 },
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    y: -10,
    transition: { duration: 0.1 },
  },
};

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message }) => {
  const isVisible = message !== "";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={notificationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          role="alert"
          layout
          className="absolute w-fit rounded-l rounded-r-lg border-s-4 border-rose-500 bg-white p-1.5 pr-3"
        >
          <div className="flex items-center gap-2 text-rose-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 flex-shrink-0 opacity-80"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>

            <span className="inline-block text-xs text-rose-700">
              {message || "Ups! Something went wrong. (no error message)"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// TODO:
// {errorLoadingMessage.includes("tokens")
// ? "Ups! You have run out of tokens, please contact administrator to increase limits."
// : "Ups! Could not generate translation, please check connection and try again later."}

export default ErrorNotification;
