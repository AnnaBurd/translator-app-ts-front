import { User } from "../../@types/user";
import TokensUsageBtn from "./Controls/TokensUsageBtn";
import UserAccessBtn from "./Controls/UserAccessBtn";
import StatusBadge from "./StatusBadge";

type UserRowProps = {
  user: User;
};

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  return (
    <tr key={user.email}>
      <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
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
      </td>
      <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">{user.role}</p>
      </td>
      <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">
          {/* Sep 28, 2022{user.registrationDate} */}
          {new Date(user.registrationDate || "").toLocaleDateString("en-US", {
            dateStyle: "medium",
          })}
        </p>
      </td>
      <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">
          {(user.tokensUsedMonth || 0).toLocaleString()}/
          {(user.tokensLimit || 0).toLocaleString()}
        </p>
        <span
          role="progressbar"
          aria-labelledby="ProgressLabel"
          // aria-valuenow="75"
          className="mt-1 block w-3/4 rounded-full bg-slate-200"
        >
          <span
            className="block h-2 rounded-full bg-[--color-dark]"
            style={{
              width: `${
                ((user.tokensUsedMonth || 0) / (user.tokensLimit || 0)) * 100 ||
                0
              }%`,
            }}
          ></span>
        </span>
      </td>
      <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">
          {user.tokensUsedTotal?.toLocaleString()}
        </p>
      </td>
      <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
        <StatusBadge
          status={
            user.isBlocked
              ? "blocked"
              : user.tokensUsedMonth
              ? "active"
              : "inactive"
          }
        />
      </td>
      <td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
        <span className="inline-flex rounded-md border bg-white shadow-sm ">
          <TokensUsageBtn />

          <UserAccessBtn isBlocked={user.isBlocked || false} />
        </span>
      </td>
    </tr>
  );
};

export default UserRow;

