"use client";

import RiskChart from "../charts/risk-cahrt";

export default function RiskMonitor({ className }: { className?: string }) {
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
         <RiskChart />
      </div>
    </div>
  );
}