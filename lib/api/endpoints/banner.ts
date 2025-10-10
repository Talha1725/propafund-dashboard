import apiClient from '../client';
import type { BannerResponse } from '@/types/banner';

export const banner = {
  getActiveBanner: async (): Promise<BannerResponse> => {
    const response = await apiClient.get('/admin/banner-config');
    return response.data;
  }
};
