import { AnimatePresence, motion } from "framer-motion";

type InfoNotificationProps = {
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

const InfoNotification: React.FC<InfoNotificationProps> = ({ message }) => {
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
          className="absolute w-fit rounded-l rounded-r-lg border-s-4 border-slate-500 bg-white p-1.5 pr-3"
        >
          <div className="flex items-center gap-2 text-slate-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4 flex-shrink-0 opacity-80"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clipRule="evenodd"
              />
            </svg>

            <span className="inline-block text-xs text-slate-700">
              {message || "Ups! Something went wrong. (no info message)"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoNotification;
