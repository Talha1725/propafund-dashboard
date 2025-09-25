"use client";

import Image from "next/image";
import masterChallenge from "@/public/assets/dashbaord.svg";
import sword from "@/public/assets/sword.svg";
import Container from "../common/container";
import SectionHeader from "../common/section-header";
import Frame from "../common/frame";
import { Button } from "../ui/button";
import FramedTable from "../common/framed-table";
import Glow from "../common/glow";

export default function MasterChallengeSection() {
  return (
    <div className="font-creato-display">
      <Container>
        <div className="relative">
        <SectionHeader
          title="Master Your Challenge in Real-Time"
          text="See every stat that matters — live profit tracking, drawdown monitoring, progress milestones, and more — all in one powerful dashboard."
        />
        <div className="mt-10 flex justify-center relative">
          <Frame variants="white" className="w-full max-w-[1104px] aspect-[1104/693.566650390625]">
            <div
              className="relative w-full h-full p-[6.13px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(59, 169, 244, 0.1) 0%, rgba(79, 84, 178, 0.1) 100%)",
              }}
            >
              <Image
                src={masterChallenge}
                alt="master-challenge"
                width={1104}
                height={694}
                className="absolute w-full h-full object-cover"
                style={{
                  top: '1.21%',
                  left: '-0.07%',
                }}
                priority
              />
            </div>
          </Frame>
          {/* Sword image positioned near top-right, overlapping heading area without shifting layout
          <Image
            src={sword}
            alt="sword"
            width={300}
            height={600}
            className="absolute right-[-10px] sm:right-[-20px] md:right-[-36px] lg:right-[-48px] top-[-120px] sm:top-[-140px] md:top-[-170px] lg:top-[-190px] w-[120px] sm:w-[160px] md:w-[220px] lg:w-[260px] h-auto opacity-90 z-10 pointer-events-none"
          /> */}
        </div>
        <div className="flex justify-center mt-15">
          <Button variant="secondary" className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]">Get Funded Now</Button>
        </div>  
        <div className="pointer-events-none absolute inset-x-0 bottom-80 flex justify-center -z-10">
          <Glow width={2000} height={1200} opacity={0.55} shape="farthest-side" blur={100} zIndex={-10} />
        </div>
        </div>
      </Container>
    </div>
  );
}
