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
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We&apos;ve sent password reset instructions to <strong>{watch("email")}</strong>
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setIsEmailSent(false);
                setValue("email", "");
              }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Send to Different Email
            </button>
            <Link
              href="/login"
              className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 text-center"
            >
              Back to Login
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