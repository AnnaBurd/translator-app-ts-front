import { MouseEventHandler, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import useFetchPrivate from "../../../hooks/useFetchPrivate";
import { AnimatePresence, motion } from "framer-motion";
import DotLoader from "../../../components/animations/DotLoader";
import useDocxManager from "../../Editor/DocxManager/useDocxManager";

enum LanguageOptions {
  vn = "vn",
  ru = "ru",
  en = "en",
}

type FormData = {
  file: any;
  lang: LanguageOptions;
  translationLang: LanguageOptions;
};

// TODO: add localization for form labels/error messages
const inputValidationSchema = yup
  .object({
    file: yup
      .mixed()
      .required("Please select a file to upload")
      .test("fileSize", "The file is too large", (value) => {
        // if (!value || !(value as FileList).length) return true; // attachment is optional
        return (value as FileList)[0].size <= 200000000; // TODO: file size limit
      }),

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

const UploadDocumentForm = ({
  visible,
  onClose,
  fullScreen = false,
}: {
  visible: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  fullScreen?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      file: null,
      lang: LanguageOptions.vn,
      translationLang: LanguageOptions.ru,
    },
    resolver: yupResolver(inputValidationSchema),
  });

  const { uploadHandler } = useDocxManager();

  const selectedFileList = watch("file");

  console.log("FILE SELECTED", selectedFileList);

  const selectedFile = selectedFileList?.[0];
  console.log("SELECTED FILE");

  console.log("ERRORS", errors);

  let selectedFileName = selectedFile?.name?.split(".docx")[0];
  if (selectedFileName && selectedFileName.length > 30) {
    selectedFileName = selectedFileName.slice(0, 30) + "...";
  }

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrivateData = useFetchPrivate();

  const navigate = useNavigate();

  const closeFormHandler = (event: React.MouseEvent<HTMLElement>) => {
    onClose(event);

    setTimeout(() => {
      reset();
      setError(null);
      setIsLoading(false);
    }, 150);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      // Store file content in the application state, so it can be used and downloaded later
      // Options?: store in local storage, in the state of the parent component (Applicaiton), or in the application context
      // local storage -> can be used to restore the document if the user closes the tab, but will leak confident data from the document
      // state of the parent component -> hard to manage
      // try to use context

      await uploadHandler(data.file[0]);

      // const { paragraphsContent, documentContentXMLobj, unzippedFile } =
      //   await uploadHandler(data.file[0]);

      // console.log(
      //   "Parsed document data",
      //   paragraphsContent,
      //   documentContentXMLobj,
      //   unzippedFile
      // );

      // Show loading indicator

      // Send form to backend

      // data.lang;

      // Parse file

      // Store file content in the state

      // Show loading indicator

      // Send form to backend

      // data.lang;

      const responseData = await fetchPrivateData("docs", "POST", {
        title: selectedFileName,
        lang: data.lang,
        translationLang: data.translationLang,
      });

      // On success -> navigate to the editor page with new document
      navigate(`/editor/${responseData.slug}?upload=true`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError((error as Error).message || "Error uploading document");

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
            className="fixed left-0 top-0 z-50 h-screen w-screen bg-slate-400 opacity-20"
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
            className={` z-50 h-min w-full select-none content-center justify-center rounded-2xl border border-blue-100 bg-white p-3 shadow-lg sm:p-4 lg:w-3/4 lg:p-6 xl:w-2/4 ${
              fullScreen ? "" : "absolute left-0 top-0"
            }`}
            role="alert"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="pointer-events-none text-lg font-medium text-slate-800">
                Upload document
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-white p-2 text-slate-500 hover:bg-slate-50  hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400"
                onClick={closeFormHandler}
              >
                <span className="sr-only">Close upload document form</span>

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

              <div className="mb-8 flex items-center gap-4 ">
                <label
                  htmlFor="file-input"
                  className="relative overflow-visible bg-transparent pt-0 focus-within:border-slate-600 dark:border-gray-700 "
                >
                  <input
                    id="file-input"
                    placeholder="Select a document"
                    className="hidden"
                    type="file"
                    accept=".docx"
                    multiple={false}
                    {...register("file")}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      console.log("button clicked");
                      document.getElementById("file-input")?.click();
                    }}
                    className="inline-block shrink-0 rounded-lg border border-indigo-400 bg-indigo-400 px-6 py-2.5 text-xs font-medium text-white transition focus:outline-none focus:ring  disabled:pointer-events-none disabled:border-indigo-200 disabled:bg-indigo-200"
                  >
                    Select file
                  </button>
                </label>
                <span className="inline-block text-sm text-gray-700  transition-all dark:text-gray-200">
                  {selectedFile ? selectedFileName : "No document selected"}
                </span>
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
                disabled={
                  watch("lang") === watch("translationLang") ||
                  !selectedFile ||
                  !!errors.file
                }
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
                      Uploading new document
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
                      Upload
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

export default UploadDocumentForm;