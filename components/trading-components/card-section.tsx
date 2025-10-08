"use client";

import React, { memo } from "react";
import { useRouter } from "next/navigation";
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

export const CardSection = memo<CardSectionProps>(({ type = 'accounts', noBackground = false, showAddCard = true, className = '' }) => {
  const router = useRouter();
  const { accounts, selectedAccount, setSelectedAccount, accountsData, error } = useAccounts();

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
  };

  // Calculate days traded for a specific account
  const calculateDaysTraded = (accountLogin: string): number => {
    const activeAccountData = accountsData?.[accountLogin];
    if (!activeAccountData?.mtAccount) return 0;
    
    // Use account creation date to calculate days since account was created
    const createdAt = activeAccountData.mtAccount.createdAt;
    if (!createdAt) return 0;
    
    const startDate = new Date(createdAt);
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
        // Challenges rendering - use real account data instead of static challenges
        accounts.map((account) => {
          const accountData = accountsData?.[account.login];
          const mtAccount = accountData?.mtAccount;
          const metaStats = accountData?.metaStats;
          
          const getStatusDisplay = (status: string): string => {
            switch (status) {
              case 'active':
                return 'Ongoing';
              case 'failed':
                return 'Failed';
              case 'completed':
                return 'Completed';
              default:
                return status;
            }
          };

          const getTodaysProfit = () => {
            if (!metaStats) return "$0.00";
            if (metaStats.periods?.today?.trades) {
              const todayTrades = metaStats.periods.today.trades;
              const avgProfitPerTrade = metaStats.trades > 0 ? metaStats.profit / metaStats.trades : 0;
              const todayProfit = todayTrades * avgProfitPerTrade;
              return `$${todayProfit.toFixed(2)}`;
            }
            
            // Fallback: try to get from dailyGrowth array
            if (metaStats.dailyGrowth && metaStats.dailyGrowth.length > 0) {
              const today = new Date().toISOString().split('T')[0];
              const todayData = metaStats.dailyGrowth.find(day => day.date === today);
              if (todayData) {
                const yesterdayData = metaStats.dailyGrowth[metaStats.dailyGrowth.length - 2];
                if (yesterdayData) {
                  const profit = todayData.balance - yesterdayData.balance;
                  return `$${profit.toFixed(2)}`;
                }
              }
            }
            
            return "$0.00";
          };

          const getUnrealizedPnL = () => {
            if (!metaStats) return "$0.00";
            const equity = metaStats.equity || 0;
            const balance = metaStats.balance || 0;
            const unrealized = equity - balance;
            if (unrealized === 0) return "$0.00";
            return unrealized > 0 ? `+$${unrealized.toFixed(2)}` : `-$${Math.abs(unrealized).toFixed(2)}`;
          };

          const getEndDate = () => {
            if (!mtAccount) return "N/A";
            const createdAt = new Date(mtAccount.createdAt);
            let endDate: Date;
            
            if (mtAccount.challengeType === 'twoPhase') {
              endDate = new Date(createdAt.getTime() + (60 * 24 * 60 * 60 * 1000));
            } else {
              endDate = new Date(createdAt.getTime() + (30 * 24 * 60 * 60 * 1000));
            }
            
            const month = (endDate.getMonth() + 1).toString().padStart(2, '0');
            const day = endDate.getDate().toString().padStart(2, '0');
            const year = endDate.getFullYear();
            
            return `${month}/${day}/${year}`;
          };

          return (
            <div 
              key={account.id}
            >
              <ChallengeCard
                challengeId={account.login}
                phase={account.challengeType === 'twoPhase' ? 'Two Phase' : 'Instant Funding'}
                numberOfTrades={account.trades || 0}
                daysTraded={calculateDaysTraded(account.login)}
                balance={`$${(metaStats?.balance || mtAccount?.balance || 0).toFixed(2)}`}
                endDate={getEndDate()}
                result={getStatusDisplay(mtAccount?.status || 'active')}
                todaysProfit={getTodaysProfit()}
                equity={`$${(metaStats?.equity || mtAccount?.balance || 0).toFixed(2)}`}
                unrealizedPnL={getUnrealizedPnL()}
                onGraphClick={() => {
                  // Navigate to challenge detail page
                  router.push(`/user/challenges/${account.login}`);
                }}
                onKeyClick={() => {
                  // This will be handled by the ChallengeCard component itself
                }}
                username={mtAccount?.login || account.login}
                password={mtAccount?.password || ''}
                server={mtAccount?.server || ''}
                platform={mtAccount?.platform || ''}
              />
            </div>
          );
        })
      )}
    </div>
  );
});

CardSection.displayName = "CardSection";
