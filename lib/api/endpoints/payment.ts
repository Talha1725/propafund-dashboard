import apiClient from '../client';
import type { PaymentHistoryRequest, PaymentHistoryResponse } from '@/types/billing';
import type { 
  CreatePaymentRequest, 
  CreatePaymentResponse, 
  PaymentStatusRequest, 
  PaymentStatusResponse 
} from '@/types/payment-api';

export const paymentApi = {
  // Create a new payment (crypto or card)
  createPayment: async (data: CreatePaymentRequest): Promise<CreatePaymentResponse> => {
    const response = await apiClient.post('/payment/v2/create', data);
    return response.data;
  },

  // Get payment status
  getPaymentStatus: async (data: PaymentStatusRequest): Promise<PaymentStatusResponse> => {
    const response = await apiClient.post('/payment/v2/status', data);
    return response.data;
  },

  // Get payment info by ID
  getPaymentInfo: async (paymentId: string) => {
    const response = await apiClient.get(`/payment/v2/info/${paymentId}`);
    return response.data;
  },

  // Get payment history
  getPaymentHistory: async (params: PaymentHistoryRequest): Promise<PaymentHistoryResponse> => {
    const queryParams = new URLSearchParams({
      ...(params.userId && { userId: params.userId.toString() }),
      page: (params.page || 1).toString(),
      size: (params.size || 10).toString(),
      ...Object.fromEntries(
        Object.entries(params.filters || {}).map(([key, value]) => [
          key, 
          Array.isArray(value) ? value.join(',') : String(value || '')
        ])
      )
    });
    
    const response = await apiClient.get(`/payment/v2/history?${queryParams}`);
    return response.data;
  },

  // Get active discount info for crypto payments
  getActiveDiscountInfo: async () => {
    const response = await apiClient.get('/public/payment-discount-settings');
    return response.data;
  }
};
