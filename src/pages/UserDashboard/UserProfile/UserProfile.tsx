import { useContext, useState } from "react";
import AuthContext from "../../../auth/AuthContext";
import Menu from "./Menu/Menu";
import ProfilePreview from "./ProfilePreview";
import DropdownBtn from "./DropdownBtn";
import { createPortal } from "react-dom";

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

  if (!user) return null;

  return (
    <>
      <div className="relative z-[60] flex flex-col items-center justify-center">
        <button
          onClick={handleToggleMenu}
          type="button"
          className="group flex shrink-0 items-center rounded-lg transition"
        >
          <span className="sr-only">Menu</span>

          <ProfilePreview user={user} />

          <DropdownBtn isOpen={isOpenUserProfileMenu} />
        </button>
        <Menu isOpen={isOpenUserProfileMenu} />
        {isOpenUserProfileMenu &&
          createPortal(
            <div
              aria-roledescription="overlay"
              className="fixed left-0 top-0 z-30 h-screen w-screen  opacity-50"
              onClick={closeUserProfileMenu}
            ></div>,
            document.getElementById("overlays") as HTMLElement
          )}
      </div>
    </>
  );
};

export default UserProfile;
