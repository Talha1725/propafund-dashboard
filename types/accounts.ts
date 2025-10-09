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
    createdAt: string;
    updatedAt: string;
    startingBalance: number;
    winRatio: number;
    averageWin: number;
    averageLoss: number;
    dailyGrowth: Array<{
        date: string;
        balance: number;
    }>;
}