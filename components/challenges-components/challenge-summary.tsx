"use client";

import { useState, useMemo } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import DataTable from "../common/data-table";
import { challengeSummaryColumns } from "@/lib/data/challenge-summary";
import DashboardHeadings from "../common/dashboard-headings";
import { useAccounts } from "@/lib/hooks/use-accounts";

export default function ChallengeSummary({ className }: { className?: string }) {
  const { currentAccountData } = useAccounts();
  const [timeFilter, setTimeFilter] = useState("Weekly");

  const challengeSummaryData = useMemo(() => {
    if (!currentAccountData?.trades) {
      return [];
    }

    // Calculate date range based on filter
    const now = new Date();
    let filterDate = new Date();
    
    switch (timeFilter) {
      case "Weekly":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "Monthly":
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case "Yearly":
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      case "All Time":
        filterDate = new Date(0); // Beginning of time
        break;
    }

    // Group trades by date
    const tradesByDate = currentAccountData.trades
      .filter((trade) => trade.type !== 'DEAL_TYPE_BALANCE')
      .filter((trade) => {
        const closeTime = new Date(trade.closeTime);
        return closeTime >= filterDate;
      })
      .reduce((acc: Record<string, { date: string; trades: number; lots: number; profit: number }>, trade) => {
        const date = new Date(trade.closeTime).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
        
        if (!acc[date]) {
          acc[date] = {
            date,
            trades: 0,
            lots: 0,
            profit: 0
          };
        }
        
        acc[date].trades += 1;
        acc[date].lots += trade.volume || 0;
        acc[date].profit += trade.profit || 0;
        
        return acc;
      }, {});

    // Convert to array and format
    return Object.entries(tradesByDate)
      .map(([date, dayData], index: number) => ({
        id: index + 1,
        date: date,
        trades: dayData.trades.toString(),
        lots: dayData.lots.toFixed(0),
        result: `$${dayData.profit.toFixed(2)}`
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10); // Show last 10 days
  }, [currentAccountData, timeFilter]);

  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] w-full lg:w-[33%] xl:w-[43%] flex flex-col justify-between max-h-[500px] overflow-y-auto ${className}`}
    >
      <div className="flex flex-row justify-between items-center gap-2.5 px-5 py-4">
        <DashboardHeadings title="Challenge Summary" />

        <DropdownMenu>
          <DropdownMenuTrigger className="md:w-[117px] h-10 border border-white/10 rounded-lg md:px-2 px-3 light-white-gradient hover:opacity-50 cursor-pointer bg-gradient-to-b from-white/5 to-transparent flex gap-2 items-center justify-center outline-0">
            <span className="text-white font-creato-display text-sm">
              {timeFilter}
            </span>
            <ChevronDown className="w-4 h-4 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark border border-white/10 outline-0">
            <DropdownMenuItem 
              className="text-white" 
              onClick={() => setTimeFilter("Weekly")}
            >
              Weekly
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-white" 
              onClick={() => setTimeFilter("Monthly")}
            >
              Monthly
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-white" 
              onClick={() => setTimeFilter("Yearly")}
            >
              Yearly
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-white" 
              onClick={() => setTimeFilter("All Time")}
            >
              All Time
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="min-h-[260px] flex flex-col">
        <DataTable
          data={challengeSummaryData}
          columns={challengeSummaryColumns}
          className="challenge-summary-table flex-1"
          responsive={true}
        />
      </div>
    </div>
  );
}
