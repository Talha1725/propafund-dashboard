"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordData } from "@/lib/schemas/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormField } from "@/components/auth/auth-form-field";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      setTimeout(() => {
        console.log("Forgot password attempt:", data);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        title="FORGOT PASSWORD?"
        subtitle="Enter your email address and we'll send you a reset link."
        titleClassName="font-romanica font-normal text-[26px]"
        onSubmit={handleSubmit(onSubmit)}
        buttonText={isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
        isSubmitting={isSubmitting}
        showSocialLogin={false}
        showOrDivider={false}
        linkText="Remember your password?"
        linkHref="/login"
        linkLabel="Login"
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
          className="w-full"
        />
      </AuthForm>
    </AuthLayout>
  );
}
