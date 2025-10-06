// Used by both DashboardView and UserTradingAccounts
import type { MetaStatsData, AnalysisData, DashboardMetrics } from '@/types/meta-stats';

/**
 * Checks if it's a new day based on NY timezone (5 PM EST market close)
 * Syncs with backend reset logic
 */
const isNewDay = (lastResetDate: string | null): boolean => {
  if (!lastResetDate) return true;
  
  const now = new Date();
  const currentNYDate = new Date(now.toLocaleString('en-US', {
    timeZone: 'America/New_York'
  })).toDateString();
  
  const lastResetNYDate = new Date(lastResetDate).toDateString();
  
  return currentNYDate !== lastResetNYDate;
};

/**
 * Gets today's date in NY timezone for consistent reset timing
 */
const getNYDateString = (): string => {
  const now = new Date();
  const nyDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return nyDate.toISOString().split('T')[0]; // YYYY-MM-DD format
};

/**
 * Detects if daily reset should occur and what the new starting balance should be
 */
const getDailyResetInfo = (metaStatsData: MetaStatsData, analysisData: AnalysisData | null = null) => {
  const currentEquity = metaStatsData.equity || metaStatsData.balance || 0;
  const storedStartingBalance = analysisData?.startingBalance;
  const lastUpdateDate = analysisData?.updatedAt;
  
  // Check if it's a new day
  const shouldReset = isNewDay(lastUpdateDate || null);
  
  if (shouldReset) {
    return {
      shouldReset: true,
      newStartingBalance: currentEquity,
      resetDate: getNYDateString()
    };
  }
  
  return {
    shouldReset: false,
    newStartingBalance: storedStartingBalance || currentEquity,
    resetDate: lastUpdateDate
  };
};

export const calculateDashboardMetrics = (metaStatsData: MetaStatsData, analysisData: AnalysisData | null = null, mtAccountBalance: number | null = null) => {
  const deposits = metaStatsData.deposits || 0;
  // Use mtAccount balance as the official challenge account size for calculations
  const challengeAccountSize = mtAccountBalance || deposits;
  const dailyLossLimit = 5; // 5%
  const maxLossLimit = 10; // 10%
  const profitTarget = 10; // 10%
  
  // Get reset info for tracking daily profit/loss
  const resetInfo = getDailyResetInfo(metaStatsData, analysisData);
  const todaysStartingBalance = resetInfo.newStartingBalance;
  
  // DAILY LOSS LIMIT CALCULATION (5% of today's starting balance)
  // Daily loss limit should be based on today's starting balance, not fixed account size
  const dailyLossLimitDollars = todaysStartingBalance * dailyLossLimit / 100;
  
  
  // Get today's specific profit/loss from dailyGrowth array or calculate from current equity
  const getTodaysProfit = () => {
    const today = getNYDateString(); // Use consistent NY timezone function
    const dailyGrowth = metaStatsData.dailyGrowth || [];
    const currentEquity = metaStatsData.equity || metaStatsData.balance || 0;
    
    // Find today's entry in dailyGrowth
    const todaysEntry = dailyGrowth.find((entry: { date: string; profit?: number }) => {
      const entryDate = new Date(entry.date).toISOString().split('T')[0];
      return entryDate === today;
    });
    
    // If found in dailyGrowth, use that profit
    if (todaysEntry?.profit !== undefined) {
      return todaysEntry.profit;
    }
    
    // Otherwise calculate from current equity vs starting balance
    // If reset detected, today's profit should be 0 (fresh start)
    if (resetInfo.shouldReset) {
      return 0;
    }
    
    // Calculate today's profit as current equity - starting balance
    return currentEquity - todaysStartingBalance;
  };
  
  const todaysProfit = getTodaysProfit();
  const currentDailyLossDollars = todaysProfit < 0 ? Math.abs(todaysProfit) : 0;
  const dailyLossRemaining = dailyLossLimitDollars - currentDailyLossDollars;
  const dailyLossProgress = (currentDailyLossDollars / dailyLossLimitDollars) * 100;
  
  // MAX LOSS LIMIT CALCULATION
  // Calculate based on peak balance (high watermark), but never less than challenge account size
  const currentBalance = metaStatsData.balance || challengeAccountSize;
  // Use highestBalance from MetaStats if available, but ensure it's at least the challenge account size
  const peakBalance = Math.max(
    metaStatsData.highestBalance || 0,
    metaStatsData.maxBalance || 0,
    challengeAccountSize
  );
  const maxLossLimitDollars = peakBalance * maxLossLimit / 100; // 10% of peak balance
  const thresholdAmount = peakBalance - maxLossLimitDollars; // The point at which max loss is hit
  const maxLossRemaining = currentBalance - thresholdAmount; // How much can be lost before hitting threshold
  
  // Calculate progress: 0% when at or above peak balance, 100% when at threshold
  const lossFromPeak = peakBalance - currentBalance;
  const maxLossProgress = lossFromPeak > 0 
    ? Math.min(100, (lossFromPeak / maxLossLimitDollars) * 100)
    : 0;
  
  
  // PROFIT TARGET CALCULATION
  const profitTargetDollars = challengeAccountSize * profitTarget / 100; // 10% of mtAccount balance or deposits
  // Calculate actual profit as difference between current balance and initial balance
  const currentProfitDollars = (metaStatsData.balance || challengeAccountSize) - challengeAccountSize;
  const currentGainDollars = Math.max(0, currentProfitDollars); // Only positive profits count toward target
  const profitRemaining = profitTargetDollars - currentGainDollars;
  const profitProgress = (currentGainDollars / profitTargetDollars) * 100;
  
  return {
    dailyLoss: {
      remaining: dailyLossRemaining.toFixed(2),
      progress: dailyLossProgress.toFixed(1),
      current: currentDailyLossDollars.toFixed(2),
      limit: dailyLossLimitDollars.toFixed(2),
      percentage: dailyLossProgress.toFixed(2)
    },
    maxLoss: {
      remaining: maxLossRemaining.toFixed(2),
      progress: maxLossProgress.toFixed(1),
      current: (lossFromPeak > 0 ? lossFromPeak : 0).toFixed(2),
      limit: maxLossLimitDollars.toFixed(2),
      percentage: maxLossProgress.toFixed(2)
    },
    profitTarget: {
      remaining: profitRemaining.toFixed(2),
      progress: profitProgress.toFixed(1),
      current: currentGainDollars.toFixed(2),
      target: profitTargetDollars.toFixed(2),
      percentage: ((currentGainDollars / challengeAccountSize) * 100).toFixed(2)
    }
  };
};

