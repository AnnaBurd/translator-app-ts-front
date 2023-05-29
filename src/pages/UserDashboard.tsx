import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <header aria-label="Page Header" className="">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-8 sm:px-6 lg:px-4">
          <div className="">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Welcome Back, Besique!
              {/* TODO: show "Back" only for old users */}
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              You have translated over 1230 words in 122 paragrahs this month!
              <br />
              Keep up the great work! 🚀
            </p>
          </div>
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

            <button
              type="button"
              className="group flex shrink-0 items-center rounded-lg transition"
            >
              <span className="sr-only">Menu</span>
              <img
                alt="Man"
                src="https://i.pravatar.cc/300"
                className="h-10 w-10 rounded-full object-cover"
              />

              <p className="ms-2 hidden text-left text-xs sm:block">
                <strong className="block font-medium">Besique Monroe</strong>

                <span className="text-slate-500">user@email.com</span>
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ms-4 hidden h-5 w-5 text-slate-500 transition group-hover:text-slate-700 sm:block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-4">
        <div className="flex justify-between">
          <div className="grid w-2/3 grid-cols-3 gap-y-4">
            <div className="relative mb-0 w-fit [grid-column:1/-1]">
              <label className="sr-only" htmlFor="search">
                Search
              </label>

              <input
                className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-72"
                id="search"
                type="search"
                placeholder="Search for document..."
              />

              <button
                type="button"
                className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-slate-50 p-2 text-slate-600 transition hover:text-slate-700"
              >
                {/* TODO: style that cross - pseudo="-webkit-search-cancel-button"
            should appear on place of magnifier icon */}
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="h-44 w-64 rounded-2xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 p-[3px] hover:shadow-xl ">
              <Link
                className="relative block h-full w-full rounded-xl bg-white p-2"
                to=""
              >
                <div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            <div className="h-44 w-64 rounded-2xl border-[1px] border-slate-200 shadow-md hover:shadow-xl ">
              <Link
                className="relative block h-full w-full rounded-xl bg-white p-6"
                to="/editor/doc1"
              >
                <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
                  Ru-Vn
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-700">
                  Document 1 :)
                </h3>
                <p className="mt-2 text-sm  leading-5 text-slate-600 sm:block">
                  Here is the first lines from the document text ...
                </p>
                <p className="mt-2 text-sm  leading-5 text-slate-600 sm:block">
                  Tieng viet la gi ...
                </p>
              </Link>
            </div>
            <div className="h-44 w-64 rounded-2xl border-[1px] border-slate-200 shadow-md hover:shadow-xl ">
              <Link
                className="relative block h-full w-full rounded-xl bg-white p-6"
                to="/editor/my-doc"
              >
                <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
                  En-Vn
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-700">
                  My Doc
                </h3>
                <p className="mt-2 text-sm  leading-5 text-slate-600 sm:block">
                  Here is the first lines from the document text ...
                </p>
                <p className="mt-2 text-sm  leading-5 text-slate-600 sm:block">
                  Tieng viet la gi ...
                </p>
              </Link>
            </div>
            <div className="h-44 w-64 rounded-2xl border-[1px] border-slate-200 shadow-md hover:shadow-xl ">
              <Link
                className="relative block h-full w-full rounded-xl bg-white p-6"
                to="/editor/doc-2"
              >
                <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
                  Ru-Vn
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-700">
                  Document 2 :)
                </h3>
                <p className="mt-2 text-sm  leading-5 text-slate-600 sm:block">
                  Here is the first lines from the document text ...
                </p>
                <p className="mt-2 text-sm  leading-5 text-slate-600 sm:block">
                  Tieng viet la gi ...
                </p>
              </Link>
            </div>
          </div>
          <aside className="flex-auto bg-slate-500">
            TODO: charts and statistics
          </aside>
        </div>
      </div>
    </>
  );
}
