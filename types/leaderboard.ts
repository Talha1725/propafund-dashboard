export interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardUser[];
  message: string;
}

export interface LeaderboardUser {
  id: number;
  rank: number;
  name: string;
  flag: string;
  location: string;
  accountSize: string;
  winRate: string;
  profitFactor: number;
  totalTrades: number;
  monthlyReturn: string;
  status: 'increasing' | 'decreasing';
  accountCategory: string;
  isActive: boolean;
  isTopThree: boolean;
  trophyIcon: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardTableData {
  rank: string;
  trader: string;
  location: string;
  country: string;
  accountSize: string;
  winRate: string;
  profitFactor: string;
  totalTrades: number;
  monthlyReturns: string;
}

export interface TopThreeTrader {
  id: number;
  name: string;
  city: string;
  countryCode: string;
  rank: string;
  profitFactor: number;
  totalTrades: number;
  winRate: number;
  monthlyReturn: number;
  accountSize: number;
}

export type LeaderboardTabId = "all" | "5k" | "10k" | "25k" | "50k" | "100k" | "500k" | "1m";

export interface LeaderboardTab {
  id: LeaderboardTabId;
  label: string;
}

export interface LeaderboardCardsProps {
  data: LeaderboardUser[];
  loading: boolean;
  error: string | null;
}

export interface LeaderboardTableProps {
  data: LeaderboardUser[];
  loading: boolean;
  error: string | null;
}

export interface LeaderboardTabsProps {
  tabs: LeaderboardTab[];
  activeTab: LeaderboardTabId;
  onTabChange: (tab: LeaderboardTabId) => void;
}

export interface SearchDateSectionProps {
  onSearch: (query: string) => void;
}
