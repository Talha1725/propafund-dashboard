"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterData } from "@/lib/schemas/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import { toast } from "sonner";

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterData) => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Account created successfully! Please check your email to verify your account.");
      console.log("Signup attempt:", data);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <AuthLayout imageType="signup">
      <AuthForm
        title="CREATE YOUR ACCOUNT"
        subtitle="Enter your details to create an account."
        titleClassName="font-romanica font-normal text-[26px]"
        onSubmit={handleSubmit(onSubmit)}
        buttonText={isSubmitting ? "Creating Account..." : "Create Account"}
        isSubmitting={isSubmitting}
        linkText="Already have an account?"
        linkHref="/login"
        linkLabel="Login"
      >
        <AuthFormField
          id="fullName"
          label="FULL NAME"
          type="text"
          placeholder="Enter your full name"
          value={watch("fullName")}
          onChange={(value) => {
            setValue("fullName", value, { shouldValidate: true });
          }}
          error={errors.fullName?.message}
        />

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

        <AuthFormField
          id="password"
          label="PASSWORD"
          type="password"
          placeholder="••••••••"
          value={watch("password")}
          onChange={(value) => {
            setValue("password", value, { shouldValidate: true });
          }}
          error={errors.password?.message}
        />
        
        <div className="w-[392px] mx-auto mt-2">
          <PasswordRequirements password={password} />
        </div>
      </AuthForm>
    </AuthLayout>
  );
}