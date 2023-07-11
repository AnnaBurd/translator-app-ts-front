import { motion } from "framer-motion";
import { User } from "../../@types/user";
import AnimatedPage from "../../components/animations/AnimatedPage";
import UserProfile from "../UserDashboard/UserProfile/UserProfile";
import { useState, useEffect } from "react";
import useDocumentsPrivate from "../../hooks/useDocumentsPrivate";
import useDataPrivate from "../../hooks/useDataPrivate";
import UserRow from "./UserRow";
import UserCard from "./UserCard";
import Loader from "../../components/animations/Loader";
import Pagination from "./Controls/Pagination";

export default function AdminDashboard() {
  const {
    data: users,
    isFetchingData,
    errorFetchingData,
    fetchNextPage,
    totalPages,
  } = useDocumentsPrivate<User>("users");

  const [usageStats, isLoadingUsageStats, isErrorLoadingUsageStats] =
    useDataPrivate<{
      activeUsers: number;
      tokensUsedMonth: number;
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

  // TODO: pagination
  const filteredUsers = users.slice(0, 10);

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
              <a
                className="group inline-block rounded border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-500 focus:outline-none focus:ring active:bg-emerald-50"
                href="#"
              >
                <span className="mr-1.5 rounded-sm bg-slate-300 px-[.15rem] py-[.1rem] text-[.6rem] group-hover:bg-emerald-300 group-hover:text-white">
                  10
                </span>
                Active
              </a>
              <a
                className="group inline-block rounded border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-500 focus:outline-none focus:ring active:bg-slate-50"
                href="#"
              >
                <span className="mr-1.5 rounded-sm bg-slate-300 px-[.15rem] py-[.1rem] text-[.6rem] group-hover:bg-slate-400 group-hover:text-white">
                  12
                </span>
                Inactive
              </a>
              <a
                className="group mr-4 inline-block rounded border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring active:bg-red-50"
                href="#"
              >
                <span className="mr-1.5 rounded-sm bg-slate-300 px-[.15rem] py-[.1rem] text-[.6rem] group-hover:bg-red-300 group-hover:text-white">
                  10
                </span>
                Blocked
              </a>
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
                  <th className="px-5 py-3 font-semibold first:rounded-ss-lg last:rounded-se-lg">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[--color-dark]">
              {users?.map((user) => (
                <UserRow key={user.email} user={user} />
              ))}
            </tbody>
          </table>
        )}

        {!isWideScreen && users && users?.length > 0 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {users.map((user) => (
              <UserCard key={user.email} user={user} />
            ))}
          </div>
        )}
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
          <Pagination totalPages={totalPages} currentPage={0} />
        </div>
      </div>
    </AnimatedPage>
  );
}
