import DataTable from "@/components/common/data-table";
import { recentTradesData, recentTradesColumns } from "@/lib/data/recent-trades";
import DashboardHeadings from "../common/dashboard-headings";

export default function RecentTrades() {
  return (
    <div className="border border-white/10 gradient-dark-primary rounded-[14px] pt-4 max-h-[500px] overflow-auto">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 px-4">
        <DashboardHeadings title="Recent Trades" />
      </div>

      <div className="mt-5">
        <DataTable
          data={recentTradesData}
          columns={recentTradesColumns}
          className="recent-trades-table"
          responsive={true}
        />
      </div>
    </div>
  );
}
