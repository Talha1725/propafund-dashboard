export interface SumsubAccessTokenResponse {
  success: boolean;
  token: string;
  expiresIn: number; // Token expiration time in seconds (e.g., 600 = 10 minutes)
}

export interface SumsubVerificationStatus {
  reviewStatus: 'init' | 'pending' | 'queued' | 'completed';
  reviewResult: {
    reviewAnswer: 'GREEN' | 'RED' | 'YELLOW';
    reviewRejectType?: string;
    reviewRejectLabels?: string[];
    moderationComment?: string;
  };
  applicantId: string;
  externalUserId: string;
}

export interface SumsubConfig {
  accessToken: string;
  applicantId?: string;
  externalUserId?: string;
  lang?: string;
  theme?: 'light' | 'dark';
  onMessage?: (type: string, payload: any) => void;
  onError?: (error: any) => void;
}

