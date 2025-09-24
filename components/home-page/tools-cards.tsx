"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import Image from "next/image";
import Glow from "../common/glow";
import { TOOLS_CARDS, type ToolCardConfig } from "@/constants/homepage";
import { Button } from "../ui/button";

function ToolCard({
  title,
  description,
  icon,
  image,
  blobClass,
  imageWrapperClass,
}: ToolCardConfig) {
  return (
    <div className="overflow-hidden border border-[#FFFFFF1A] relative w-full !p-0 flex-col flex justify-between" style={{ background: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)" }}>
      <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center">
        <Glow width={800} height={500} opacity={0.25} />
      </div>
      <div className={blobClass}></div>
      <div className="p-4 relative z-10">
        <h1 className="md:text-[22px] font-lay-grotesk text-white z-50">{title}</h1>
        <p className="h-[50px] font-lay-grotesk text-white/50 mt-1 z-50 md:text-[16px] text-[16px] lg:w-[90%]">
          {description}
        </p>
      </div>
      <div className="w-[39px] absolute bottom-[10px] left-[10px] z-10">
        <Image src={icon} alt="tool-icon" width={100} height={100} className="w-full z-50 relative" />
      </div>
      <div className={`${imageWrapperClass} relative z-10`}>
        <Image src={image} alt="intro-card-image" width={100} height={100} className="w-full z-50 relative" />
      </div>
    </div>
  );
}

export default function ToolsCardsSection() {
  return (
    <div className="font-creato-display">
      <Container>
        <SectionHeader
          title="Tools to Match Your Hustle"
          text="Trade on platforms that feel like an extension of your brain—fast, sharp, and ready for action."
        />
        <div className="w-full grid md:grid-cols-3 gap-10 relative mt-5 sm:mt-15">
          {TOOLS_CARDS.map((card) => (
            <ToolCard key={card.title} {...card} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="secondary" className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]">Get Funded Now</Button>
        </div>
      </Container>
    </div>
  );
}

      
