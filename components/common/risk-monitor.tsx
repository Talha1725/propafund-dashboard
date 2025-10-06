"use client";

import RiskChart from "../charts/risk-cahrt";
import { useAccounts } from "@/lib/hooks/use-accounts";

export default function RiskMonitor({ className }: { className?: string }) {
  const { currentAccountData } = useAccounts();

  const riskData = (() => {
    if (!currentAccountData) {
      return {
        currentLoss: 0,
        maxLoss: 5000,
        riskType: "Overall loss"
      };
    }

    const { metaStats, mtAccount } = currentAccountData;
    
    const currentBalance = metaStats?.balance || mtAccount?.balance || 0;
    const initialBalance = mtAccount?.balance || 0;
    
    const currentLoss = Math.max(0, initialBalance - currentBalance);
    const maxLoss = initialBalance * 0.1;
    
    return {
      currentLoss,
      maxLoss: Math.max(1000, maxLoss), 
      riskType: "Overall loss"
    };
  })();

  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] w-full sm:w-[48.50%] lg:w-[33%] xl:w-[26%] flex flex-col gap-8 ${className}`}
    >
      <div className="flex flex-col items-start gap-2.5 p-4 pb-0">
        <h1 className="text-white md:font-medium md:text-lg font-creato-display">
        Risk Monitor
        </h1>
      </div>

      <div>
         <RiskChart 
           value={riskData.currentLoss}
           risk={riskData.riskType}
           maxValue={riskData.maxLoss}
         />
      </div>
    </div>
  );
}