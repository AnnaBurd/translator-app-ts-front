import { useState } from "react";
import NewDocumentForm from "./NewDocumentForm";

const NewDocument = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const formOpenHandler = () => {
    setIsFormVisible(true);
  };

  const formCloseHandler = () => {
    setIsFormVisible(false);
  };

  return (
    <>
      <div
        className="h-44 w-64 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 p-[3px] hover:shadow-xl"
        onClick={formOpenHandler}
      >
        <div className="relative block h-full w-full cursor-pointer rounded-xl bg-white p-2">
          <div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        </div>
      </div>
      <NewDocumentForm visible={isFormVisible} onClose={formCloseHandler} />
    </>
  );
};

export default NewDocument;
