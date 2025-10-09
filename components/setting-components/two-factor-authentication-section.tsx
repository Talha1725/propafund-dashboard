"use client";

import ComponentContainer from "@/components/common/component-container";
import { SectionHeading } from "@/components/common/section-heading";
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// Button import removed - using custom button styling
import Image from "next/image";
import emailIcon from "@/public/assets/email-icon.svg";
import authenticatorIcon from "@/public/assets/authenticator-icon.svg";
import downloadIcon from "@/public/assets/save-disk.svg";
import { auth } from "@/lib/api/endpoints/auth";
import { toast } from "sonner";

export default function TwoFactorAuthenticationSection() {
  const [selectedMethod, setSelectedMethod] = useState<"email" | "authenticator">("email");
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [qrCode, setQrCode] = useState<string>("");
  const [manualKey, setManualKey] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState("");

  // Load 2FA status on component mount
  useEffect(() => {
    load2FAStatus();
  }, []);

  const load2FAStatus = async () => {
    try {
      const response = await auth.get2FAStatus();
      if (response.success) {
        setIsEnabled(response.data.isEnabled);
        if (response.data.method) {
          setSelectedMethod(response.data.method);
        }
      }
    } catch (error) {
      console.error("Failed to load 2FA status:", error);
      setIsEnabled(false);
      setSelectedMethod("email");
    }
  };

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value as "email" | "authenticator");
  };

  const handleSetup2FA = async () => {
    if (isEnabled) {
      // Disable 2FA
      try {
        setIsLoading(true);
        const response = await auth.disable2FA();
        if (response.success) {
          setIsEnabled(false);
          toast.success(response.message || "2FA disabled successfully!");
        } else {
          toast.error(response.message || "Failed to disable 2FA");
        }
      } catch (error) {
        console.error("Failed to disable 2FA:", error);
        toast.error("Failed to disable 2FA. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Setup 2FA
      try {
        setIsLoading(true);
        const response = await auth.setup2FA(selectedMethod);
        
        if (response.success) {
          if (selectedMethod === 'authenticator' && response.data.qrCode) {
            setQrCode(response.data.qrCode);
            setManualKey(response.data.manualEntryKey);
          }
          setShowVerificationDialog(true);
          toast.success(response.message || "2FA setup ready!");
        } else {
          toast.error(response.message || "Failed to setup 2FA");
        }
      } catch (error) {
        console.error("Failed to setup 2FA:", error);
        toast.error("Failed to setup 2FA. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerify2FA = async () => {
    try {
      setIsLoading(true);
      const response = await auth.verify2FA(verificationCode, selectedMethod);
      
      if (response.success) {
        setIsEnabled(true);
        setShowVerificationDialog(false);
        setVerificationCode("");
        toast.success("2FA enabled successfully!");
      } else {
        toast.error(response.message || "Invalid verification code");
      }
    } catch (error) {
      console.error("Failed to verify 2FA:", error);
      toast.error("Failed to verify 2FA. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ComponentContainer className="mt-5">
      <SectionHeading title="2FA Security" />

      <div className="mt-5">
        <RadioGroup value={selectedMethod} onValueChange={handleMethodChange} className="grid lg:grid-cols-2 gap-4">
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
        onClick={handleSetup2FA}
        disabled={isLoading}
        className="mt-5 flex items-center justify-center gap-[10px] w-fit min-w-[180px] h-[39px] px-[42px] py-[11px] rounded-[10px] border border-white bg-[#0B0E1233] backdrop-blur-[44px] settings-label font-medium text-sm leading-[100%] text-white whitespace-nowrap cursor-pointer disabled:opacity-50"
      >
        <Image className="w-4 h-4" src={downloadIcon} alt="download-icon" />
        <span className="">
          {isLoading ? "Processing..." : isEnabled ? "Disable 2FA" : "Enable 2FA"}
        </span>
      </button>

      {/* Verification Dialog */}
      {showVerificationDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1A1A1A] border border-white/10 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-semibold mb-4">
              Verify {selectedMethod === 'email' ? 'Email' : 'Authenticator'} Code
            </h3>
            
            {selectedMethod === 'authenticator' && qrCode && (
              <div className="mb-4 text-center">
                <p className="text-white/70 text-sm mb-2">Scan this QR code with your authenticator app:</p>
                <div className="bg-white p-2 rounded inline-block">
                  <img src={qrCode} alt="QR Code" className="w-32 h-32" />
                </div>
                {manualKey && (
                  <p className="text-white/70 text-xs mt-2">
                    Or enter this key manually: <code className="bg-white/10 px-1 rounded">{manualKey}</code>
                  </p>
                )}
              </div>
            )}
            
            <div className="mb-4">
              <label className="text-white text-sm block mb-2">
                Enter verification code:
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/50"
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleVerify2FA}
                disabled={isLoading || verificationCode.length !== 6}
                className="flex-1 h-10 bg-gradient-to-b from-white to-blue text-black rounded font-medium disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>
              <button
                onClick={() => {
                  setShowVerificationDialog(false);
                  setVerificationCode("");
                }}
                className="flex-1 h-10 border border-white/20 text-white rounded font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </ComponentContainer>
  );
}
