"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthLayoutProps } from "@/types/auth";
import AuthIcon from "@/public/assets/auth-icon.svg";
import LoginImage from "@/public/assets/login-image.svg";
import SignupImage from "@/public/assets/signup-image.svg";

export function AuthLayout({ 
  children, 
  logoWidth = 37, 
  logoHeight = 37,
  imageType = "login"
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-black">
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md relative z-20">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image
                src={AuthIcon}
                alt="FX Utopia"
                width={logoWidth}
                height={logoHeight}
                className="cursor-pointer"
              />
            </Link>
          </div>
          
          {children}
        </div>
      </div>

      {/* Right side - Auth image */}
      <div className="hidden md:flex flex-1 relative z-10">
        <div className="relative w-full h-full">
          <Image
            src={imageType === "signup" ? SignupImage : LoginImage}
            alt={imageType === "signup" ? "Signup Illustration" : "Login Illustration"}
            fill
            className="object-cover rounded-[10px]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
