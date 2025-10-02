import React from "react";
import { TradeUp, TradeDown } from "@/components/common/icon";

const COUNTRY_FLAGS: Record<string, string> = {
  'IT': '🇮🇹',
  'CA': '🇨🇦',
  'PK': '🇵🇰',
  'ES': '🇪🇸',
  'ZA': '🇿🇦',
  'FR': '🇫🇷',
  'IN': '🇮🇳',
  'BR': '🇧🇷',
  'IE': '🇮🇪',
  'JP': '🇯🇵'
};

export const leaderboardData = [
  {
    id: 1,
    rank: "04",
    trader: "Isabella Rossi",
    location: "Rome, Italy",
    country: "IT",
    accountSize: "$1,000,000",
    winRate: "71.60%",
    winRateTrend: "up",
    profitFactor: "2.04",
    totalTrades: "182",
    monthlyReturns: "10.2%",
    monthlyReturnsTrend: "up"
  },
  {
    id: 2,
    rank: "05",
    trader: "Ethan Johnson",
    location: "Toronto, Canada",
    country: "CA",
    accountSize: "$500,000",
    winRate: "68.40%",
    winRateTrend: "down",
    profitFactor: "1.89",
    totalTrades: "156",
    monthlyReturns: "8.7%",
    monthlyReturnsTrend: "down"
  },
  {
    id: 3,
    rank: "06",
    trader: "Ayesha Khan",
    location: "Karachi, Pakistan",
    country: "PK",
    accountSize: "$250,000",
    winRate: "65.20%",
    winRateTrend: "up",
    profitFactor: "1.76",
    totalTrades: "203",
    monthlyReturns: "12.4%",
    monthlyReturnsTrend: "up"
  },
  {
    id: 4,
    rank: "07",
    trader: "Lucas Fernández",
    location: "Madrid, Spain",
    country: "ES",
    accountSize: "$100,000",
    winRate: "62.80%",
    winRateTrend: "down",
    profitFactor: "1.63",
    totalTrades: "189",
    monthlyReturns: "7.9%",
    monthlyReturnsTrend: "down"
  },
  {
    id: 5,
    rank: "08",
    trader: "Amara Ndlovu",
    location: "Johannesburg, South Africa",
    country: "ZA",
    accountSize: "$50,000",
    winRate: "59.50%",
    winRateTrend: "up",
    profitFactor: "1.51",
    totalTrades: "167",
    monthlyReturns: "9.3%",
    monthlyReturnsTrend: "up"
  },
  {
    id: 6,
    rank: "09",
    trader: "Matteo Bianchi",
    location: "Milan, Italy",
    country: "IT",
    accountSize: "$25,000",
    winRate: "56.70%",
    winRateTrend: "down",
    profitFactor: "1.38",
    totalTrades: "145",
    monthlyReturns: "6.8%",
    monthlyReturnsTrend: "down"
  },
  {
    id: 7,
    rank: "10",
    trader: "Chloe Dubois",
    location: "Paris, France",
    country: "FR",
    accountSize: "$10,000",
    winRate: "53.90%",
    winRateTrend: "up",
    profitFactor: "1.25",
    totalTrades: "134",
    monthlyReturns: "8.1%",
    monthlyReturnsTrend: "up"
  },
  {
    id: 8,
    rank: "11",
    trader: "Rajesh Sharma",
    location: "Delhi, India",
    country: "IN",
    accountSize: "$5,000",
    winRate: "51.20%",
    winRateTrend: "down",
    profitFactor: "1.12",
    totalTrades: "198",
    monthlyReturns: "5.6%",
    monthlyReturnsTrend: "down"
  },
  {
    id: 9,
    rank: "12",
    trader: "Gabriela Silva",
    location: "São Paulo, Brazil",
    country: "BR",
    accountSize: "$1,000,000",
    winRate: "48.60%",
    winRateTrend: "up",
    profitFactor: "1.08",
    totalTrades: "176",
    monthlyReturns: "7.2%",
    monthlyReturnsTrend: "up"
  },
  {
    id: 10,
    rank: "13",
    trader: "Liam O'Connor",
    location: "Dublin, Ireland",
    country: "IE",
    accountSize: "$500,000",
    winRate: "45.80%",
    winRateTrend: "down",
    profitFactor: "0.95",
    totalTrades: "123",
    monthlyReturns: "4.9%",
    monthlyReturnsTrend: "down"
  },
  {
    id: 11,
    rank: "14",
    trader: "Hiroshi Tanaka",
    location: "Tokyo, Japan",
    country: "JP",
    accountSize: "$250,000",
    winRate: "42.30%",
    winRateTrend: "up",
    profitFactor: "0.87",
    totalTrades: "156",
    monthlyReturns: "6.3%",
    monthlyReturnsTrend: "up"
  }
];

export const leaderboardColumns = [
  {
    key: "rank",
    label: "Rank",
    sortable: true
  },
  {
    key: "trader",
    label: "Trader",
    sortable: true,
    render: (value: string, row: any) => React.createElement('div', null,
      React.createElement('div', { className: "text-white font-medium" }, value),
      React.createElement('div', { className: "flex items-center gap-2 text-gray-400 text-sm" },
        React.createElement('span', null, COUNTRY_FLAGS[row.country] || '🏳️'),
        React.createElement('span', null, row.location)
      )
    )
  },
  {
    key: "accountSize",
    label: "Account Size",
    sortable: true
  },
  {
    key: "winRate",
    label: "Win Rate",
    sortable: true,
    render: (value: string, row: any) => React.createElement('div', { className: "flex items-center gap-2" },
      React.createElement('span', { className: "text-white" }, value),
      row.winRateTrend === "up" 
        ? React.createElement(TradeUp, { className: "w-4 h-4", fill: "#00EB6E" })
        : React.createElement(TradeDown, { className: "w-4 h-4" })
    )
  },
  {
    key: "profitFactor",
    label: "Profit Factor",
    sortable: true
  },
  {
    key: "totalTrades",
    label: "Total Trades",
    sortable: true
  },
  {
    key: "monthlyReturns",
    label: "Monthly Returns",
    sortable: true,
    render: (value: string, row: any) => React.createElement('div', { className: "flex items-center gap-2" },
      React.createElement('span', { className: "text-white" }, value),
      row.monthlyReturnsTrend === "up" 
        ? React.createElement(TradeUp, { className: "w-4 h-4", fill: "#00EB6E" })
        : React.createElement(TradeDown, { className: "w-4 h-4" })
    )
  }
];
