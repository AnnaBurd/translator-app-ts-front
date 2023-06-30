import { motion } from "framer-motion";
// import { useLocation } from "react-router-dom";

type AnimatedPageProps = {
  children: React.ReactNode;
  fadeOnExit?: boolean;
};

// const animationVariants = {
//   initial: { opacity: 0 },
//   animate: {
//     opacity: 1,
//     transiton: { duration: 0.5 },
//   },
//   exit: { opacity: 0, x: "-100vw", transiton: { x: { duration: 10 } } },
//   // transition: { duration: 10 },
// };

const AnimatedPage: React.FC<AnimatedPageProps> = ({
  children,
  fadeOnExit = true,
}) => {
  // const location = useLocation();
  return (
    <motion.div
      // key={location.key}
      // variants={animationVariants}
      // initial="initial"
      // animate="animate"
      // // transition= { duration: 10}
      // exit={fadeOnExit ? "exit" : ""}

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={
        fadeOnExit
          ? {
              opacity: 0,
              // transform: "scale(0.5)",
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
