"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Frame from "./frame";
import { Button } from "@/components/ui/button";
import { FramedTableProps } from "@/types/common";

export default function FramedTable({ headers, rows, className = "", showHeaders = true, showButton = false, buttonText = "Complete Order", boldText = false, specialOrderTotal = false }: FramedTableProps) {
  const columnCount = headers?.length || (rows.length > 0 ? rows[0].length : 0);
  
  return (
    <Frame variants="white" topBottomThicknessPx={6} sideThicknessPx={12} className={cn("w-full", className)}>
      <div className="relative w-full p-2" style={{ background: "#ffffff" }}>
        <div className="w-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-b from-[#60A8E8] to-[#3B62B8]">
          {showHeaders && headers && (
            <div className="grid" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}>
              {headers.map((h, i) => (
                <div key={i} className="px-8 py-3 sm:py-4 border-b border-b-[6px] border-white text-white text-[18px] uppercase font-bold font-romanica text-left">
                  {h}
                </div>
              ))}
            </div>
          )}

          {rows.map((cells, rowIdx) => {
            // Check if this is the "Order Total" row and if special styling is enabled
            const isOrderTotalRow = specialOrderTotal && cells[0] === "Order Total";
            
            return (
              <div
                key={rowIdx}
                className="grid px-6"
                style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
              >
                {cells.map((cell, cellIdx) => (
                  <div
                    key={cellIdx}
                    className={cn(
                      "pr-4 pl-0 py-4 text-white/95 text-sm sm:text-base font-creato-display",
                      "border-b border-white/20",
                      cellIdx !== columnCount - 1 ? "border-b border-l-transparent border-r-transparent" : ""
                    )}
                  >
                    <div className="flex items-left justify-left gap-0">
                      <span className="text-white">{rowIdx === 0 && cellIdx === 0 ? "" : ""}</span>
                      <span className={cn(
                        "block w-full text-left",
                        isOrderTotalRow 
                          ? "font-creato-display font-medium text-[24px] leading-[100%] tracking-[-2%]" 
                          : boldText 
                            ? "font-creato-display font-bold text-[16px] leading-[100%] tracking-[-2%]" 
                            : "text-[16px] font-[400]"
                      )}>{cell}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          
          {showButton && (
            <div className="px-6 py-4 flex justify-center">
              <Button variant="secondary" className="w-full h-[45px] px-[30px] py-[12px] gap-[15px]">
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
}


