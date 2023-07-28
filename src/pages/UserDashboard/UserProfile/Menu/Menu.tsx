import { AnimatePresence, Variants, motion } from "framer-motion";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../../../../auth/AuthContext";
import NavigationItem from "./NavigationItem";
import SignoutForm from "./SignoutForm";

type MenuProps = {
  isOpen: boolean;
};

// Framer Motion animation variants for dropdown menu opening and closing
const menuVariants = {
  closed: {
    scale: 0.3,
    opacity: 0,
    translateY: "-40%",
    translateX: "20%",
    transition: { duration: 0.15, ease: "easeIn", delay: 0.05 },
  },
  open: {
    scale: 1,
    opacity: 1,
    translateY: 0,
    translateX: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
} satisfies Variants;

const Menu: React.FC<MenuProps> = ({ isOpen }) => {
  // Currently signed in user (depending on user, different menu options are availiable)
  const { user: signedInUser } = useContext(AuthContext);
  const isAdmin = signedInUser && signedInUser?.role === "Admin";

  // Get current path (to highlight active menu item)
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute end-0 top-12 z-[60] mt-2 w-44 min-w-fit divide-y divide-slate-100 rounded-md border border-slate-100 bg-white shadow-lg dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          exit="closed"
          variants={menuVariants}
        >
          <div className="p-2">
            <NavigationItem path="/profile" activePath={currentPath}>
              Profile
            </NavigationItem>

            <NavigationItem path="/dashboard" activePath={currentPath}>
              Dashboard
            </NavigationItem>

            {isAdmin && (
              <NavigationItem path="/users" activePath={currentPath}>
                Admin Dashboard
              </NavigationItem>
            )}
          </div>

          <div className="p-2">
            <SignoutForm />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
