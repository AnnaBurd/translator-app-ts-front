import { FormEvent, useContext } from "react";
import AuthContext from "../../../auth/AuthContext";
import Menu from "./Menu";
import { motion } from "framer-motion";
import useSignout from "../../../auth/useSignout";

type UserProfileProps = {
  isOpenMenu: boolean;
  toggleOpenMenu: () => void;
};

const UserProfile: React.FC<UserProfileProps> = ({
  isOpenMenu,
  toggleOpenMenu,
}) => {
  const { user } = useContext(AuthContext);

  // console.log(user, user.firstName + "+" + user.lastName);

  const signout = useSignout();

  // const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    toggleOpenMenu();
  };

  const handleSignout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSignout", event);

    await signout();
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <button
        onClick={handleToggleMenu}
        type="button"
        className="group flex shrink-0 items-center rounded-lg transition"
      >
        <span className="sr-only">Menu</span>
        <img
          alt="User profile picture"
          src={
            user.photo ||
            `https://ui-avatars.com/api/?size=64&font-size=0.4&bold=true&background=deeeff&color=718398&name=${user.firstName[0]}`
          }
          className="h-10 w-10 rounded-full object-cover"
        />

        <p className="ms-2 hidden text-left text-xs sm:block">
          <strong className="block font-medium">
            {user.firstName} {user.lastName}
          </strong>

          <span className="text-slate-500">{user.email}</span>
        </p>

        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="ms-4 hidden h-5 w-5 text-slate-500 transition group-hover:text-slate-700 sm:block"
          viewBox="0 0 20 20"
          fill="currentColor"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpenMenu ? 180 : 0 }}
          transition={{ duration: 0.1, ease: "backInOut" }}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </motion.svg>
      </button>
      <Menu isOpen={isOpenMenu} onSignout={handleSignout} />
    </div>
  );
};

export default UserProfile;
