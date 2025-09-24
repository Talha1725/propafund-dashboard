
"use client";

import Container from "../common/container";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";
import ToolCards from "../common/tool-cards";
import marbleMail from "@/public/assets/marble-mail.svg";
import marbleSend from "@/public/assets/marble-send.svg";
import marbleClipboard from "@/public/assets/marble-clipboard.svg";

export default function SupportAssistanceSection() {
  return (
    <div className="font-creato-display">
      <Container>
      <SectionHeader
          title="Support & Assistance"
          text="At PropaFund, we're committed to guiding you every step of the way. Select the support option that works best for you."
        />
        <ToolCards
          title1="EMAIL SUPPORT"
          title2="TELEGRAM SUPPORT"
          title3="WEB SUPPORT TICKET"
          content1="Reach out to us at support@propafund.com for detailed queries and assistance."
          content2="Join our community chat on Telegram for real-time assistance"
          content3="Submit a support ticket through our portal for tracked and prioritized resolutions."
          image1={marbleMail}
          image2={marbleSend}
          image3={marbleClipboard}
          iconType="button"
          iconPosition="below-text"
          buttonText1="Email Us"
          buttonText2="Join Telegram"
          buttonText3="Contact Us"
          imageWrapperClasses={[
            "w-[264px] h-fit ml-auto mr-0",
            "w-[250px] h-fit ml-auto mr-0",
            "w-[181px] h-fit ml-auto mr-0"
          ]}
        />
        <div className="flex justify-center mt-10">
          <Button variant="secondary" className="w-[181px] h-[45px] px-[30px] py-[12px] gap-[15px]">Get Funded Now</Button>
        </div>
      </Container>
    </div>
  );
}

      
