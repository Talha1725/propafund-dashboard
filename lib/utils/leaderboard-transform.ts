import type { LeaderboardUser, LeaderboardTableData } from '@/types/leaderboard';

const getCountryCode = (flag: string): string => {
  const countryMap: Record<string, string> = {
    'italy': 'IT',
    'kr': 'KR', 
    'us': 'US',
    'france': 'FR',
    'bangladesh': 'BD',
    'netherlands': 'NL',
    'belgium': 'BE',
    'spain': 'ES',
    'no': 'NO',
    'jp': 'JP',
    'pk': 'PK'
  };
  
  return countryMap[flag.toLowerCase()] || 'US';
};

const formatPercentage = (value: string): string => {
  // If the value already contains %, return as is
  if (value.includes('%')) {
    return value;
  }
  
  const numValue = parseFloat(value);
  if (!isNaN(numValue)) {
    return `${numValue}%`;
  }
  
  return value;
};

export const transformLeaderboardData = (apiData: LeaderboardUser[]) => {
  // Filter out top 3 since they're shown in cards above
  const tableData = apiData.filter(user => user.rank > 3);
  
  return tableData.map((user) => ({
    rank: user.rank.toString().padStart(2, '0'),
    trader: user.name,
    location: user.location,
    country: getCountryCode(user.flag),
    accountSize: user.accountSize,
    winRate: user.winRate,
    profitFactor: user.profitFactor.toString(),
    totalTrades: user.totalTrades,
    monthlyReturns: formatPercentage(user.monthlyReturn)
  }));
};

export const transformTopThreeTraders = (apiData: LeaderboardUser[]) => {
  const topThree = apiData.filter(user => user.isTopThree).slice(0, 3);
  
  // Sort by rank to ensure correct order
  const sortedTopThree = topThree.sort((a, b) => a.rank - b.rank);
  
  // Return in the exact same order as the original static implementation
  // [1st, 2nd, 3rd] - no rearrangement
  return sortedTopThree.map((user) => ({
    name: user.name,
    location: user.location,
    countryCode: getCountryCode(user.flag),
    rank: user.rank.toString(),
    profitFactor: user.profitFactor.toString(),
    totalTrades: user.totalTrades.toString(),
    winRate: user.winRate,
    winRateTrend: user.status === 'increasing' ? 'up' as const : 'down' as const,
    monthlyReturn: formatPercentage(user.monthlyReturn),
    monthlyReturnTrend: user.status === 'increasing' ? 'up' as const : 'down' as const,
    accountSize: user.accountSize,
    cardType: user.rank === 1 ? 'first' as const : user.rank === 2 ? 'second' as const : 'third' as const
  }));
};

const getOrdinalSuffix = (num: number): string => {
  if (num > 3 && num < 21) return 'th';
  switch (num % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

/**
 * Filter leaderboard data by account size
 */
export const filterLeaderboardByAccountSize = (
  data: LeaderboardUser[], 
  accountSize: string
): LeaderboardUser[] => {
  if (accountSize === 'all' || !data) {
    return data || [];
  }
  
  return data.filter(user => {
    const userAccountSize = user.accountSize.toLowerCase();
    const filterSize = accountSize.toLowerCase();
    
    // Handle different account size formats
    if (filterSize === '5k') {
      return userAccountSize.includes('5k') || userAccountSize.includes('5000');
    }
    if (filterSize === '10k') {
      return userAccountSize.includes('10k') || userAccountSize.includes('10000');
    }
    if (filterSize === '25k') {
      return userAccountSize.includes('25k') || userAccountSize.includes('25000');
    }
    if (filterSize === '50k') {
      return userAccountSize.includes('50k') || userAccountSize.includes('50000');
    }
    if (filterSize === '100k') {
      return userAccountSize.includes('100k') || userAccountSize.includes('100000');
    }
    if (filterSize === '500k') {
      return userAccountSize.includes('500k') || userAccountSize.includes('500000');
    }
    if (filterSize === '1m') {
      return userAccountSize.includes('1m') || userAccountSize.includes('1000000') || userAccountSize.includes('1,000,000');
    }
    
    return true;
  });
};

/**
 * Search leaderboard data by trader name or location
 */
export const searchLeaderboardData = (
  data: LeaderboardUser[], 
  query: string
): LeaderboardUser[] => {
  if (!query || !data) {
    return data || [];
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return data.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.location.toLowerCase().includes(searchTerm)
  );
};
