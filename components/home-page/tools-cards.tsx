"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import { TOOLS_CARDS } from "@/constants/homepage";
import { Button } from "../ui/button";
import ToolCards from "../common/tool-cards";

export default function ToolsCardsSection() {
  return (
    <div className="font-creato-display">
      <Container>
        <SectionHeader
          title="Tools to Match Your Hustle"
          text="Trade on platforms that feel like an extension of your brain—fast, sharp, and ready for action."
        />
        <ToolCards
          title1={TOOLS_CARDS[0].title}
          title2={TOOLS_CARDS[1].title}
          title3={TOOLS_CARDS[2].title}
          content1={TOOLS_CARDS[0].description}
          content2={TOOLS_CARDS[1].description}
          content3={TOOLS_CARDS[2].description}
          image1={TOOLS_CARDS[0].image}
          image2={TOOLS_CARDS[1].image}
          image3={TOOLS_CARDS[2].image}
          icon1={TOOLS_CARDS[0].icon}
          icon2={TOOLS_CARDS[1].icon}
          icon3={TOOLS_CARDS[2].icon}
          iconPosition="bottom-left"
          iconType="icon"
          blobClasses={[TOOLS_CARDS[0].blobClass, TOOLS_CARDS[1].blobClass, TOOLS_CARDS[2].blobClass]}
          imageWrapperClasses={[TOOLS_CARDS[0].imageWrapperClass, TOOLS_CARDS[1].imageWrapperClass, TOOLS_CARDS[2].imageWrapperClass]}
        />
        <div className="flex justify-center mt-10">
          <Button variant="secondary" className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]">Get Funded Now</Button>
        </div>
      </Container>
    </div>
  );
}