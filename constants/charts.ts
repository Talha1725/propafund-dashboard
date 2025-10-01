export interface BalanceDataPoint {
  trades: number;
  balance: number;
}

export interface SentimentLevel {
  value: number;
  label: string;
  color: string;
}

export const BALANCE_CHART_DATA: BalanceDataPoint[] = [
  { trades: 0, balance: 0 },
  { trades: 5, balance: 2000 },
  { trades: 10, balance: 3500 },
  { trades: 15, balance: 7000 },
  { trades: 20, balance: 7000 },
  { trades: 25, balance: 12000 },
  { trades: 30, balance: 18000 },
  { trades: 35, balance: 25000 },
  { trades: 40, balance: 50000 },
  { trades: 45, balance: 35000 },
  { trades: 50, balance: 20000 },
  { trades: 55, balance: 7000 },
  { trades: 60, balance: 15000 },
  { trades: 65, balance: 25000 },
  { trades: 70, balance: 35000 },
  { trades: 75, balance: 30000 },
  { trades: 80, balance: 38000 },
  { trades: 85, balance: 41000 },
  { trades: 90, balance: 35000 },
  { trades: 95, balance: 30000 },
  { trades: 100, balance: 28000 }
];

export const SENTIMENT_LEVELS: SentimentLevel[] = [
  { value: 0, label: "Extreme Fear", color: "#ff4444" },
  { value: 20, label: "Fear", color: "#ff6666" },
  { value: 40, label: "Neutral", color: "#ffaa44" },
  { value: 60, label: "Greed", color: "#66ff66" },
  { value: 80, label: "Extreme Greed", color: "#44ff44" }
];

export const CHART_CONFIG = {
  balance: {
    maxBalance: 60000,
    minBalance: -20000,
    chartWidth: 649,
    chartHeight: 360,
    padding: 50
  },
  sentiment: {
    totalArcSpan: 320,
    startAngle: 250,
    endAngle: -70,
    updateInterval: 3000
  }
} as const;

export const BUTTON_POSITIONS = {
  profit: [
    { top: "calc(50% - 17px)", visibility: "sm:hidden" },
    { top: "calc(50% - 4px)", visibility: "hidden sm:block lg:hidden" },
    { top: "calc(50% - 12px)", visibility: "hidden lg:block xl:hidden" },
    { top: "calc(50% - 2px)", visibility: "hidden xl:block 2xl:hidden" },
    { top: "calc(50% - 2px)", visibility: "hidden 2xl:block" }
  ],
  loss: [
    { top: "calc(50% + 50px)", visibility: "sm:hidden" },
    { top: "calc(50% + 90px)", visibility: "hidden sm:block lg:hidden" },
    { top: "calc(50% + 87px)", visibility: "hidden lg:block xl:hidden" },
    { top: "calc(50% + 86px)", visibility: "hidden xl:block 2xl:hidden" },
    { top: "calc(50% + 94px)", visibility: "hidden 2xl:block" }
  ]
} as const;

export interface AccountOverviewDataPoint {
  date: string;
  value: number;
}

export const ACCOUNT_OVERVIEW_DATA: AccountOverviewDataPoint[] = [
  { date: "16 Mar", value: 180000 },
  { date: "18 Mar", value: 195000 },
  { date: "20 Mar", value: 180000 },
  { date: "22 Mar", value: 138000 },
  { date: "24 Mar", value: 180000 }
];
