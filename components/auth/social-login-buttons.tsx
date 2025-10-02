import { SocialLoginButtonsProps } from "@/types/auth";
import Image from "next/image";
import appleIcon from "@/public/assets/apple.svg";
import googleIcon from "@/public/assets/google.svg";

export function SocialLoginButtons({ 
  onAppleLogin, 
  onGoogleLogin, 
  className = "",
  googleLoading = false
}: SocialLoginButtonsProps) {
  return (
    <div className={`flex gap-3 justify-center w-full max-w-[392px] mx-auto px-4 ${className}`}>
      <button
        onClick={onAppleLogin}
        className="w-full max-w-[190px] h-[48px] flex items-center justify-center bg-gradient-to-r from-white/5 to-white/2 border border-white/10 hover:opacity-80 transition-opacity"
        style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          border: '1px solid #FFFFFF1A',
          paddingTop: '14px',
          paddingRight: '20px',
          paddingBottom: '14px',
          paddingLeft: '20px'
        }}
      >
        <Image
          src={appleIcon}
          alt="Apple"
          width={20}
          height={20}
        />
      </button>

      <button
        onClick={onGoogleLogin}
        disabled={googleLoading}
        className="w-full max-w-[190px] h-[48px] flex items-center justify-center bg-gradient-to-r from-white/5 to-white/2 border border-white/10 hover:opacity-80 transition-opacity disabled:opacity-50"
        style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          border: '1px solid #FFFFFF1A',
          paddingTop: '14px',
          paddingRight: '20px',
          paddingBottom: '14px',
          paddingLeft: '20px'
        }}
      >
        {googleLoading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <Image
            src={googleIcon}
            alt="Google"
            width={20}
            height={20}
          />
        )}
      </button>
    </div>
  );
}
