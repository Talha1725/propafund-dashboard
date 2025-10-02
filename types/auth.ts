
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

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

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

export interface AuthResponse {
  status?: string;
  success?: boolean;
  message?: string;
  error?: string;
  token?: string;
  user?: User;
  data?: User | { userData?: User; token?: string };
}

// Authentication context types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordData) => Promise<void>;
  resetPassword: (data: ResetPasswordData & { token: string }) => Promise<void>;
  socialLogin: (provider: 'google' | 'apple', token: string) => Promise<void>;
}

// Form data types (re-exported from schemas for convenience)
export type { LoginData, RegisterData, ForgotPasswordData, ResetPasswordData } from '@/lib/schemas/auth';

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

// Import types for use in interfaces
import type { LoginData, RegisterData, ForgotPasswordData, ResetPasswordData } from '@/lib/schemas/auth';

