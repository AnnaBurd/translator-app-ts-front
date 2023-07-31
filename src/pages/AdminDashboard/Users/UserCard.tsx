import { User } from "../../../@types/user";
import StatusBadge from "./StatusBadge";

type UserCardProps = {
  user: User;
  onBlockAccess: (email: string) => void;
  onUnblockAccess: (email: string) => void;
  onSetTokensLimit: (email: string) => void;
};

const UserCard: React.FC<UserCardProps> = ({
  user,
  onBlockAccess,
  onSetTokensLimit,
  onUnblockAccess,
}) => {
  return (
    <div className="group/doc relative block h-full w-full rounded-2xl border-[1px] border-slate-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl md:px-4 lg:p-6">
      <div className="flex flex-wrap-reverse items-center justify-between gap-2 ">
        <div className="flex items-center text-sm">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-full w-full rounded-full"
              src={
                user.photo ||
                `https://ui-avatars.com/api/?size=64&font-size=0.4&bold=true&background=deeeff&color=718398&name=${
                  (user.firstName && user.firstName[0]) || ""
                }`
              }
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="whitespace-no-wrap font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <span className="text-xs font-normal text-[--color-primary]">
              {user.email}
            </span>
          </div>
        </div>
        <StatusBadge
          status={
            user.isBlocked
              ? "blocked"
              : user.tokensUsedMonth
              ? "active"
              : "inactive"
          }
        />
      </div>

      <div className="px-0 pt-3 text-xs">
        <p className="whitespace-no-wrap">
          Tokens Usage: {(user.tokensUsedTotal || 0).toLocaleString()}/
          {(user.tokensLimit || 0).toLocaleString()}
        </p>
        <span
          role="progressbar"
          aria-labelledby="ProgressLabel"
          aria-valuenow={
            ((user.tokensUsedTotal || 0) / (user.tokensLimit || 0)) * 100 || 0
          }
          className="mt-1 block w-full rounded-full bg-slate-200"
        >
          <span
            className="block h-2 rounded-full bg-[--color-dark]"
            style={{
              width: `${
                ((user.tokensUsedTotal || 0) / (user.tokensLimit || 0)) * 100 ||
                0
              }%`,
            }}
          ></span>
        </span>
      </div>

      <div className="pt-4">
        <span className="flex gap-2">
          <button
            onClick={() => {
              onSetTokensLimit(user.email || "");
            }}
            className="group relative flex items-center justify-center gap-1 rounded-md border border-e p-2 text-slate-700 shadow-sm hover:bg-slate-50 focus:relative "
            // title="Set Tokens Usage Limits"
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <span className="   text-xs">Set Usage Limit</span>
          </button>

          {user.isBlocked && (
            <button
              onClick={() => onUnblockAccess(user.email || "")}
              className="group relative  flex items-center justify-center gap-1 rounded-md border p-2 text-emerald-700 shadow-sm hover:bg-emerald-50 focus:relative"
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
              <span className="text-xs  ">Unblock</span>
            </button>
          )}

          {!user.isBlocked && (
            <button
              onClick={() => onBlockAccess(user.email || "")}
              className="group relative  flex items-center justify-center gap-1 rounded-md border p-2 text-rose-700 shadow-sm hover:bg-rose-50 focus:relative"
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
              <span className="text-xs  ">Block</span>
            </button>
          )}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
