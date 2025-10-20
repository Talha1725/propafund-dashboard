import apiClient from '../client';

export interface CreateSupportTicketRequest {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface CreateSupportTicketResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Create a new support ticket
 * @param data Support ticket data
 * @returns Promise with the created support ticket
 */
export async function createSupportTicket(
  data: CreateSupportTicketRequest
): Promise<CreateSupportTicketResponse> {
  const response = await apiClient.post<CreateSupportTicketResponse>(
    "/support",
    data
  );
  return response.data;
}
