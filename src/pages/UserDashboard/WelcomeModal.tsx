import { AnimatePresence, motion } from "framer-motion";
import DotLoader from "../../components/animations/DotLoader";
import { useState } from "react";

type WelcomeModalProps = {
  //   onAccept: () => void;
};

const WelcomeModal: React.FC<WelcomeModalProps> = () => {
  const isLoading = false;
  const [visible, setIsVisible] = useState(true);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsVisible(false);
    // onAccept();
  };

  return (
    <AnimatePresence>
      {visible ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            className="fixed left-0 top-0 z-30 h-screen w-screen bg-slate-400 opacity-20"
            // onClick={closeFormHandler}
          ></motion.div>

          <div className="fixed left-0 top-1/4 z-40 w-full min-w-fit p-4 md:absolute md:left-1/4 md:w-3/5 xl:left-1/3 xl:w-1/3">
            <motion.div
              initial={{
                opacity: 0,
                //   translateY: "-40%",
                //   translateX: "20%",
                scale: 0.3,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
                translateX: 0,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                //   translateY: "-20%",
                //   translateX: "20%",
                scale: 0.7,
                transition: { duration: 0.15, ease: "easeIn" },
              }}
              className="h-min w-full max-w-xl content-center justify-center rounded-2xl border border-blue-100 bg-white p-6 shadow-lg"
              role="alert"
            >
              <div className="mb-2 flex items-center justify-start">
                <p className="pointer-events-none text-base font-medium text-slate-800">
                  Welcome to the Translator App! 🥳
                </p>
              </div>
              <div className="mb-6">
                <p className="pointer-events-none text-sm font-normal text-slate-600">
                  Thank you for registration!
                </p>
                <p className="pointer-events-none mt-2 text-sm font-normal text-slate-600">
                  To make sure the <em>sensitive</em> data is safe, we need to
                  verify your identity first. Once the security checks are
                  finished, you will be given a free full access to the editor.
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
                    // disabled={watch("lang") === watch("translationLang")}
                    //   onClick={deleteDocHandler}
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
                          Deleting
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
                </div>
              </form>
            </motion.div>
          </div>
          {/* <div className="bg-red-300"> */}
          {/* <p>{errors.title?.message} </p>
          <p>{errors.lang?.message} </p>
          <p>{errors.translationLang?.message} </p> */}
          {/* </div> */}
          {/* </motion.div> */}
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default WelcomeModal;