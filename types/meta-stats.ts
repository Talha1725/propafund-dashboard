export interface MetaStatsData {
    equity?: number;
    balance?: number;
    deposits?: number;
    highestBalance?: number;
    maxBalance?: number;
    dailyGrowth?: Array<{ date: string; profit?: number }>;
    averageTradeLengthInMilliseconds?: number;
    currencySummary?: Array<{
      currency: string;
      total: { trades: number };
    }>;
    openTradesByHour?: Array<{
      hour: number;
      trades: number;
    }>;
    bestTrade?: number;
    worstTrade?: number;
    riskOfRuin?: Array<{
      lossSize: number;
      probabilityOfLoss: number;
    }>;
    lots?: number;
    lostTradesPercent?: number;
    averageLoss?: number;
    expectancy?: number;
    lostTrades?: number;
    trades?: number;
    profit?: number;
  }
  
  export interface AnalysisData {
    startingBalance?: number;
    updatedAt?: string;
  }

  export interface Trade {
    _id: string;
    accountId: string;
    closeTime: string;
    openTime: string;
    profit: number;
    type: string;
    symbol?: string;
    volume?: number;
    closePrice?: number;
    openPrice?: number;
    pips?: number;
    success?: string;
    gain?: number;
    marketValue?: number;
    positionId?: string;
    durationInMinutes?: number;
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