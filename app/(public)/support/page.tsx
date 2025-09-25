import Container from "@/components/common/container";
import SectionHeader from "@/components/common/section-header";
import HeroSection from "@/components/home-page/hero-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import marbleMail from "@/public/assets/marble-mail.svg";
import marbleSend from "@/public/assets/marble-send.svg";
import marbleClipboard from "@/public/assets/marble-clipboard.svg";
import bgMarble from "@/public/assets/bg-marble.svg";

export default function SupportPage() {
  return (
    <>
      <HeroSection 
        image={bgMarble}
        titleLine1="Reach Out to "
        titleLine2="the Propafund Pantheon"
        subtitle="Need support, have a question, or want to collaborate? We're listening."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display py-30" id="support">
        <Container>
        </Container>
      </div>
    </>
  );
}
