// import Logo from "../../../../public/icon.svg";

import { AnimatePresence, delay, motion, stagger } from "framer-motion";
import { useState } from "react";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed z-[100] flex h-14 w-16  flex-col justify-between">
        <div className="inline-flex h-14 w-16 items-center justify-center">
          <span
            className={`grid  cursor-pointer place-content-center rounded-lg  text-xs text-slate-600 shadow-2xl ${
              isOpen ? "h-9 w-10 bg-slate-100" : "h-8 w-9 bg-white"
            } duration-400 transition-all ease-in-out`}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            // animate={{ height: isOpen ? "2.25rem" : "2rem" }}
          >
            <img
              className="h-full w-full p-1.5"
              src={"/public/icon.svg"}
              alt="App Logo"
            />
          </span>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed z-[40] h-screen w-screen "
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-50 flex h-screen min-h-screen w-16  flex-col justify-between bg-white shadow-sm"
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { type: "spring", duration: 0.5 },
            }}
            exit={{ opacity: 0, x: -100 }}
          >
            <div>
              <div className="h-14 w-16"></div>
              {/* <div className="inline-flex h-14 w-16 items-center justify-center">
            <span className="grid h-10 w-10 place-content-center rounded-lg bg-slate-100 text-xs text-slate-600">
              <img
                className="h-full w-full p-1.5"
                src={"/public/icon.svg"}
                alt="App Logo"
              />
            </span>
          </div> */}

              <div className="border-t border-slate-100">
                <div className="px-2">
                  <motion.ul
                    className="space-y-1 border-t border-slate-100 pt-4"
                    transition={
                      isOpen
                        ? { staggerChildren: 0.07, delayChildren: 0.2 }
                        : { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  >
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <a
                        href=""
                        className="group relative flex justify-center rounded px-2 py-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.6}
                          stroke="currentColor"
                          className="h-6 w-6 opacity-75"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>

                        <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                          New Document
                        </span>
                      </a>
                    </motion.li>

                    <li>
                      <a
                        href=""
                        className="group relative flex justify-center rounded px-2 py-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.6}
                          stroke="currentColor"
                          className="h-6 w-6 opacity-75"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>

                        <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                          Upload Document
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href=""
                        className="group relative flex justify-center rounded px-2 py-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.6}
                          stroke="currentColor"
                          className="h-6 w-6 opacity-75"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>

                        <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                          Download Translation
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href=""
                        className="group relative flex justify-center rounded px-2 py-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.6}
                          stroke="currentColor"
                          className="h-6 w-6 opacity-75"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                          />
                        </svg>

                        <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                          Find in document
                        </span>
                      </a>
                    </li>
                  </motion.ul>
                </div>
              </div>
            </div>

            <div className="sticky inset-x-12 mb-16 border-t border-slate-100 bg-white">
              <ul className="space-y-1 border-slate-100 pt-4">
                <li>
                  <a
                    href=""
                    className="group relative flex justify-center rounded px-2 py-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.6}
                      stroke="currentColor"
                      className="h-6 w-6 opacity-75"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Account
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="t group relative flex justify-center rounded bg-indigo-50 px-2 py-1.5 text-indigo-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-slate-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Editor Settings
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideMenu;
