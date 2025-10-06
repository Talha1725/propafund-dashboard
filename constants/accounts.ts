export const ACCOUNT_TABS = [
  { id: "all", label: "All" },
  { id: "twophase", label: "Two Phase" },
  { id: "instantfunding", label: "Instant Funding" },
] as const;

export const ACCOUNT_DATA = [
  {
    accountId: "903281",
    phase: "Two Phase",
    tradesCount: 105,
    daysTraded: 22,
    isFirstCard: true
  },
  {
    accountId: "903282",
    phase: "Instant Funding",
    tradesCount: 89,
    daysTraded: 18
  },
];

export const CREDENTIAL_FIELDS = [
  { key: 'username', label: 'Login Username' },
  { key: 'password', label: 'Password' },
  { key: 'server', label: 'Server' },
] as const;

export type AccountTabId = typeof ACCOUNT_TABS[number]['id'];

export interface DataDisplayItemData {
  label: string;
  value: string;
  valueColor: "red" | "green" | "white";
  variant?: "horizontal" | "vertical";
}

export const ACCOUNT_OVERVIEW_DATA: DataDisplayItemData[] = [
  {
    label: "Account balance",
    value: "$52,300",
    valueColor: "white",
    variant: "vertical"
  },
  {
    label: "Average win",
    value: "$129.34",
    valueColor: "green",
    variant: "vertical"
  },
  {
    label: "Average loss",
    value: "$155.23",
    valueColor: "red",
    variant: "vertical"
  },
  {
    label: "Win ratio",
    value: "82.23%",
    valueColor: "white",
    variant: "vertical"
  }
];

export const ACCOUNT_DETAILS_DATA: DataDisplayItemData[] = [
  {
    label: "Account Type",
    value: "Two Phase",
    valueColor: "white"
  },
  {
    label: "Status",
    value: "Active",
    valueColor: "green"
  },
  {
    label: "Start",
    value: "August 29, 2025 9:30 PM",
    valueColor: "white"
  },
  {
    label: "End",
    value: "N/A",
    valueColor: "white"
  },
  {
    label: "Account Size",
    value: "14",
    valueColor: "white"
  },
  {
    label: "No. of trades",
    value: "105",
    valueColor: "white"
  },
  {
    label: "Days traded",
    value: "22",
    valueColor: "white"
  },
  {
    label: "Platform",
    value: "MT5",
    valueColor: "white"
  },
  {
    label: "Credentials",
    value: "View",
    valueColor: "white"
  }
];

export const OVERALL_DETAILS_DATA: DataDisplayItemData[] = [
  {
    label: "Total challenges bought",
    value: "50",
    valueColor: "white"
  },
  {
    label: "Total amount paid",
    value: "$292,321.23",
    valueColor: "white"
  },
  {
    label: "Total payouts",
    value: "140",
    valueColor: "white"
  },
  {
    label: "Total funded accounts",
    value: "14",
    valueColor: "white"
  },
  {
    label: "Total amount spent",
    value: "$22,321.23",
    valueColor: "white"
  },
  {
    label: "Payout ratio",
    value: "13.1r",
    valueColor: "white"
  }
];

export interface TradingBehaviorItem {
  label: string;
  value: string;
}

export const TRADING_BEHAVIOR_DATA: TradingBehaviorItem[] = [
  {
    label: "Avg. trade duration",
    value: "45m"
  },
  {
    label: "Avg. win size vs loss size",
    value: "+$95 vs -$65"
  },
  {
    label: "Most traded symbol",
    value: "XAUUSD"
  },
  {
    label: "Peak trading hour",
    value: "2-4PM"
  },
  {
    label: "Consistent activity",
    value: "2-4PM"
  },
  {
    label: "Winning Streak Record",
    value: "06"
  }
];

// Note: BALANCE_DATA moved to constants/charts.ts as BALANCE_CHART_DATA

export const ACCOUNT_CREDENTIALS_DATA = {
  // Regular Accounts
  "274178": {
    accountId: "274178",
    username: "274178",
    password: "d211e_@139",
    server: "ICMarketsSC-Demo"
  },
  "274179": {
    accountId: "274179", 
    username: "274179",
    password: "d211e_@139",
    server: "ICMarketsSC-Demo"
  },
  "274180": {
    accountId: "274180",
    username: "274180", 
    password: "d211e_@139",
    server: "ICMarketsSC-Demo"
  },
  // Challenge Accounts
  "903281": {
    accountId: "761478",
    username: "761478",
    password: "d211e_@139",
    server: "URFX-DemoServer",
    platform: "MetaTrader 5"
  },
  "903282": {
    accountId: "761479",
    username: "761479", 
    password: "d211e_@139",
    server: "URFX-DemoServer",
    platform: "MetaTrader 5"
  },
  "903283": {
    accountId: "761480",
    username: "761480",
    password: "d211e_@139", 
    server: "URFX-DemoServer",
    platform: "MetaTrader 5"
  }
} as const;

// Account Card Constants
export const ACCOUNT_CARD_CONSTANTS = {
  DEFAULT_CREDENTIALS: {
    password: "d211e_@139",
    server: "ICMarketsSC-Demo"
  },
  CARD_STYLES: {
    clicked: "backdrop-blur-[52px] border-t-[#a0a0a0] border-l-[#A685E8] border-r-[#A685E8] border-b-[#A685E8] bg-gradient-to-b from-[#13131505] to-[#FFFFFF0F]",
    balance: "white-purple-gradient border-t-[#FFFFFF] border-b-[#4EB2E4] border-l-[#4eb2e483] border-r-[#4eb2e483] bg-gradient-to-b from-white to-blue",
    default: "bg-gradient-to-b from-[#13131505] to-[#FFFFFF0F] border-white/10"
  },
  STATS_CONFIG: [
    { label: "No. of trades", key: "tradesCount" },
    { label: "Days traded", key: "daysTraded" }
  ],
  ADD_NEW_CARD_CONFIG: {
    mobile: {
      className: "sm:hidden w-full h-[41px] border border-black/16 rounded-lg px-3 py-1 bg-white flex items-center justify-center gap-[7.57px]",
      iconSize: { width: 16, height: 16 },
      textClassName: "text-black font-lay-grotesk font-medium text-sm leading-none",
      text: "Add New Account"
    },
    desktop: {
      className: "hidden sm:block w-full h-[146px] border border-black/16 rounded-[20px] p-5 relative overflow-hidden bg-white backdrop-blur-[24px]",
      iconSize: { width: 24, height: 24 },
      textClassName: "text-black font-lay-grotesk font-medium text-base leading-none",
      text: "Add new account",
      contentClassName: "flex flex-col items-center justify-center h-full gap-2.5"
    }
  }
} as const;
