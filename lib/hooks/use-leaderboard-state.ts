import { useState, useCallback } from 'react';
import { LeaderboardTabId } from '@/types/leaderboard';
import { LEADERBOARD_TABS } from '@/constants/leaderboard';

export function useLeaderboardState(initialTab: LeaderboardTabId = "all") {
  const [activeTab, setActiveTab] = useState<LeaderboardTabId>(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = useCallback((tab: string) => {
    const isValidTab = LEADERBOARD_TABS.some(t => t.id === tab);
    if (isValidTab) {
      setActiveTab(tab as LeaderboardTabId);
    } else {
      setActiveTab("all");
    }
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.trim());
  }, []);

  const resetFilters = useCallback(() => {
    setActiveTab("all");
    setSearchQuery("");
  }, []);

  return {
    activeTab,
    searchQuery,
    handleTabChange,
    handleSearch,
    resetFilters
  };
}
