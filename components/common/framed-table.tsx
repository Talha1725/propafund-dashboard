"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Frame from "./frame";
import PriceBar from "./price-bar";
import { FramedTableProps } from "@/types/common";

export default function FramedTable({ headers, rows, caption, className = "" }: FramedTableProps) {
  return (
    <Frame variants="white" topBottomThicknessPx={6} sideThicknessPx={12} className={cn("w-full", className)}>
      <div className="relative w-full p-2" style={{ background: "#ffffff" }}>
        <div className="w-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-b from-[#60A8E8] to-[#3B62B8]">
          <div className="grid" style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
            {headers.map((h, i) => (
              <div key={i} className="px-8 py-3 sm:py-4 border-b border-b-[6px] border-white text-white text-[18px] uppercase font-bold font-romanica text-left">
                {h}
              </div>
            ))}
          </div>

          {rows.map((cells, rowIdx) => (
            <div
              key={rowIdx}
              className="grid px-6"
              style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
            >
              {cells.map((cell, cellIdx) => (
                <div
                  key={cellIdx}
                  className={cn(
                    "px-4 py-4 text-white/95 text-sm sm:text-base font-creato-display",
                    "border-b border-white/20",
                    cellIdx !== headers.length - 1 ? "border-b border-l-transparent border-r-transparent" : ""
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white">{rowIdx === 0 && cellIdx === 0 ? "" : ""}</span>
                    <span className={cn(
                      "block w-full text-left",
                      cellIdx === 0 ? "text-[16px] font-[400]" : "font-[600]"
                    )}>{cell}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}


