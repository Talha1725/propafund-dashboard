import apiClient from '../client';

// Types for funding data
export interface ChallengeConfig {
  challengeType: string;
  accountType: string;
  platform: string;
}

export interface FundingSummary {
  challengeType: string;
  accountSize: string;
  challengeDuration: string;
  leverage: string;
  minimumTradingDays: string;
  maxLoss: string;
  dailyLoss: string;
  weekendCryptoTrading: string;
  easEnabled: string;
  platform: string;
  orderTotal: string;
}

export interface AccountType {
  id: string;
  name: string;
  size: string;
  price: number;
  leverage: string;
  maxLoss: string;
  dailyLoss: string;
  minimumTradingDays: string;
  weekendCryptoTrading: boolean;
  easEnabled: boolean;
}

export interface ChallengeType {
  id: string;
  name: string;
  duration: string;
}

export interface Platform {
  id: string;
  name: string;
  displayName: string;
}

export const funding = {
  // Get available account types
  getAccountTypes: async (): Promise<AccountType[]> => {
    const response = await apiClient.get('/funding/account-types');
    return response.data;
  },

  // Get available challenge types
  getChallengeTypes: async (): Promise<ChallengeType[]> => {
    const response = await apiClient.get('/funding/challenge-types');
    return response.data;
  },

  // Get available platforms
  getPlatforms: async (): Promise<Platform[]> => {
    const response = await apiClient.get('/funding/platforms');
    return response.data;
  },

  // Get funding summary based on configuration
  getFundingSummary: async (config: ChallengeConfig): Promise<FundingSummary> => {
    const response = await apiClient.post('/funding/summary', config);
    return response.data;
  },

  // Calculate pricing based on configuration
  calculatePrice: async (config: ChallengeConfig): Promise<{ price: number; currency: string }> => {
    const response = await apiClient.post('/funding/calculate-price', config);
    return response.data;
  },

  // Create funding order
  createOrder: async (config: ChallengeConfig): Promise<{ orderId: string; paymentUrl?: string }> => {
    const response = await apiClient.post('/funding/create-order', config);
    return response.data;
  }
};
