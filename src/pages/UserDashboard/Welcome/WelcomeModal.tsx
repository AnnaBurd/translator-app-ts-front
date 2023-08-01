import { AnimatePresence, Variants, motion } from "framer-motion";
import { useContext, useState } from "react";
import AuthContext from "../../../auth/AuthContext";
import Modal from "../../../components/UI/Modal";

type WelcomeModalProps = Record<string, never>;

const animationVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    translateY: 0,
    translateX: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const WelcomeModal: React.FC<WelcomeModalProps> = () => {
  const { user: signedInUser, updateUserDetails } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState<boolean>(
    !!(signedInUser && signedInUser.newUser && !signedInUser.hasAcceptedTerms)
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateUserDetails({ hasAcceptedTerms: true });
    setIsVisible(false);
  };

  // Can close only by clicking the accept button
  const closeModalHandler = () => {
    // setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      isClosable={null}
      onClose={closeModalHandler}
      animationVariants={animationVariants}
      titleElement={
        <h3 className="text-md pointer-events-none font-medium text-slate-800">
          Welcome to the Translator App! 🥳
        </h3>
      }
    >
      <div className="mb-6 max-w-lg ">
        <p className="pointer-events-none text-sm font-normal text-slate-600">
          Thank you for registration!
        </p>
        <p className="pointer-events-none mt-2 text-sm font-normal text-slate-600">
          To make sure the <em>sensitive</em> data is safe, we need to verify
          your identity first. Once the security checks are finished, you will
          be given a free full access to the editor.
        </p>
        <p className="pointer-events-none mt-6 text-sm font-normal text-slate-600">
          We will send you a email with further details soon! 📧
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <div className="flex justify-center gap-1">
          <motion.button
            layout="preserve-aspect"
            type="submit"
            className=" inline-block w-fit shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-6 py-2 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key="btn-create"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                OK
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </form>
    </Modal>
  );
};

export default WelcomeModal;
