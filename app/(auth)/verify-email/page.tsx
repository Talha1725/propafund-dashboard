"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/api/endpoints/auth";
import { handleApiError } from "@/lib/utils/apiUtils";
import { signupEmailAtom } from "@/lib/store/atoms";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);
  
  const [signupEmail] = useAtom(signupEmailAtom);

  const handleResendVerification = async () => {
    if (!signupEmail) {
      toast.error("No email found. Please sign up again.");
      return;
    }

    const loadingToastId = toast.loading("Resending verification email...");
    setIsResending(true);

    try {
      const response = await auth.resendVerification(signupEmail);
      
      // Check if resend was successful
      if (response && (response.success !== false && response.status !== 'failed')) {
        toast.success("Verification email sent! Please check your inbox.");
      } else {
        const errorMessage = response?.message || response?.error || 'Failed to resend verification email';
        toast.error(errorMessage);
      }

    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
      toast.dismiss(loadingToastId);
    }
  };

  return (
    <AuthLayout imageType="signup">
      <div className="w-full">
        <div className="text-center mb-4">
          <h1 className="text-white text-[26px] font-medium font-lay-grotesk mb-1">
            Verify Your Email
          </h1>
          <p className="text-[#525866] text-[18px] font-regular font-lay-grotesk mb-4">
            We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>
          <p className="text-[#3BA9F4] text-[16px] font-medium font-creato-display">
            Email: {signupEmail || 'your-email@example.com'}
          </p>
        </div>

        <div className="w-[195px] relative mx-auto mt-8">
          <Button
            type="button"
            variant="secondary"
            className="w-full h-[45px]"
            disabled={isResending}
            onClick={handleResendVerification}
          >
            {isResending ? "Sending..." : "Resend Email"}
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}