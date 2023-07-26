import { motion } from "framer-motion";
import { UserProfileStats } from "../../../@types/user";
import Barchart from "./Barchart";
import UsageSemidonut from "./UsageSemidonut";
import { useContext } from "react";
import AuthContext from "../../../auth/AuthContext";

type ChartsProps = {
  stats?: UserProfileStats;
};

const Charts: React.FC<ChartsProps> = ({ stats }) => {
  const { user } = useContext(AuthContext);

  return (
    <motion.aside
      className="z-0 h-fit w-full flex-auto md:ml-5 md:w-1/3 lg:w-1/4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          opacity: { duration: 1.2, ease: "backInOut", delay: 0 },
          scale: { duration: 1.2, ease: "backInOut", delay: 0 },
          x: { duration: 2, ease: "easeInOut", delay: 0.8 },
        },
      }}
      exit={{
        opacity: 0,
        x: "20vw",
        transition: { duration: 1, ease: "backOut" },
      }}
    >
      <div className="border-slate-150 relative mb-4 block h-full w-full overflow-hidden rounded-2xl border-[1px] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl md:px-4 lg:p-6">
        <h2 className="mb-2 text-base font-bold text-slate-600">Tokens</h2>
        {stats && stats.limit > 0 && <UsageSemidonut stats={stats} />}
        {!stats || stats.limit === 0 ? (
          <div className="text-xs font-normal text-slate-500">
            {user?.newUser
              ? "Administator is reviewing your account and will  open access soon."
              : "You have no tokens left, to extend usage please contact your administrator."}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="border-slate-150 relative block h-full w-full rounded-2xl border-[1px] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl md:px-4 lg:p-6">
        <h2 className="mb-2 text-base font-bold text-slate-600">Activity</h2>
        <Barchart
          tokensUsageStats={stats?.tokensUsageStats || []}
          wordsUsageStats={stats?.wordsUsageStats || []}
          documentsUsageStats={stats?.docsUsageStats || []}
          labels={
            stats?.lastSixMonths.map((month) =>
              new Date(month).toLocaleString("en-us", { month: "short" })
            ) || []
          }
        />
      </div>
    </motion.aside>
  );
};

export default Charts;
