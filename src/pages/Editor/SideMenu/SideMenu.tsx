import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import NewDocument from "./Buttons/NewDocument";
import UploadDocument from "./Buttons/UploadDocument";
import DownloadTranslation from "./Buttons/DownloadTranslation";
import AccountSettings from "./Buttons/AccountSettings";
import EditorSettings from "./Buttons/EditorSettings";

import NewDocumentModal from "../Modals/NewDocument";
import UploadDocumentModal from "../Modals/UploadDocument";
import useDocxManager from "../DocxManager/useDocxManager";

type SideMenuProps = {
  hasUploadedDocument: boolean;
  documentSlug?: string;
};

const SideMenu: React.FC<SideMenuProps> = ({
  hasUploadedDocument,
  documentSlug,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isNewDocumentModalOpen, setIsNewDocumentModalOpen] = useState(false);
  const [isUploadDocumentModalOpen, setIsUploadDocumentModalOpen] =
    useState(false);
  const [isRunningDownload, setIsRunningDownload] = useState(false);

  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeSideMenu = () => {
    setIsOpen(false);
  };

  const onNewDocument = async () => {
    setIsNewDocumentModalOpen(true);
  };

  const onUploadDocument = async () => {
    setIsUploadDocumentModalOpen(true);
  };

  const { downloadHandler } = useDocxManager();
  const onDownloadTranslationDocument = async () => {
    if (!documentSlug) return;
    setIsRunningDownload(true);

    await downloadHandler(documentSlug);
    setIsRunningDownload(false);
  };

  const onAccountSettings = async () => {
    console.log("onAccountSettings button clicked");
    setIsAccountSettingsOpen(true);
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-[100] flex h-14 w-16  flex-col justify-between">
        <div className="inline-flex h-14 w-16 items-center justify-center">
          <span
            className={`grid  cursor-pointer place-content-center rounded-lg  text-xs text-slate-600 shadow-2xl ${
              isOpen ? "h-9 w-10 bg-slate-100" : "h-8 w-9 bg-white"
            } duration-400 transition-all ease-in-out`}
            onClick={toggleSideMenu}
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
          className="fixed left-0 top-0 z-[40] h-screen w-screen "
          onClick={closeSideMenu}
        ></div>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed left-0 top-0 z-[60] flex h-screen min-h-screen w-16  flex-col justify-between bg-white shadow-sm"
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
                        onNewDocument={onNewDocument}
                        isActive={isNewDocumentModalOpen}
                      />
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <UploadDocument
                        onUploadDocument={onUploadDocument}
                        isActive={isUploadDocumentModalOpen}
                      />
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <DownloadTranslation
                        onDownloadTranslation={onDownloadTranslationDocument}
                        isActive={isRunningDownload}
                        isDisabled={!hasUploadedDocument || !documentSlug}
                      />
                    </motion.li>

                    {/* <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SearchInDocument
                        onSearchInDocument={async () => {
                          console.log("onSearchInDocument button clicked");
                        }}
                      />
                    </motion.li> */}
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
                    onAccountSettings={onAccountSettings}
                    isActive={isAccountSettingsOpen}
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
      <AnimatePresence>
        {isNewDocumentModalOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 0.2 } }}
          >
            <NewDocumentModal
              key="new-document-modal"
              onModalClose={() => {
                setIsNewDocumentModalOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isUploadDocumentModalOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 0.2 } }}
          >
            <UploadDocumentModal
              key="Upload-document-modal"
              onModalClose={() => {
                setIsUploadDocumentModalOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isAccountSettingsOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 0.2 } }}
            className="background-red-300"
          >
            123
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
