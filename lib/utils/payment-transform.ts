import type { PaymentHistoryItem, BillingItem } from '@/types/billing';

export const transformPaymentHistoryToBilling = (payments: PaymentHistoryItem[]): BillingItem[] => {
  return payments.map((payment) => ({
    id: payment.id.toString(),
    orderNumber: payment.trackId, // Show track ID as order number
    challenge: payment.challenge === 'instantFund' ? 'Instant Fund' : 
               payment.challenge === 'twoPhase' ? 'Two Phase' : 
               payment.challenge.charAt(0).toUpperCase() + payment.challenge.slice(1),
    status: payment.status === 'Paid' ? 'paid' : 'unpaid',
    date: new Date(payment.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    amount: payment.amount > 0 ? `$${payment.amount.toFixed(2)}` : 'Free',
    platform: payment.platform.toUpperCase()
  }));
};

export const getUniqueFilterOptions = (payments: PaymentHistoryItem[]) => {
  const statuses = [...new Set(payments.map(p => p.status))];
  const platforms = [...new Set(payments.map(p => p.platform))];
  const methods = [...new Set(payments.map(p => p.method).filter(Boolean))];
  const challenges = [...new Set(payments.map(p => p.challenge))];
  
  return {
    statuses,
    platforms,
    methods,
    challenges
  };
};
