"use client";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleResendEmail = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Verification email sent! Please check your inbox.");
      console.log("Resend verification email");
    } catch (error: unknown) {
      console.error("Resend verification email error:", error);
      toast.error("Failed to resend verification email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={`w-full`}>
        <div className="text-center mb-4">
          <h1 className="text-white text-[26px] font-medium font-lay-grotesk mb-1">
            Verify Your Email
          </h1>
          <p className="text-[#525866] text-[18px] font-regular font-lay-grotesk">
            We&apos;ve sent a verification link to your email address. Please
            check your inbox and click the link to verify your account.
          </p>

          <div className="w-[195px] relative mx-auto mt-8">
            <Button
              type="button"
              variant="secondary"
              className="w-full h-[45px]"
              disabled={isLoading}
              onClick={handleResendEmail}
            >
              {isLoading ? "Sending..." : "Resend Email"}
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
