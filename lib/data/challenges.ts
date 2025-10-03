export interface ChallengeData {
  id: string;
  phase: string;
  tradesCount: number;
  daysTraded: number;
  balance: number;
  equity: number;
  todayProfit: number;
  result: string;
  unrealizedPnL: string;
  endDate?: string;
  isActive: boolean;
  startDate: string;
  platform: string;
  server: string;
}

export const CHALLENGES_DATA: ChallengeData[] = [
  {
    id: "903281",
    phase: "Two Phase",
    tradesCount: 105,
    daysTraded: 22,
    balance: 200000,
    equity: 200000,
    todayProfit: 0,
    result: "Ongoing",
    unrealizedPnL: "No open trades",
    endDate: "N/A",
    isActive: true,
    startDate: "August 29, 2025",
    platform: "MT5",
    server: "Propafund-Demo"
  },
  {
    id: "903282",
    phase: "Instant Funding",
    tradesCount: 105,
    daysTraded: 22,
    balance: 200000,
    equity: 200000,
    todayProfit: 0,
    result: "Ongoing",
    unrealizedPnL: "No open trades",
    endDate: "N/A",
    isActive: true,
    startDate: "August 29, 2025",
    platform: "MT5",
    server: "Propafund-Demo"
  }
];

export const getChallengeById = (id: string): ChallengeData | undefined => {
  return CHALLENGES_DATA.find(challenge => challenge.id === id);
};

export const getActiveChallenges = (): ChallengeData[] => {
  return CHALLENGES_DATA.filter(challenge => challenge.isActive);
};

export const getCompletedChallenges = (): ChallengeData[] => {
  return CHALLENGES_DATA.filter(challenge => !challenge.isActive);
};
