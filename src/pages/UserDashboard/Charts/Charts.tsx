import { UserProfileStats } from "../../../@types/user";
import Semidonut from "./SemiDonut";

type ChartsProps = {
  stats?: UserProfileStats;
};

const Charts: React.FC<ChartsProps> = ({ stats }) => {
  console.log("Charts usagestats", stats);
  return (
    <aside className="ml-5 h-fit flex-auto">
      <div className="border-slate-150 relative mb-4 block h-full w-full rounded-2xl border-[1px] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl md:px-4 lg:p-6">
        <h2 className="mb-2 text-base font-bold text-slate-600">Tokens</h2>
        <Semidonut fillPercent={74} />
        <div className="m-auto mb-1 mt-2 flex w-52 justify-between">
          <div className="flex flex-col items-center justify-center text-base font-semibold text-slate-700">
            <span className="-mb-1.5">
              <span className="text-lg font-bold text-slate-800">100</span> tk
            </span>
            <span className="text-xs font-normal text-slate-500 ">
              monthly limit
            </span>
          </div>
          <span className="w-[1px] rounded-xl bg-slate-200"></span>
          <div className="flex flex-col items-center justify-center text-base font-semibold text-slate-700">
            <span className="-mb-1.5">
              <span className="text-lg font-bold text-slate-800">
                {stats?.tokensPerMonthForCurrentYear
                  ? stats?.tokensPerMonthForCurrentYear[new Date().getMonth()]
                  : 0}
              </span>{" "}
              tk
            </span>
            <span className="text-xs font-normal text-slate-500 ">
              already used
            </span>
          </div>
        </div>
      </div>

      <div className="border-slate-150 relative block h-full w-full rounded-2xl border-[1px] p-6 shadow-md transition-shadow duration-300 hover:shadow-xl md:px-4 lg:p-6">
        <h2 className="mb-2 text-base font-bold text-slate-600">Activity</h2>
        <Semidonut fillPercent={74} />
        <div className="m-auto mb-1 mt-2 flex w-52 justify-between">
          <div className="flex flex-col items-center justify-center text-base font-semibold text-slate-700">
            <span className="-mb-1.5">
              <span className="text-lg font-bold text-slate-800">100</span> tk
            </span>
            <span className="text-xs font-normal text-slate-500 ">
              monthly limit
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-base font-semibold text-slate-700">
            <span className="-mb-1.5">
              <span className="text-lg font-bold text-slate-800">
                {stats?.tokensPerMonthForCurrentYear
                  ? stats?.tokensPerMonthForCurrentYear[new Date().getMonth()]
                  : 0}
              </span>{" "}
              tk
            </span>
            <span className="text-xs font-normal text-slate-500 ">
              already used
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Charts;
