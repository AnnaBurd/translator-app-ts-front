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
  test: {
    scale: 1,
    y: 0,
    transition: { y: { duration: 0 }, opacity: { duration: 0.5 } },
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
    <motion.tr
      key={user.email}
      variants={variants}
      className="relative z-[10]"
      // initial={variants.closed}
      // animate={variants.open}
      // exit={variants.closed}
      // initial={{ scale: 0.8, opacity: 0 }}
      // animate={{ scale: 1, opacity: 1 }}
      // exit={{ scale: 0.8, opacity: 0 }}
      // transition={{ type: "spring" }}
    >
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
