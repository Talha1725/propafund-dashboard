"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { AuthFormProps } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { SocialLoginButtons } from "./social-login-buttons";
import { auth } from "@/lib/api/endpoints/auth";
import { setUserAtom, setTokenAtom } from "@/lib/store/atoms";
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
    const router = useRouter();
    const [, setUser] = useAtom(setUserAtom);
    const [, setToken] = useAtom(setTokenAtom);
    const [googleLoading, setGoogleLoading] = useState(false);

    const googleOAuthLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const loadingToastId = toast.loading("Signing you in with Google...");
            setGoogleLoading(true);
            
            try {
                const response = await auth.googleAuth({ 
                    access_token: tokenResponse.access_token 
                });

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
                        } else if (typeof response.data === 'object' && 'existingUser' in response.data) {
                            userData = response.data.existingUser;
                            tokenData = response.data.token;
                        } else if (typeof response.data === 'object' && 'newUser' in response.data) {
                            userData = response.data.newUser;
                            tokenData = response.data.token;
                        }
                    }
                    
                    if (userData && tokenData) {
                        setUser(userData);
                        setToken(tokenData);
                        toast.success("Google login successful!");
                        router.push("/user/dashboard");
                    } else {
                        toast.error("Google login failed: No user data received");
                    }
                } else {
                    const errorMessage = response?.message || response?.error || 'Google login failed';
                    toast.error(errorMessage);
                }
            } catch (error) {
                console.error('Google login error:', error);
                toast.error("Google login failed");
            } finally {
                setGoogleLoading(false);
                toast.dismiss(loadingToastId);
            }
        },
        onError: () => {
            setGoogleLoading(false);
            toast.error("Google login failed. Please try again.");
        },
    });
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
                        onGoogleLogin={googleOAuthLogin}
                        googleLoading={googleLoading}
                    />
                )}

                {showOrDivider && (
                    <div className="flex items-center w-full max-w-[392px] mx-auto px-4">
                        <div className="flex-1 border-t border-[#E1E4EA1A]"></div>
                        <span className="px-5 text-[#99A0AE] font-creato-display text-sm">
                            OR
                        </span>
                        <div className="flex-1 border-t border-[#E1E4EA1A]"></div>
                    </div>
                )}

                <div className="space-y-4">{children}</div>

                <div className="w-full max-w-[195px] relative mx-auto px-4">
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
