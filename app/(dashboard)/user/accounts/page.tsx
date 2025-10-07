"use client";

import { useAccounts } from "@/lib/hooks/use-accounts";
import { CardSection } from "@/components/trading-components/card-section";
import CardContainer from "@/components/common/card-container";
import AccountOverviewChart from "@/components/chart/account-overview-chart";
import MetricCard from "@/components/common/metric-cards";
import TradingBehaviorSection from "@/components/common/trading-behavior";
import ChallengesOverview from "@/components/common/challenges-overview";
import DashboardPageContainer from "@/components/common/dashboard-page-container";
import { Spinner } from "@/components/ui/spinner";

export default function TradingAccountsPage() {
  const { currentAccount, currentAccountData, loading, error } = useAccounts();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="h-screen overflow-hidden pb-10 md:pb-0">
        <DashboardPageContainer>
          <div className="h-full flex items-center justify-center">
            <Spinner variant="ring" className="h-8 w-8 text-white" />
          </div>
        </DashboardPageContainer>
      </div>
    );
  }

  if (error || !currentAccount || !currentAccountData) {
    return (
      <div className="p-3 md:p-6 md:pb-4 xl:h-[85vh] relative outline-0">
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-b from-blue to-blue/50 rotate-[14deg] blur-3xl opacity-20 z-0 pointer-events-none"></div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">No Account Data</h2>
            <p className="text-gray-400">{error || "Please select an account"}</p>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from current account
  const { metaStats, mtAccount } = currentAccountData;
  const accountBalance = metaStats?.balance || mtAccount.balance || 0;
  
  const averageWin = currentAccount?.averageWin || 0;
  const averageLoss = currentAccount?.averageLoss || 0;
  const winRatio = currentAccount?.winRatio || 0;
  return (
    <div className="p-3 md:p-6 md:pb-4 xl:h-[85vh] relative outline-0">
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-b from-blue to-blue/50 rotate-[14deg] blur-3xl opacity-20 z-0 pointer-events-none"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-full">
        <div className="lg:col-span-1 column-panel rounded-[14px] p-5 h-full overflow-auto">
          <CardSection />
        </div>
        <div className="lg:col-span-2 h-full overflow-auto space-y-5">
        <CardContainer 
                title="Account Overview" 
                subtitle={`#${currentAccount.login}`}
                className="h-fit"
                customHeader={
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
                    <div>
                      <h2 className="text-white font-lay-grotesk font-semibold text-lg leading-none">
                        Account Overview
                      </h2>
                      <p className="font-lay-grotesk font-medium text-lg mt-[3px] md:mt-[5px]" style={{ color: '#FFFFFF80' }}>
                      #{currentAccount.login}
                      </p>
                    </div>
                    <div className="w-full md:w-fit h-[36px] md:h-[40px] sm:h-[42px] bg-gradient-to-b from-white/[0.07] to-white/[0.03] px-[10px] md:px-[14px] py-[8px] md:py-[10px] flex items-center">
                      <p className="text-white font-lay-grotesk font-medium text-base leading-[136%] tracking-[-2%] whitespace-nowrap">
                        Created: {formatDate(mtAccount.createdAt)}
                      </p>
                    </div>
                  </div>
                }
              >
                <div className="mt-5">
                  <AccountOverviewChart />
                </div>
                
                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <MetricCard label="Account balance" value={formatCurrency(accountBalance)} valueColor="white" />
                  <MetricCard label="Average win" value={formatCurrency(averageWin)} valueColor="green" />
                  <MetricCard label="Average loss" value={formatCurrency(averageLoss)} valueColor="red" />
                  <MetricCard label="Win ratio" value={`${winRatio.toFixed(2)}%`} valueColor="white" />
                </div>
              </CardContainer>
              
              <div className="mt-5">
                <TradingBehaviorSection className="!w-full sm:!w-full lg:!w-full xl:!w-full min-[1308px]:!w-full" />
              </div>
              
              <CardContainer 
                title="Overall Details" 
                className="h-fit"
              >
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  <MetricCard label="Total challenges bought" value="50" valueColor="white" />
                  <MetricCard label="Total amount paid" value="$292,321.23" valueColor="white" />
                  <MetricCard label="Total payouts" value="140" valueColor="white" />
                  <MetricCard label="Total funded accounts" value="14" valueColor="white" />
                  <MetricCard label="Total amount spent" value="$22,321.23" valueColor="white" />
                  <MetricCard label="Payout ratio" value="13.1r" valueColor="white" />
                </div>
              </CardContainer>
              
              <ChallengesOverview className="!w-full" />
        </div>
      </div>
    </div>
  );
}
