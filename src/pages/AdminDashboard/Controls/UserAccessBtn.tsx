type UserAccessBtnProps = {
  isBlocked: boolean;
};

const UserAccessBtn: React.FC<UserAccessBtnProps> = ({ isBlocked }) => {
  return (
    <>
      {isBlocked && (
        <button
          className="group relative inline-block p-3 text-emerald-700 hover:bg-emerald-50 focus:relative"
          //   title="Unblock User"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-[.95rem] w-[.95rem]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span className="absolute left-5  top-11 z-[150] w-fit scale-0 rounded-lg bg-slate-600 p-2  text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
            Unblock&nbsp;user&nbsp;✅
          </span>
        </button>
      )}

      {!isBlocked && (
        <button
          className="group relative inline-block p-3 text-red-700 hover:bg-red-50 focus:relative"
          //   title="Block User"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <span className="absolute left-5  top-11 w-max scale-0 rounded-lg bg-slate-600 p-2 text-xs  text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
            Block user ❌
          </span>
        </button>
      )}
    </>
  );
};

export default UserAccessBtn;
