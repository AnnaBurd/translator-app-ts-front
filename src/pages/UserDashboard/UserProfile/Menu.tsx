import { AnimatePresence, Variants, motion } from "framer-motion";
import { FormEvent, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../../auth/AuthContext";

type MenuProps = {
  isOpen: boolean;
  onSignout: (event: FormEvent<HTMLFormElement>) => void;
};

const menuVariants = {
  closed: {
    scale: 0.3,
    opacity: 0,
    // visibility: "hidden",
    translateY: "-40%",
    translateX: "20%",
    transition: { duration: 0.15, ease: "easeIn", delay: 0.05 },
  },
  open: {
    scale: 1,
    opacity: 1,
    // visibility: "visible",
    translateY: 0,
    translateX: 0,
    transition: { duration: 0.3, ease: "easeOut" },
    // transition: {
    //   type: "spring",
    //   //   duration: 0.4,
    //   //   delayChildren: 0.2,
    //   //   staggerChildren: 0.05,
    // },
  },
} satisfies Variants;

const Menu: React.FC<MenuProps> = ({ isOpen, onSignout }) => {
  const { user: signedInUser } = useContext(AuthContext);

  const location = useLocation();

  const currentPath = location.pathname;

  console.log("location", location);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute end-0 top-12 z-50 mt-2 w-44 min-w-fit divide-y divide-slate-100 rounded-md border border-slate-100 bg-white shadow-lg dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          exit="closed"
          variants={menuVariants}
        >
          <div className="p-2">
            <Link
              to="/profile"
              className={`block rounded-lg px-4 py-2 text-sm  dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${
                currentPath === "/profile"
                  ? "text-indigo-400 hover:bg-inherit hover:text-indigo-500"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 "
              }`}
              role="menuitem"
            >
              Profile
            </Link>

            <Link
              to="/dashboard"
              className={`block rounded-lg px-4 py-2 text-sm  dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${
                currentPath === "/dashboard"
                  ? "text-indigo-400 hover:bg-inherit hover:text-indigo-500"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 "
              }`}
              role="menuitem"
            >
              Dashboard
            </Link>

            {signedInUser.role === "Admin" && (
              <Link
                to="/users"
                className={`block rounded-lg px-4 py-2 text-sm  dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300 ${
                  currentPath === "/users"
                    ? "text-indigo-400 hover:bg-inherit hover:text-indigo-500"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 "
                }`}
                role="menuitem"
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          <div className="p-2">
            <form method="POST" onSubmit={onSignout}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 dark:text-rose-500 dark:hover:bg-rose-600/10"
                role="menuitem"
              >
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
                Signout
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
