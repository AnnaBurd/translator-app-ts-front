// import { useContext } from "react";
// import AuthContext from "../../auth/AuthContext";

import Welcome from "./Welcome";
import UserProfile from "./UserProfile/UserProfile";
import Documents from "./Documents/Documents";
import Charts from "./Charts/Charts";
import AnimatedPage from "../../components/animations/AnimatedPage";

import useDataPrivate from "../../hooks/useDataPrivate";
import Loader from "../../components/animations/Loader";
import { User, UserProfileStats } from "../../@types/user";
import { Doc } from "../../@types/doc";
import { useContext, useEffect, useState } from "react";
import useDocumentsPrivate from "../../hooks/useDocumentsPrivate";
import { motion } from "framer-motion";
import AuthContext from "../../auth/AuthContext";
import WelcomeModal from "./WelcomeModal";

export default function Dashboard() {
  // const { user } = useContext(AuthContext);

  const { user: signedInUser } = useContext(AuthContext);

  // TODO: refactor animations and remove animations for mobile devices

  const [userProfile, isLoading, error] = useDataPrivate<{
    usageStatistics: UserProfileStats;
    user: User;
  }>(`users/profile`);

  const {
    data: docs,
    isFetchingData: isLoadingDocuments,
    errorFetchingData: errorLoadingDocs,
    fetchNextPage: fetchMoreDocuments,
    deleteDataItem: deleteDocument,
  } = useDocumentsPrivate<Doc>(`docs`);

  console.log("*** User dash render ***");
  console.log("*** docs:", docs);
  console.log("*** isLoadingDocuments:", isLoadingDocuments);
  console.log("*** errorLoadingDocs:", errorLoadingDocs);

  // console.log("userProfile:", userProfile);
  // console.log("isLoading:", isLoading);
  // console.log("error:", error);

  // console.log("USER ROLE", userProfile?.user.role);

  const isAdmin = userProfile?.user.role === "Admin";

  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");

    const onChange = () => setIsWide(!!mql.matches);
    mql.addEventListener("change", onChange);
    setIsWide(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  const [isOpenUserProfileMenu, setIsOpenUserProfileMenu] = useState(false);

  const toggleUserProfileMenu = () => {
    setIsOpenUserProfileMenu((prevState) => !prevState);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>🔥 Could not load document: {error}</div>;
  }

  const navigateToEditorTab = () => {
    const lastChangedDoc =
      docs.length &&
      docs.reduce((prev, current) =>
        new Date(prev.changedAt || "") > new Date(current.changedAt || "")
          ? prev
          : current
      );

    console.log(
      "Opening last changed document in Editor (new tab)",
      lastChangedDoc
    );

    if (lastChangedDoc)
      window.open(`/editor/${lastChangedDoc?.slug}`, "_blank", "noreferrer");

    if (!lastChangedDoc) {
      window.open(`/editor`, "_blank", "noreferrer");
    }
  };

  const navigateToAdminDashboardTab = () => {
    window.open(`/users`, "_blank", "noreferrer");
  };

  return (
    <>
      <AnimatedPage>
        <div
          onClick={() => {
            console.log("clicking on dashboard");
            if (isOpenUserProfileMenu) setIsOpenUserProfileMenu(false);
          }}
          // className="relative"
        >
          <header aria-label="User Dashboard" className="relative z-50">
            <div className=" mx-auto flex max-w-screen-xl flex-col-reverse justify-between px-4 py-4 sm:px-6 md:py-8 lg:flex-row lg:items-center lg:px-4 2xl:max-w-screen-2xl">
              <Welcome
                stats={{
                  words:
                    userProfile?.usageStatistics
                      .numberOfWordsTranslatedThisMonth,
                  paragraphs:
                    userProfile?.usageStatistics
                      .numOfParagraphsTranslatedThisMonth,
                }}
              ></Welcome>
              <motion.div
                className="mb-4 flex items-center justify-end gap-4"
                initial={{ opacity: 0, y: "-20vh" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  // x: 0,
                  transition: {
                    opacity: { duration: 1.4, ease: "backInOut", delay: 0.1 },
                    y: { duration: 1.4, ease: "backInOut", delay: 0.1 },
                  },
                }}
                exit={{
                  opacity: 0,
                  y: "-20vh",
                  transition: { duration: 1, ease: "backOut" },
                }}
              >
                <div className="flex items-center gap-4"></div>
                <button
                  onClick={navigateToEditorTab}
                  className="mr-1 inline-flex items-center justify-center gap-1.5 rounded-lg border  border-slate-300 px-5 py-3 text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-xs font-medium">
                    {isWide ? "Open Editor" : "Editor"}
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[0.85rem] w-[0.85rem]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
                {isAdmin && (
                  <button
                    onClick={navigateToAdminDashboardTab}
                    className="-ml-2 mr-1 inline-flex items-center justify-center gap-1.5 rounded-lg  border border-slate-300 px-5 py-3 text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring"
                    type="button"
                  >
                    <span className="text-xs font-medium">
                      {isWide ? "Open Admin Dashboard" : "Users"}
                    </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[0.85rem] w-[0.85rem]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                )}
                <span
                  aria-hidden="true"
                  className="block h-6 w-px rounded-full bg-slate-300"
                ></span>

                <UserProfile
                  isOpenMenu={isOpenUserProfileMenu}
                  toggleOpenMenu={toggleUserProfileMenu}
                ></UserProfile>
              </motion.div>
            </div>
          </header>
          <div className="z-0 mx-auto max-w-screen-xl px-4 py-4 sm:px-6 md:px-4 2xl:max-w-screen-2xl ">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row 2xl:gap-16">
              <Documents
                docs={docs}
                deleteDocument={deleteDocument}
                isLoading={isLoadingDocuments}
                error={errorLoadingDocs}
                onEndOfViewport={fetchMoreDocuments}
              ></Documents>
              <Charts stats={userProfile?.usageStatistics}></Charts>
            </div>
          </div>
        </div>
        {/* {signedInUser.newUser || (true && <WelcomeModal />)} */}
        {signedInUser.newUser && <WelcomeModal />}
      </AnimatedPage>
    </>
  );
}
