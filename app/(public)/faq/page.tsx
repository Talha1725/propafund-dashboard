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
        subtitle="Find answers to common questions about our trading challenges and funding process."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display py-30">
        <Container>
          <SectionHeader
            title="Common Questions"
            text="Everything you need to know about our platform and services."
          />
        
        <div className="mt-15 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">What are the rules for getting funded?</AccordionTrigger>
              <AccordionContent>
                To secure funding, follow these steps:
                <ol className="list-decimal list-inside mt-4 space-y-2">
                  <li>Complete a trading evaluation</li>
                  <li>Keep a minimum account balance</li>
                  <li>Follow risk management rules, like risking no more than 1% per trade</li>
                  <li>Show consistent profits over time</li>
                  <li>Submit necessary documents for verification</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">How long does the challenge last?</AccordionTrigger>
              <AccordionContent>
                The challenge duration varies by program. Most challenges run for 30-60 days, giving you enough time to demonstrate consistent trading skills while maintaining proper risk management.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">What happens if I fail the challenge?</AccordionTrigger>
              <AccordionContent>
                If you don&apos;t meet the challenge requirements, you can retake the challenge after a brief cooldown period. We provide detailed feedback to help you improve your trading strategy.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">How do I receive my profits?</AccordionTrigger>
              <AccordionContent>
                Once funded, you can withdraw your profits through various methods including bank transfer, PayPal, or cryptocurrency. Payouts are processed quickly and securely.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">What trading platforms do you support?</AccordionTrigger>
              <AccordionContent>
                We support multiple trading platforms including MetaTrader 4, MetaTrader 5, cTrader, and other popular platforms. Choose the one that works best for your trading style.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        </Container>
      </div>
    </>
  );
}
