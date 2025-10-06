"use client";

import { useAccounts } from "@/lib/hooks/use-accounts";
import ChallengeProgress from "./challenge-progress";
import DashboardHeadings from "./dashboard-headings";

export default function ChallengesOverview({
  className,
  phaseCompleted,
}: {
  className?: string;
  phaseCompleted?: boolean;
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
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

  // Extract data from currentAccountData
  const { metaStats, analysis, mtAccount } = currentAccountData;
  
  const currentAnalysis = analysis?.[0];
  const drawdown = currentAnalysis?.dailyLoss || 0;
  const maxDrawdown = currentAnalysis?.maxDrawdown || 0;
  const profitTarget = currentAnalysis?.fund || 0;
  const totalPnL = metaStats?.profit || 0;
  const currentPhase = mtAccount.challengePhase || 'Phase 1';

  
  // Calculate remaining days (assuming 30-day challenge)
  const phaseStartDate = mtAccount.phaseStartDate ? new Date(mtAccount.phaseStartDate) : new Date();
  const daysElapsed = Math.floor((Date.now() - phaseStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(0, 30 - daysElapsed);
  
  // Calculate win rate from trades
  const totalTrades = metaStats?.trades || 0;
  const winRate = totalTrades > 0 ? 
    ((metaStats?.periods?.today?.trades || 0) / totalTrades) * 100 : 0;

  // Calculate phase progress
  const phaseProgress = profitTarget > 0 ? (totalPnL / profitTarget) * 100 : 0;

  // Determine completion status
  const isPhaseCompleted = phaseProgress >= 100 || phaseCompleted;
  const isDrawdownCompleted = drawdown <= maxDrawdown;
  const isProfitTargetCompleted = totalPnL >= profitTarget;

  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full lg:w-[33%] xl:w-[47%] flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col xl:flex-row items-start gap-2 xl:justify-between xl:items-center">
        <DashboardHeadings title="Challenge Stats Overview" />
        <div
          className={`border-white/10 border rounded-[10px] font-creato-display font-light py-2 px-3 text-sm ${
            isPhaseCompleted
              ? "bg-gradient-to-b from-white to-blue border-b-0 text-black"
              : "gradient-dark-primary text-white"
          }`}
        >
          <span className="opacity-70">{currentPhase}:</span> {isPhaseCompleted ? "Completed" : "In Progress"}
        </div>
      </div>

      <div className="mt-5 space-y-4.5">
        <ChallengeProgress
          challengeCompleted={isDrawdownCompleted}
          title="Drawdown"
          value={`${formatCurrency(drawdown)}/${formatCurrency(maxDrawdown)}`}
        />
        <ChallengeProgress
          challengeCompleted={isProfitTargetCompleted}
          title="Profit Target"
          value={`${formatCurrency(totalPnL)}/${formatCurrency(profitTarget)}`}
        />
        <ChallengeProgress
          challengeCompleted={remainingDays === 0}
          title="Remaining Days"
          value={`${remainingDays}/30`}
        />
        <ChallengeProgress
          challengeCompleted={winRate >= 50}
          title="Win Rate"
          value={formatPercentage(winRate)}
        />
      </div>
    </div>
  );
}
