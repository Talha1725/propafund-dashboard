import { type FieldConfig } from "@/components/support/support-form";

export const productFields: FieldConfig[] = [
  { 
    type: "select", 
    name: "accountType", 
    label: "Account Type", 
    placeholder: "Select Account Type", 
    fullWidth: true, 
    options: [
      { label: "Elite ($50,000)", value: "elite-50k" },
      { label: "Pro ($100,000)", value: "pro-100k" },
      { label: "Master ($200,000)", value: "master-200k" },
    ]
  },
];

export const challengeTypeOptions = [
  { label: "Stage One", value: "stage-one" },
  { label: "Funded", value: "funded" },
];

export const platformOptions = [
  { label: "Platform 5", value: "platform-5" },
  { label: "TraderLocker", value: "traderlocker" },
  { label: "MatchTrader", value: "matchtrader" },
];

// Challenge-specific data structure
export const challengeData = {
  "stage-one": {
    challengeType: "Stage One",
    duration: "30 Days",
    maxLoss: "8%",
    dailyLoss: "5%",
    minTradingDays: "5 Days",
    leverage: "1:100",
    weekendTrading: "Yes",
    cryptoTrading: "Yes",
    easEnabled: "Yes",
    basePrice: 279,
    description: "Complete the challenge in 30 days to get funded",
    features: ["30-day challenge", "8% max loss", "5 minimum trading days", "Full platform access"]
  },
  "funded": {
    challengeType: "Funded",
    duration: "Unlimited",
    maxLoss: "10%",
    dailyLoss: "5%",
    minTradingDays: "1 Day",
    leverage: "1:100",
    weekendTrading: "Yes",
    cryptoTrading: "Yes",
    easEnabled: "Yes",
    basePrice: 399,
    description: "Get instant access to funded trading account",
    features: ["Instant funding", "10% max loss", "1 minimum trading day", "Full platform access"]
  }
};

// Account type pricing multipliers
export const accountTypeMultipliers = {
  "elite-50k": 1.0,
  "pro-100k": 1.8,
  "master-200k": 3.2
};

// Platform data
export const platformData = {
  "platform-5": "Platform 5",
  "traderlocker": "TraderLocker",
  "matchtrader": "MatchTrader"
};

// Payment methods with dynamic pricing
export const getPaymentMethods = (challengeType: string, accountType: string, discountPercentage: number = 20) => {
  const basePrice = calculatePrice(challengeType, accountType);
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
      popularText: "Most traders choose this payment method"
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      price: formatPrice(basePrice),
      icon: "/images/card-icon.svg",
      isPopular: false
    },
    {
      id: "bank",
      name: "Bank Transfer",
      price: formatPrice(basePrice),
      icon: "/images/bank-icon.svg",
      isPopular: false
    }
  ];
};

// Price calculation function
export const calculatePrice = (challengeType: string, accountType: string) => {
  const challenge = challengeData[challengeType as keyof typeof challengeData];
  const multiplier = accountTypeMultipliers[accountType as keyof typeof accountTypeMultipliers] || 1.0;
  return Math.round(challenge.basePrice * multiplier);
};

// Price formatting function
export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

// Function to generate dynamic summary details
export const getSummaryDetails = (challengeType: string, accountType: string, platform: string) => {
  const challenge = challengeData[challengeType as keyof typeof challengeData];
  const accountSize = accountType === "elite-50k" ? "$50,000" : 
                     accountType === "pro-100k" ? "$100,000" : 
                     accountType === "master-200k" ? "$200,000" : "$50,000";
  
  const totalPrice = calculatePrice(challengeType, accountType);
  const platformName = platformData[platform as keyof typeof platformData] || "Platform 5";
  const paymentMethods = getPaymentMethods(challengeType, accountType);

  return [
    ["Challenge Type", challenge.challengeType],
    ["Account Size", accountSize],
    ["Challenge Duration", challenge.duration],
    ["Leverage", challenge.leverage],
    ["Minimum Trading Days", challenge.minTradingDays],
    ["Max Loss", challenge.maxLoss],
    ["Daily Loss", challenge.dailyLoss],
    ["Weekend / Crypto Trading", challenge.weekendTrading],
    ["EAs Enabled", challenge.easEnabled],
    ["Platform", platformName],
    ["Base Price", formatPrice(totalPrice)],
    ["Crypto Price (20% off)", formatPrice(Math.ceil(totalPrice * 0.8))],
    ["Order Total", formatPrice(totalPrice)],
  ];
};

// Function to get challenge details for display
export const getChallengeDetails = (challengeType: string) => {
  return challengeData[challengeType as keyof typeof challengeData];
};

// Keep the old static export for backward compatibility (can be removed later)
export const summaryDetails = [
  ["Challenge Type", "Regular"],
  ["Account Size", "$50,000"],
  ["Challenge Duration", "Unlimited"],
  ["Leverage", "1:100"],
  ["Minimum Trading Days", "1 Day"],
  ["Max Loss", "8%"],
  ["Daily Loss", "5%"],
  ["Weekend / Crypto Trading", "Yes"],
  ["EAs Enabled", "Yes"],
  ["Platform", "Platform 4"],
  ["Order Total", "$279.00"],
];

export const commonStyles = {
  sectionTitle: "font-romanica font-normal text-[32px] leading-[100%] tracking-[0%] uppercase text-white mb-5",
  label: "font-romanica font-normal text-[18px] leading-[100%] tracking-[0%] uppercase text-white",
  input: "w-full h-[64px] px-5 py-5 !font-creato-display !font-medium !text-[18px] !leading-[100%] !tracking-[-5%] bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/10 text-white placeholder:text-white/70 placeholder:font-creato-display placeholder:font-medium placeholder:text-[18px] placeholder:leading-[100%] placeholder:tracking-[-5%] focus:border-white/30 focus:outline-none rounded-none",
  legalText: "text-white/70 font-creato-display font-normal text-[14px] leading-[1.4] space-y-4 my-4",
  button: "w-full h-[45px] px-[30px] py-[12px] gap-[15px]",
};

export const content = {
  hero: {
    titleLine1: "Trading",
    titleLine2: "Challenges",
    subtitle: "Choose your challenge type and get funded to start your trading journey.",
  },
  sections: {
    product: "Product Details",
    summary: "Summary",
  },
  button: "Complete Order",
};
