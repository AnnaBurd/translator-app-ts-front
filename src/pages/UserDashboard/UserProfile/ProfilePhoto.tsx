type ProfilePhotoProps = {
  photoUrl?: string;
  name?: string;
};

import Config from "../../../../config.json";

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photoUrl, name }) => {
  const isUrlFull = photoUrl?.includes("http");

  const imgUrl = photoUrl
    ? isUrlFull
      ? photoUrl
      : `${Config.STATIC_URL}/${photoUrl}`
    : `https://ui-avatars.com/api/?size=64&font-size=0.4&bold=true&background=deeeff&color=718398&name=${
        name ? name[0] : ""
      }`;

  return (
    <img
      alt="User profile picture"
      src={imgUrl}
      className="h-10 w-10 rounded-full object-cover"
    />
  );
};

export default ProfilePhoto;
