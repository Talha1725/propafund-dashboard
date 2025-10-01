import DashboardHeadings from "../common/dashboard-headings";
import StatusCard from "../common/status-card";

export default function ChallengeStatistics() {
  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full flex flex-col justify-between`}
    >
      {" "}
      <DashboardHeadings title="Challenge Statistics" />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-y-3 gap-3 md:gap-4 md:gap-y-4 lg:gap-x-5">
        <div className="grid grid-cols-2 lg:flex flex-col gap-3 lg:justify-between lg:gap-4">
         <StatusCard title="Equity" value="$200,000.00" className="w-full h-full flex flex-col justify-between" tradeIcon={false} small={true} valueDivStyle="md:py-6 py-2.5" valueStyle="md:text-2xl text-xs" />
         <StatusCard title="Balance" value="$200,000.00" className="w-full h-full flex flex-col justify-between" tradeIcon={false} small={true} valueDivStyle="md:py-6 py-2.5" valueStyle="md:text-2xl text-xs" />   
        </div>
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-3">
        <StatusCard title="Win Rate" value="1.2" small={true} challenges={true} valueDivStyle="!py-1.5" valueStyle="md:text-sm text-xs" />
        <StatusCard title="Average Profit" value="$292,321.23" small={true} challenges={true} valueDivStyle="!py-1.5" valueStyle="md:text-sm text-xs" />
        <StatusCard title="Average Loss" value="140" small={true} challenges={true} tradeUp={false} valueDivStyle="!py-1.5" valueStyle="md:text-sm text-xs" />
        <StatusCard title="Number of Trades" value="$292,321.23" small={true} challenges={true} tradeIcon={false} valueDivStyle="!py-2.5 lg:!py-2" valueStyle="md:text-sm text-xs" />
        <StatusCard title="Lots" value="3" small={true} challenges={true} tradeIcon={false} valueDivStyle="!py-2.5 lg:!py-2" valueStyle="md:text-sm text-xs" />
        <StatusCard title="Sharpe Ratio" value="1:4" small={true} challenges={true} tradeIcon={false} valueDivStyle="!py-2.5 lg:!py-2" valueStyle="md:text-sm text-xs" />
        <StatusCard title="Average RRR" value="12" small={true} challenges={true} tradeIcon={false} valueDivStyle="!py-2.5 lg:!py-2" valueStyle="md:text-sm text-xs" />
        <StatusCard title="Expectancy" value="$292,321.23" small={true} challenges={true} tradeIcon={false} valueDivStyle="!py-2.5 lg:!py-2" valueStyle="md:text-sm text-xs" />
        <StatusCard title="$292,321.23" value="1.3" small={true} challenges={true} tradeIcon={false} valueDivStyle="!py-2.5 lg:!py-2" valueStyle="md:text-sm text-xs" />

        </div>
      </div>
      </div>
  );
}
