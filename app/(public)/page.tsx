import FundedSection from "@/components/home-page/funded-section";
import GlobalSection from "@/components/home-page/global-section";
import HeroSection from "@/components/home-page/hero-section";
import MarketShieldSection from "@/components/home-page/market-shield";
import MasterChallengeSection from "@/components/home-page/master-challenge";
import MasterOlympusSection from "@/components/home-page/master-olympus";
import OracleSection from "@/components/home-page/oracle-section";
import PlanSelectionSection from "@/components/home-page/plan-selection";
import RewardSection from "@/components/home-page/reward";
import SupportAssistanceSection from "@/components/home-page/support-assistance";
import TestimonialSection from "@/components/home-page/testimonial-section";
import TitanTraderSection from "@/components/home-page/titan-trader";
import ToolsCardsSection from "@/components/home-page/tools-cards";
import TradeCardsSection from "@/components/home-page/trade-cards";
import hammer from "@/public/assets/marble-hammer.svg";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FundedSection />
      <GlobalSection />
      <MasterOlympusSection />
      <MasterChallengeSection />
      <MarketShieldSection />
      <TradeCardsSection />
      <TitanTraderSection />
      <ToolsCardsSection /> 
      <RewardSection />
      <div className="section-top-border" />
      <TestimonialSection />
      <PlanSelectionSection />  
      <OracleSection />
      <SupportAssistanceSection />  
      <Image src={hammer} alt="hammer" className="w-full h-full object-cover" />
    </>
  );
}
