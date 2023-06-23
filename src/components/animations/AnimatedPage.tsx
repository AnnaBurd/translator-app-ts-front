import { motion } from "framer-motion";

type AnimatedPageProps = {
  children: React.ReactNode;
};

const animationVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transiton: { duration: 0.5 },
  },
  exit: { opacity: 0, transiton: { duration: 0.3 } },
};

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
