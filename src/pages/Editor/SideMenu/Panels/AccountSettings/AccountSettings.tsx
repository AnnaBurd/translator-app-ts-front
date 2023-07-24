import { Variants, AnimatePresence, motion } from "framer-motion";
import NavigationItem from "../../../../UserDashboard/UserProfile/Menu/NavigationItem";
import SignoutForm from "../../../../UserDashboard/UserProfile/Menu/SignoutForm";
import ProfilePhoto from "../../../../UserDashboard/UserProfile/ProfilePhoto";
import { useContext } from "react";
import authContext from "../../../../../auth/AuthContext";

type AccountSettingsPanelProps = {
  isOpen: boolean;
};

// Framer Motion animation variants for dropdown menu opening and closing
const menuVariants = {
  closed: {
    scale: 0.3,
    opacity: 0,
    translateY: "-40%",
    translateX: "-20%",
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

const AccountSettingsPanel: React.FC<AccountSettingsPanelProps> = ({
  isOpen,
}) => {
  const { user } = useContext(authContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute -bottom-14 left-16  z-50 mt-2 w-56 min-w-fit divide-y divide-slate-100 rounded-md border border-slate-100 bg-white shadow-lg dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          exit="closed"
          variants={menuVariants}
        >
          <div className="p-2">
            <NavigationItem path="/profile">
              <div className="-ml-2 flex items-center justify-start gap-1.5">
                <ProfilePhoto photoUrl={user?.photo} name={user?.firstName} />
                <p className="text-left text-xs sm:block">
                  <strong className="block font-medium">
                    {user?.firstName} {user?.lastName}
                  </strong>

                  <span className="text-slate-500">{user?.email}</span>
                </p>
              </div>
            </NavigationItem>
          </div>

          <div className="p-2">
            <SignoutForm />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountSettingsPanel;
