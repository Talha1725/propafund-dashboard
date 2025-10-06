"use client";

import { useState, useMemo } from "react";
import DataTable from "@/components/common/data-table";
import DashboardHeadings from "../common/dashboard-headings";
import { useAccounts } from "@/lib/hooks/use-accounts";
import type { Trade } from "@/types/meta-stats";

export default function RecentTrades() {
  const [viewMode, setViewMode] = useState<"less" | "more">("less");
  const { currentAccountData, loading, error } = useAccounts();

  // Consistent currency formatting with other components
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Table columns definition
  const columns = [
    {
      key: "symbol",
      label: "Symbol",
      sortable: true
    },
    {
      key: "pnl",
      label: "PnL",
      sortable: true
    },
    {
      key: "lot",
      label: "Lot",
      sortable: true
    },
    {
      key: "duration",
      label: "Duration",
      sortable: true
    },
    {
      key: "date",
      label: "Date",
      sortable: true
    }
  ];

  // Transform API trade data to table format
  const tradesData = useMemo(() => {
    if (!currentAccountData?.trades) return [];

    return currentAccountData.trades
      .filter((trade: Trade) => trade.type !== 'DEAL_TYPE_BALANCE')
      .map((trade: Trade) => {
        const openTime = trade.openTime ? new Date(trade.openTime) : null;
        const closeTime = trade.closeTime ? new Date(trade.closeTime) : null;
        const duration = openTime && closeTime 
          ? Math.round((closeTime.getTime() - openTime.getTime()) / (1000 * 60))
          : 0;

        const pnl = trade.profit !== undefined 
          ? (trade.profit >= 0 ? `+${formatCurrency(trade.profit)}` : `-${formatCurrency(Math.abs(trade.profit))}`)
          : "--";

        return {
          id: trade._id || Math.random().toString(),
          symbol: trade.symbol || "--",
          pnl,
          lot: trade.volume ? trade.volume.toString() : "--",
          duration: duration > 0 ? `${duration}m` : "< 1m",
          date: closeTime ? closeTime.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          }) : "--",
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
  }, [currentAccountData]);

  // Apply view mode filtering
  const filteredData = useMemo(() => {
    if (viewMode === "less") {
      return tradesData.slice(0, 5); // Show only top 5 trades
    }
    return tradesData; // Show all trades
  }, [tradesData, viewMode]);

  if (loading) {
    return (
      <div className="border border-white/10 gradient-dark-primary rounded-[14px] pt-4 max-h-[500px] overflow-auto">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 px-4">
          <DashboardHeadings title="Recent Trades" />
        </div>
        <div className="mt-5 p-4">
          <div className="text-white/50 text-center">Loading trades...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-white/10 gradient-dark-primary rounded-[14px] pt-4 max-h-[500px] overflow-auto">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 px-4">
          <DashboardHeadings title="Recent Trades" />
        </div>
        <div className="mt-5 p-4">
          <div className="text-red-400 text-center">Error loading trades: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-white/10 gradient-dark-primary rounded-[14px] pt-4 max-h-[500px] overflow-auto">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 px-4">
        <DashboardHeadings title="Recent Trades" />
        
        <button
          onClick={() => setViewMode(viewMode === "less" ? "more" : "less")}
          className="px-3 py-2 bg-transparent text-white hover:bg-white/5 hover:text-white rounded-md transition-colors border-0 outline-none focus:outline-none"
        >
          {viewMode === "less" ? "View More" : "View Less"}
        </button>
      </div>

      <div className="mt-5">
        {filteredData.length === 0 ? (
          <div className="p-4">
            <div className="text-white/50 text-center">No trades found</div>
          </div>
        ) : (
          <DataTable
            data={filteredData}
            columns={columns}
            className="recent-trades-table"
            responsive={true}
          />
        )}
      </div>
    </div>
  );
}
