import Container from "@/components/common/container";
import HeroSection from "@/components/home-page/hero-section";
import supportBg from "@/public/assets/support-bg.svg";

export default function SupportPage() {
  return (
    <>
      <HeroSection 
        image={supportBg}
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
