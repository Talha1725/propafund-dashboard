export interface CreateSupportTicketRequest {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface SupportTicketData {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupportTicketResponse {
  success: boolean;
  message: string;
  data?: SupportTicketData;
}

// API Response type
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

