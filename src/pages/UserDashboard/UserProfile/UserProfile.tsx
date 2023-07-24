import { useContext } from "react";
import AuthContext from "../../../auth/AuthContext";
import Menu from "./Menu/Menu";
import ProfilePreview from "./ProfilePreview";
import DropdownBtn from "./DropdownBtn";

type UserProfileProps = {
  isOpenMenu: boolean;
  toggleOpenMenu: () => void;
};

const UserProfile: React.FC<UserProfileProps> = ({
  isOpenMenu,
  toggleOpenMenu,
}) => {
  const { user } = useContext(AuthContext);

  const handleToggleMenu = () => {
    toggleOpenMenu();
  };

  if (!user) return null;

  return (
    <div className="relative z-50 flex flex-col items-center justify-center">
      <button
        onClick={handleToggleMenu}
        type="button"
        className="group flex shrink-0 items-center rounded-lg transition"
      >
        <span className="sr-only">Menu</span>

        <ProfilePreview user={user} />

        <DropdownBtn isOpen={isOpenMenu} />
      </button>
      <Menu isOpen={isOpenMenu} />
    </div>
  );
};

export default UserProfile;
