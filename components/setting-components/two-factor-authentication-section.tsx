"use client";

import ComponentContainer from "@/components/common/component-container";
import { SectionHeading } from "@/components/common/section-heading";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// Button import removed - using custom button styling
import Image from "next/image";
import emailIcon from "@/public/assets/email-icon.svg";
import smsIcon from "@/public/assets/sms-icon.svg";
import authenticatorIcon from "@/public/assets/authenticator-icon.svg";
import downloadIcon from "@/public/assets/save-disk.svg";

export default function TwoFactorAuthenticationSection() {
  const [selectedMethod, setSelectedMethod] = useState("sms");

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
  };

  const handleSave = () => {
    console.log("Selected 2FA method:", selectedMethod);
    // Here you would typically save the selected method to your API
  };

  return (
    <ComponentContainer className="mt-5">
      <SectionHeading title="2FA Security" />

      <div className="mt-5">
        <RadioGroup value={selectedMethod} onValueChange={handleMethodChange} className="grid lg:grid-cols-2 gap-4">
          {/* SMS Code */}
          <div className="dark-gradient p-4 rounded-[10px] border border-white/10 flex items-start gap-4">
            <div className="min-w-8 min-h-8 bg-white/5 rounded-full flex items-center justify-center">
              <Image src={smsIcon} alt="sms-icon" width={16} height={16} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-white whitespace-nowrap text-sm ">SMS Code</p>
              <p className="text-white/70 whitespace-nowrap/50 text-xs ">
                Receive a one-time verification code via SMS to enter during
                login.
              </p>
            </div>
            <RadioGroupItem value="sms" id="sms" className={`${selectedMethod === "sms" ? "bg-white" : "bg-[#FFFFFF0D]"}`} />
          </div>

          {/* Email Code */}
          <div className="dark-gradient p-4 rounded-[10px] border border-white/10 flex items-start gap-4">
            <div className="min-w-8 min-h-8 bg-white/5 rounded-full flex items-center justify-center">
              <Image src={emailIcon} alt="email-icon" width={16} height={16} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-white whitespace-nowrap text-sm ">Email Code</p>
              <p className="text-white/70 whitespace-nowrap/50 text-xs ">
                Get a temporary verification code sent to your email for added security.
              </p>
            </div>
            <RadioGroupItem value="email" id="email" className={`${selectedMethod === "email" ? "bg-white" : "bg-[#FFFFFF0D]"}`} />
          </div>

          {/* Authenticator App */}
          <div className="dark-gradient p-4 rounded-[10px] border border-white/10 flex items-start gap-4">
            <div className="min-w-8 min-h-8 bg-white/5 rounded-full flex items-center justify-center">
              <Image src={authenticatorIcon} alt="authenticator-icon" width={16} height={16} />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-white whitespace-nowrap text-sm ">Authenticator App</p>
              <p className="text-white/70 whitespace-nowrap/50 text-xs ">
                Use an authenticator app to generate time-based verification codes for login.
              </p>
            </div>
            <RadioGroupItem value="authenticator" id="authenticator" className={`${selectedMethod === "authenticator" ? "bg-white" : "bg-[#FFFFFF0D]"}`} />
          </div>
        </RadioGroup>
      </div>

      <button
        onClick={handleSave}
        
        className="mt-5 flex items-center justify-center gap-[10px] w-fit min-w-[180px] h-[39px] px-[42px] py-[11px] rounded-[10px] border border-white bg-[#0B0E1233] backdrop-blur-[44px] settings-label font-medium text-sm leading-[100%] text-white whitespace-nowrap"
      >
        <Image className="w-4 h-4" src={downloadIcon} alt="download-icon" />
        <span className="">Save</span>
      </button>
    </ComponentContainer>
  );
}
