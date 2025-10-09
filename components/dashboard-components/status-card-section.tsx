"use client";

import { useAccounts } from "@/lib/hooks/use-accounts";
import StatusCard from "../common/status-card";

export default function StatusCardSection() {
  const { currentAccountData, loading, error } = useAccounts();


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="border border-white/10 gradient-dark-primary rounded-[14px] p-3 animate-pulse">
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-8 bg-white/20 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard active={false} title="Error" value="Failed to load" />
        <StatusCard active={false} title="Error" value="Failed to load" />
        <StatusCard active={false} title="Error" value="Failed to load" />
        <StatusCard active={false} title="Error" value="Failed to load" />
      </div>
    );
  }

  if (!currentAccountData) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard active={false} title="Balance" value="--" />
        <StatusCard active={false} title="Deposits" value="--" />
        <StatusCard active={false} title="Total P&L" value="--" />
        <StatusCard active={false} title="Total Trades" value="--" />
      </div>
    );
  }

  // Extract data from currentAccountData
  const { metaStats, analysis, mtAccount } = currentAccountData;
  
  const balance = metaStats?.balance || mtAccount.balance || 0;
  const deposits = metaStats?.deposits || 0;
  const totalPnL = metaStats?.profit || 0;
  const passedChallenges = analysis?.[0]?.status ? 1 : 0;


  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard 
        active={true} 
        title="Balance" 
        value={formatCurrency(balance)}
        tradeUp={balance >= 0}
      />
      <StatusCard 
        active={false} 
        title="Deposits" 
        value={formatCurrency(deposits)}
        tradeUp={true}
      />
      <StatusCard 
        active={false} 
        title="Total P&L" 
        value={formatCurrency(totalPnL)}
        tradeUp={totalPnL >= 0}
      />
      <StatusCard 
        active={false} 
        title="Total Trades" 
        value={passedChallenges.toString()}
        tradeUp={passedChallenges > 0}
        challenges={true}
      />
    </div>
  );
}
