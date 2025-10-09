"use client";

import { useState, useEffect, useCallback } from 'react';
import { paymentApi } from '@/lib/api/endpoints/payment';
import { useAtom } from 'jotai';
import { userAtom } from '@/lib/store/atoms';
import type { PaymentHistoryItem, PaymentHistoryFilters } from '@/types/billing';

interface UsePaymentHistoryOptions {
  page?: number;
  perPage?: number;
  filters?: PaymentHistoryFilters;
}

export function usePaymentHistory(options: UsePaymentHistoryOptions = {}) {
  const { page = 1, perPage = 10, filters } = options;
  const [user] = useAtom(userAtom);
  
  const [data, setData] = useState<PaymentHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    lastPage: 1,
    total: 0,
    perPage: 10
  });

  const fetchPaymentHistory = useCallback(async () => {
    if (!user?.id && !user?.email) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await paymentApi.getPaymentHistory({
        userId: user.id.toString(), // Ensure userId is a string
        page,
        size: perPage,
        filters
      });

      if (response.success) {
        setData(response.data.list);
        setPagination({
          page: response.data.meta.page,
          lastPage: response.data.meta.last_page,
          total: response.data.meta.total,
          perPage: response.data.meta.per_page
        });
      } else {
        setError('Failed to fetch payment history');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [user?.id, page, perPage, filters]);

  useEffect(() => {
    fetchPaymentHistory();
  }, [fetchPaymentHistory]);

  const refetch = useCallback(() => {
    fetchPaymentHistory();
  }, [fetchPaymentHistory]);

  return {
    data,
    loading,
    error,
    pagination,
    refetch
  };
}
