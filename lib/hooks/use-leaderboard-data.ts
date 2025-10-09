import { useState, useEffect } from 'react';
import { LeaderboardUser } from '@/types/leaderboard';
import { leaderboard } from '@/lib/api/endpoints/leaderboard';

export function useLeaderboardData() {
  const [data, setData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await leaderboard.getLeaderboard();
        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Failed to fetch leaderboard data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await leaderboard.getLeaderboard();
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch leaderboard data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch
  };
}
