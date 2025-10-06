// Trading behavior calculation utilities
import type { MetaStatsData, Trade } from '@/types/meta-stats';

export interface TradingBehaviorItem {
  readonly label: string;
  readonly value: string;
}

interface AccountData {
  metaStats?: MetaStatsData | null;
  trades?: Trade[];
}

// Default trading behavior when no data is available
export function getDefaultTradingBehavior(): TradingBehaviorItem[] {
  return [
    {
      label: "Avg. trade duration",
      value: "--"
    },
    {
      label: "Avg. win size vs loss size",
      value: "--"
    },
    {
      label: "Most traded symbol",
      value: "--"
    },
    {
      label: "Peak trading hour",
      value: "--"
    },
    {
      label: "Consistent activity",
      value: "--"
    },
    {
      label: "Winning Streak Record",
      value: "--"
    }
  ];
}

// Format duration from milliseconds to readable format
function formatDuration(milliseconds: number): string {
  const minutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${minutes}m`;
}

// Calculate average win vs loss size
function calculateAverageWinLoss(trades: Trade[]): string {
  const winningTrades = trades.filter(trade => (trade.profit || 0) > 0);
  const losingTrades = trades.filter(trade => (trade.profit || 0) < 0);
  
  if (winningTrades.length === 0 && losingTrades.length === 0) {
    return "--";
  }
  
  const avgWin = winningTrades.length > 0 
    ? winningTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0) / winningTrades.length
    : 0;
    
  const avgLoss = losingTrades.length > 0
    ? Math.abs(losingTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0) / losingTrades.length)
    : 0;
  
  if (avgWin === 0 && avgLoss === 0) return "--";
  if (avgWin === 0) return `$0 vs -$${avgLoss.toFixed(2)}`;
  if (avgLoss === 0) return `+$${avgWin.toFixed(2)} vs $0`;
  
  return `+$${avgWin.toFixed(2)} vs -$${avgLoss.toFixed(2)}`;
}

// Get most traded symbol from currency summary
function getMostTradedSymbol(metaStats: MetaStatsData | null): string {
  if (!metaStats?.currencySummary || metaStats.currencySummary.length === 0) {
    return "--";
  }
  
  const mostTraded = metaStats.currencySummary.reduce((max, current) => 
    current.total.trades > max.total.trades ? current : max
  );
  
  return mostTraded.currency || "--";
}

// Get peak trading hour
function getPeakTradingHour(metaStats: MetaStatsData | null): string {
  if (!metaStats?.openTradesByHour || metaStats.openTradesByHour.length === 0) {
    return "--";
  }
  
  const peakHour = metaStats.openTradesByHour.reduce((max, current) => 
    current.trades > max.trades ? current : max
  );
  
  const hour = peakHour.hour;
  const hour12 = hour > 12 ? hour - 12 : hour;
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour12;
  
  return `${displayHour}${period}`;
}

// Get consistent activity (requires 5+ days of trading)
function getConsistentActivity(metaStats: MetaStatsData | null, trades: Trade[]): string {
  if (!trades.length) return "--";
  
  // Get unique trading days
  const tradingDays = new Set(
    trades.map(trade => {
      if (trade.openTime) {
        return new Date(trade.openTime).toDateString();
      }
      return null;
    }).filter(Boolean)
  );
  
  const daysCount = tradingDays.size;
  
  if (daysCount >= 5) {
    return `${daysCount} days`;
  }
  
  return "Not enough data";
}

// Calculate winning streak
function calculateWinningStreak(trades: Trade[]): string {
  if (!trades.length) return "--";
  
  // Sort trades by open time
  const sortedTrades = trades
    .filter(trade => trade.openTime)
    .sort((a, b) => new Date(a.openTime!).getTime() - new Date(b.openTime!).getTime());
  
  let maxStreak = 0;
  let currentStreak = 0;
  
  for (const trade of sortedTrades) {
    if ((trade.profit || 0) > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  
  return maxStreak.toString();
}

// Main function to calculate trading behavior
export function calculateTradingBehavior(accountData: AccountData): TradingBehaviorItem[] {
  if (!accountData) {
    return getDefaultTradingBehavior();
  }
  
  const { metaStats, trades = [] } = accountData;
  
  if (!metaStats) {
    return getDefaultTradingBehavior();
  }
  
  const realTrades = trades.filter((t: Trade) => t.type !== 'DEAL_TYPE_BALANCE');
  const hasTraded = realTrades.length > 0;
  
  if (!hasTraded) {
    return getDefaultTradingBehavior();
  }
  
  return [
    {
      label: "Avg. trade duration",
      value: metaStats?.averageTradeLengthInMilliseconds 
        ? formatDuration(metaStats.averageTradeLengthInMilliseconds)
        : "--"
    },
    {
      label: "Avg. win size vs loss size",
      value: calculateAverageWinLoss(realTrades)
    },
    {
      label: "Most traded symbol",
      value: getMostTradedSymbol(metaStats || null)
    },
    {
      label: "Peak trading hour",
      value: getPeakTradingHour(metaStats || null)
    },
    {
      label: "Consistent activity",
      value: getConsistentActivity(metaStats || null, realTrades)
    },
    {
      label: "Winning Streak Record",
      value: calculateWinningStreak(realTrades)
    }
  ];
}
