import { UserProfileStats } from "../../../@types/user";
import Semidonut from "./Semidonut";

type UsageSemidonutProps = {
  stats: UserProfileStats;
};

const UsageSemidonut: React.FC<UsageSemidonutProps> = ({ stats }) => {
  const tokensUsedThisMonth = stats?.tokensUsedMonth || 0;
  const tokensUsageLimit = stats?.limit || 0;

  let tokensUsagePercent = (tokensUsedThisMonth / tokensUsageLimit) * 100;
  if (tokensUsagePercent > 100) tokensUsagePercent = 100;
  if (tokensUsageLimit === 0) tokensUsagePercent = 0;
  return (
    <>
      <Semidonut fillPercent={tokensUsagePercent} />
      <div className="m-auto mb-1 mt-2 grid w-[90%] min-w-fit [grid-template-columns:1fr_10px_1fr]">
        <div className="flex flex-col items-center justify-center justify-self-center text-base font-semibold text-slate-700">
          <span className="-mb-1.5">
            <span className="text-lg font-bold text-slate-800">
              {tokensUsageLimit.toLocaleString()}
            </span>
            &nbsp;tk
          </span>
          <span className="text-xs font-normal text-slate-500 ">
            monthly limit
          </span>
        </div>
        <span className="w-[1px] justify-self-center rounded-xl bg-slate-200"></span>
        <div className="flex flex-col items-center justify-center justify-self-center text-base font-semibold text-slate-700">
          <span className="-mb-1.5">
            <span className="text-lg font-bold text-slate-800">
              {tokensUsedThisMonth.toLocaleString()}
            </span>
            &nbsp;tk
          </span>
          <span className="text-xs font-normal text-slate-500 ">
            already used
          </span>
        </div>
      </div>
    </>
  );
};

export default UsageSemidonut;
