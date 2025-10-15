"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordData } from "@/lib/schemas/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { auth } from "@/lib/api/endpoints/auth";
import { handleApiError } from "@/lib/utils/apiUtils";
import { toast } from "sonner";
import Link from "next/link";
import { useAtom } from "jotai";
import { authLoadingAtom, authErrorAtom } from "@/lib/store/atoms";

export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [, setAuthLoading] = useAtom(authLoadingAtom);
  const [, setAuthError] = useAtom(authErrorAtom);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    const loadingToastId = toast.loading("Sending reset instructions...");
    setIsSubmitting(true);
    setAuthLoading(true);
    setAuthError(null);

    try {
      const response = await auth.forgotPassword(data);
      
      if (response && (response.success !== false && response.status !== 'failed')) {
        setIsEmailSent(true);
        toast.success("Reset instructions sent to your email!");
      } else {
        const errorMessage = response?.message || response?.error || 'Failed to send reset email';
        setAuthError(errorMessage);
        toast.error(errorMessage);
      }

    } catch (error) {
      const errorMessage = handleApiError(error);
      setAuthError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      setAuthLoading(false);
      toast.dismiss(loadingToastId);
    }
  };

  if (isEmailSent) {
    return (
      <AuthLayout>
        <div className="w-full">
          <div className="text-center mb-4 px-4">
            <h1 className="text-white text-xl sm:text-[26px] font-medium font-lay-grotesk mb-1">
              Check your email
            </h1>
            <p className="text-[#525866] text-sm sm:text-[18px] font-regular font-lay-grotesk mb-4">
              We&apos;ve sent a password reset link to your email address.
            </p>
            <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 mt-4">
              <p className="text-white text-sm font-regular font-lay-grotesk">
                Password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
              </p>
            </div>
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

  return (
    <AuthLayout>
      <AuthForm
        title="FORGOT PASSWORD"
        subtitle="Enter your email address and we'll send you reset instructions."
        titleClassName="font-romanica font-normal text-[26px]"
        onSubmit={handleSubmit(onSubmit)}
        buttonText={isSubmitting ? "Sending..." : "Send reset link"}
        isSubmitting={isSubmitting}
        showSocialLogin={false}
        showOrDivider={false}
        linkText="Remember your password?"
        linkHref="/login"
        linkLabel="Back to Login"
      >
        <AuthFormField
          id="email"
          label="EMAIL ADDRESS"
          type="email"
          placeholder="hello@fxutopia.com"
          value={watch("email")}
          onChange={(value) => {
            setValue("email", value, { shouldValidate: true });
          }}
          error={errors.email?.message}
        />
      </AuthForm>
    </AuthLayout>
  );
}