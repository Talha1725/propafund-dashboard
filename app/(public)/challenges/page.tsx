import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import MasterOlympusSection from "@/components/home-page/master-olympus";
import bgMarble from "@/public/assets/bg-marble.svg";
import MarketShieldSection from "@/components/home-page/market-shield";
import OracleSection from "@/components/home-page/oracle-section";
import hammer from "@/public/assets/marble-hammer.svg";
import Image from "next/image";
import Glow from "@/components/common/glow";

export default function ChallengesPage() {
  return (
    <>
      <HeroSection 
        image={bgMarble}
        titleLine1="Choose Your"
        titleLine2="Path to Glory"
        subtitle="Choose your challenge level and start your journey to becoming a funded trader."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display" id="challenges">
        <Container>
          <MasterOlympusSection/>
          <MarketShieldSection className="-py-30"/>
          <OracleSection className="-py-30"/>
          <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 -top-150 flex justify-center">
            <Glow width={2600} height={1800} opacity={0.45} shape="farthest-side" blur={100} />
          </div>
          <Image src={hammer} alt="hammer" className="w-full h-full object-cover" />
        </div>
        </Container>
      </div>
    </>
  );
}
