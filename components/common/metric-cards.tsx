"use client";

import { memo } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  valueColor: "red" | "green" | "white";
  variant?: "horizontal" | "vertical";
}

const MetricCard = memo<MetricCardProps>(({ label, value, valueColor, variant = "vertical" }) => {
  const getValueColor = () => {
    switch (valueColor) {
      case "red": return "text-red-500";
      case "green": return "text-green-500";
      case "white": return "text-white";
      default: return "text-white";
    }
  };

  return (
    <div className="bg-instant-funding border-gradient-to-b rounded-[8px] p-3 flex flex-col">
      <span className="text-white/50 font-creato-display font-normal text-base leading-[100%] tracking-[-2%] truncate">
        {label}
      </span>
      <div className="h-3"></div>
      <span className={`font-creato-display font-medium text-lg leading-[100%] tracking-[-2%] truncate ${getValueColor()}`}>
        {value}
      </span>
    </div>
  );
});

MetricCard.displayName = "MetricCard";

export default MetricCard;
