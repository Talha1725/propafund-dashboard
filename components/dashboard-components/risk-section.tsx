"use client";

import PerformancePieChart from "../charts/pie-chart";
import RiskChart from "../charts/risk-cahrt";

export default function RiskSection({ className }: { className?: string }) {
  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full sm:w-[48.50%] lg:w-[33%] xl:w-[28%] flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col items-start gap-2.5">
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
