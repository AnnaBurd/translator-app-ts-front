import { MouseEventHandler, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import useFetchPrivate from "../../../hooks/useFetchPrivate";
import { AnimatePresence, motion } from "framer-motion";
import DotLoader from "../../../components/animations/DotLoader";

const tokensUsagePlanOptions = ["Standard", "Premium", "Enterprise"];
// TODO: add localization for form labels/error messages
const inputValidationSchema = yup
  .object({
    planOption: yup
      .string()
      .trim()
      .oneOf(
        tokensUsagePlanOptions,
        "Please select an original document language"
      )
      .required("Please select an original document language"),
  })
  .required();

type FormData = {
  planOption: string;
};

type LimitTokensFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (newLimit: number) => void;
  email: string;
  currentPlan: number;
};
const LimitTokensForm: React.FC<LimitTokensFormProps> = ({
  visible,
  onClose,
  onSubmit: onSuccessfulFormSubmit,
  email,
  currentPlan,
}) => {
  // const currentOption =
  //   !currentPlan || currentPlan === 0
  //     ? ""
  //     : currentPlan <= 1000000
  //     ? tokensUsagePlanOptions[0]
  //     : currentPlan <= 10000000
  //     ? tokensUsagePlanOptions[1]
  //     : tokensUsagePlanOptions[2];

  // console.log("currentOption", currentOption);
  console.log("currentPlan", currentPlan);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      planOption: "",
    },
    resolver: yupResolver(inputValidationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrivateData = useFetchPrivate();

  const navigate = useNavigate();

  const closeFormHandler = (event: React.MouseEvent<HTMLElement>) => {
    onClose();

    setTimeout(() => {
      reset();
      setError(null);
      setIsLoading(false);
    }, 150);
  };

  const onSubmit = async (data: FormData) => {
    // console.log("Submitting form", data);

    // Show loading indicator

    // Send form to backend

    try {
      setIsLoading(true);

      const responseData = await fetchPrivateData(
        `users/${email}`,
        "PATCH",
        data
      );

      // UPDATE CURRENT USER PLAN IN TAbBLE

      // HIDE EVERYTHONG

      setIsLoading(false);

      // console.log("responseData", responseData, responseData.tokensLimit);

      onSuccessfulFormSubmit(responseData.tokensLimit);

      onClose();

      // On success -> navigate to the editor page with new document
      // navigate(`/editor/${responseData.slug}`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError((error as Error).message || "Error updating user plan");

      // TODO: show error message
      // Hide loading indicator
    }
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
            onClick={closeFormHandler}
          ></motion.div>
          {/* 
          <motion.div
            initial={{
              opacity: 0,
              translateY: "-40%",
              translateX: "-10%",
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
              translateX: "-10%",
              scale: 0.7,
              transition: { duration: 0.15, ease: "easeIn" },
            }}
            className="absolute inset-0 right-0 top-0  flex select-none overflow-y-visible"
          > */}
          <motion.div
            initial={{
              opacity: 0,
              translateY: "-40%",
              translateX: "-10%",
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
              translateX: "-10%",
              scale: 0.7,
              transition: { duration: 0.15, ease: "easeIn" },
            }}
            className={` fixed left-0 top-0 z-50 m-4 h-min w-[calc(100%-2rem)] max-w-xl select-none content-center justify-center rounded-2xl border border-indigo-100 bg-white p-3 shadow-lg sm:p-4 lg:w-3/4 lg:p-6 xl:w-2/4 `}
            role="alert"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="pointer-events-none text-base font-medium text-slate-800">
                Tokens usage
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-white p-2 text-slate-500 hover:bg-slate-50  hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400"
                onClick={closeFormHandler}
              >
                <span className="sr-only">Close new document form</span>

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
            </div>
            {/* onSubmit={handleSubmit(onSubmit)} */}

            <div className="mb-2 text-sm text-slate-800">
              Set tokens usage monthly plan for user{" "}
              <span className="text-indigo-800">{email}</span>:
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="relative">
              {isLoading && (
                <div className="absolute left-0 top-0 z-30 h-full w-full"></div>
              )}
              <div className="mb-1.5">
                <input
                  type="radio"
                  value={tokensUsagePlanOptions[0]}
                  id={tokensUsagePlanOptions[0]}
                  {...register("planOption")}
                  className="peer hidden [&:checked_+_label_svg]:block"
                />

                <label
                  htmlFor={tokensUsagePlanOptions[0]}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-100 bg-white px-4 py-3 text-xs font-medium shadow-sm hover:border-slate-200 peer-checked:border-indigo-400 peer-checked:ring-1 peer-checked:ring-indigo-400"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="hidden h-4 w-4 text-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-slate-700">
                      {tokensUsagePlanOptions[0]}
                    </p>
                  </div>

                  <p className="text-slate-900">1 000 000 Tk</p>
                </label>
              </div>

              <div className="mb-1.5">
                <input
                  type="radio"
                  value={tokensUsagePlanOptions[1]}
                  id={tokensUsagePlanOptions[1]}
                  {...register("planOption")}
                  className="peer hidden [&:checked_+_label_svg]:block"
                />

                <label
                  htmlFor={tokensUsagePlanOptions[1]}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-100 bg-white px-4 py-3 text-sm font-medium shadow-sm hover:border-slate-200 peer-checked:border-indigo-400 peer-checked:ring-1 peer-checked:ring-indigo-400"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="hidden h-5 w-5 text-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-slate-700">
                      {tokensUsagePlanOptions[1]}
                    </p>
                  </div>

                  <p className="text-slate-900">10 000 000 Tk</p>
                </label>
              </div>

              <div className="mb-1.5">
                <input
                  type="radio"
                  value={tokensUsagePlanOptions[2]}
                  id={tokensUsagePlanOptions[2]}
                  {...register("planOption")}
                  className="peer hidden [&:checked_+_label_svg]:block"
                />

                <label
                  htmlFor={tokensUsagePlanOptions[2]}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-100 bg-white px-4 py-3 text-base font-medium shadow-sm hover:border-slate-200 peer-checked:border-indigo-400 peer-checked:ring-1 peer-checked:ring-indigo-400"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="hidden h-5 w-5 text-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-slate-700">
                      {tokensUsagePlanOptions[2]}
                    </p>
                  </div>

                  <p className="text-slate-900">100 000 000 Tk</p>
                </label>
              </div>

              <button
                type="submit"
                // disabled={watch("lang") === watch("translationLang")}
                className=" mt-2 inline-block w-full shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-12 py-2.5 text-xs font-medium text-white transition focus:outline-none  focus:ring disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200"
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
                      Submitting changes
                      <DotLoader />
                    </motion.span>
                  )}
                  {!isLoading && error && (
                    <motion.span
                      key="btn-error"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 4 },
                      }}
                    >
                      {
                        "Ups! Could not create document, please check connection and try again later."
                      }
                    </motion.span>
                  )}
                  {!isLoading && !error && (
                    <motion.span
                      key="btn-create"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    >
                      Submit
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
          {/* TODO: error handling?  */}
          {/* <div className="bg-red-300">
            <p>{errors.title?.message} </p>
            <p>{errors.lang?.message} </p>
            <p>{errors.translationLang?.message} </p>
          </div> */}
          {/* </motion.div> */}
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default LimitTokensForm;
