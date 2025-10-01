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
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <div className="space-y-3">
            <Link
              href="/forgot-password"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center"
            >
              Request New Reset Link
            </Link>
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

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your password has been updated. Redirecting you to login...
          </p>
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (isValidToken === null) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Validating Reset Link...</h2>
          <p className="text-gray-600">
            Please wait while we validate your reset link.
          </p>
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
        
        <div className="w-[392px] mx-auto mt-2">
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