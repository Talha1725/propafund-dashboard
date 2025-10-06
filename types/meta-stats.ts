export interface MetaStatsData {
    equity?: number;
    balance?: number;
    deposits?: number;
    highestBalance?: number;
    maxBalance?: number;
    dailyGrowth?: Array<{ date: string; profit?: number }>;
  }
  
  export interface AnalysisData {
    startingBalance?: number;
    updatedAt?: string;
  }
  
  export interface DashboardMetrics {
    dailyLoss: {
      remaining: string;
      progress: string;
      current: string;
      limit: string;
      percentage: string;
    };
    maxLoss: {
      remaining: string;
      progress: string;
      current: string;
      limit: string;
      percentage: string;
    };
    profitTarget: {
      remaining: string;
      progress: string;
      current: string;
      target: string;
      percentage: string;
    };
  }