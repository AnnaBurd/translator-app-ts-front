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
  test: { transition: { staggerChildren: 0.05, staggerDirection: 1 } },
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
    <table className="relative z-[100] w-full border-separate border-spacing-0">
      <colgroup>
        <col style={{ width: "30%" }}></col>
        <col style={{ width: "8%" }}></col>
        <col style={{ width: "10%" }}></col>
        <col style={{ width: "14%" }}></col>
        <col style={{ width: "10%" }}></col>
        <col style={{ width: "10%" }}></col>
        <col style={{}}></col>
      </colgroup>
      <thead className="relative z-[100] border-separate border-spacing-0 overflow-hidden rounded-lg">
        <tr className="text-md bg-[--color-primary] text-left text-xs tracking-widest text-white">
          {[
            "User",
            "Role",
            "Registration date",
            "Monthly Tokens Usage",
            "Total Tokens Usage",
            "Status",
            "Administer",
          ].map((title) => (
            <th
              key={title}
              className="px-5 py-3 font-semibold first:rounded-ss-lg last:rounded-se-lg"
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <AnimatePresence mode="popLayout">
        <motion.tbody
          className={`z-[0] bg-white text-[--color-dark]`}
          variants={variants}
          initial="initial"
          animate={hasPreloaded ? "test" : isLoading ? "closed" : "open"}
          // animate={"closed"}
          // custom={}
          // layout
          // transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}
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
