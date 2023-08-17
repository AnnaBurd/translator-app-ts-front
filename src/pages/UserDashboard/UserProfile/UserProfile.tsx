import { useContext, useRef, useState } from "react";
import AuthContext from "../../../auth/AuthContext";
import Menu from "./Menu/Menu";
import ProfilePreview from "./ProfilePreview";
import DropdownBtn from "./DropdownBtn";

type UserProfileProps = Record<string, never>;

const UserProfile: React.FC<UserProfileProps> = () => {
  const { user } = useContext(AuthContext);

  const [isOpenUserProfileMenu, setIsOpenUserProfileMenu] = useState(false);
  const toggleUserProfileMenu = () => {
    setIsOpenUserProfileMenu((prevState) => !prevState);
  };
  const closeUserProfileMenu = () => {
    setIsOpenUserProfileMenu(false);
  };

  const handleToggleMenu = () => {
    toggleUserProfileMenu();
  };

  const parentContainerRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  return (
    <>
      <div
        className="relative flex flex-col items-center justify-center"
        ref={parentContainerRef}
      >
        <button
          onClick={handleToggleMenu}
          type="button"
          className="group flex shrink-0 items-center rounded-lg transition"
        >
          <span className="sr-only">Menu</span>

          <ProfilePreview user={user} />

          <DropdownBtn isOpen={isOpenUserProfileMenu} />
        </button>

        <Menu
          isOpen={isOpenUserProfileMenu}
          onClose={closeUserProfileMenu}
          parentContainerRef={parentContainerRef}
        />
      </div>
    </>
  );
};

export default UserProfile;
