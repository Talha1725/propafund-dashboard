"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginData } from "@/lib/schemas/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormField } from "@/components/auth/auth-form-field";
import Link from "next/link";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      keepLoggedIn: false,
    },
  });

  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);

    try {
      setTimeout(() => {
        console.log("Login attempt:", data);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

  return (
    <AuthLayout>
      <AuthForm
        title="LOGIN TO YOUR ACCOUNT"
        subtitle="Enter your details to login."
        titleClassName="font-romanica font-normal text-[26px]"
        onSubmit={handleSubmit(onSubmit)}
        buttonText={isSubmitting ? "Logging in..." : "Login"}
        isSubmitting={isSubmitting}
        linkText="Don't have an account?"
        linkHref="/signup"
        linkLabel="Register"
      >
        <AuthFormField
          id="email"
          label="EMAIL ADDRESS"
          type="email"
          placeholder="hello@fxutopia.com"
          value={watch("email")}
          onChange={(value) => setValue("email", value)}
          error={errors.email?.message}
        />

        <AuthFormField
          id="password"
          label="PASSWORD"
          type="password"
          placeholder="••••••••"
          value={watch("password")}
          onChange={(value) => setValue("password", value)}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between w-[392px] mx-auto">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                {...register("keepLoggedIn")}
                className="w-4 h-4 opacity-0 absolute"
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <div
                className="w-4 h-4 rounded border-2 flex items-center justify-center"
                style={{
                  background: isChecked ? '#3BA9F4' : '#FFFFFF0D',
                  borderColor: '#E1E4EA1A'
                }}
              >
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ display: isChecked ? 'block' : 'none' }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-white text-[16px] font-regular font-creato-display">
              Keep me logged in
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-[#525866] text-[16px] font-medium underline font-creato-display hover:text-white transition-colors"
          >
            Forgot password?
          </Link>
        </div>
      </AuthForm>
    </AuthLayout>
  );
}