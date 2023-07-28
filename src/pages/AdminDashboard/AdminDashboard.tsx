import { motion } from "framer-motion";
import { TotalUsageStats, User, UserStatusType } from "../../@types/user";
import AnimatedPage from "../../components/animations/AnimatedPage";
import UserProfile from "../UserDashboard/UserProfile/UserProfile";
import { useState, useContext } from "react";
import useDataPrivate from "../../hooks/useDataPrivate";
import UserCard from "./Users/UserCard";
import Loader from "../../components/animations/Loader";
import Pagination from "./Pagination/Pagination";
import BlockUserModal from "./Modals/BlockUserModal";
import useFetchPrivate from "../../hooks/useFetchPrivate";
import UnblockUserModal from "./Modals/UnblockUserModal";
import LimitTokensForm from "./Modals/LimitTokensForm";
import NavigationBtn from "../UserDashboard/NavigationBtn";
import themeContext from "../../context/ThemeContext";
import Button from "./Filter/Button";
import Table from "./Users/Table";
import UsageStats from "./UsageStats";
import useUsersPages from "./Pagination/useUsersPages";

const USERS_PER_PAGE = 6;

const filterUsersByStatus = (user: User, status: UserStatusType) => {
  if (status === "") return true;

  if (status === "blocked") {
    return user.isBlocked;
  }

  if (status === "active") {
    return !user.isBlocked && user.tokensUsedMonth && user.tokensUsedMonth > 0;
  }

  if (status === "inactive") {
    return !user.isBlocked && !user.tokensUsedMonth;
  }
};

const getNumberOfUsersWithStatus = (
  status: UserStatusType,
  usageStats?: TotalUsageStats | null
) => {
  let numberOfUsers = 0;

  switch (status) {
    case "":
      numberOfUsers =
        (usageStats?.activeUsers || 0) +
        (usageStats?.inactiveUsers || 0) +
        (usageStats?.blockedUsers || 0);
      break;
    case "active":
      numberOfUsers = usageStats?.activeUsers || 0;
      break;
    case "inactive":
      numberOfUsers = usageStats?.inactiveUsers || 0;
      break;
    case "blocked":
      numberOfUsers = usageStats?.blockedUsers || 0;
      break;
  }

  return numberOfUsers;
};

export default function AdminDashboard() {
  // Get screen size information to adjust UI
  const { screenSize } = useContext(themeContext);

  // Load total users statistics
  const [usageStats, isLoadingUsageStats, isErrorLoadingUsageStats] =
    useDataPrivate<TotalUsageStats>("users/usagestatistics");

  const totalUsers =
    (usageStats?.activeUsers || 0) +
    (usageStats?.inactiveUsers || 0) +
    (usageStats?.blockedUsers || 0);

  // Load (paginated) information about application users
  const {
    loadedUsers: users,
    isFetchingFirstPage,
    errorFetchingData,
    fetchNextPage,
    handleFirstPage,
    handleNextPage,
    handlePreviousPage,
    isLoadingCurrentPage,
    hasAlreadyLoadedPage,
    currentPage,
  } = useUsersPages(totalUsers, USERS_PER_PAGE);

  const fetchPrivate = useFetchPrivate();

  // Handle users filter selection
  // Filter options: "", "active", "inactive", "blocked"
  const [filterUsersBy, setFilterUsersBy] = useState<UserStatusType>("");

  const toggleFilter = (filter: UserStatusType) => {
    if (filterUsersBy === filter) {
      setFilterUsersBy("");
    } else {
      setFilterUsersBy(filter);
    }

    // Go back to the first page
    handleFirstPage();
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

  const totalNumberOfUsersWithSelectedStatus = getNumberOfUsersWithStatus(
    filterUsersBy,
    usageStats
  );
  const totalNumberOfPagesWithSelectedUsers = Math.ceil(
    totalNumberOfUsersWithSelectedStatus / USERS_PER_PAGE
  );

  const filteredUsers = users?.filter((user) =>
    filterUsersByStatus(user, filterUsersBy)
  );

  // In case if users are filtered by status, e.g. only active/blocked users are selected, continue loading pages until all users with the selected status are loaded
  if (
    filterUsersBy &&
    filteredUsers.length < totalNumberOfUsersWithSelectedStatus
  )
    fetchNextPage();

  const usersToRenderOnPage = filteredUsers.slice(
    currentPage * USERS_PER_PAGE - USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // Store information about the selected user to block / unblock / set tokens limit
  const [userToBlockAccess, setUserToBlockAccess] = useState("");
  const [userToUnblockAccess, setUserToUnblockAccess] = useState("");
  const [userToSetTokensLimit, setUserToSetTokensLimit] = useState("");

  // Handle navigation to the user dashboard
  const navigateToUserDashboardTab = () => {
    window.open(`/dashboard`, "_blank", "noreferrer");
  };

  // Render loading circle while fetching total usage stats / first page
  if (isFetchingFirstPage || isLoadingUsageStats) {
    return <Loader />;
  }

  // Render error if could not load data
  if (errorFetchingData || isErrorLoadingUsageStats) {
    return (
      <div>
        🔥 Error loading users: {errorFetchingData || isErrorLoadingUsageStats}
      </div>
    );
  }

  return (
    <AnimatedPage>
      <header aria-label="Admin Dashboard" className="relative z-50">
        <div className=" mx-auto flex max-w-screen-xl flex-col-reverse justify-between px-4 py-4  md:pt-8 lg:flex-row lg:items-center lg:px-10 2xl:max-w-screen-2xl">
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

            <UserProfile />
          </motion.div>
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl px-4 py-0 sm:px-4 lg:px-10 2xl:max-w-screen-2xl">
        {screenSize === "large" && users && users?.length > 0 && (
          <Table
            users={usersToRenderOnPage}
            onBlockUser={(email) => {
              setUserToBlockAccess(email);
            }}
            onUnblockUser={(email) => {
              setUserToUnblockAccess(email);
            }}
            onSetTokensLimit={(email) => {
              setUserToSetTokensLimit(email);
            }}
            isLoading={isLoadingCurrentPage}
            hasPreloaded={hasAlreadyLoadedPage}
          />
        )}

        {!(screenSize === "large") && users && users?.length > 0 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {usersToRenderOnPage.map((user) => (
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

              users.filter((u) => u.email === userToBlockAccess)[0].isBlocked =
                true;

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
            users.find((u) => u.email === userToSetTokensLimit)?.tokensLimit ||
            0
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
          <UsageStats
            usageStats={usageStats}
            selectedUsersStatus={filterUsersBy}
          />

          <Pagination
            totalPages={totalNumberOfPagesWithSelectedUsers}
            currentPage={currentPage}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </motion.div>
      </div>
    </AnimatedPage>
  );
}
