"use client";

import { useState, useEffect } from "react";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import AccountSizeFilter from "@/components/common/account-size-filter";
import SearchBar from "@/components/common/search-bar";
import DataTable from "@/components/common/data-table";
import { leaderboardData, leaderboardColumns } from "@/lib/data/leaderboard";

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accountSizeFilter, setAccountSizeFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastRefreshed] = useState(new Date());
  const [timeSinceRefresh, setTimeSinceRefresh] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTimeSinceRefresh = () => {
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - lastRefreshed.getTime()) / (1000 * 60));
      setTimeSinceRefresh(diffInMinutes);
    };

    updateTimeSinceRefresh();
    const timer = setInterval(updateTimeSinceRefresh, 60000); 

    return () => clearInterval(timer);
  }, [lastRefreshed]);

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getTimeSinceRefreshText = () => {
    if (timeSinceRefresh === 0) return "Just now";
    if (timeSinceRefresh === 1) return "1 minute ago";
    return `${timeSinceRefresh} minutes ago`;
  };

  return (
    <DashboardPageContainer>
      <div className="space-y-6">
        <AccountSizeFilter
          value={accountSizeFilter}
          onChange={setAccountSizeFilter}
        />
        <div className="flex items-center justify-between">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or ID"
          />
          <div className="flex flex-col text-white">
            <div className="flex items-center gap-2">
              <div 
                className="rounded-full"
                style={{
                  width: '12px',
                  height: '12px',
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #4EB2E4 100%)',
                  boxShadow: '0px 0px 6px 6px #4EB2E440'
                }}
              />
              <span 
                className="text-white"
                style={{
                  fontFamily: 'Creato Display',
                  fontWeight: 400,
                  fontStyle: 'Regular',
                  fontSize: '16px'
                }}
              >
                {formatDateTime(currentTime)}
              </span>
            </div>
            <span 
              className="text-white"
              style={{
                fontFamily: 'Creato Display',
                fontWeight: 400,
                fontStyle: 'Regular',
                fontSize: '16px'
              }}
            >
              Last refreshed: {getTimeSinceRefreshText()}
            </span>
          </div>
        </div>
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