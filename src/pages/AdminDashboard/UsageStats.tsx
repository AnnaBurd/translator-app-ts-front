import { TotalUsageStats } from "../../@types/user";

type UsageStatsProps = {
  usageStats: TotalUsageStats | null;
};

const UsageStats: React.FC<UsageStatsProps> = ({ usageStats }) => {
  const hasActiveUsers = usageStats && usageStats?.activeUsers > 0;

  return (
    <span className="text-xs text-slate-600 sm:text-sm">
      {hasActiveUsers
        ? `Total ${usageStats?.activeUsers} active user${
            usageStats?.activeUsers > 1 ? "s" : ""
          }, over ${usageStats?.tokensUsedMonth.toLocaleString()} monthly tokens
          usage.`
        : "No active users this month."}
    </span>
  );
};

export default UsageStats;
