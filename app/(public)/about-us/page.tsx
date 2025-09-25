import HeroSection from "@/components/home-page/hero-section";
import aboutBg from "@/public/assets/about-bg.svg";
import MarketShieldSection from "@/components/home-page/market-shield";
import OracleSection from "@/components/home-page/oracle-section";
import Glow from "@/components/common/glow";
import Image from "next/image";
import hammer from "@/public/assets/marble-hammer.svg";
import Container from "@/components/common/container";
import FundedSection from "@/components/home-page/funded-section";

export default function FAQPage() {
  return (
    <>
      <HeroSection 
        image={aboutBg}
        titleLine1="Built by Traders."
        titleLine2="Forged by Experience."
        subtitle="We created Propafund to reshape the journey of the modern trader — one legendary challenge at a time."
        showButton={false}
        isHomepage={false}
      />
        <div className="font-creato-display" id="about-us">
        <Container>
          <FundedSection/>
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
