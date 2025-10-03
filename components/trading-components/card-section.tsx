"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { ACCOUNT_DATA, ACCOUNT_CREDENTIALS_DATA, ACCOUNT_CARD_CONSTANTS } from "@/constants/accounts";
import { getActiveChallenges, getCompletedChallenges } from "@/lib/data/challenges";
import { AccountCard } from "@/components/cards/account-card";
import { ChallengeCard } from "@/components/cards/challenge-card";

interface CardSectionProps {
  type?: 'accounts' | 'challenges';
  activeTab?: 'active' | 'completed';
  noBackground?: boolean;
}

export const CardSection = memo<CardSectionProps>(({ type = 'accounts', activeTab = 'active', noBackground = false }) => {
  const router = useRouter();
  
  // For challenges, get the appropriate data based on activeTab
  const challenges = type === 'challenges' 
    ? (activeTab === 'active' ? getActiveChallenges() : getCompletedChallenges())
    : [];

  return (
    <div className={`w-full ${type === 'challenges' ? 'grid grid-cols-1 md:grid-cols-2 gap-5' : 'grid grid-cols-1 gap-5'} ${noBackground ? 'bg-transparent' : ''}`}>
      {type === 'accounts' ? (
        // Original accounts rendering
        <>
          {ACCOUNT_DATA.map((account, index) => {
            const fallback = ACCOUNT_CARD_CONSTANTS.DEFAULT_CREDENTIALS;
            const creds = ACCOUNT_CREDENTIALS_DATA[account.accountId as keyof typeof ACCOUNT_CREDENTIALS_DATA];
            const platform = creds && typeof creds === "object" && "platform" in creds ? (creds as { platform?: string }).platform : undefined;
            return (
              <AccountCard
                key={index}
                accountId={account.accountId}
                username={(creds?.username) ?? account.accountId}
                password={(creds?.password) ?? fallback.password}
                server={(creds?.server) ?? fallback.server}
                platform={platform}
                phase={account.phase}
                tradesCount={account.tradesCount}
                daysTraded={account.daysTraded}
                balance={!!(account as { isFirstCard?: boolean }).isFirstCard}
                isAddNewCard={false}
              />
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
