import { AnimatePresence, motion } from "framer-motion";
import { User } from "../../../@types/user";
import UserRow from "./UserRow";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  preloaded: { transition: { staggerChildren: 0, staggerDirection: 1 } },
};

type TableProps = {
  users: User[];

  onBlockUser: (email: string) => void;
  onUnblockUser: (email: string) => void;
  onSetTokensLimit: (email: string) => void;

  isLoading: boolean;
  hasPreloaded: boolean;
};

const Table: React.FC<TableProps> = ({
  users,
  onBlockUser,
  onUnblockUser,
  onSetTokensLimit,
  isLoading,
  hasPreloaded,
}) => {
  return (
    <table className="relative z-[10] w-full table-fixed border-separate border-spacing-0">
      <colgroup>
        <col style={{ width: "12%" }}></col>
        <col style={{ width: "4%" }}></col>
        <col style={{ width: "6%" }}></col>
        <col style={{ width: "6%" }}></col>
        <col style={{ width: "10%" }}></col>
        <col style={{ width: "6%" }}></col>
        <col style={{ width: "6%" }}></col>
      </colgroup>
      <thead className="relative z-[20] border-separate border-spacing-0 overflow-hidden rounded-lg">
        <tr className="text-md bg-[--color-primary] text-left text-xs tracking-widest text-white">
          <th className="px-5 py-3 font-semibold first:rounded-ss-lg last:rounded-se-lg">
            User
          </th>
          <th className="px-5 py-3 text-center font-semibold first:rounded-ss-lg last:rounded-se-lg">
            Role
          </th>
          <th className="px-5 py-3 text-right font-semibold first:rounded-ss-lg last:rounded-se-lg">
            Created At
          </th>
          <th className="px-5 py-3 text-right font-semibold first:rounded-ss-lg last:rounded-se-lg">
            Monthly Tokens&nbsp;Usage
          </th>
          <th className="px-5 py-3 text-right font-semibold first:rounded-ss-lg last:rounded-se-lg">
            Total Tokens&nbsp;Usage
          </th>
          <th className="px-5 py-3 text-center font-semibold first:rounded-ss-lg last:rounded-se-lg">
            Status
          </th>
          <th className="px-5 py-3 text-center font-semibold first:rounded-ss-lg last:rounded-se-lg">
            Administer
          </th>
        </tr>
      </thead>
      <AnimatePresence mode={"popLayout"}>
        <motion.tbody
          className={`relative z-[0] bg-white text-[--color-dark]`}
          variants={variants}
          initial="initial"
          animate={isLoading ? "closed" : hasPreloaded ? "preloaded" : "open"}
        >
          {users?.map((user) => (
            <UserRow
              key={user.email}
              user={user}
              onBlockAccess={onBlockUser}
              onUnblockAccess={onUnblockUser}
              onSetTokensLimit={onSetTokensLimit}
            />
          ))}
        </motion.tbody>
      </AnimatePresence>
    </table>
  );
};

export default Table;
