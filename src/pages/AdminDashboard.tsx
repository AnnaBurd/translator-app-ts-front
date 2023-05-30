import { useContext } from "react";
import { AppAuthContext } from "../context/AuthProvider";

export default function Dashboard() {
  const { user } = useContext(AppAuthContext);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-4">
      <h2 className="pb-4 text-2xl font-bold text-slate-700">Users</h2>
      <div className="pb-4">
        <a
          className="group mr-4 inline-block rounded border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-500 focus:outline-none focus:ring active:bg-emerald-50"
          href="#"
        >
          <span className="mr-1.5 rounded-sm bg-slate-300 px-[.15rem] py-[.1rem] text-[.6rem] group-hover:bg-emerald-300 group-hover:text-white">
            10
          </span>
          Active
        </a>
        <a
          className="group mr-4  inline-block rounded border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-500 focus:outline-none focus:ring active:bg-slate-50"
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
      <table className="w-full border-separate border-spacing-0">
        <thead className="border-separate border-spacing-0 overflow-hidden rounded-lg">
          <tr className="text-md bg-[--color-primary] text-left text-xs tracking-widest text-white">
            {[
              "User",
              "Role",
              "Registration date",
              "Tokens\u00A0Usage Monthly",
              "Tokens\u00A0Usage Total",
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
          <tr>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://i.pravatar.cc/300"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap font-semibold">
                    Besique Monroe
                  </p>
                  <span className="text-xs font-normal text-[--color-primary]">
                    user@email.com
                  </span>
                </div>
              </div>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Admin</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">2/100</p>
              <span
                role="progressbar"
                aria-labelledby="ProgressLabel"
                // aria-valuenow="75"
                className="mt-1 block w-3/4 rounded-full bg-slate-200"
              >
                <span
                  className="block h-2 rounded-full bg-[--color-dark]"
                  style={{ width: "2%" }}
                ></span>
              </span>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">1000</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="whitespace-nowrap text-sm">Active</p>
              </span>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <span className="inline-flex rounded-md border bg-white shadow-sm ">
                <button
                  className="group relative inline-block border-e p-3 text-slate-700 hover:bg-slate-50 focus:relative"
                  //   title="Set Tokens Usage Limits"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <span className="absolute left-5 top-11 w-max scale-0 rounded-lg bg-slate-600 p-2  text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
                    Set Tokens Usage Limits 📈
                  </span>
                </button>

                <button
                  className="group relative inline-block p-3 text-red-700 hover:bg-red-50 focus:relative"
                  //   title="Block User"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <span className="absolute left-5  top-11 w-max scale-0 rounded-lg bg-slate-600 p-2 text-xs  text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
                    Block user ❌
                  </span>
                </button>
              </span>
            </td>
          </tr>
          <tr>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://i.pravatar.cc/300"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap font-semibold">
                    Besique Monroe
                  </p>
                  <span className="text-xs font-normal text-[--color-primary]">
                    user@email.com
                  </span>
                </div>
              </div>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Admin</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">99/100</p>
              <span
                role="progressbar"
                aria-labelledby="ProgressLabel"
                // aria-valuenow="75"
                className="mt-1 block w-3/4 rounded-full bg-slate-200"
              >
                <span
                  className="block h-2 rounded-full bg-[--color-dark]"
                  style={{ width: "99%" }}
                ></span>
              </span>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">1000</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L15 9M9 9l6.5 6.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="whitespace-nowrap text-sm">Inactive</p>
              </span>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <span className="inline-flex rounded-md border bg-white shadow-sm ">
                <button
                  className="group relative inline-block border-e p-3 text-slate-700 hover:bg-slate-50 focus:relative"
                  //   title="Set Tokens Usage Limits"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <span className="absolute left-5 top-11 w-max scale-0 rounded-lg bg-slate-600 p-2  text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
                    Set Tokens Usage Limits 📈
                  </span>
                </button>

                <button
                  className="group relative inline-block p-3 text-red-700 hover:bg-red-50 focus:relative"
                  //   title="Block User"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <span className="absolute left-5  top-11 w-max scale-0 rounded-lg bg-slate-600 p-2 text-xs  text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
                    Block user ❌
                  </span>
                </button>
              </span>
            </td>
          </tr>
          <tr>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://i.pravatar.cc/300"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap font-semibold">
                    Besique Monroe
                  </p>
                  <span className="text-xs font-normal text-[--color-primary]">
                    user@email.com
                  </span>
                </div>
              </div>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Admin</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">99/300</p>
              <span
                role="progressbar"
                aria-labelledby="ProgressLabel"
                // aria-valuenow="75"
                className="mt-1 block w-3/4 rounded-full bg-slate-200"
              >
                <span
                  className="block h-2 rounded-full bg-[--color-dark]"
                  style={{ width: "30%" }}
                ></span>
              </span>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">1000</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>

                <p className="whitespace-nowrap text-sm">Blocked</p>
              </span>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <span className="inline-flex rounded-md border bg-white shadow-sm ">
                <button
                  className="group relative inline-block border-e p-3 text-slate-700 hover:bg-slate-50 focus:relative"
                  //   title="Set Tokens Usage Limits"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <span className="absolute left-5 top-11 w-max scale-0 rounded-lg bg-slate-600 p-2  text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
                    Set Tokens Usage Limits 📈
                  </span>
                </button>

                <button
                  className="group relative inline-block p-3 text-emerald-700 hover:bg-emerald-50 focus:relative"
                  //   title="Unblock User"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-[.95rem] w-[.95rem]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <span className="absolute left-5  top-11 w-max scale-0 rounded-lg bg-slate-600 p-2 text-xs  text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
                    Unblock user ✅
                  </span>
                </button>
              </span>
            </td>
          </tr>
          <tr>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://i.pravatar.cc/300"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap font-semibold">
                    Besique Monroe
                  </p>
                  <span className="text-xs font-normal text-[--color-primary]">
                    user@email.com
                  </span>
                </div>
              </div>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Admin</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">Sep 28, 2022</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">99/300</p>
              <span
                role="progressbar"
                aria-labelledby="ProgressLabel"
                // aria-valuenow="75"
                className="mt-1 block w-3/4 rounded-full bg-slate-200"
              >
                <span
                  className="block h-2 rounded-full bg-[--color-dark]"
                  style={{ width: "30%" }}
                ></span>
              </span>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">1000</p>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>

                <p className="whitespace-nowrap text-sm">Blocked</p>
              </span>
            </td>
            <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
              <span className="inline-flex rounded-md border bg-white shadow-sm ">
                <button
                  className="group relative inline-block border-e p-3 text-slate-700 hover:bg-slate-50 focus:relative"
                  //   title="Set Tokens Usage Limits"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <span className="absolute left-5 top-11 w-max scale-0 rounded-lg bg-slate-600 p-2  text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
                    Set Tokens Usage Limits 📈
                  </span>
                </button>

                <button
                  className="group relative inline-block p-3 text-emerald-700 hover:bg-emerald-50 focus:relative"
                  //   title="Unblock User"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-[.95rem] w-[.95rem]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <span className="absolute left-5  top-11 w-max scale-0 rounded-lg bg-slate-600 p-2 text-xs  text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
                    Unblock user ✅
                  </span>
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
        <span className="text-xs text-slate-600 sm:text-sm">
          Statistics on total users/tokens .. TODO:
        </span>
        <div className="inline-flex items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-100 bg-white text-slate-900 rtl:rotate-180 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <p className="text-xs text-slate-900 dark:text-white">
            3<span className="mx-0.25">/</span>
            12
          </p>

          <a
            href="#"
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-slate-100 bg-white text-slate-900 rtl:rotate-180 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
