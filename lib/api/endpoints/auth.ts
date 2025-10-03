import apiClient from '../client';
import { 
  LoginData, 
  RegisterData, 
  ForgotPasswordData, 
  ResetPasswordData 
} from '@/lib/schemas/auth';

export const auth = {
  login: async (data: LoginData) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  googleAuth: async (data: { access_token: string }) => {
    const response = await apiClient.post('/auth/google', data);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData & { token: string }) => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await apiClient.post('/auth/register-verified-email', { token });
    return response.data;
  },

  resendVerification: async (email: string) => {
    const response = await apiClient.post('/auth/resend-verification', { email });
    return response.data;
  },

  logout: async () => {
    // Client-side logout only - no server endpoint needed
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('refresh_token');
    }
  },

  me: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }
};