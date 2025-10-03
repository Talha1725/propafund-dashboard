"use client";

import { useState } from "react";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import AccountSizeFilter from "@/components/common/account-size-filter";
import SearchBar from "@/components/common/search-bar";
import DataTable from "@/components/common/data-table";
import { ProfileCard } from "@/components/cards/profile-card";
import { leaderboardData, leaderboardColumns } from "@/lib/data/leaderboard";

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [accountSizeFilter, setAccountSizeFilter] = useState("all");
  const currentTime = "August 29, 2025 15:00";
  const lastRefreshed = "1 minute ago";

  return (
    <DashboardPageContainer>
      <div className="space-y-6">
        <div className="overflow-x-auto md:overflow-visible">
          <AccountSizeFilter
            value={accountSizeFilter}
            onChange={setAccountSizeFilter}
            className="min-w-max"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or ID"
          />
          <div className="flex flex-col text-white whitespace-nowrap">
            <div className="flex items-center gap-2">
              <div 
                className="rounded-full flex-shrink-0 w-2 h-2 md:w-3 md:h-3"
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #4EB2E4 100%)',
                  boxShadow: '0px 0px 6px 6px #4EB2E440'
                }}
              />
              <span 
                className="text-white whitespace-nowrap text-sm md:text-base"
                style={{
                  fontFamily: 'Creato Display',
                  fontWeight: 400
                }}
              >
                {currentTime}
              </span>
            </div>
            <span 
              className="text-white whitespace-nowrap text-sm md:text-base"
              style={{
                fontFamily: 'Creato Display',
                fontWeight: 400
              }}
            >
              Last refreshed: {lastRefreshed}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between mb-6 px-4 gap-4 md:gap-[21px]">
          <div className="flex justify-center md:block mt-0 relative">
            <ProfileCard
              name="Olivia Carter"
              location="New York, USA"
              countryCode="US"
              rank="1st"
              profitFactor="2.2"
              totalTrades="145"
              winRate="74.80%"
              winRateTrend="up"
              monthlyReturn="11.4%"
              monthlyReturnTrend="up"
              accountSize="$1,000,000"
              cardType="first"
            />
          </div>
          <div className="flex justify-center md:block mt-0 md:mt-14 relative">
            <ProfileCard
              name="Daniel Ahmed"
              location="London, United Kingdom"
              countryCode="GB"
              rank="2nd"
              profitFactor="2.0"
              totalTrades="182"
              winRate="71.60%"
              winRateTrend="down"
              monthlyReturn="10.2%"
              monthlyReturnTrend="up"
              accountSize="$1,000,000"
              cardType="second"
            />
          </div>
          <div className="flex justify-center md:block mt-0 md:mt-24 relative">
            <ProfileCard
              name="Sophia Müller"
              location="Berlin, Germany"
              countryCode="DE"
              rank="3rd"
              profitFactor="2.2"
              totalTrades="145"
              winRate="74.80%"
              winRateTrend="up"
              monthlyReturn="11.4%"
              monthlyReturnTrend="up"
              accountSize="$1,000,000"
              cardType="third"
            />
          </div>
        </div>

        <div className="border-t border-white/10 rounded-t-none">
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