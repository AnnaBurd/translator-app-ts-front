import { useContext } from "react";
import { AppAuthContext } from "../../auth/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AppAuthContext);

  return (
    <button
      type="button"
      className="group flex shrink-0 items-center rounded-lg transition"
    >
      <span className="sr-only">Menu</span>
      <img
        alt="Man"
        src="https://i.pravatar.cc/300"
        className="h-10 w-10 rounded-full object-cover"
      />

      <p className="ms-2 hidden text-left text-xs sm:block">
        <strong className="block font-medium">
          {user.firstName} {user.lastName}
        </strong>

        <span className="text-slate-500">{user.email}</span>
      </p>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ms-4 hidden h-5 w-5 text-slate-500 transition group-hover:text-slate-700 sm:block"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default UserProfile;
