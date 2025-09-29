"use client";

import PerformancePieChart from "../charts/pie-chart";

export default function ScallingStatus({ className }: { className?: string }) {
  return (
    <div
      className={`border border-white/10 gradient-dark-primary rounded-[14px] p-4 w-full sm:w-[48.50%] lg:w-[38%] min-[1410px]:!w-[29%] min-[1465px]:!w-[28%] flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col items-start gap-2.5">
        <h1 className="text-white md:font-medium md:text-lg font-creato-display">
          Scaling Status
        </h1>
        <div className="gradient-dark-primary border-white/10 border rounded-[10px] font-creato-display py-2 px-3 text-sm">
          <span className="text-white/80">Next Milestone: </span>$60,000
        </div>
      </div>

      <div>
        <PerformancePieChart
          data={[
            { name: "Completed", value: 77 },
            { name: "Remaining", value: 23 },
          ]}
          colors={["#1CCDE6", "#ffffff11"]}
          height={160}
          innerRadius={100}
          outerRadius={135}
        />
      </div>
    </div>
  );
}
