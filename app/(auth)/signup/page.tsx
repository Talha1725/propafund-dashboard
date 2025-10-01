"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { registerSchema, type RegisterData } from "@/lib/schemas/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { PasswordRequirements } from "@/components/auth/password-requirements";
import { auth } from "@/lib/api/endpoints/auth";
import { handleApiError } from "@/lib/utils/apiUtils";
import { setUserAtom, setTokenAtom, signupEmailAtom } from "@/lib/store/atoms";
import { toast } from "sonner";

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [, setUser] = useAtom(setUserAtom);
  const [, setToken] = useAtom(setTokenAtom);
  const [, setSignupEmail] = useAtom(signupEmailAtom);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterData) => {
    const loadingToastId = toast.loading("Creating your account...");
    setIsSubmitting(true);

    try {
      console.log("Sending registration data:", data);
      const response = await auth.register(data);
      
      // Check if registration was successful
      if (response && (response.success !== false && response.status !== 'failed')) {
        if (response.user && response.token) {
          setUser(response.user);
          setToken(response.token);
          toast.success("Account created successfully! Welcome!");
          router.push("/dashboard");
        } else {
          setSignupEmail(data.email);
          toast.success("Account created successfully! Please check your email for verification.");
          router.push("/verify-email");
        }
      } else {
        const errorMessage = response?.message || response?.error || 'Registration failed';
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
          id="userName"
          label="USERNAME"
          type="text"
          placeholder="Enter your username"
          value={watch("userName")}
          onChange={(value) => {
            setValue("userName", value, { shouldValidate: true });
          }}
          error={errors.userName?.message}
        />

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