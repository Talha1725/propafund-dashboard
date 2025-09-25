import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import OracleSection from "@/components/home-page/oracle-section";
import faqBg from "@/public/assets/faq-bg.svg";
import Glow from "@/components/common/glow";
import Image from "next/image";
import hammer from "@/public/assets/marble-hammer.svg";

export default function FAQPage() {
  return (
    <>
      <HeroSection 
        image={faqBg}
        titleLine1="Frequently Asked"
        titleLine2="Questions"
        subtitle="Answers are divine guidance. Stylize like carved scrolls or oracular stone slabs."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display" id="faq">
        <Container>
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
