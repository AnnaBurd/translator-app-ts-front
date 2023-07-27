import { motion } from "framer-motion";
import { TotalUsageStats, User } from "../../@types/user";
import AnimatedPage from "../../components/animations/AnimatedPage";
import UserProfile from "../UserDashboard/UserProfile/UserProfile";
import { useState, useContext } from "react";
import useDocumentsPrivate from "../../hooks/useDocumentsPrivate";
import useDataPrivate from "../../hooks/useDataPrivate";
import UserCard from "./Users/UserCard";
import Loader from "../../components/animations/Loader";
import Pagination from "./Controls/Pagination";
import BlockUserModal from "./Modals/BlockUserModal";
import useFetchPrivate from "../../hooks/useFetchPrivate";
import UnblockUserModal from "./Modals/UnblockUserModal";
import LimitTokensForm from "./Modals/LimitTokensForm";
import NavigationBtn from "../UserDashboard/NavigationBtn";
import themeContext from "../../context/ThemeContext";
import Button from "./Filter/Button";
import Table from "./Users/Table";
import UsageStats from "./UsageStats";

const USERS_PER_PAGE = 6;

export default function AdminDashboard() {
  const { screenSize } = useContext(themeContext);

  const {
    data: users,
    errorFetchingData,
    fetchNextPage,
    totalPages,
    isFetchingFirstPage,
  } = useDocumentsPrivate<User>("users", undefined, USERS_PER_PAGE);

  const [usageStats, isLoadingUsageStats, isErrorLoadingUsageStats] =
    useDataPrivate<TotalUsageStats>("users/usagestatistics");

  const [currentPage, setCurrentPage] = useState(1);

  const currentlyLoadedPage =
    users.length > (currentPage - 1) * USERS_PER_PAGE
      ? currentPage
      : currentPage - 1;
  const isLoadingPage = currentPage !== currentlyLoadedPage;

  const fetchPrivate = useFetchPrivate();

  const [filterUsersBy, setFilterUsersBy] = useState(""); // Options: "", "active", "inactive", "blocked"

  const filteredUsers = users?.filter((user) => {
    if (filterUsersBy === "") return true;

    if (filterUsersBy === "blocked") {
      return user.isBlocked;
    }

    if (filterUsersBy === "active") {
      return (
        !user.isBlocked && user.tokensUsedMonth && user.tokensUsedMonth > 0
      );
    }

    if (filterUsersBy === "inactive") {
      return !user.isBlocked && !user.tokensUsedMonth;
    }
  });

  const [isOpenUserProfileMenu, setIsOpenUserProfileMenu] = useState(false);

  const toggleUserProfileMenu = () => {
    setIsOpenUserProfileMenu((prevState) => !prevState);
  };

  const [userToBlockAccess, setUserToBlockAccess] = useState("");
  const [userToUnblockAccess, setUserToUnblockAccess] = useState("");
  const [userToSetTokensLimit, setUserToSetTokensLimit] = useState("");

  const usersOnPage = filteredUsers.slice(
    currentlyLoadedPage * USERS_PER_PAGE - USERS_PER_PAGE,
    currentlyLoadedPage * USERS_PER_PAGE
  );

  console.log(" 🧌  currentPage", currentPage);
  console.log(" 🧌  currentlyLoadedPage", currentlyLoadedPage);
  // console.log(" 🧌  isFetching", isFetchingData);

  const navigateToUserDashboardTab = () => {
    window.open(`/dashboard`, "_blank", "noreferrer");
  };

  const toggleFilter = (filter: string) => {
    if (filterUsersBy === filter) {
      setFilterUsersBy("");
    } else {
      setFilterUsersBy(filter);
    }
  };

  const toggleFilterByActive = () => {
    toggleFilter("active");
  };

  const toggleFilterByInactive = () => {
    toggleFilter("inactive");
  };

  const toggleFilterByBlocked = () => {
    toggleFilter("blocked");
  };

  console.log(" 🧌  Admin dashboard");
  console.log(" 🧌  users", users);

  if (isFetchingFirstPage || isLoadingUsageStats) {
    return <Loader />;
  }

  if (errorFetchingData || isErrorLoadingUsageStats) {
    return (
      <div>
        🔥 Error loading users: {errorFetchingData || isErrorLoadingUsageStats}
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div
        onClick={() => {
          if (isOpenUserProfileMenu) setIsOpenUserProfileMenu(false);
        }}
      >
        <header
          aria-label="Admin Dashboard"
          className="xl:p6-8 relative z-50 lg:px-6 "
        >
          <div className=" mx-auto flex max-w-screen-xl flex-col-reverse justify-between px-4 py-4 sm:px-6 md:pt-8 lg:flex-row lg:items-center lg:px-4 2xl:max-w-screen-2xl">
            <div>
              <h2 className="pb-2 text-xl font-bold text-slate-700 sm:text-2xl">
                Users
              </h2>
              <div className="flex justify-start gap-2 sm:gap-4">
                <Button
                  isActive={filterUsersBy === "active"}
                  onClick={toggleFilterByActive}
                  value={usageStats?.activeUsers}
                  color="green"
                >
                  Active
                </Button>
                <Button
                  isActive={filterUsersBy === "inactive"}
                  onClick={toggleFilterByInactive}
                  value={usageStats?.inactiveUsers}
                >
                  Inactive
                </Button>
                <Button
                  isActive={filterUsersBy === "blocked"}
                  onClick={toggleFilterByBlocked}
                  value={usageStats?.blockedUsers}
                  color="red"
                >
                  Blocked
                </Button>
              </div>
            </div>
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
              <NavigationBtn onClick={navigateToUserDashboardTab}>
                {screenSize === "large"
                  ? "Open User Dashboard"
                  : "User Dashboard"}
              </NavigationBtn>

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
        <div className="mx-auto max-w-screen-xl px-4 py-0 sm:px-4 lg:px-10 2xl:max-w-screen-2xl">
          {screenSize === "large" && users && users?.length > 0 && (
            <Table
              users={usersOnPage}
              onBlockUser={(email) => {
                setUserToBlockAccess(email);
              }}
              onUnblockUser={(email) => {
                setUserToUnblockAccess(email);
              }}
              onSetTokensLimit={(email) => {
                setUserToSetTokensLimit(email);
              }}
              isLoading={isLoadingPage}
              hasPreloaded={
                users.length > currentPage * USERS_PER_PAGE ||
                users.length ===
                  (usageStats?.activeUsers || 0) +
                    (usageStats?.inactiveUsers || 0) +
                    (usageStats?.blockedUsers || 0)
              }
            />
          )}

          {!(screenSize === "large") && users && users?.length > 0 && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {usersOnPage.map((user) => (
                <UserCard
                  key={user.email}
                  user={user}
                  onBlockAccess={(email) => {
                    setUserToBlockAccess(email);
                  }}
                  onUnblockAccess={(email) => {
                    setUserToUnblockAccess(email);
                  }}
                  onSetTokensLimit={(email) => {
                    setUserToSetTokensLimit(email);
                  }}
                />
              ))}
            </div>
          )}

          {/* TODO: fix styles for no users */}
          {(!users || users?.length === 0) && (
            <div>No registered users found</div>
          )}

          <BlockUserModal
            visible={userToBlockAccess.length > 0}
            onClose={() => {
              setUserToBlockAccess("");
            }}
            onAction={async () => {
              console.log("block user", userToBlockAccess);

              try {
                const resp = await fetchPrivate(
                  `users/${userToBlockAccess}`,
                  "PATCH",
                  {
                    isBlocked: true,
                  }
                );

                // Update user in current state

                users.filter(
                  (u) => u.email === userToBlockAccess
                )[0].isBlocked = true;

                setUserToBlockAccess("");
              } catch (e) {
                console.log("error", e);
              }

              // return Promise.resolve();
            }}
            userEmail={userToBlockAccess}
          />

          <UnblockUserModal
            visible={userToUnblockAccess.length > 0}
            onClose={() => {
              setUserToUnblockAccess("");
            }}
            onAction={async () => {
              console.log("block user", userToUnblockAccess);

              try {
                const resp = await fetchPrivate(
                  `users/${userToUnblockAccess}`,
                  "PATCH",
                  {
                    isBlocked: false,
                  }
                );

                // Update user in current state

                users.filter(
                  (u) => u.email === userToUnblockAccess
                )[0].isBlocked = false;

                setUserToUnblockAccess("");
              } catch (e) {
                console.log("error", e);
              }

              // return Promise.resolve();
            }}
            userEmail={userToUnblockAccess}
          />

          <LimitTokensForm
            visible={userToSetTokensLimit.length > 0}
            email={userToSetTokensLimit}
            currentPlan={
              users.find((u) => u.email === userToSetTokensLimit)
                ?.tokensLimit || 0
            }
            onClose={() => {
              setUserToSetTokensLimit("");
            }}
            onSubmit={(newLimit) => {
              console.log("new limit", newLimit);
              const user = users.find((u) => u.email === userToSetTokensLimit);
              if (user) user.tokensLimit = newLimit;
            }}
          />

          <motion.div
            className="my-2 flex flex-col items-center rounded-2xl border-[1px] border-t border-slate-200 bg-white px-5 py-5 sm:flex-row sm:justify-between lg:my-0 lg:rounded-none lg:rounded-b-lg lg:border-none"
            layout
          >
            <UsageStats usageStats={usageStats} />

            {/* TODO: fix pages when users are filtered */}
            {/* TODO: fix active- inactive-blocked counts as well when users change status */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentlyLoadedPage}
              onNextPage={() => {
                console.log("NEXT PAGE", currentPage);
                console.log("users", users.length);

                if (isLoadingPage) return;

                setCurrentPage((prev) => prev + 1);

                // Trigger load of next page (if not yet loaded)
                if (users.length === currentPage * USERS_PER_PAGE)
                  fetchNextPage();
              }}
              onPreviousPage={() => {
                console.log("PREVIOUS PAGE");
                setCurrentPage((prev) => prev - 1);
              }}
            />
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
}
