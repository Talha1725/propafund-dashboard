"use client";

import React, { memo } from "react";
import { useRouter } from "next/navigation";
import { ACCOUNT_DATA, ACCOUNT_CREDENTIALS_DATA, ACCOUNT_CARD_CONSTANTS } from "@/constants/accounts";
import { getActiveChallenges, getCompletedChallenges } from "@/lib/data/challenges";
import { AccountCard } from "@/components/cards/account-card";
import { ChallengeCard } from "@/components/cards/challenge-card";
import { useAccounts } from "@/lib/hooks/use-accounts";

interface CardSectionProps {
  type?: 'accounts' | 'challenges';
  activeTab?: 'active' | 'completed';
  noBackground?: boolean;
}

export const CardSection = memo<CardSectionProps>(({ type = 'accounts', activeTab = 'active', noBackground = false }) => {
  const router = useRouter();
  const { accounts, selectedAccount, setSelectedAccount } = useAccounts();
  
  // For challenges, get the appropriate data based on activeTab
  const challenges = type === 'challenges' 
    ? (activeTab === 'active' ? getActiveChallenges() : getCompletedChallenges())
    : [];

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
  };

  // Auto-select first account if none is selected and accounts are available
  React.useEffect(() => {
    if (type === 'accounts' && accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0].id);
    }
  }, [accounts, selectedAccount, setSelectedAccount, type]);

  return (
    <div className={`w-full ${type === 'challenges' ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'grid grid-cols-1 gap-5'} ${noBackground ? 'bg-transparent' : ''}`}>
      {type === 'accounts' ? (
        // Real accounts rendering with selection
        <>
          {accounts.map((account, index) => {
            const isSelected = selectedAccount === account.id;
            const fallback = ACCOUNT_CARD_CONSTANTS.DEFAULT_CREDENTIALS;
            const creds = ACCOUNT_CREDENTIALS_DATA[account.login as keyof typeof ACCOUNT_CREDENTIALS_DATA];
            const platform = creds && typeof creds === "object" && "platform" in creds ? (creds as { platform?: string }).platform : undefined;
            
            return (
              <div 
                key={account.id}
                onClick={() => handleAccountSelect(account.id)}
                className="cursor-pointer"
              >
                <AccountCard
                  accountId={account.login}
                  username={(creds?.username) ?? account.login}
                  password={(creds?.password) ?? fallback.password}
                  server={(creds?.server) ?? fallback.server}
                  platform={platform}
                  phase={account.challengeType === 'twoPhase' ? 'Two Phase' : 'Instant Funding'}
                  tradesCount={account.trades || 0}
                  daysTraded={0}
                  balance={isSelected}
                  isAddNewCard={false}
                />
              </div>
            );
          })}
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
