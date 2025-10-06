export interface Account {
    id: string;
    login: string;
    password: string;
    accountName: string;
    brokerName: string;
    platform: string;
    balance: number;
    challengeType: string;
    status: string;
    equity: number;
    profit: number;
    trades: number;
    paymentStatus: string;
    accountProtectionUsed: boolean;
    winRatio: number;
    averageWin: number;
    averageLoss: number;
  }