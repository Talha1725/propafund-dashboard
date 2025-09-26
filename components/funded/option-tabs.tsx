"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Frame from "@/components/common/frame";
import { cn } from "@/lib/utils";

interface OptionTabsProps {
  label: string;
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export default function OptionTabs({ label, options, selectedValue, onValueChange, className }: OptionTabsProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="font-romanica font-normal text-[20px] leading-[100%] tracking-[0%] uppercase text-white">
        {label}
      </label>
      <div className="pt-[20px]">
        <Tabs value={selectedValue} onValueChange={onValueChange} className="w-full">
        <TabsList className={cn("grid w-full", `grid-cols-${options.length}`)}>
          {options.map((option) => (
            <div key={option.value} className="relative flex-1">
              {selectedValue === option.value ? (
                <Frame variants="white" topBottomThicknessPx={6} sideThicknessPx={12} className="transition-all duration-300 hover:opacity-80 !h-[45px] absolute inset-0">
                  <div className="text-white text-[20px] font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap cursor-pointer">
                    {option.label}
                  </div>
                  <TabsTrigger value={option.value} className="data-[state=active]:text-transparent">
                    {option.label}
                  </TabsTrigger>
                </Frame>
              ) : (
                <TabsTrigger value={option.value}>
                  {option.label}
                </TabsTrigger>
              )}
            </div>
          ))}
        </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
