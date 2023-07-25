import { User } from "../../../@types/user";
import ProfilePhoto from "./ProfilePhoto";

type ProfilePreviewProps = {
  user: User;
};

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ user }) => {
  return (
    <>
      <ProfilePhoto photoUrl={user.photo} name={user?.firstName} />
      <p className="mr-2 ms-2 hidden text-left text-xs sm:block">
        <strong className="block font-medium">
          {user.firstName} {user.lastName}
        </strong>

        <span className="text-slate-500">{user.email}</span>
      </p>
    </>
  );
};

export default ProfilePreview;
