import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import promoBg from "@/public/assets/promo-bg.svg";

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
      <div className="font-creato-display py-30">
        <Container>
        </Container>
      </div>
    </>
  );
}
