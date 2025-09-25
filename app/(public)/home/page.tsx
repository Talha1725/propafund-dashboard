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
import Glow from "@/components/common/glow";

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
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 -top-150 flex justify-center">
          <Glow width={2600} height={1800} opacity={0.45} shape="farthest-side" blur={100} />
        </div>
        <Image src={hammer} alt="hammer" className="w-full h-full object-cover" />
      </div>
    </>
  );
}