{
  /* <tr>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <div className="flex items-center">
    <div className="h-10 w-10 flex-shrink-0">
      <img
        className="h-full w-full rounded-full"
        src="https://i.pravatar.cc/300"
        alt=""
      />
    </div>
    <div className="ml-3">
      <p className="whitespace-no-wrap font-semibold">
        Besique Monroe
      </p>
      <span className="text-xs font-normal text-[--color-primary]">
        user@email.com
      </span>
    </div>
  </div>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">Admin</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">Sep 28, 2022</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">2/100</p>
  <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    // aria-valuenow="75"
    className="mt-1 block w-3/4 rounded-full bg-slate-200"
  >
    <span
      className="block h-2 rounded-full bg-[--color-dark]"
      style={{ width: "2%" }}
    ></span>
  </span>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">1000</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="-ms-1 me-1.5 h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <p className="whitespace-nowrap text-sm">Active</p>
  </span>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <span className="inline-flex rounded-md border bg-white shadow-sm ">
    <button
      className="group relative inline-block border-e p-3 text-slate-700 hover:bg-slate-50 focus:relative"
      //   title="Set Tokens Usage Limits"
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
      <span className="absolute left-5 top-11 w-max scale-0 rounded-lg bg-slate-600 p-2  text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
        Set Tokens Usage Limits 📈
      </span>
    </button>

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
  </span>
</td>
</tr>
<tr>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <div className="flex items-center">
    <div className="h-10 w-10 flex-shrink-0">
      <img
        className="h-full w-full rounded-full"
        src="https://i.pravatar.cc/300"
        alt=""
      />
    </div>
    <div className="ml-3">
      <p className="whitespace-no-wrap font-semibold">
        Besique Monroe
      </p>
      <span className="text-xs font-normal text-[--color-primary]">
        user@email.com
      </span>
    </div>
  </div>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">Admin</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">Sep 28, 2022</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">99/100</p>
  <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    // aria-valuenow="75"
    className="mt-1 block w-3/4 rounded-full bg-slate-200"
  >
    <span
      className="block h-2 rounded-full bg-[--color-dark]"
      style={{ width: "99%" }}
    ></span>
  </span>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">1000</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="-ms-1 me-1.5 h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15L15 9M9 9l6.5 6.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <p className="whitespace-nowrap text-sm">Inactive</p>
  </span>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <span className="inline-flex rounded-md border bg-white shadow-sm ">
    <button
      className="group relative inline-block border-e p-3 text-slate-700 hover:bg-slate-50 focus:relative"
      //   title="Set Tokens Usage Limits"
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
      <span className="absolute left-5 top-11 w-max scale-0 rounded-lg bg-slate-600 p-2  text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
        Set Tokens Usage Limits 📈
      </span>
    </button>

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
  </span>
</td>
</tr>
<tr>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <div className="flex items-center">
    <div className="h-10 w-10 flex-shrink-0">
      <img
        className="h-full w-full rounded-full"
        src="https://i.pravatar.cc/300"
        alt=""
      />
    </div>
    <div className="ml-3">
      <p className="whitespace-no-wrap font-semibold">
        Besique Monroe
      </p>
      <span className="text-xs font-normal text-[--color-primary]">
        user@email.com
      </span>
    </div>
  </div>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">Admin</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">Sep 28, 2022</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">99/300</p>
  <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    // aria-valuenow="75"
    className="mt-1 block w-3/4 rounded-full bg-slate-200"
  >
    <span
      className="block h-2 rounded-full bg-[--color-dark]"
      style={{ width: "30%" }}
    ></span>
  </span>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">1000</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="-ms-1 me-1.5 h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>

    <p className="whitespace-nowrap text-sm">Blocked</p>
  </span>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <span className="inline-flex rounded-md border bg-white shadow-sm ">
    <button
      className="group relative inline-block border-e p-3 text-slate-700 hover:bg-slate-50 focus:relative"
      //   title="Set Tokens Usage Limits"
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
      <span className="absolute left-5 top-11 w-max scale-0 rounded-lg bg-slate-600 p-2  text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
        Set Tokens Usage Limits 📈
      </span>
    </button>

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
      <span className="absolute left-5  top-11 w-max scale-0 rounded-lg bg-slate-600 p-2 text-xs  text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
        Unblock user ✅
      </span>
    </button>
  </span>
</td>
</tr>
<tr>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <div className="flex items-center">
    <div className="h-10 w-10 flex-shrink-0">
      <img
        className="h-full w-full rounded-full"
        src="https://i.pravatar.cc/300"
        alt=""
      />
    </div>
    <div className="ml-3">
      <p className="whitespace-no-wrap font-semibold">
        Besique Monroe
      </p>
      <span className="text-xs font-normal text-[--color-primary]">
        user@email.com
      </span>
    </div>
  </div>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">Admin</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">Sep 28, 2022</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">99/300</p>
  <span
    role="progressbar"
    aria-labelledby="ProgressLabel"
    // aria-valuenow="75"
    className="mt-1 block w-3/4 rounded-full bg-slate-200"
  >
    <span
      className="block h-2 rounded-full bg-[--color-dark]"
      style={{ width: "30%" }}
    ></span>
  </span>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <p className="whitespace-no-wrap">1000</p>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="-ms-1 me-1.5 h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>

    <p className="whitespace-nowrap text-sm">Blocked</p>
  </span>
</td>
<td className="border-b border-slate-200 bg-white px-5 py-5 text-sm">
  <span className="inline-flex rounded-md border bg-white shadow-sm ">
    <button
      className="group relative inline-block border-e p-3 text-slate-700 hover:bg-slate-50 focus:relative"
      //   title="Set Tokens Usage Limits"
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
      <span className="absolute left-5 top-11 w-max scale-0 rounded-lg bg-slate-600 p-2  text-xs text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
        Set Tokens Usage Limits 📈
      </span>
    </button>

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
      <span className="absolute left-5  top-11 w-max scale-0 rounded-lg bg-slate-600 p-2 text-xs  text-white transition-all delay-75 group-hover:scale-100 group-hover:delay-500">
        Unblock user ✅
      </span>
    </button>
  </span>
</td>
</tr> */
}
