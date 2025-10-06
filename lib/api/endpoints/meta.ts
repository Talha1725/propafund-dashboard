import apiClient from '../client';

export interface MetaAccount {
  mtAccount: {
    id: number;
    userId: number;
    accountId: string;
    accountName: string;
    brokerName: string;
    platform: string;
    server: string;
    login: string;
    password: string;
    balance: number;
    challengeType: string;
    status: string;
    poolStatus: string;
    challengePhase: string | null;
    phaseStartDate: string | null;
    previousAccountId: string | null;
    createdAt: string;
    updatedAt: string;
    withdrawl: boolean;
  };
  metaStats: {
    equity: number;
    margin: number;
    freeMargin: number;
    profit: number;
    trades: number;
    balance: number;
    equityPercent: number;
    periods: {
      today?: { trades: number };
      thisWeek?: { trades: number };
      thisMonth?: { trades: number };
      thisYear?: { trades: number };
    };
    deposits: number;
    dailyGrowth: Array<{
      date: string;
      balance: number;
    }>;
    tradeDuration: Record<string, number | string>;
    inclusive: boolean;
    lostTrades?: number;
    lostTradesPercent?: number;
    averageLoss?: number;
    pips?: number;
    averageLossPips?: number;
    bestTrade?: number;
    worstTrade?: number;
    expectancy?: number;
    lots?: number;
    gain?: number;
    absoluteGain?: number;
    maxDrawdown?: number;
  } | null;
  trades: Array<{
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
  }>;
  analysis: Array<{
    id: number;
    userId: number;
    accountId: string;
    totalTrade: number;
    sales: number;
    fund: number;
    openTrade: number;
    initBalance: number;
    status: boolean;
    profit: number;
    dailyLoss: number;
    maxDrawdown: number;
    start: string | null;
    end: string | null;
    phaseOneCompletedAt: string | null;
    phaseTwoCompletedAt: string | null;
    currentPhaseProfit: number;
    phaseOneMaxProfit: number;
    phaseTwoMaxProfit: number;
    createdAt: string;
    updatedAt: string;
    startingBalance: number;
  }>;
  payment: {
    id: number;
    addOns: Record<string, unknown>;
    status: string;
    accountProtectionUsed: boolean;
  };
}

export interface GetAccountsResponse {
  success: boolean;
  data: {
    accounts: Record<string, MetaAccount>;
  };
  message: string;
}

export const metaApi = {
  getAccounts: async (email: string): Promise<GetAccountsResponse> => {
    const response = await apiClient.post('/meta/get-accounts', { email });
    return response.data;
  },
};