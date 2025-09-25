import Container from "@/components/common/container";
import SectionHeader from "@/components/common/section-header";
import HeroSection from "@/components/home-page/hero-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import bgMarble from "@/public/assets/bg-marble.svg";

export default function FAQPage() {
  return (
    <>
      <HeroSection 
        image={bgMarble}
        titleLine1="Frequently Asked"
        titleLine2="Questions"
        subtitle="Answers are divine guidance. Stylize like carved scrolls or oracular stone slabs."
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
