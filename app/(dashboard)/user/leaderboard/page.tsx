"use client";

import { useMemo } from "react";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import AccountSizeFilter from "@/components/common/account-size-filter";
import SearchBar from "@/components/common/search-bar";
import DataTable from "@/components/common/data-table";
import { ProfileCard } from "@/components/cards/profile-card";
import { Spinner } from "@/components/ui/spinner";
import { leaderboardColumns } from "@/lib/data/leaderboard";
import { useLeaderboardData } from "@/lib/hooks/use-leaderboard-data";
import { useLeaderboardState } from "@/lib/hooks/use-leaderboard-state";
import { 
  transformLeaderboardData, 
  transformTopThreeTraders,
  filterLeaderboardByAccountSize,
  searchLeaderboardData 
} from "@/lib/utils/leaderboard-transform";

export default function LeaderboardPage() {
  // Use custom hooks for data and state management
  const { data: apiData, loading, error, refetch } = useLeaderboardData();
  const { activeTab, searchQuery, handleTabChange, handleSearch } = useLeaderboardState();
  
  const currentTime = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const lastRefreshed = "1 minute ago";

  // Transform and filter data
  const filteredData = useMemo(() => {
    if (!apiData) return [];
    
    let filtered = filterLeaderboardByAccountSize(apiData, activeTab);
    filtered = searchLeaderboardData(filtered, searchQuery);
    
    return filtered;
  }, [apiData, activeTab, searchQuery]);

  const transformedTableData = useMemo(() => {
    return transformLeaderboardData(filteredData);
  }, [filteredData]);

  const topThreeTraders = useMemo(() => {
    return transformTopThreeTraders(apiData || []);
  }, [apiData]);

  return (
    <DashboardPageContainer>
      <div className="space-y-6">
        <div className="overflow-x-auto md:overflow-visible">
          <AccountSizeFilter
            value={activeTab}
            onChange={(value: string) => handleTabChange(value)}
            className="min-w-max"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name or location"
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
              <span className="text-white whitespace-nowrap text-sm md:text-base font-creato-display font-normal">
                {currentTime}
              </span>
            </div>
            <span className="text-white whitespace-nowrap text-sm md:text-base font-creato-display font-normal">
              Last refreshed: {lastRefreshed}
            </span>
          </div>
        </div>
        
        {/* Top 3 Trader Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-64 mb-6">
            <Spinner variant="ring" className="h-8 w-8 text-white" />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-red-400 mb-4">Failed to load leaderboard data</p>
              <button 
                onClick={refetch}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between mb-6 px-2 gap-2 md:gap-[21px]">
            {topThreeTraders.map((trader, index) => (
              <div key={trader.name} className={`flex justify-center md:block mt-0 ${index === 1 ? 'md:mt-14' : index === 2 ? 'md:mt-24' : ''}`}>
                <ProfileCard
                  name={trader.name}
                  location={trader.location}
                  countryCode={trader.countryCode}
                  rank={trader.rank}
                  profitFactor={trader.profitFactor}
                  totalTrades={trader.totalTrades}
                  winRate={trader.winRate}
                  winRateTrend={trader.winRateTrend}
                  monthlyReturn={trader.monthlyReturn}
                  monthlyReturnTrend={trader.monthlyReturnTrend}
                  accountSize={trader.accountSize}
                  cardType={trader.cardType}
                />
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-white/10 rounded-t-none">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-white">Loading leaderboard data...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-red-400 mb-4">Failed to load leaderboard data</p>
                <button 
                  onClick={refetch}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <DataTable
              data={transformedTableData}
              columns={leaderboardColumns}
              className="leaderboard-table"
              responsive={true}
            />
          )}
        </div>
      </div>
    </DashboardPageContainer>
  );
}