import Welcome from "./Welcome/Welcome";
import UserProfile from "./UserProfile/UserProfile";
import Documents from "./Documents/Documents";
import Charts from "./Charts/Charts";
import AnimatedPage from "../../components/animations/AnimatedPage";

import useDataPrivate from "../../hooks/useDataPrivate";
import Loader from "../../components/Loaders/Loader";
import { User, UserProfileStats } from "../../@types/user";
import { Doc } from "../../@types/doc";
import { useContext } from "react";
import useDocumentsPrivate from "../../hooks/useDocumentsPrivate";
import { motion } from "framer-motion";
import WelcomeModal from "./Welcome/WelcomeModal";
import themeContext from "../../context/ThemeContext";
import NavigationBtn from "./NavigationBtn";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { screenSize } = useContext(themeContext);

  // TODO: refactor animations and remove animations for mobile devices

  const [userProfile, isLoadingUserProfileStats, error] = useDataPrivate<{
    usageStatistics: UserProfileStats;
    user: User;
  }>(`users/profile`);

  const {
    data: docs,
    errorFetchingData: errorLoadingDocs,
    fetchNextPage: fetchMoreDocuments,
    deleteDataItem: deleteDocument,
    isFetchingFirstPage: isFetchingFirstPageWithDocuments,
  } = useDocumentsPrivate<Doc>(`docs`, screenSize);

  const isAdmin = userProfile?.user.role === "Admin";

  if (isLoadingUserProfileStats || isFetchingFirstPageWithDocuments)
    return <Loader />;

  // Render error if could not load data
  if (error)
    return (
      <Navigate to="/error?type=server-error" state={{ from: location }} />
    );

  const navigateToEditorTab = () => {
    const lastChangedDoc =
      docs.length &&
      docs.reduce((prev, current) =>
        new Date(prev.changedAt || "") > new Date(current.changedAt || "")
          ? prev
          : current
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
        <header aria-label="User Dashboard" className="relative z-50">
          <div className=" mx-auto flex max-w-screen-xl flex-col-reverse justify-between px-4 py-4 sm:px-6 md:py-8 lg:flex-row lg:items-center lg:px-4 2xl:max-w-screen-2xl">
            <Welcome
              stats={{
                words:
                  userProfile?.usageStatistics.numberOfWordsTranslatedThisMonth,
                documentsChanged:
                  userProfile?.usageStatistics.numOfDocumentsChangedThisMonth,
              }}
            ></Welcome>
            <motion.div
              className="mb-4 flex items-center justify-end gap-4"
              initial={{ opacity: 0, y: "-20vh" }}
              animate={{
                opacity: 1,
                y: 0,
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
              {/* <div className="flex items-center gap-4"></div> */}
              <NavigationBtn onClick={navigateToEditorTab}>
                {screenSize !== "small" ? "Open Editor" : "Editor"}
              </NavigationBtn>
              {isAdmin && (
                <NavigationBtn onClick={navigateToAdminDashboardTab}>
                  {screenSize !== "small" ? "Open Admin Dashboard" : "Users"}
                </NavigationBtn>
              )}

              <span
                aria-hidden="true"
                className="block h-6 w-px rounded-full bg-slate-300"
              ></span>

              <UserProfile />
            </motion.div>
          </div>
        </header>
        <div className="z-0 mx-auto max-w-screen-xl px-4 py-4 sm:px-6 md:px-4 2xl:max-w-screen-2xl ">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row 2xl:gap-16">
            <Documents
              docs={docs}
              deleteDocument={deleteDocument}
              isLoading={isFetchingFirstPageWithDocuments}
              errorLoading={errorLoadingDocs}
              onEndOfViewport={fetchMoreDocuments}
            ></Documents>
            <Charts stats={userProfile?.usageStatistics} />
          </div>
        </div>

        <WelcomeModal />
      </AnimatedPage>
    </>
  );
}
