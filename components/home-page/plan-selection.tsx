"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import Frame from "../common/frame";
import { cn } from "@/lib/utils";
import * as React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import plusColor from "@/public/assets/plus-color.svg";
import moneyIcon from "@/public/assets/money.svg";
import creditIcon from "@/public/assets/credit.svg";
import bitcoinIcon from "@/public/assets/bitcoin.svg";
import Glow from "../common/glow";

export default function PlanSelectionSection() {
  const [selectedPayment, setSelectedPayment] = React.useState<number>(2);
  return (
    <div className="font-creato-display pt-30">
      <Container>
        <SectionHeader
          title="Choose the Plan That Fits You Best"
          text="Flexible pricing with secure checkout. Customize your plan with optional add-ons for maximum value."
        />

        {/* Plans table */}
        <Frame variants="white" topBottomThicknessPx={6} sideThicknessPx={12} className={cn("w-full mt-10")}> 
          <div className="relative w-full p-2" style={{ background: "#ffffff" }}>
            <div className="w-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-b from-[#60A8E8] to-[#3B62B8]">
              {/* Header row */}
              <div className="grid" style={{ gridTemplateColumns: `repeat(4, minmax(0, 1fr))` }}>
                <div className="px-8 py-3 sm:py-4 border-b border-b-[6px] border-white text-white text-[18px] uppercase font-bold font-romanica text-left">Package</div>
                <div className="px-8 py-3 sm:py-4 border-b border-b-[6px] border-white text-white text-[18px] uppercase font-bold font-romanica text-left">Starter Plan</div>
                <div className="px-8 py-3 sm:py-4 border-b border-b-[6px] border-white text-white text-[18px] uppercase font-bold font-romanica text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="md:whitespace-nowrap">Pro Plan</span>
                    {/* Gradient pill tag */}
                    <span className="inline-flex items-center gap-1 rounded-full shrink-0 whitespace-nowrap mt-2 md:mt-0">
                      <span className="bg-gradient-to-b from-[#3BA9F4] to-[#4F54B2] rounded-full p-[1px]">
                        <span className="bg-gradient-to-b from-[#3BA9F4] to-[#4F54B2] text-white text-[12px] leading-none px-2 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                          <span>⚡</span>
                          <span>Most Popular</span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="px-8 py-3 sm:py-4 border-b border-b-[6px] border-white text-white text-[18px] uppercase font-bold font-romanica text-left">Elite Plan</div>
              </div>

              {/* Body rows */}
              {/* Price */}
              <div className="grid px-6" style={{ gridTemplateColumns: `repeat(4, minmax(0, 1fr))` }}>
                {[
                  ["Price", "$299", "$449", "$799"],
                  ["Time Period", "15-25 Days", "7-15 Days", "Under 3 Days"],
                  ["Advanced Analytics", "✕", "Yes", "With Exclusive Features"],
                  ["Account Manager", "✕", "Dedicated Account Manager", "Dedicated Manager"],
                  ["Support", "Basic", "Priority support", "24/7 Dedicated Manager"],
                ].map((row, rowIdx) => (
                  <React.Fragment key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <div
                        key={`${rowIdx}-${cellIdx}`}
                        className={cn(
                          "px-4 py-4 text-white/95 text-sm sm:text-base font-creato-display border-b border-white/20",
                          cellIdx !== 3 ? "border-b border-l-transparent border-r-transparent" : ""
                        )}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-white block w-full text-left">
                            {cellIdx === 0 ? (
                              <span className="text-[16px] font-[400]">{cell}</span>
                            ) : (
                              <span className="font-[600]">{cell}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </Frame>

        {/* Add-ons and Payment options */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          {/* Left: Bullet card */}
          <div
            className="relative w-full h-fit p-6 border border-[#FFFFFF1A]"
            style={{
              background:
                "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 flex -bottom-60 items-end justify-center">
              <Glow width={1200} height={700} opacity={0.85} shape="farthest-side" blur={100} />
            </div>
            <ul className="flex flex-col gap-[15px]">
              {[
                "Extra User License (+$20/mo)",
                "VIP Support Upgrade (+$30/mo)",
                "Automated Reports (+$15/mo)",
                "Second Account Half Off",
                "Business Infrastructure Setup",
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Image src={plusColor} alt="plus" width={18} height={18} />
                  <span className="font-creato-display font-normal text-[16px] leading-[150%] tracking-[-0.03em] text-white/90">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Payment options inside a frame */}
          <Frame variants="white" topBottomThicknessPx={6} sideThicknessPx={12} className={cn("w-full")}> 
            <div className="relative w-full p-4" style={{ background: "#ffffff" }}>
              <div className="relative w-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-b from-[#60A8E8] to-[#3B62B8] p-4 md:p-6 flex flex-col items-start gap-3 md:gap-4">
                {[
                  { label: "Pay with Bank Transfer", icon: moneyIcon },
                  { label: "Pay with Card", icon: creditIcon },
                  { label: "Pay with Crypto (15% Off)", icon: bitcoinIcon },
                ].map((opt, i) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedPayment(i)}
                    className={cn(
                      "relative z-10 w-full h-fit rounded-[12px] p-4 flex items-center justify-between text-white/95",
                      "bg-gradient-to-b from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.1)]",
                      selectedPayment === i ? "border border-white" : "border border-transparent"
                    )}
                  >
                    <span className="font-creato-display font-medium text-[14px] leading-[120%] tracking-[-0.03em]">
                      {opt.label}
                    </span>
                    <Image src={opt.icon} alt="option icon" width={24} height={24} className="relative z-10" />
                  </button>
                ))}

                <div className="flex justify-center">
                  <Button variant="secondary" className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]">Get Funded</Button>
                </div>             
              </div>
            </div>
          </Frame>
        </div>
      </Container>
    </div>
  );
}
