import apiClient from '../client';
import type { PromoCardResponse } from '@/types/promo';

export const promo = {
  getActivePromoCards: async (): Promise<PromoCardResponse> => {
    const response = await apiClient.get('/promo-cards/active');
    return response.data;
  }
};
