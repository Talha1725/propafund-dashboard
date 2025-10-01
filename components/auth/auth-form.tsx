"use client";

import { AuthFormProps } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { SocialLoginButtons } from "./social-login-buttons";
import Link from "next/link";

export function AuthForm({
    title,
    subtitle,
    children,
    onSubmit,
    buttonText,
    isSubmitting,
    showSocialLogin = true,
    showOrDivider = true,
    linkText,
    linkHref,
    linkLabel,
    className = "",
    titleClassName = "",
}: AuthFormProps) {
    return (
        <div className={`w-full ${className}`}>
            <div className="text-center mb-6">
                <h1 className={`text-white mb-1 ${titleClassName || "text-[26px] font-medium font-lay-grotesk"}`}>
                    {title}
                </h1>
                <p className="text-[#525866] text-[18px] font-regular font-creato-display">
                    {subtitle}
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-[34px]">
                {showSocialLogin && (
                    <SocialLoginButtons
                        onAppleLogin={() => console.log("Apple login")}
                        onGoogleLogin={() => console.log("Google login")}
                        googleLoading={false}
                    />
                )}

                {showOrDivider && (
                    <div className="flex items-center w-[392px] mx-auto">
                        <div className="flex-1 border-t border-[#E1E4EA1A]"></div>
                        <span className="px-5 text-[#99A0AE] font-creato-display text-sm">
                            OR
                        </span>
                        <div className="flex-1 border-t border-[#E1E4EA1A]"></div>
                    </div>
                )}

                <div className="space-y-4">{children}</div>

                <div className="w-[195px] relative mx-auto">
                    {buttonText && (
                        <Button
                            type="submit"
                            variant="secondary"
                            className="w-full h-[45px]"
                            disabled={isSubmitting}
                        >
                            {buttonText}
                        </Button>
                    )}
                </div>
            </form>

            {linkText && linkHref && linkLabel && (
                <div className="text-center mt-6">
                    <span className="text-[#525866] text-[14px] font-regular font-creato-display">
                        {linkText}{" "}
                    </span>
                    <Link
                        href={linkHref}
                        className="text-white text-[14px] font-medium font-creato-display underline transition-colors"
                    >
                        {linkLabel}
                    </Link>
                </div>
            )}
        </div>
    );
}
