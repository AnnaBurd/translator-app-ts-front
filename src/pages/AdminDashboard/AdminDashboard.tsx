import { motion } from "framer-motion";
import { User } from "../../@types/user";
import AnimatedPage from "../../components/animations/AnimatedPage";
import UserProfile from "../UserDashboard/UserProfile/UserProfile";
import { useState, useEffect, MouseEvent } from "react";
import useDocumentsPrivate from "../../hooks/useDocumentsPrivate";
import useDataPrivate from "../../hooks/useDataPrivate";
import UserRow from "./UserRow";
import UserCard from "./UserCard";
import Loader from "../../components/animations/Loader";
import Pagination from "./Controls/Pagination";
import BlockUserModal from "./Modals/BlockUserModal";
import useFetchPrivate from "../../hooks/useFetchPrivate";
import { set } from "react-hook-form";
import UnblockUserModal from "./Modals/UnblockUserModal";
import LimitTokensForm from "./Modals/LimitTokensForm";

export default function AdminDashboard() {
  const usersPerPage = 6;
  const {
    data: users,
    isFetchingData,
    errorFetchingData,
    fetchNextPage,
    totalPages,
  } = useDocumentsPrivate<User>("users", usersPerPage);

  const [currentPage, setCurrentPage] = useState(1);

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

  const [userToBlockAccess, setUserToBlockAccess] = useState("");
  const [userToUnblockAccess, setUserToUnblockAccess] = useState("");
  const [userToSetTokensLimit, setUserToSetTokensLimit] = useState("");

  const usersOnPage = filteredUsers.slice(
    currentPage * usersPerPage - usersPerPage,
    currentPage * usersPerPage
  );

  const [usageStats, isLoadingUsageStats, isErrorLoadingUsageStats] =
    useDataPrivate<{
      activeUsers: number;
      tokensUsedMonth: number;
      inactiveUsers: number;
      blockedUsers: number;
    }>("users/usagestatistics");

  // For wide screens show table
  // For narrow screens show cards
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");

    const onChange = () => setIsWideScreen(!!mql.matches);
    mql.addEventListener("change", onChange);
    setIsWideScreen(mql.matches);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  console.log("Usage stats", usageStats, isLoadingUsageStats);

  if (isFetchingData || isLoadingUsageStats) {
    return <Loader />;
  }

  if (errorFetchingData) {
    return <div>🔥 Error loading users: {errorFetchingData}</div>;
  }

  return (
    <AnimatedPage>
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
              <button
                className={`group inline-block rounded border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-500 focus:outline-none focus:ring active:bg-emerald-50 ${
                  filterUsersBy === "active"
                    ? "bg-emerald-50 text-emerald-500"
                    : ""
                }`}
                onClick={() => {
                  if (filterUsersBy === "active") {
                    setFilterUsersBy("");
                  } else {
                    setFilterUsersBy("active");
                  }
                }}
              >
                <span
                  className={`mr-1.5 rounded-sm bg-slate-300 px-[.25rem] py-[.1rem] text-[.6rem] group-hover:bg-emerald-300 group-hover:text-white ${
                    filterUsersBy === "active"
                      ? "bg-emerald-300 text-white"
                      : ""
                  }`}
                >
                  {usageStats?.activeUsers || 0}
                </span>
                Active
              </button>
              <button
                className={`group inline-block rounded border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-500 focus:outline-none focus:ring active:bg-slate-50 ${
                  filterUsersBy === "inactive"
                    ? "bg-slate-200 text-slate-500"
                    : ""
                }`}
                onClick={() => {
                  if (filterUsersBy === "inactive") {
                    setFilterUsersBy("");
                  } else {
                    setFilterUsersBy("inactive");
                  }
                }}
              >
                <span
                  className={`mr-1.5 rounded-sm bg-slate-300 px-[.25rem] py-[.1rem] text-[.6rem] group-hover:bg-slate-400 group-hover:text-white ${
                    filterUsersBy === "inactive"
                      ? "bg-slate-400 text-white"
                      : ""
                  }`}
                >
                  {usageStats?.inactiveUsers || 0}
                </span>
                Inactive
              </button>
              <button
                className={`group mr-4 inline-block rounded border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-500 focus:outline-none focus:ring active:bg-rose-50 ${
                  filterUsersBy === "blocked" ? "bg-rose-50 text-rose-500" : ""
                }`}
                onClick={() => {
                  if (filterUsersBy === "blocked") {
                    setFilterUsersBy("");
                  } else {
                    setFilterUsersBy("blocked");
                  }
                }}
              >
                <span
                  className={`mr-1.5 rounded-sm bg-slate-300 px-[.25rem] py-[.1rem] text-[.6rem] group-hover:bg-rose-300 group-hover:text-white ${
                    filterUsersBy === "blocked" ? "bg-rose-300 text-white" : ""
                  }`}
                >
                  {usageStats?.blockedUsers || 0}
                </span>
                Blocked
              </button>
            </div>
          </div>
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
              onClick={() => {
                console.log("open editor");
              }}
              className="mr-1 inline-flex items-center justify-center gap-1.5 rounded-lg border  border-slate-300 px-5 py-3 text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring"
              type="button"
            >
              <span className="text-xs font-medium">
                {isWideScreen ? "Open Editor" : "Editor"}
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
            {/* {isAdmin && ( */}
            <button
              onClick={() => {
                1;
              }}
              className="-ml-2 mr-1 inline-flex items-center justify-center gap-1.5 rounded-lg  border border-slate-300 px-5 py-3 text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring"
              type="button"
            >
              <span className="text-xs font-medium">
                {isWideScreen ? "Open Dashboard" : "Home"}
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
            {/* )} */}
            <span
              aria-hidden="true"
              className="block h-6 w-px rounded-full bg-slate-300"
            ></span>

            <UserProfile
              isOpenMenu={false}
              toggleOpenMenu={() => {
                console.log("toggle open menu");
              }}
            ></UserProfile>
          </motion.div>
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl px-4 py-0 sm:px-4 lg:px-10 2xl:max-w-screen-2xl">
        {isWideScreen && users && users?.length > 0 && (
          <table className="w-full border-separate border-spacing-0">
            <colgroup>
              <col style={{ width: "30%" }}></col>
              <col style={{ width: "8%" }}></col>
              <col style={{ width: "10%" }}></col>
              <col style={{ width: "14%" }}></col>
              <col style={{ width: "10%" }}></col>
              <col style={{ width: "10%" }}></col>
              <col style={{}}></col>
            </colgroup>
            <thead className="border-separate border-spacing-0 overflow-hidden rounded-lg">
              <tr className="text-md bg-[--color-primary] text-left text-xs tracking-widest text-white">
                {[
                  "User",
                  "Role",
                  "Registration date",
                  "Monthly Tokens Usage",
                  "Total Tokens Usage",
                  "Status",
                  "Administer",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-5 py-3 font-semibold first:rounded-ss-lg last:rounded-se-lg"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[--color-dark]">
              {usersOnPage?.map((user) => (
                <UserRow
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
            </tbody>
          </table>
        )}

        {!isWideScreen && users && users?.length > 0 && (
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

        {!users ||
          (users?.length === 0 && <div>No registered users found</div>)}
        {/* TODO: fix styles for no users */}
        <div className="my-2 flex flex-col items-center rounded-2xl border-[1px] border-t border-slate-200 bg-white px-5 py-5 sm:flex-row sm:justify-between lg:my-0 lg:rounded-none lg:rounded-b-lg lg:border-none">
          <span className="text-xs text-slate-600 sm:text-sm">
            {usageStats && usageStats?.activeUsers > 0
              ? `Total ${usageStats?.activeUsers} active user${
                  usageStats?.activeUsers > 1 ? "s" : ""
                }`
              : "No active users this month"}
            {usageStats && usageStats?.tokensUsedMonth > 0
              ? `, over ${usageStats?.tokensUsedMonth.toLocaleString()} monthly tokens
            usage.`
              : "."}
          </span>
          {/* TODO: fix pages when users are filtered */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onNextPage={() => {
              setCurrentPage((prev) => prev + 1);

              // Trigger load of next page (if not yet loaded)
              if (users.length === currentPage * usersPerPage) fetchNextPage();
            }}
            onPreviousPage={() => {
              console.log("PREVIOUS PAGE");
              setCurrentPage((prev) => prev - 1);
            }}
          />
        </div>
      </div>
    </AnimatedPage>
  );
}