export const createTradingObjectives = (metaStats: MetaStatsData, dashboardMetrics: DashboardMetrics, challengeAccountSize: number | null = null) => {
  // Get current EST time as a string, e.g. "3:45 PM"
  const now = new Date();
  const estTime = now.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return [
    {
      label: "Daily Loss Limit",
      valueLeft: `${dashboardMetrics.dailyLoss.remaining} Left`,
      percentage: Math.max(0, 100 - parseFloat(dashboardMetrics.dailyLoss.progress)),
      time: estTime,
      details: [
        { label: "Maximum daily loss", value: `${dashboardMetrics.dailyLoss.limit}` },
        {
          label: "Today's starting balance/equity",
          value: `${(metaStats.balance || 0)?.toFixed(2)}`,
        },
        {
          label: "Threshold at",
          value: `${((metaStats.balance || 0) - parseFloat(dashboardMetrics.dailyLoss.limit))?.toFixed(2)}`,
        },
      ],
      completed: parseFloat(dashboardMetrics.dailyLoss.progress) === 0,
    },
    {
      label: "Max Loss Limit",
      valueLeft: `${dashboardMetrics.maxLoss.remaining} Left`,
      percentage: Math.max(0, 100 - parseFloat(dashboardMetrics.maxLoss.progress)),
      time: estTime,
      details: [
        { label: "Maximum loss", value: `${dashboardMetrics.maxLoss.limit}` },
        {
          label: "Peak balance",
          value: `${(metaStats.highestBalance || metaStats.maxBalance || challengeAccountSize || metaStats.deposits || 0)?.toFixed(2)}`,
        },
        {
          label: "Threshold at",
          value: `${((metaStats.highestBalance || metaStats.maxBalance || challengeAccountSize || metaStats.deposits || 0) - parseFloat(dashboardMetrics.maxLoss.limit))?.toFixed(2)}`,
        },
      ],
      completed: parseFloat(dashboardMetrics.maxLoss.progress) === 0,
    },
    {
      label: "Profit Target",
      valueLeft: `${dashboardMetrics.profitTarget.remaining} Left`,
      percentage: Math.max(0, parseFloat(dashboardMetrics.profitTarget.progress)),
      time: estTime,
      details: [{ label: "Profit target", value: `${dashboardMetrics.profitTarget.target}` }],
      completed: parseFloat(dashboardMetrics.profitTarget.progress) >= 100,
      highlight: true,
    },
  ];
};

/**
 * Utility function to detect if daily reset should occur
 * Can be used by other components or API calls to sync with backend
 */
export const checkDailyReset = (metaStatsData: MetaStatsData, analysisData: AnalysisData | null = null) => {
  return getDailyResetInfo(metaStatsData, analysisData);
};

/**
 * Utility to get current NY timezone date string
 * Useful for consistent date comparisons across the app
 */
export const getCurrentNYDate = () => {
  return getNYDateString();
};