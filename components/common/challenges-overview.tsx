"use client";

import { useAccounts } from "@/lib/hooks/use-accounts";
import { calculateDashboardMetrics } from "@/lib/utils/dashboard-metrics";
import ChallengeProgress from "./challenge-progress";
import DashboardHeadings from "./dashboard-headings";

export default function ChallengesOverview({
  className,
}: {
  className?: string;
}) {
  const { currentAccountData, loading, error } = useAccounts();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };


  if (loading) {
    return (
      <div
        className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full lg:w-[33%] xl:w-[47%] flex flex-col justify-between ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-4 bg-white/20 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !currentAccountData) {
    return (
      <div
        className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full lg:w-[33%] xl:w-[47%] flex flex-col justify-between ${className}`}
      >
        <div className="flex flex-col xl:flex-row items-start gap-2 xl:justify-between xl:items-center">
          <DashboardHeadings title="Challenge Stats Overview" />
          <div className="border-white/10 border rounded-[10px] font-creato-display font-light py-2 px-3 text-sm gradient-dark-primary text-white">
            <span className="opacity-70">No Data</span>
          </div>
        </div>
        <div className="mt-5 space-y-4.5">
          <ChallengeProgress challengeCompleted={false} title="Drawdown" value="No Data" />
          <ChallengeProgress challengeCompleted={false} title="Profit Target" value="No Data" />
          <ChallengeProgress challengeCompleted={false} title="Remaining Days" value="No Data" />
          <ChallengeProgress challengeCompleted={false} title="Win Rate" value="No Data" />
        </div>
      </div>
    );
  }

  const { metaStats, analysis, mtAccount } = currentAccountData;
  
  const dashboardMetrics = calculateDashboardMetrics(
    metaStats || {},
    analysis?.[0] || null,
    mtAccount?.balance || null
  );

  const isTwoPhase = mtAccount?.challengeType === 'twoPhase';
  const currentPhase = isTwoPhase ? 'Phase 1' : 'Status';
  
  // Calculate trading days based on total trades
  const totalTrades = metaStats?.trades || 0;
  const minTradingDays = isTwoPhase ? 2 : 0;
  const maxTradingDays = isTwoPhase ? 10 : 5;
  const estimatedTradingDays = Math.min(totalTrades, minTradingDays + 5);
  const tradingDaysProgress = Math.min((estimatedTradingDays / maxTradingDays) * 100, 100);


  const isDailyLossCompleted = parseFloat(dashboardMetrics.dailyLoss.progress) >= 100;
  const isMaxLossCompleted = parseFloat(dashboardMetrics.maxLoss.progress) >= 100; 
  const isProfitTargetCompleted = parseFloat(dashboardMetrics.profitTarget.progress) >= 100;
  const isTradingDaysCompleted = tradingDaysProgress >= 100;

  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full lg:w-[33%] xl:w-[47%] flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col xl:flex-row items-start gap-2 xl:justify-between xl:items-center">
        <DashboardHeadings title="Challenge Stats Overview" />
        <div
          className={`border-white/10 border rounded-[10px] font-creato-display font-light py-2 px-3 text-sm ${
            isProfitTargetCompleted
              ? "bg-gradient-to-b from-white to-blue border-b-0 text-black"
              : "gradient-dark-primary text-white"
          }`}
        >
          <span className="opacity-70">{currentPhase}:</span> {isProfitTargetCompleted ? "Completed" : "In Progress"}
        </div>
      </div>

      <div className="mt-5 space-y-4.5">
        <ChallengeProgress
          challengeCompleted={isDailyLossCompleted}
          title="Daily Loss Limit"
          value={`${formatCurrency(parseFloat(dashboardMetrics.dailyLoss.current))}/${formatCurrency(parseFloat(dashboardMetrics.dailyLoss.limit))}`}
          progress={parseFloat(dashboardMetrics.dailyLoss.progress)}
        />
        <ChallengeProgress
          challengeCompleted={isMaxLossCompleted}
          title="Max Loss Limit"
          value={`${formatCurrency(parseFloat(dashboardMetrics.maxLoss.current))}/${formatCurrency(parseFloat(dashboardMetrics.maxLoss.limit))}`}
          progress={parseFloat(dashboardMetrics.maxLoss.progress)}
        />
        <ChallengeProgress
          challengeCompleted={isTradingDaysCompleted}
          title="Trading Days"
          value={`${estimatedTradingDays}`}
          progress={tradingDaysProgress}
        />
        <ChallengeProgress
          challengeCompleted={isProfitTargetCompleted}
          title="Profit Target"
          value={`${formatCurrency(parseFloat(dashboardMetrics.profitTarget.current))}/${formatCurrency(parseFloat(dashboardMetrics.profitTarget.target))}`}
          progress={parseFloat(dashboardMetrics.profitTarget.progress)}
        />
      </div>
    </div>
  );
}
