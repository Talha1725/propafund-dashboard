"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordData } from "@/lib/schemas/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

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
    if (token) {
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
    }
    setIsCheckingToken(false);
  }, [token]);

  const onSubmit = async (data: ResetPasswordData) => {
    if (!token) {
      console.error("Invalid or missing reset token");
      toast.error("Invalid or missing reset token");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Password reset successfully! Redirecting to login...");
      console.log("Password reset successful!", data);
      router.push("/login");
    } catch (error: unknown) {
      console.error("Password reset error:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingToken) {
    return (
      <AuthLayout>
        <AuthForm
          title="VERIFYING RESET TOKEN"
          subtitle="Please wait while we verify your reset token..."
          titleClassName="font-romanica font-normal text-[26px]"
          onSubmit={() => {}}
          buttonText="Loading..."
          isSubmitting={true}
          showSocialLogin={false}
          showOrDivider={false}
        >
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </AuthForm>
      </AuthLayout>
    );
  }

  if (!isValidToken) {
    return (
      <AuthLayout>
        <AuthForm
          title="INVALID OR EXPIRED TOKEN"
          subtitle="Your password reset link is invalid or has expired."
          titleClassName="font-romanica font-normal text-[26px]"
          buttonText=""
          isSubmitting={false}
          showSocialLogin={false}
          showOrDivider={false}
          linkText="Remember your password?"
          linkHref="/login"
          linkLabel="Back to login"
          onSubmit={() => {}}
        >
          <div className="w-[200px] relative mx-auto">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => router.push("/forgot-password")}
            >
              Request New Reset
            </Button>
          </div>
        </AuthForm>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthForm
        title="RESET YOUR PASSWORD"
        subtitle="Enter your new password below."
        titleClassName="font-romanica font-normal text-[26px]"
        onSubmit={handleSubmit(onSubmit)}
        buttonText={isLoading ? "Resetting Password..." : "Reset Password"}
        isSubmitting={isLoading}
        showSocialLogin={false}
        showOrDivider={false}
        linkText="Remember your password?"
        linkHref="/login"
        linkLabel="Back to login"
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
          label="CONFIRM NEW PASSWORD"
          type="password"
          placeholder="••••••••"
          value={watch("confirmPassword")}
          onChange={(value) => {
            setValue("confirmPassword", value, { shouldValidate: true });
          }}
          error={errors.confirmPassword?.message}
        />
        
        <PasswordRequirements password={password} className="-mt-2" />
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
