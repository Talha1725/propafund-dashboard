import apiClient from '../client';
import { LeaderboardResponse } from '@/types/leaderboard';

export const leaderboard = {
  getLeaderboard: async (): Promise<LeaderboardResponse> => {
    const response = await apiClient.get('/public/leaderboard');
    return response.data;
  }
};
