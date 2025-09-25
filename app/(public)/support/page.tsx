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
        titleLine1="Support &"
        titleLine2="Assistance"
        subtitle="At PropaFund, we're committed to guiding you every step of the way. Select the support option that works best for you."
        showButton={false}
        isHomepage={false}
      />
      <div className="font-creato-display py-30" id="support">
        <Container>
          <SectionHeader
            title="Get In Touch"
            text="Choose your preferred method of communication."
          />
        
        <div className="mt-15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email Support */}
            <div className="border border-white/10 p-6 rounded-lg bg-gradient-to-b from-white/5 to-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue/20 rounded-lg flex items-center justify-center">
                  <Image src={marbleMail} alt="Email" width={24} height={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Email Support</h3>
              </div>
              <p className="text-white/70 mb-6">
                Reach out to us at support@propafund.com for detailed queries and assistance.
              </p>
              <Button className="w-full">
                <a href="mailto:support@propafund.com">Email Us</a>
              </Button>
            </div>
            
            {/* Telegram Support */}
            <div className="border border-white/10 p-6 rounded-lg bg-gradient-to-b from-white/5 to-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue/20 rounded-lg flex items-center justify-center">
                  <Image src={marbleSend} alt="Telegram" width={24} height={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Telegram Support</h3>
              </div>
              <p className="text-white/70 mb-6">
                Join our community chat on Telegram for real-time assistance.
              </p>
              <Button className="w-full">
                <a href="https://t.me/propafund" target="_blank" rel="noopener noreferrer">
                  Join Telegram
                </a>
              </Button>
            </div>
            
            {/* Web Support Ticket */}
            <div className="border border-white/10 p-6 rounded-lg bg-gradient-to-b from-white/5 to-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue/20 rounded-lg flex items-center justify-center">
                  <Image src={marbleClipboard} alt="Support Ticket" width={24} height={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Web Support Ticket</h3>
              </div>
              <p className="text-white/70 mb-6">
                Submit a support ticket through our portal for tracked and prioritized resolutions.
              </p>
              <Button className="w-full">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
        
        {/* Additional Support Information */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue/10 to-purple/10 border border-blue/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Need Immediate Help?</h3>
            <p className="text-white/70 mb-6">
              Our support team is available 24/7 to help you with any questions or issues. 
              We typically respond within 2-4 hours during business hours.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Business Hours</h4>
                <p className="text-white/70">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Emergency Support</h4>
                <p className="text-white/70">Available 24/7 for urgent trading issues</p>
              </div>
            </div>
          </div>
        </div>
        </Container>
      </div>
    </>
  );
}
