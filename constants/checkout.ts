import type { PaymentMethod } from '@/types/payment-api';

// Platform mapping
export const platformMap: Record<string, string> = {
  'platform-5': 'mt5',
  'platform-4': 'mt4',
  'platform-ctrader': 'ctrader',
  'platform-tradingview': 'tradingview'
};

// Challenge mapping
export const challengeMap: Record<string, string> = {
  'stage-one': 'twoPhase',
  'instant-fund': 'instantFund',
  'evaluation': 'evaluation'
};

// Balance mapping
export const balanceMap: Record<string, number> = {
  'elite-50k': 50000,
  'pro-100k': 100000,
  'master-200k': 200000,
  'elite-10k': 10000,
  'pro-25k': 25000,
  'master-50k': 50000
};

// Price calculation function
export const calculatePrice = (fundingType: string, accountSize: string): number => {
  const basePrices: Record<string, Record<string, number>> = {
    'stage-one': {
      'elite-50k': 279,
      'pro-100k': 399,
      'master-200k': 599
    },
    'instant-fund': {
      'elite-50k': 399,
      'pro-100k': 599,
      'master-200k': 899
    },
    'evaluation': {
      'elite-50k': 199,
      'pro-100k': 299,
      'master-200k': 449
    }
  };

  return basePrices[fundingType]?.[accountSize] || 279;
};

// Format price function
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// Get payment methods with pricing
export const getPaymentMethods = (fundingType: string, accountSize: string, discountPercentage: number = 0): PaymentMethod[] => {
  const basePrice = calculatePrice(fundingType, accountSize);
  const discountMultiplier = 1 - (discountPercentage / 100);
  const cryptoPrice = Math.ceil(basePrice * discountMultiplier);

  return [
    {
      id: "crypto",
      name: `Crypto payment (${discountPercentage}% off)`,
      originalPrice: formatPrice(basePrice),
      discountedPrice: formatPrice(cryptoPrice),
      icon: "/images/crypto-icon.svg",
      isPopular: true,
      popularText: "82% of people chose this Payment Method"
    },
    {
      id: "credit",
      name: "Credit Card",
      originalPrice: formatPrice(basePrice),
      icon: "/images/card-icon.svg"
    }
  ];
};

// Validation fields for different payment methods
export const getValidationFields = (paymentMethod: string): string[] => {
  const baseFields = ['firstName', 'lastName', 'email', 'country', 'streetAddress', 'city', 'state', 'zipCode', 'phone'];
  
  if (paymentMethod === 'crypto') {
    return baseFields; // Crypto payments require all fields
  }
  
  return baseFields; // Credit card also requires all fields for now
};
