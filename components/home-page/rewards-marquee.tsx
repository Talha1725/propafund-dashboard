"use client";

import * as React from "react";
import Image from "next/image";
import Frame from "../common/frame";
import { REWARD_ICON_SIZE } from "@/constants/homepage";
import r1 from "@/public/assets/reward-1.svg";
import r2 from "@/public/assets/reward-2.svg";
import r3 from "@/public/assets/reward-3.svg";
import r4 from "@/public/assets/reward-4.svg";
import r5 from "@/public/assets/reward-5.svg";
import r6 from "@/public/assets/reward-6.svg";

const rewards = [
  { src: r1, alt: "reward-1" },
  { src: r2, alt: "reward-2" },
  { src: r3, alt: "reward-3" },
  { src: r4, alt: "reward-4" },
  { src: r5, alt: "reward-5" },
  { src: r6, alt: "reward-6" },
];

export default function RewardsMarquee() {
  const renderLoop = (repeat: number) =>
    Array.from({ length: repeat }).map((_, loopIndex) => (
      <React.Fragment key={`rewards-loop-${loopIndex}`}>
        {rewards.map(({ src, alt }, idx) => (
          <Banner key={`${alt}-${loopIndex}-${idx}`} icon={src} alt={alt} />
        ))}
      </React.Fragment>
    ));

  return (
    <div className="relative z-50 mt-3 lg:mt-12 overflow-hidden">
      <div className="h-20 w-26 bg-black rounded-full -left-5 absolute top-1/2 -translate-y-1/2 blur-md opacity-80 z-[9999] lg:block hidden"></div>
      <div className="h-20 w-26 bg-black rounded-full -right-5 absolute top-1/2 -translate-y-1/2 blur-2xl lg:blur-md opacity-80 z-[9999] lg:block hidden"></div>
      <div className="brands-marquee-container">
        <div className="flex items-center gap-10">
          {renderLoop(3)}
        </div>
      </div>
    </div>
  );
}

function Banner({ icon, alt }: { icon: any; alt: string }) {
  return (
    <Frame variants="white" topBottomThicknessPx={2.57} sideThicknessPx={2.57} edgeStretchPercent={100}>
      <div className="relative w-[72px] h-[70px] sm:w-[81.43px] sm:h-[79px] p-[2px] sm:p-[2.14px]">
        <div className="w-full h-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-b from-[#60A8E8] to-[#3B62B8] flex items-center justify-center">
          <Image src={icon} alt={alt} width={REWARD_ICON_SIZE} height={REWARD_ICON_SIZE} className="opacity-100 w-[28px] h-[28px] sm:w-[36px] sm:h-[36px]" />
        </div>
      </div>
    </Frame>
  );
}


