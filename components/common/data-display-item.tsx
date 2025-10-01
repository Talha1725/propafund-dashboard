import { memo } from "react";
import type { DataDisplayItemProps } from "@/types/common";

const DataDisplayItem = memo<DataDisplayItemProps>(({ label, value, valueColor = "white", variant = "horizontal" }) => {
  const getValueColorClass = (color: string) => {
    switch (color) {
      case "red":
        return "bg-gradient-to-b from-[#FF0633] to-[#C40023] bg-clip-text text-transparent";
      case "green":
        return "bg-gradient-to-b from-[#00EB6E] to-[#00853E] bg-clip-text text-transparent";
      case "white":
      default:
        return "text-white";
    }
  };

  if (variant === "vertical") {
    return (
      <div className="w-full rounded-[8px] border-[1px] xs:border-[1.26px] border-white/20 bg-white/[0.05] p-3 flex flex-col">
        <span className="text-white/50 font-lay-grotesk font-normal text-xs xs:text-sm sm:text-base leading-[100%] tracking-[-2%] truncate">
          {label}
        </span>
        <div className="h-3"></div>
        <span className={`font-lay-grotesk font-medium text-xs xs:text-sm sm:text-base leading-[100%] tracking-[-2%] truncate ${getValueColorClass(valueColor)}`}>
          {value}
        </span>
      </div>
    );
  }

  if (variant === "responsive") {
    return (
      <div className="w-full rounded-[8px] border-[1px] xs:border-[1.26px] border-white/20 bg-white/[0.05] p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <span className="text-white/50 font-lay-grotesk font-normal text-xs xs:text-sm sm:text-base leading-[100%] tracking-[-2%] truncate">
          {label}
        </span>
        <div className="h-3 lg:hidden"></div>
        <span className={`font-lay-grotesk font-medium text-xs xs:text-sm sm:text-base leading-[100%] tracking-[-2%] truncate ${getValueColorClass(valueColor)}`}>
          {value}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[8px] border-[1px] xs:border-[1.26px] border-white/20 bg-white/[0.05] p-3 flex items-center justify-between">
      <div className="w-full h-[14px] xs:h-[16px] flex justify-between items-center">
        <span className="text-white/50 font-lay-grotesk font-normal text-xs xs:text-sm sm:text-base leading-[100%] tracking-[-2%] truncate">
          {label}
        </span>
        <span className={`font-lay-grotesk font-medium text-xs xs:text-sm sm:text-base leading-[100%] tracking-[-2%] truncate ${getValueColorClass(valueColor)}`}>
          {value}
        </span>
      </div>
    </div>
  );
});

DataDisplayItem.displayName = "DataDisplayItem";

export default DataDisplayItem;
