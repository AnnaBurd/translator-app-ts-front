type ProfilePhotoProps = {
  photoUrl?: string;
  name?: string;
};

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photoUrl, name }) => {
  const imgUrl =
    photoUrl ||
    `https://ui-avatars.com/api/?size=64&font-size=0.4&bold=true&background=deeeff&color=718398&name=${
      name ? name[0] : "A"
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
