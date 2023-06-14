import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";

import Welcome from "./Welcome";
import UserProfile from "./UserProfile";
import Documents from "./Documents/Documents";
import Charts from "./Charts";

export default function Dashboard() {
  const { user, refresh } = useContext(AuthContext);

  console.log("Opening Dashboard for signed in user: ", user);

  return (
    <>
      <button
        onClick={() => {
          refresh();
        }}
      >
        REFRESH ACCESS
      </button>
      <header aria-label="Page Header" className="">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-8 sm:px-6 lg:px-4">
          <Welcome></Welcome>
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-4"></div>
            <button
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

            <UserProfile></UserProfile>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-4">
        <div className="flex justify-between">
          <Documents></Documents>
          <Charts></Charts>
        </div>
      </div>
    </>
  );
}
