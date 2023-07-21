import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import NewDocument from "./Buttons/NewDocument";
import UploadDocument from "./Buttons/UploadDocument";
import DownloadTranslation from "./Buttons/DownloadTranslation";
import SearchInDocument from "./Buttons/SearchInDocument";
import AccountSettings from "./Buttons/AccountSettings";
import EditorSettings from "./Buttons/EditorSettings";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed z-[100] flex h-14 w-16  flex-col justify-between">
        <div className="inline-flex h-14 w-16 items-center justify-center">
          <span
            className={`grid  cursor-pointer place-content-center rounded-lg  text-xs text-slate-600 shadow-2xl ${
              isOpen ? "h-9 w-10 bg-slate-100" : "h-8 w-9 bg-white"
            } duration-400 transition-all ease-in-out`}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <img
              className="h-full w-full p-1.5"
              src={"/public/icon.svg"}
              alt="App Logo"
            />
          </span>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed z-[40] h-screen w-screen "
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-50 flex h-screen min-h-screen w-16  flex-col justify-between bg-white shadow-sm"
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { type: "spring", duration: 0.5 },
            }}
            exit={{ opacity: 0, x: -100 }}
          >
            <div>
              <div className="h-14 w-16"></div>

              <div className="border-t border-slate-100">
                <div className="px-2">
                  <ul className="space-y-1 border-t border-slate-100 pt-4">
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <NewDocument
                        onNewDocument={async () => {
                          console.log("New document button clicked");
                        }}
                      />
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <UploadDocument
                        onUploadDocument={async () => {
                          console.log("Upload document button clicked");
                        }}
                      />
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <DownloadTranslation
                        onDownloadTranslation={async () => {
                          console.log("Download translation button clicked");
                        }}
                      />
                    </motion.li>

                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SearchInDocument
                        onSearchInDocument={async () => {
                          console.log("onSearchInDocument button clicked");
                        }}
                      />
                    </motion.li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="sticky inset-x-12 mb-16 border-t border-slate-100 bg-white px-2">
              <ul className="space-y-1 border-slate-100 pt-4">
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AccountSettings
                    onAccountSettings={async () => {
                      console.log("onAccountSettings button clicked");
                    }}
                  />
                </motion.li>

                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EditorSettings
                    onEditorSettings={async () => {
                      console.log("onEditorSettings button clicked");
                    }}
                  />
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
