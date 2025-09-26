"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoP from "@/public/assets/logop.svg";

interface PriceBarProps {
  prices: (string | number)[];
  className?: string;
}

export default function PriceBar({ prices, className = "" }: PriceBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full">
        <div className="absolute left-0 right-0 top-[14%] transform -translate-y-1/2 border-t border-white/100 sm:block hidden" />
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 border-l border-white/100 sm:hidden block" />
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          {prices.map((p, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {p === 50000 ? (
                <>
                  <Image
                    src={logoP}
                    alt="logop"
                    width={28}
                    height={28}
                    className="relative top-2 -translate-y-1/2"
                  />
                  <span className="mt-[2px] text-white text-[18px] sm:text-[20px] font-creato-display bg-black px-2 sm:bg-transparent sm:px-0">{typeof p === "number" ? `$${p.toLocaleString()}` : p}</span>
                </>
              ) : (
                <>
                  <div
                    className="size-4 rounded-[4px] bg-white/100 relative top-2 -translate-y-1/2"
                    style={{ backdropFilter: "blur(24px)" }}
                  />
                  <span className="mt-[14px] text-white text-[18px] sm:text-[20px] font-creato-display bg-black px-2 sm:bg-transparent sm:px-0">{typeof p === "number" ? `$${p.toLocaleString()}` : p}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


