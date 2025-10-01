import { CardSection } from "@/components/trading-components/card-section";
import ResponsiveTabs from "@/components/common/responsive-tabs";
import { ACCOUNT_OVERVIEW_DATA, ACCOUNT_TABS } from "@/constants/accounts";
import CardContainer from "@/components/common/card-container";
import DataDisplayItem from "@/components/common/data-display-item";
import BalanceChart from "@/components/chart/balance-chart";
import AccountOverviewChart from "@/components/chart/account-overview-chart";
import MetricCard from "@/components/common/metric-cards";
import TradingBehaviorSection from "@/components/common/trading-behavior";
import ChallengesOverview from "@/components/common/challenges-overview";

export default function TradingAccountsPage() {
  return (
    <div className="p-3 md:p-6 md:pb-4 space-y-5 min-h-screen overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 column-panel rounded-[14px] p-5 h-fit lg:h-full">
          <CardSection />
        </div>
        <div className="lg:col-span-2 h-fit lg:min-h-screen space-y-5">
        <CardContainer 
                title="Account Overview" 
                subtitle="#274178"
                className="h-fit"
                customHeader={
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
                    <div>
                      <h2 className="text-white font-lay-grotesk font-semibold text-lg leading-none">
                        Account Overview
                      </h2>
                      <p className="font-lay-grotesk font-medium text-lg mt-[3px] md:mt-[5px]" style={{ color: '#FFFFFF80' }}>
                      #274178
                      </p>
                    </div>
                    <div className="w-full md:w-fit h-[36px] md:h-[40px] sm:h-[42px] bg-gradient-to-b from-white/[0.07] to-white/[0.03] px-[10px] md:px-[14px] py-[8px] md:py-[10px] flex items-center">
                      <p className="text-white font-lay-grotesk font-medium text-base leading-[136%] tracking-[-2%] whitespace-nowrap">
                        Created: August 29, 2025 9:30 PM
                      </p>
                    </div>
                  </div>
                }
              >
                <div className="mt-5">
                  <AccountOverviewChart />
                </div>
                
                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <MetricCard label="Account balance" value="$52,300" valueColor="white" />
                  <MetricCard label="Average win" value="$129.34" valueColor="green" />
                  <MetricCard label="Average loss" value="$155.23" valueColor="red" />
                  <MetricCard label="Win ratio" value="82.23%" valueColor="white" />
                </div>
              </CardContainer>
              
              <div className="mt-5">
                <TradingBehaviorSection className="!w-full" />
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
