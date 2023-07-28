import { TotalUsageStats, UserStatusType } from "../../@types/user";

type UsageStatsProps = {
  usageStats: TotalUsageStats | null;
  selectedUsersStatus: UserStatusType;
};

const UsageStats: React.FC<UsageStatsProps> = ({
  usageStats,
  selectedUsersStatus,
}) => {
  let message = "";
  switch (selectedUsersStatus) {
    case "active": {
      const hasActiveUsers = usageStats && usageStats?.activeUsers > 0;
      if (hasActiveUsers) {
        message = `Total ${usageStats?.activeUsers} active user${
          usageStats?.activeUsers > 1 ? "s" : ""
        }, over ${usageStats?.tokensUsedMonth.toLocaleString()} monthly tokens
      usage.`;
      } else {
        message = "No active users this month.";
      }
      break;
    }
    case "blocked": {
      const hasBlockedUsers = usageStats && usageStats?.blockedUsers > 0;
      if (hasBlockedUsers) {
        message = `Total ${usageStats?.blockedUsers} blocked user${
          usageStats?.blockedUsers > 1 ? "s" : ""
        }.`;
      } else {
        message = "No blocked users.";
      }
      break;
    }
    case "inactive": {
      const hasInactiveUsers = usageStats && usageStats?.inactiveUsers > 0;
      if (hasInactiveUsers) {
        message = `Total ${usageStats?.inactiveUsers} inactive user${
          usageStats?.inactiveUsers > 1 ? "s" : ""
        }.`;
      } else {
        message = "No inactive users this month.";
      }
      break;
    }
    default: {
      const totalUsers =
        (usageStats?.activeUsers || 0) +
        (usageStats?.inactiveUsers || 0) +
        (usageStats?.blockedUsers || 0);
      if (totalUsers) {
        message = `Total ${totalUsers} user${totalUsers > 1 ? "s" : ""}`;
        if (usageStats?.tokensUsedMonth) {
          message += `, over ${usageStats?.tokensUsedMonth.toLocaleString()} monthly tokens
          usage.`;
        } else {
          message += ".";
        }
      }
    }
  }

  return <span className="text-xs text-slate-600 sm:text-sm">{message}</span>;
};

export default UsageStats;
