
// Component props interfaces
export interface AuthLayoutProps {
  children: React.ReactNode;
  logoWidth?: number;
  logoHeight?: number;
  imageType?: "login" | "signup";
}

export interface SocialLoginButtonsProps {
  onAppleLogin: () => void;
  onGoogleLogin: () => void;
  className?: string;
  googleLoading?: boolean;
}

export interface AuthFormProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  buttonText?: string;
  isSubmitting?: boolean;
  showSocialLogin?: boolean;
  showOrDivider?: boolean;
  linkText?: string;
  linkHref?: string;
  linkLabel?: string;
  className?: string;
  titleClassName?: string;
}

export interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

export interface PasswordStrengthIndicatorProps {
  password: string;
}

