import { useState, useEffect, useMemo } from 'react';
import { funding, type ChallengeConfig, type FundingSummary } from '@/lib/api/endpoints/funding';

export interface FundingData {
  challengeType: string;
  accountType: string;
  platform: string;
}

export interface DynamicSummaryData {
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

// Mock data for now - replace with actual API calls when backend is ready
const mockData = {
  accountTypes: {
    'elite-50k': {
      name: 'Elite',
      size: '$50,000',
      price: 279,
      leverage: '1:100',
      maxLoss: '8%',
      dailyLoss: '5%',
      minimumTradingDays: '1 Day',
      weekendCryptoTrading: true,
      easEnabled: true,
    },
    'pro-100k': {
      name: 'Pro',
      size: '$100,000',
      price: 499,
      leverage: '1:100',
      maxLoss: '8%',
      dailyLoss: '5%',
      minimumTradingDays: '1 Day',
      weekendCryptoTrading: true,
      easEnabled: true,
    },
    'master-200k': {
      name: 'Master',
      size: '$200,000',
      price: 999,
      leverage: '1:100',
      maxLoss: '8%',
      dailyLoss: '5%',
      minimumTradingDays: '1 Day',
      weekendCryptoTrading: true,
      easEnabled: true,
    },
  },
  challengeTypes: {
    'stage-one': {
      name: 'Stage One',
      duration: 'Unlimited',
    },
    'funded': {
      name: 'Funded',
      duration: 'Unlimited',
    },
  },
  platforms: {
    'platform-5': {
      name: 'Platform 5',
      displayName: 'Platform 5',
    },
    'traderlocker': {
      name: 'TraderLocker',
      displayName: 'TraderLocker',
    },
    'matchtrader': {
      name: 'MatchTrader',
      displayName: 'MatchTrader',
    },
  },
};

export function useFunding() {
  const [selectedData, setSelectedData] = useState<FundingData>({
    challengeType: 'stage-one',
    accountType: 'elite-50k',
    platform: 'platform-5',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate dynamic summary based on selections
  const summaryData = useMemo((): DynamicSummaryData => {
    const accountData = mockData.accountTypes[selectedData.accountType as keyof typeof mockData.accountTypes];
    const challengeData = mockData.challengeTypes[selectedData.challengeType as keyof typeof mockData.challengeTypes];
    const platformData = mockData.platforms[selectedData.platform as keyof typeof mockData.platforms];

    return {
      challengeType: challengeData?.name || 'Regular',
      accountSize: accountData?.size || '$50,000',
      challengeDuration: challengeData?.duration || 'Unlimited',
      leverage: accountData?.leverage || '1:100',
      minimumTradingDays: accountData?.minimumTradingDays || '1 Day',
      maxLoss: accountData?.maxLoss || '8%',
      dailyLoss: accountData?.dailyLoss || '5%',
      weekendCryptoTrading: accountData?.weekendCryptoTrading ? 'Yes' : 'No',
      easEnabled: accountData?.easEnabled ? 'Yes' : 'No',
      platform: platformData?.displayName || 'Platform 5',
      orderTotal: `$${accountData?.price || 279}.00`,
    };
  }, [selectedData]);

  const updateSelection = (field: keyof FundingData, value: string) => {
    console.log(`Updating ${field} to:`, value);
    setSelectedData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to fetch data from backend (when ready)
  const fetchFundingData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Uncomment when backend is ready
      // const [accountTypes, challengeTypes, platforms] = await Promise.all([
      //   funding.getAccountTypes(),
      //   funding.getChallengeTypes(),
      //   funding.getPlatforms(),
      // ]);
      
      // For now, we'll use mock data
      console.log('Using mock data for funding configuration');
    } catch (err) {
      setError('Failed to fetch funding data');
      console.error('Error fetching funding data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to get summary from backend (when ready)
  const getSummaryFromBackend = async (config: ChallengeConfig): Promise<FundingSummary | null> => {
    try {
      // Uncomment when backend is ready
      // return await funding.getFundingSummary(config);
      return null;
    } catch (err) {
      console.error('Error fetching summary from backend:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchFundingData();
  }, []);

  return {
    selectedData,
    summaryData,
    loading,
    error,
    updateSelection,
    fetchFundingData,
    getSummaryFromBackend,
  };
}
