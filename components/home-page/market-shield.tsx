"use client";

import { cn } from "@/lib/utils";
import Container from "../common/container";
import Frame from "../common/frame";
import SectionHeader from "../common/section-header";
import marketShield from "@/public/assets/bg-marble.svg";
import Image, { StaticImageData } from "next/image";
import * as React from "react";
import Glow from "../common/glow";
import marbleSpark from "@/public/assets/marble-spark.svg";
import marbleMoney from "@/public/assets/marble-cash.svg";
import marbleGraph from "@/public/assets/marble-graph.png";
import marbleClipboard from "@/public/assets/marable-paperroll.svg";

export default function MarketShieldSection({ className }: { className?: string }) {
  return (
    <div className={cn("font-creato-display py-30", className)}>
      <Container>
      <Frame variants="white" topBottomThicknessPx={6} sideThicknessPx={12} className={cn("w-full")}>
      <div className="">
        <Image
          src={marketShield}
          alt="market-shield background"
          fill
          priority
          aria-hidden
          className="object-cover -z-10 select-none pointer-events-none"
        />
      <div className="w-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-b from-[#60A8E8D9] to-[#3B62B8D9]">

        <SectionHeader
          className="mt-15"
          title="Your Shield in the Markets"
          text="More than funding — we equip you with the tools to win."
        />
        {/* Local cards matching ToolCards styling, but no title or icon */}
        <div className="w-full grid md:grid-cols-4 gap-10 relative mt-5 sm:mt-15 px-[100px] pb-[100px]">
          <LocalCard
            content="INSTANT SETUP & CLEAR RULES"
            image={marbleSpark}
            imageWrapperClass="ml-auto mr-0"
          />
          <LocalCard
            content="UP TO 90% PROFIT SHARE"
            image={marbleMoney}
            imageWrapperClass="ml-auto mr-0"
          />
          <LocalCard
            content="REAL-TIME DASHBOARD"
            image={marbleGraph}
            imageWrapperClass="ml-auto mr-0"
          />
          <LocalCard
            content="EXPERT SUPPORT & RESOURCES"
            image={marbleClipboard}
            imageWrapperClass="ml-auto mr-0"
          />
        </div>
        </div>
          <div className="w-full overflow-hidden rounded-none border border-white/30 bg-gradient-to-b from-[#60A8E8D9] to-[#3B62B8D9]">
          </div>
          </div>
        </Frame>
      </Container>
    </div>
  );
}

function LocalCard({
  content,
  image,
  imageWrapperClass,
}: {
  content: string;
  image: StaticImageData;
  imageWrapperClass?: string;
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className={`overflow-hidden relative w-full !p-0 flex-col flex justify-between transition-all duration-300 ease-in-out ${hover ? 'border-0' : 'border border-[#FFFFFF1A]'}`}
      style={{
        background: hover ? '#FFFFFF' : "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center">
        <Glow width={800} height={500} opacity={0.25} />
      </div>
      {/* No overlay or borders on hover; background turns solid white */}

      <div className="pt-4 px-4 pb-0 relative z-10">
        <p className={`h-fit mb-2 font-lay-grotesk mt-1 z-50 md:text-[16px] text-[16px] lg:w-[90%] transition-colors duration-300 ${hover ? 'text-[#0B0D12]' : 'text-white'}`}>{content}</p>
      </div>

      <div className={`${imageWrapperClass ?? ""} relative z-10 -mt-2`}>
        <Image src={image} alt="card-image" width={186} height={186} className="w-[186px] h-[186px] opacity-100 rotate-0" />
      </div>
    </div>
  );
}
