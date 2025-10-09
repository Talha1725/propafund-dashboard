// Payment API Request/Response Types
export interface CreatePaymentRequest {
  email: string;
  amount: number;
  platform: string;
  balance: number;
  challenge: string;
  paymentMethod: 'crypto' | 'copecart' | 'card';
  currency?: string;
  addOns?: any;
  returnUrl?: string;
  notes?: string;
  termsAccepted?: boolean;
}

export interface CreatePaymentResponse {
  success: boolean;
  data: {
    payment: {
      id: string;
      trackId: string;
      orderRef: string;
      amount: number;
      currency: string;
      status: string;
      platform: string;
      balance: number;
      challenge: string;
    };
    oxapay?: {
      track_id: string;
      payment_url: string;
      payment_page: string;
    };
    card?: {
      product_name: string;
      checkout_url: string;
      payment_url: string;
    };
  };
  message: string;
}

export interface PaymentStatusRequest {
  trackId: string;
}

export interface PaymentStatusResponse {
  success?: boolean;
  message?: string;
  data?: {
    payment: {
      id: string;
      trackId: string;
      amount: number;
      status: string;
      accountId?: string;
    };
    account?: {
      accountId: string;
      login: string;
      server: string;
      password: string;
      platform: string;
      balance: number;
      challengeType: string;
      source: string;
    };
    provider: {
      status: string;
      method: string;
      data: any;
    };
  };
  result?: {
    payment: {
      id: string;
      trackId: string;
      amount: number;
      status: string;
      method?: string;
      platform?: string;
      balance?: number;
      challenge?: string;
      accountId?: string;
    };
    account?: {
      accountId: string;
      login: string;
      server: string;
      password: string;
      platform: string;
      balance: number;
      challengeType: string;
      source: string;
    };
    provider: {
      status: string;
      method: string;
      data: any;
    };
  };
}

export interface PaymentInfoResponse {
  success: boolean;
  data: {
    payment: {
      id: string;
      trackId: string;
      amount: number;
      currency: string;
      status: string;
      method: string;
      platform: string;
      balance: number;
      challenge: string;
      createdAt: string;
      updatedAt: string;
      accountId?: string;
      addOns?: any;
    };
    user: {
      email: string;
      name: string;
    };
  };
  message: string;
}
