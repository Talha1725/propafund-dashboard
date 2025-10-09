import apiClient from '@/lib/api/client';
import type { PaymentHistoryRequest, PaymentHistoryResponse } from '@/types/billing';

export const paymentApi = {
  getPaymentHistory: async (params: PaymentHistoryRequest): Promise<PaymentHistoryResponse> => {
    const queryParams = new URLSearchParams({
      ...(params.userId && { userId: params.userId.toString() }),
      page: (params.page || 1).toString(),
      size: (params.size || 10).toString(),
      ...Object.fromEntries(
        Object.entries(params.filters || {}).map(([key, value]) => [
          key, 
          Array.isArray(value) ? value.join(',') : value?.toString() || ''
        ])
      )
    });
    
    const response = await apiClient.get(`/payment/v2/history?${queryParams}`);
    return response.data;
  }
};
