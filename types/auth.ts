// User interface
export interface User {
  id: string;
  email: string;
  fullName: string;
  userName: string;
  isEmailVerified: boolean;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API response interfaces
export interface AuthResponse {
  status?: string;
  success?: boolean;
  message?: string;
  error?: string;
  token?: string;
  user?: User;
  data?: User | { userData?: User; token?: string };
}

// Request interfaces
export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
  fullName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  access_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

// Component props interfaces
export interface AuthLayoutProps {
  children: React.ReactNode;
  logoWidth?: number;
  logoHeight?: number;
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
}

export interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

export interface PasswordStrengthIndicatorProps {
  password: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  duration?: number;
}

export interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}