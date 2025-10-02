"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordData } from "@/lib/schemas/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/api/endpoints/auth";
import { handleApiError } from "@/lib/utils/apiUtils";
import { toast } from "sonner";
import Link from "next/link";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  
  const token = searchParams.get('token');

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
      toast.error("Invalid or missing reset token");
    } else {
      setIsValidToken(true);
    }
  }, [token]);

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    const loadingToastId = toast.loading("Resetting your password...");
    setIsSubmitting(true);

    try {
      const response = await auth.resetPassword({
        ...data,
        token: token
      });
      
      if (response && (response.success !== false && response.status !== 'failed')) {
        setIsSuccess(true);
        toast.success("Password reset successfully!");
        
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        const errorMessage = response?.message || response?.error || 'Failed to reset password';
        toast.error(errorMessage);
      }

    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      toast.dismiss(loadingToastId);
    }
  };

  if (isValidToken === false) {
    return (
      <AuthLayout>
        <div className="w-full">
          <div className="text-center mb-4 px-4">
            <h1 className="text-white text-xl sm:text-[26px] font-medium font-lay-grotesk mb-1">
              Invalid or Expired Token
            </h1>
            <p className="text-[#525866] text-sm sm:text-[18px] font-regular font-lay-grotesk mb-4">
              Your password reset link is invalid or has expired.
            </p>
          </div>

          <div className="w-full max-w-[250px] relative mx-auto mt-8 px-4">
            <Button
              type="button"
              variant="secondary"
              className="w-full h-[45px]"
              onClick={() => window.location.href = '/forgot-password'}
            >
              Request New Reset
            </Button>
          </div>

          <div className="text-center mt-6 px-4">
            <span className="text-[#525866] text-sm font-regular font-creato-display">
              Remember your password?{" "}
            </span>
            <Link
              href="/login"
              className="text-white text-sm font-medium font-creato-display underline transition-colors"
            >
              Back to login
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="w-full">
          <div className="text-center mb-4 px-4">
            <h1 className="text-white text-xl sm:text-[26px] font-medium font-lay-grotesk mb-1">
              Password Reset Successfully!
            </h1>
            <p className="text-[#525866] text-sm sm:text-[18px] font-regular font-lay-grotesk mb-4">
              Your password has been updated. Redirecting you to login...
            </p>
          </div>

          <div className="w-full max-w-[250px] relative mx-auto mt-8 px-4">
            <Button
              type="button"
              variant="secondary"
              className="w-full h-[45px]"
              onClick={() => window.location.href = '/login'}
            >
              Go to Login
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (isValidToken === null) {
    return (
      <AuthLayout>
        <div className="w-full">
          <div className="text-center mb-4 px-4">
            <h1 className="text-white text-xl sm:text-[26px] font-medium font-lay-grotesk mb-1">
              Validating Reset Link...
            </h1>
            <p className="text-[#525866] text-sm sm:text-[18px] font-regular font-lay-grotesk">
              Please wait while we validate your reset link.
            </p>
          </div>

          <div className="w-full max-w-[250px] relative mx-auto mt-8 px-4">
            <Button
              type="button"
              variant="secondary"
              className="w-full h-[45px]"
              disabled
            >
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthForm
        title="RESET PASSWORD"
        subtitle="Enter your new password below."
        titleClassName="font-romanica font-normal text-[26px]"
        onSubmit={handleSubmit(onSubmit)}
        buttonText={isSubmitting ? "Resetting..." : "Reset Password"}
        isSubmitting={isSubmitting}
        linkText="Remember your password?"
        linkHref="/login"
        linkLabel="Back to Login"
      >
        <AuthFormField
          id="password"
          label="NEW PASSWORD"
          type="password"
          placeholder="••••••••"
          value={watch("password")}
          onChange={(value) => {
            setValue("password", value, { shouldValidate: true });
          }}
          error={errors.password?.message}
        />

        <AuthFormField
          id="confirmPassword"
          label="CONFIRM PASSWORD"
          type="password"
          placeholder="••••••••"
          value={watch("confirmPassword")}
          onChange={(value) => {
            setValue("confirmPassword", value, { shouldValidate: true });
          }}
          error={errors.confirmPassword?.message}
        />
        
        <div className="w-full max-w-[392px] mx-auto px-4 mt-2">
          <PasswordRequirements password={password} />
        </div>
      </AuthForm>
    </AuthLayout>
  );
}

export default function ResetPasswordPage() {
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
      <ResetPasswordContent />
    </Suspense>
  );
}