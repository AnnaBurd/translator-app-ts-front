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
import { useState } from "react";

export default function Dashboard() {
  // const { user } = useContext(AuthContext);

  const [userProfile, isLoading, error] = useDataPrivate<{
    usageStatistics: UserProfileStats;
    user: User;
  }>(`users/profile`);

  const [docs, isLoadingDocuments, errorLoadingDocs, deleteDocument] =
    useDataPrivate<Array<Doc>>(`docs`);

  console.log("User dash render:");
  console.log("userProfile:", userProfile);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

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
    const lastChangedDoc = docs?.reduce((prev, current) =>
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

  return (
    <>
      <AnimatedPage>
        <div
          onClick={() => {
            console.log("clicking on dashboard");
            if (isOpenUserProfileMenu) setIsOpenUserProfileMenu(false);
          }}
        >
          <header aria-label="User Dashboard" className="">
            <div className="mx-auto flex max-w-screen-xl flex-col-reverse justify-between px-4 py-4 sm:px-6 md:py-8 lg:flex-row lg:items-center lg:px-4">
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
              <div className="mb-4 flex items-center justify-end gap-4">
                <div className="flex items-center gap-4"></div>
                <button
                  onClick={navigateToEditorTab}
                  className="mr-1 inline-flex items-center justify-center gap-1.5 rounded-lg border  border-slate-300 px-5 py-3 text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring"
                  type="button"
                >
                  <span className="text-xs font-medium"> Open Editor </span>

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
                <span
                  aria-hidden="true"
                  className="block h-6 w-px rounded-full bg-slate-300"
                ></span>

                <UserProfile
                  isOpenMenu={isOpenUserProfileMenu}
                  toggleOpenMenu={toggleUserProfileMenu}
                ></UserProfile>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 md:px-4">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
              <Documents
                docs={docs}
                deleteDocument={deleteDocument}
                isLoading={isLoadingDocuments}
                error={errorLoadingDocs}
              ></Documents>
              <Charts stats={userProfile?.usageStatistics}></Charts>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </>
  );
}
