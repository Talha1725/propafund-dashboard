export interface BannerConfig {
  id: number;
  text: string;
  isActive: boolean;
  linkUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BannerResponse {
  success: boolean;
  data: BannerConfig;
  message: string;
}
