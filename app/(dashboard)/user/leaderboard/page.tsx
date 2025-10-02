"use client";

import { useState } from "react";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import AccountSizeFilter from "@/components/common/account-size-filter";
import SearchBar from "@/components/common/search-bar";
import DataTable from "@/components/common/data-table";
import { leaderboardData, leaderboardColumns } from "@/lib/data/leaderboard";

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accountSizeFilter, setAccountSizeFilter] = useState("all");

  return (
    <DashboardPageContainer>
      <div className="space-y-6">
        <AccountSizeFilter
          value={accountSizeFilter}
          onChange={setAccountSizeFilter}
        />
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name or ID"
        />
        <div className="border-t border-white/10 gradient-dark-primary rounded-t-none max-h-[500px] overflow-auto">
          <DataTable
            data={leaderboardData}
            columns={leaderboardColumns}
            className="leaderboard-table"
            responsive={true}
          />
        </div>
      </div>
    </DashboardPageContainer>
  );
}