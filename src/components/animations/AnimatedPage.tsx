import { motion } from "framer-motion";

type AnimatedPageProps = {
  children: React.ReactNode;
  fadeOnExit?: boolean;
};

const AnimatedPage: React.FC<AnimatedPageProps> = ({
  children,
  fadeOnExit = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={
        fadeOnExit
          ? {
              opacity: 0,
              transition: { ease: "easeIn", duration: 0.3 },
            }
          : {}
      } // transition property only for exit stage
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
