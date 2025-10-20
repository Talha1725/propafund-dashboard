import apiClient from '../client';
import type { CreateSupportTicketRequest, CreateSupportTicketResponse } from '@/types/support';

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
