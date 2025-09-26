import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import promoBg from "@/public/assets/promo-bg.svg";
import OracleSection from "@/components/home-page/oracle-section";
import PromoOffersSection from "@/components/home-page/promo-offers-section";
import Glow from "@/components/common/glow";
import Image from "next/image";
import hammer from "@/public/assets/marble-hammer.svg";
import SectionHeader from "@/components/common/section-header";

export default function FAQPage() {
  return (
    <>
      <HeroSection 
        image={promoBg}
        titleLine1="Exclusive PropaFund"
        titleLine2="Promo"
        subtitle="Get exclusive promo offers that give you the capital, tools, and support to trade smarter and profit faster."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display py-30" id="promos">
        <Container>
          <SectionHeader
            title="Seize the Exclusive PropaFund Rewards"
            text="Unlock limited-time deals, trading perks, and bonus opportunities designed to boost your journey to funded success."
          />
          <div className="mt-15">
        <PromoOffersSection />
          <OracleSection className="-py-30"/>
          </div>
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
