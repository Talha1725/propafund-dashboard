import DataTable from "@/components/common/data-table";
import { recentTradesData, recentTradesColumns } from "@/lib/data/recent-trades";

export default function RecentTrades() {
  return (
    <div className="border border-white/10 gradient-dark-primary rounded-[14px] pt-4 max-h-[500px] overflow-auto">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 px-4">
        <h1 className="text-white md:font-medium md:text-lg font-creato-display">
          Recent Trades
        </h1>
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
