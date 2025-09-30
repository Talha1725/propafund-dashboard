import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import bgMarble from "@/public/assets/bg-marble.svg";

export default function FAQPage() {
  return (
    <>
      <HeroSection 
        image={bgMarble}
        titleLine1="Trading"
        titleLine2="Challenges"
        subtitle=""
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
