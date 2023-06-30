import { MouseEventHandler, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import useFetchPrivate from "../../../hooks/useFetchPrivate";
import { AnimatePresence, motion } from "framer-motion";
import DotLoader from "../../../components/animations/DotLoader";

enum LanguageOptions {
  vn = "vn",
  ru = "ru",
  en = "en",
}

type FormData = {
  title: string | undefined;
  lang: LanguageOptions;
  translationLang: LanguageOptions;
};

// TODO: add localization for form labels/error messages
const inputValidationSchema = yup
  .object({
    title: yup
      .string()
      .test("len", "Title maximum lenght is 10 characters", (val) =>
        val ? val.length <= 50 : true
      )
      .trim(),
    lang: yup
      .string()
      .trim()
      .oneOf(
        Object.values(LanguageOptions),
        "Please select an original document language"
      )
      .required("Please select an original document language"),
    translationLang: yup
      .string()
      .trim()
      .oneOf(
        Object.values(LanguageOptions),
        "Please select a translation language"
      )
      .required("Please select a translation language different from original")
      .when(["lang"], (lang, schema) => {
        return schema.notOneOf(
          lang,
          "Please select a translation language different from original"
        );
      }),
  })
  .required();

const NewDocumentForm = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      lang: LanguageOptions.vn,
      translationLang: LanguageOptions.ru,
    },
    resolver: yupResolver(inputValidationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchPrivateData = useFetchPrivate();

  const navigate = useNavigate();

  const closeFormHandler = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event);

    setTimeout(() => {
      reset();
    }, 150);
  };

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);

    // Show loading indicator

    // Send form to backend

    try {
      setIsLoading(true);

      const responseData = await fetchPrivateData("docs", "POST", data);

      // On success -> navigate to the editor page with new document
      navigate(`/editor/${responseData._id}`); // TODO: replace with unique slugs on backend api -> frontend
    } catch (error) {
      console.log(error);

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
            className="absolute inset-0 right-0 top-0 z-50 flex select-none overflow-y-visible"
          >
            <div
              className="h-min w-full content-center justify-center rounded-2xl border border-blue-100 bg-white p-3 shadow-lg sm:p-4 lg:w-3/4 lg:p-6 xl:w-2/4"
              role="alert"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="pointer-events-none text-lg font-medium text-slate-800">
                  New document settings
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
              <form onSubmit={handleSubmit(onSubmit)} className="relative">
                {isLoading && (
                  <div className="absolute left-0 top-0 z-30 h-full w-full"></div>
                )}
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="relative block overflow-visible border-b border-gray-200 bg-transparent pt-3 focus-within:border-slate-600 dark:border-gray-700"
                  >
                    <input
                      {...register("title")}
                      placeholder="Title"
                      maxLength={50}
                      className="border-nonebg-transparent peer h-8 w-full p-0 text-indigo-900 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 dark:text-white sm:text-sm"
                    />

                    <span className="absolute -top-1.5 start-0 text-sm text-gray-700 transition-all  dark:text-gray-200">
                      Title
                    </span>
                  </label>
                </div>

                <div className="md:flex md:justify-between">
                  <fieldset className="mb-12  md:mb-10">
                    <legend className="sr-only">Document Language</legend>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Document Language
                    </span>

                    <div className="mt-1 flex flex-wrap gap-2">
                      {Object.values(LanguageOptions).map((lang) => (
                        <div key={`document-lang-${lang}`}>
                          <input
                            type="radio"
                            value={lang}
                            id={`document-lang-${lang}`}
                            className="peer hidden [&:checked_+_label_svg]:block"
                            {...register("lang")}
                          />

                          <label
                            htmlFor={`document-lang-${lang}`}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-100 bg-white px-3 py-2 text-slate-800 hover:border-gray-200 disabled:pointer-events-none peer-checked:border-indigo-400 peer-checked:bg-indigo-400 peer-checked:text-white"
                          >
                            <svg
                              className="hidden h-4 w-4"
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

                            <p className="text-xs font-medium">
                              {lang[0].toUpperCase() + lang.slice(1)}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="relative mb-10 ">
                    <legend className="sr-only">Translation Language</legend>
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Translation Language
                    </span>

                    <div className="mt-1 flex flex-wrap gap-2">
                      {Object.values(LanguageOptions).map((lang) => (
                        <div
                          key={`translation-lang-${lang}`}
                          className={
                            watch("lang") === lang
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        >
                          <input
                            type="radio"
                            value={lang}
                            id={`translation-lang-${lang}`}
                            className="peer hidden [&:checked_+_label_svg]:block"
                            {...register("translationLang")}
                            disabled={watch("lang") === lang}
                          />

                          <label
                            htmlFor={`translation-lang-${lang}`}
                            className=" flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-2 text-slate-800 hover:border-gray-200 peer-checked:border-indigo-400 peer-checked:bg-indigo-400 peer-checked:text-white"
                          >
                            <svg
                              className="hidden h-4 w-4"
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

                            <p className="text-xs font-medium">
                              {lang[0].toUpperCase() + lang.slice(1)}
                            </p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <button
                  type="submit"
                  disabled={watch("lang") === watch("translationLang")}
                  className=" inline-block w-full shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-12 py-2.5 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200"
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
                        Creating new document
                        <DotLoader />
                      </motion.span>
                    )}
                    {!isLoading && (
                      <motion.span
                        key="btn-create"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                      >
                        Create
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
            {/* TODO: error handling?  */}
            <div className="bg-red-300">
              <p>{errors.title?.message} </p>
              <p>{errors.lang?.message} </p>
              <p>{errors.translationLang?.message} </p>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default NewDocumentForm;
