"use client";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { handleApiError } from "@/lib/utils/apiUtils";
import { auth } from "@/lib/api/endpoints/auth";

function CongratsSignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [failed, setFailed] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const hasAttemptedVerification = useRef(false);

  const verifyEmailToken = useCallback(async () => {
    // Prevent multiple verification attempts
    if (hasAttemptedVerification.current) {
      return;
    }
    
    if (!token) {
      setVerificationError("No verification token provided");
      return;
    }

    hasAttemptedVerification.current = true;

    try {
      setIsLoading(true);
      
      const response = await auth.verifyEmail(token);
      
      if (response && (response.success !== false && response.status !== 'failed')) {
        setIsVerified(true);
      } else if (response?.error && response.error.toLowerCase().includes("already verified")) {
        setIsVerified(true);
      } else {
        const errorMessage = response?.message || response?.error || 'Verification failed';
        setVerificationError(errorMessage);
        setFailed(true);
      }
    } catch (error: unknown) {
      
      if (error && typeof error === 'object' && 'status' in error && error.status === 400 && 
          'data' in error && error.data && typeof error.data === 'object' && 
          'error' in error.data && typeof error.data.error === 'string' && 
          error.data.error.toLowerCase().includes("already verified")) {
        setIsVerified(true);
        return;
      }
      
      const errorMessage = handleApiError(error);
      setVerificationError(errorMessage);
      setFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    verifyEmailToken();
  }, [verifyEmailToken]);

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <AuthLayout>
      <div className={`w-full`}>
        <div className="text-center mb-4 px-4">
          <h1 className="text-white text-xl sm:text-[26px] font-medium font-lay-grotesk mb-1">
            {isVerified
              ? "Email Verified"
              : failed
              ? "Verification Failed"
              : "Verifying your email..."}
          </h1>
          <p className="text-[#525866] text-sm sm:text-[18px] font-regular font-lay-grotesk">
            {failed ? (
              "Failed to verify email. Please try again."
            ) : (
              isVerified
                ? "Congratulations! Your email is verified."
                : verificationError
                ? verificationError
                : "Please wait while we verify your email address."
            )}
          </p>

          <div className="w-full max-w-[195px] relative mx-auto mt-8 px-4">
            <Button
              type="button"
              variant="secondary"
              className="w-full h-[45px]"
              disabled={isLoading}
              onClick={handleGoToLogin}
            >
              {isLoading
                ? "Verifying..."
                : isVerified
                ? "Go to Login"
                : failed
                ? "Go to Signup"
                : "Verification Required"}
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function CongratsSignupPage() {
  return (
    <Suspense fallback={
      <AuthLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </AuthLayout>
    }>
      <CongratsSignupContent />
    </Suspense>
  );
}
