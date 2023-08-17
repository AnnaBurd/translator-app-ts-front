import { AnimatePresence, Variants, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../../../../auth/AuthContext";
import NavigationItem from "./NavigationItem";
import SignoutForm from "./SignoutForm";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  parentContainerRef: React.RefObject<HTMLDivElement>;
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

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, parentContainerRef }) => {
  // Currently signed in user (depending on user, different menu options are availiable)
  const { user: signedInUser } = useContext(AuthContext);
  const isAdmin = signedInUser && signedInUser?.role === "Admin";

  // Get current path (to highlight active menu item)
  const location = useLocation();
  const currentPath = location.pathname;

  {
    /* Note: Position fixed does not work.
        Reason: Framer motion sets transform:0 on the parent element, and fixed position thus is relative to the parent, not to the view window
        
        Solution: Use absolute position and manually position the overlay

        Other options: 
        
        Apply event listener to ansector div - more effective, but mixes component and parents logic

        Portal both overlay and menu to the modals div and manually calculate position of the menu - breaks animations on the pages navigation
 
        */
  }

  // Window size and parent container size
  const [parentContainerRect, setParentContainerRect] =
    useState<DOMRect | null>(null);
  const [isWaitingForAnimation, setIsWaitingForAnimation] = useState(true);

  // Wait until parent takes its position on the page
  useEffect(() => {
    setTimeout(() => setIsWaitingForAnimation(false), 2000);
  }, []);

  // Get parent container bounding rect (size and position)
  useEffect(() => {
    if (isWaitingForAnimation || parentContainerRect) return;

    const parentContainer = parentContainerRef.current;
    const rect = parentContainer?.getBoundingClientRect() || null;
    if (!rect) return;
    setParentContainerRect(rect);
  }, [parentContainerRect, parentContainerRef, isWaitingForAnimation]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            aria-roledescription="overlay"
            className="absolute z-30 h-[99.5vh] w-[99.5vw]  "
            onClick={onClose}
            style={{
              left: parentContainerRect ? -parentContainerRect.x + 1 : 0,
              top: parentContainerRect ? -parentContainerRect.y + 1 : 0,
            }}
          ></div>
          <motion.div
            key="user-profile-menu"
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
        </>
      )}
    </AnimatePresence>
  );
};

export default Menu;
