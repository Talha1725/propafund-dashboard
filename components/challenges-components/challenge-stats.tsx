import DashboardHeadings from "../common/dashboard-headings";
import StatusCard from "../common/status-card";

export default function ChallengeStats() {
  return (
    <div className="border border-white/10 gradient-dark-primary rounded-[14px] p-4">
      <DashboardHeadings title="Challenge Statistics" />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <StatusCard title="Today’s permitted loss" value="$10,000.00" tradeIcon={false} />
        <StatusCard title="Total amount paid" value="$292,321.23" tradeIcon={false} />
        <StatusCard title="Total payouts" value="140" tradeIcon={false} />
      </div>
    </div>
  );
}
