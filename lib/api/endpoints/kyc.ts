import apiClient from '../client';
import type { 
  KYCStatusResponse, 
  KYCDataComplete, 
  KYCListResponse, 
  KYCUpdateRequest 
} from '@/types/kyc';
import type { SumsubAccessTokenResponse } from '@/types/sumsub';

// User endpoints
export const kycApi = {
  // Get KYC status for current user
  getStatus: async (): Promise<KYCStatusResponse> => {
    const response = await apiClient.get('/kyc/status');
    return response.data.data || response.data;
  },

  // Submit or resubmit KYC
  submit: async (formData: FormData): Promise<{ id: number; createdAt: string }> => {
    const response = await apiClient.post('/kyc/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data?.kyc || response.data.kyc || { id: response.data.id, createdAt: response.data.createdAt };
  },

  // Get Sumsub access token
  getSumsubAccessToken: async (): Promise<SumsubAccessTokenResponse> => {
    const response = await apiClient.get('/kyc/sumsub/token');
    return response.data.data || response.data;
  },

  // Verify KYC status with Sumsub (manually sync status from Sumsub)
  verifySumsubStatus: async (): Promise<{
    success: boolean;
    message?: string;
    data?: {
      applicantId: string;
      status: 'not_submitted' | 'pending' | 'approved' | 'rejected';
      previousStatus?: string;
      statusChanged: boolean;
      reviewStatus?: string;
      reviewAnswer?: 'GREEN' | 'RED' | 'YELLOW';
      rejectionReason?: string | null;
      verifiedAt?: string;
    };
  }> => {
    const response = await apiClient.post('/kyc/sumsub/verify');
    return response.data.data || response.data;
  },
};

// Admin endpoints
export const adminKycApi = {
  // Get all KYC submissions
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<KYCListResponse> => {
    const response = await apiClient.get('/admin/kyc', { params });
    return response.data.data || response.data;
  },

  // Update KYC status (approve/reject)
  updateStatus: async (
    userId: number,
    data: KYCUpdateRequest
  ): Promise<KYCDataComplete> => {
    const response = await apiClient.put(`/admin/kyc/${userId}/status`, data);
    return response.data.data?.kyc || response.data.kyc;
  },

  // Search users for manual KYC approval
  searchUsers: async (search: string, limit = 20): Promise<{
    users: Array<{
      id: number;
      email: string;
      fullName: string | null;
      userName: string | null;
      kycStatus: string;
      createdAt: string;
      profile?: {
        firstName: string | null;
        lastName: string | null;
        country: string | null;
      };
    }>;
    count: number;
  }> => {
    const response = await apiClient.get('/admin/kyc/search-users', {
      params: { search, limit }
    });
    return response.data.data || response.data;
  },

  // Manually approve KYC for user without submission
  manuallyApprove: async (
    userId: number,
    reason?: string
  ): Promise<{
    success: boolean;
    user: {
      id: number;
      email: string;
      fullName: string | null;
      kycStatus: string;
    };
    message: string;
  }> => {
    const response = await apiClient.post(`/admin/kyc/manual-approve/${userId}`, {
      reason
    });
    return response.data.data || response.data;
  },
};

