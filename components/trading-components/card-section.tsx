"use client";

import React, { memo } from "react";
import { useRouter } from "next/navigation";
import { getActiveChallenges, getCompletedChallenges } from "@/lib/data/challenges";
import { AccountCard } from "@/components/cards/account-card";
import { ChallengeCard } from "@/components/cards/challenge-card";
import { useAccounts } from "@/lib/hooks/use-accounts";

interface CardSectionProps {
  type?: 'accounts' | 'challenges';
  activeTab?: 'active' | 'completed';
  noBackground?: boolean;
  showAddCard?: boolean;
  className?: string;
}

export const CardSection = memo<CardSectionProps>(({ type = 'accounts', activeTab = 'active', noBackground = false, showAddCard = true, className = '' }) => {
  const router = useRouter();
  const { accounts, selectedAccount, setSelectedAccount, accountsData, error } = useAccounts();
  
  // For challenges, get the appropriate data based on activeTab
  const challenges = type === 'challenges' 
    ? (activeTab === 'active' ? getActiveChallenges() : getCompletedChallenges())
    : [];

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
  };

  // Calculate days traded for a specific account
  const calculateDaysTraded = (accountLogin: string): number => {
    const activeAccountData = accountsData?.[accountLogin];
    if (!activeAccountData?.metaStats) return 0;
    
    const metaStats = activeAccountData.metaStats as { trades?: number; daysSinceTradingStarted?: number; tradingStartBrokerTime?: string };
    
    if (metaStats.trades && typeof metaStats.trades === 'number' && metaStats.trades > 0) {
      if (metaStats.daysSinceTradingStarted && typeof metaStats.daysSinceTradingStarted === 'number' && metaStats.daysSinceTradingStarted > 0) {
        return Math.ceil(metaStats.daysSinceTradingStarted as number);
      }
      
      if (metaStats.tradingStartBrokerTime && typeof metaStats.tradingStartBrokerTime === 'string') {
        return calculateDaysFromStartTime(metaStats.tradingStartBrokerTime as string);
      }
    }
    
    return 0;
  };

  const calculateDaysFromStartTime = (startTime: string): number => {
    const startDate = new Date(startTime);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Auto-select first account if none is selected and accounts are available
  React.useEffect(() => {
    if (type === 'accounts' && accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0].id);
    }
  }, [accounts, selectedAccount, setSelectedAccount, type]);

  // Error state
  if (error) {
    return (
      <div className={`w-full ${type === 'challenges' ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'grid grid-cols-1 gap-5'} ${noBackground ? 'bg-transparent' : ''}`}>
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="text-red-400 text-sm">Error loading accounts</div>
            <div className="text-white/50 text-xs mt-1">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${type === 'challenges' ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'grid grid-cols-1 gap-5'} ${noBackground ? 'bg-transparent' : ''} ${className}`}>
      {type === 'accounts' ? (
        // Real accounts rendering with selection
        <>
          {accounts.map((account) => {
            const isSelected = selectedAccount === account.id;
            const accountData = accountsData?.[account.login];
            const mtAccount = accountData?.mtAccount;
            
            return (
              <div 
                key={account.id}
                onClick={() => handleAccountSelect(account.id)}
                className="cursor-pointer"
              >
                <AccountCard
                  accountId={account.login}
                  username={mtAccount?.login || account.login}
                  password={mtAccount?.password || ''}
                  server={mtAccount?.server || ''}
                  platform={mtAccount?.platform}
                  phase={account.challengeType === 'twoPhase' ? 'Two Phase' : 'Instant Funding'}
                  tradesCount={account.trades || 0}
                  daysTraded={calculateDaysTraded(account.login)}
                  balance={isSelected}
                  isAddNewCard={false}
                />
              </div>
            );
          })}
          {showAddCard && (
            <AccountCard
              accountId=""
              username=""
              password=""
              server=""
              phase=""
              tradesCount={0}
              daysTraded={0}
              isAddNewCard
            />
          )}
        </>
      ) : (
        // Challenges rendering
        challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challengeId={challenge.id}
            phase={challenge.phase}
            numberOfTrades={challenge.tradesCount}
            daysTraded={challenge.daysTraded}
            balance={`$${challenge.balance.toLocaleString()}`}
            endDate={challenge.endDate || "N/A"}
            result={challenge.result}
            todaysProfit={`$${challenge.todayProfit.toLocaleString()}`}
            equity={`$${challenge.equity.toLocaleString()}`}
            unrealizedPnL={challenge.unrealizedPnL}
            onGraphClick={() => {
              // Navigate to challenge detail page
              router.push(`/user/challenges/${challenge.id}`);
            }}
            onKeyClick={() => {
              // Handle key click - could open credentials modal
              console.log('Key clicked for challenge:', challenge.id);
            }}
          />
        ))
      )}
    </div>
  );
});

CardSection.displayName = "CardSection";
