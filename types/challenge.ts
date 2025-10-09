export interface ChallengeCardProps {
  challengeId: string;
  phase: string;
  numberOfTrades: number;
  daysTraded: number;
  balance: string;
  endDate: string;
  result: string;
  todaysProfit: string;
  equity: string;
  unrealizedPnL: string;
  onGraphClick: () => void;
  onKeyClick: () => void;
  username?: string;
  password?: string;
  server?: string;
  platform?: string;
}
