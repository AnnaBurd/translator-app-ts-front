import { motion } from "framer-motion";
import { User } from "../../../@types/user";
import TokensUsageBtn from "../Controls/TokensUsageBtn";
import UserAccessBtn from "../Controls/UserAccessBtn";
import StatusBadge from "./StatusBadge";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
  initial: {
    y: -50,
    opacity: 0,
    transition: { y: { stiffness: 1000 } },
  },
  preloaded: {
    scale: 1,
    y: 0,
    transition: { y: { duration: 0 }, opacity: { duration: 0 } },
    opacity: 1,
  },
};

type UserRowProps = {
  user: User;
  onBlockAccess: (email: string) => void;
  onUnblockAccess: (email: string) => void;
  onSetTokensLimit: (email: string) => void;
};

const UserRow: React.FC<UserRowProps> = ({
  user,
  onBlockAccess,
  onUnblockAccess,
  onSetTokensLimit,
}) => {
  return (
    <motion.tr key={user.email} variants={variants}>
      <td className=" overflow-hidden border-b border-slate-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-full w-full rounded-full"
              src={
                user.photoUrl ||
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
      <td className=" overflow-hidden border-b border-slate-200 bg-white px-5 py-5 text-center text-sm">
        <p className="whitespace-no-wrap">{user.role}</p>
      </td>
      <td className=" overflow-hidden border-b border-slate-200 bg-white px-5 py-5 text-right text-sm">
        <p className="whitespace-no-wrap">
          {new Date(user.registrationDate || "").toLocaleDateString("en-US", {
            dateStyle: "medium",
          })}
        </p>
      </td>
      <td className=" overflow-hidden border-b border-slate-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-right">
          {user.tokensUsedMonth && user.tokensUsedMonth > 0
            ? user.tokensUsedMonth?.toLocaleString()
            : "-"}
        </p>
      </td>
      <td className=" overflow-hidden border-b border-slate-200 bg-white px-5 py-5 text-right text-sm">
        <p className="whitespace-no-wrap text-xs">
          <span
            className={`font-semibold ${
              user.tokensUsedTotal && user.tokensUsedTotal > 0
                ? "text-indigo-800 opacity-70"
                : ""
            }`}
          >
            {(user.tokensUsedTotal || 0).toLocaleString()}
          </span>{" "}
          / {(user.tokensLimit || 0).toLocaleString()}
        </p>
        <div className="flex justify-end">
          <span
            role="progressbar"
            aria-labelledby="ProgressLabel"
            aria-valuenow={
              ((user.tokensUsedTotal || 0) / (user.tokensLimit || 0)) * 100 || 0
            }
            className="mt-1 block w-4/5 rounded-full bg-slate-200"
          >
            <span
              className="block h-2 rounded-full bg-[--color-dark]"
              style={{
                width: `${
                  ((user.tokensUsedTotal || 0) / (user.tokensLimit || 0)) *
                    100 || 0
                }%`,
              }}
            ></span>
          </span>
        </div>
      </td>

      <td className=" overflow-hidden border-b border-slate-200 bg-white px-5 py-5 text-left text-sm">
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
      <td className=" border-b border-slate-200 bg-white px-5 py-5 text-center text-sm">
        <span className="inline-flex rounded-md border bg-white shadow-sm ">
          <TokensUsageBtn
            onAction={() => {
              onSetTokensLimit(user.email || "");
            }}
          />

          <UserAccessBtn
            isBlocked={user.isBlocked || false}
            onAction={() => {
              onBlockAccess(user.email || "");
            }}
            onReverseAction={() => {
              onUnblockAccess(user.email || "");
            }}
          />
        </span>
      </td>
    </motion.tr>
  );
};

export default UserRow;
