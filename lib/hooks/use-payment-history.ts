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
  const { perPage = 10, filters } = options;
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
      
      // First, get the first page to know total pages
      const firstResponse = await paymentApi.getPaymentHistory({
        userId: user.id.toString(),
        page: 1,
        size: perPage,
        filters
      });

      if (!firstResponse.success) {
        setError('Failed to fetch payment history');
        return;
      }

      const totalPages = firstResponse.data.meta.last_page;
      let allData = [...firstResponse.data.list];

      // If there are more pages, fetch all of them
      if (totalPages > 1) {
        const remainingPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
        
        const remainingResponses = await Promise.all(
          remainingPages.map(pageNum => 
            paymentApi.getPaymentHistory({
              userId: user.id.toString(),
              page: pageNum,
              size: perPage,
              filters
            })
          )
        );

        // Combine all data
        remainingResponses.forEach(response => {
          if (response.success) {
            allData = [...allData, ...response.data.list];
          }
        });
      }

      setData(allData);
      setPagination({
        page: 1, // We're showing all data as one "page"
        lastPage: 1,
        total: allData.length,
        perPage: allData.length
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.email, perPage, filters]);

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
