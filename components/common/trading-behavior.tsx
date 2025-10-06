"use client";

import DashboardHeadings from "./dashboard-headings";
import { calculateTradingBehavior } from "@/lib/utils/trading-behavior";
import { useAccounts } from "@/lib/hooks/use-accounts";

export default function TradingBehaviorSection({
  className,
}: {
  className?: string;
}) {
  const { currentAccountData } = useAccounts();
  
  // Calculate dynamic trading behavior
  const tradingBehaviorData = calculateTradingBehavior({
    metaStats: currentAccountData?.metaStats,
    trades: currentAccountData?.trades || []
  });
  return (
    <div
      className={`border border-t-white border-l-[#b6dbef] border-r-[#7fc6ec] border-b-[#4EB2E4] w-full sm:w-[48.50%] lg:w-[33%] xl:w-[30%] min-[1308px]:!w-[28%] rounded-[14px] p-4 bg-gradient-to-b from-white to-blue relative overflow-hidden h-[290px] sm:h-auto ${className}`}
    >
      <div className="h-full flex flex-col gap-2 justify-between">
        <div>
          <DashboardHeadings title="Your Trading Behavior" className="!text-black" />
        </div>

        <div>
          {tradingBehaviorData.map((item, index) => (
            <div key={index} className={`${index < tradingBehaviorData.length - 1 ? 'border-b-2 border-[#0B0E121A]' : ''} flex justify-between py-3`}>
              <p className="font-creato-display text-sm text-[#0B0E12]/70">{item.label}</p>
              <p className="font-creato-display text-sm text-dark font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
