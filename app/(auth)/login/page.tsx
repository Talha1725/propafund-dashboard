"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginData } from "@/lib/schemas/auth";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { auth } from "@/lib/api/endpoints/auth";
import { handleApiError } from "@/lib/utils/apiUtils";
import { setUserAtom, setTokenAtom } from "@/lib/store/atoms";
import Image from "next/image";
import checkmarkIcon from "@/public/assets/checkmark.svg";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const [, setUser] = useAtom(setUserAtom);
  const [, setToken] = useAtom(setTokenAtom);

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
    const loadingToastId = toast.loading("Signing you in...");
    setIsSubmitting(true);

    try {
      const response = await auth.login(data);
      
      if (response && (response.success !== false && response.status !== 'failed')) {
        let userData = response.user;
        let tokenData = response.token;
        
        if (response.data) {
          if (typeof response.data === 'object' && 'userData' in response.data) {
            userData = response.data.userData;
            tokenData = response.data.token;
          } else if (typeof response.data === 'object' && 'user' in response.data) {
            userData = response.data.user;
            tokenData = response.data.token;
          }
        }
        
        if (userData && tokenData) {
          setUser(userData);
          setToken(tokenData);
          toast.success("Welcome back! Login successful.");
          router.push("/user/dashboard");
        } else {
          toast.error("Login failed: No user data received");
        }
      } else {
        const errorMessage = response?.message || response?.error || 'Login failed';
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
                {isChecked && (
                  <Image
                    src={checkmarkIcon}
                    alt="Checkmark"
                    width={12}
                    height={12}
                  />
                )}
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