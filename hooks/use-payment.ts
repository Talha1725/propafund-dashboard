import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { paymentApi } from '@/lib/api/endpoints/payment';
import { calculatePrice, balanceMap, platformMap, challengeMap } from '@/constants/checkout';
import type { 
  PaymentState, 
  CheckoutState, 
  CreatePaymentRequest 
} from '@/types/payment-api';

export const usePayment = () => {
  const [state, setState] = useState<PaymentState>({
    loading: false,
    error: null,
    payment: null,
    paymentStatus: null,
    processingStatus: 'idle'
  });

  const createPayment = useCallback(async (
    checkoutState: CheckoutState,
    billingData: Record<string, string>,
    paymentMethod: string,
    discountPercentage: number = 0
  ) => {
    setState(prev => ({ 
      ...prev, 
      loading: true, 
      error: null, 
      processingStatus: 'creating' 
    }));

    try {
      // Calculate the price based on selections
      const amount = calculatePrice(checkoutState.selectedFunding, checkoutState.selectedAccountSize);
      
      // Apply crypto discount if crypto payment
      const discountMultiplier = 1 - (discountPercentage / 100);
      const finalAmount = paymentMethod === 'crypto' ? Math.ceil(amount * discountMultiplier) : amount;

      // Get balance value
      const balanceValue = balanceMap[checkoutState.selectedAccountSize] || 50000;

      const paymentRequest: CreatePaymentRequest = {
        email: billingData.email,
        amount: finalAmount,
        platform: platformMap[checkoutState.selectedPlatform] || 'mt5',
        balance: balanceValue,
        challenge: challengeMap[checkoutState.selectedFunding] || 'twoPhase',
        paymentMethod: paymentMethod as 'crypto' | 'copecart' | 'card',
        currency: 'USD',
        returnUrl: `${window.location.origin}/payment-success`,
        notes: `${checkoutState.selectedFunding} ${checkoutState.selectedAccountSize}`,
        termsAccepted: true
      };

      const response = await paymentApi.createPayment(paymentRequest);
      
      if (response.success) {
        setState(prev => ({ 
          ...prev, 
          loading: true,
          payment: response.data,
          processingStatus: 'waiting'
        }));
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create payment');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Payment creation failed';
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage,
        processingStatus: 'failed'
      }));
      toast.error(errorMessage);
      return null;
    }
  }, []);

  const checkPaymentStatus = useCallback(async (trackId: string) => {
    setState(prev => ({ 
      ...prev, 
      loading: true, 
      error: null,
      processingStatus: 'processing'
    }));

    try {
      const response = await paymentApi.getPaymentStatus({ trackId });
      
      if (response.success || response.result) {
        const paymentData = response.data || response.result;
        setState(prev => ({ 
          ...prev, 
          loading: false,
          paymentStatus: paymentData,
          processingStatus: paymentData?.payment?.status === 'Paid' ? 'completed' : 'processing'
        }));
        return paymentData;
      } else {
        throw new Error(response.message || 'Failed to check payment status');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Payment status check failed';
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage,
        processingStatus: 'failed'
      }));
      toast.error(errorMessage);
      return null;
    }
  }, []);

  const startPaymentPolling = useCallback((trackId: string, interval: number = 5000) => {
    const pollInterval = setInterval(async () => {
      const status = await checkPaymentStatus(trackId);
      if (status?.payment?.status === 'Paid' || status?.payment?.status === 'Failed') {
        clearInterval(pollInterval);
      }
    }, interval);

    return () => clearInterval(pollInterval);
  }, [checkPaymentStatus]);

  const resetPayment = useCallback(() => {
    setState({
      loading: false,
      error: null,
      payment: null,
      paymentStatus: null,
      processingStatus: 'idle'
    });
  }, []);

  return {
    ...state,
    createPayment,
    checkPaymentStatus,
    startPaymentPolling,
    resetPayment
  };
};
