"use client";

import { memo } from "react";
import { ACCOUNT_DATA, ACCOUNT_CREDENTIALS_DATA, ACCOUNT_CARD_CONSTANTS } from "@/constants/accounts";
import { AccountCard } from "@/components/cards/account-card";

export const CardSection = memo(() => {
  return (
    <div className="w-full grid grid-cols-1 gap-5">
      {ACCOUNT_DATA.map((account, index) => {
        const fallback = ACCOUNT_CARD_CONSTANTS.DEFAULT_CREDENTIALS;
        const creds = ACCOUNT_CREDENTIALS_DATA[account.accountId as keyof typeof ACCOUNT_CREDENTIALS_DATA];
        const platform = creds && typeof creds === "object" && "platform" in creds ? (creds as any).platform : undefined;
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
            balance={!!(account as any).isFirstCard}
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
    </div>
  );
});

CardSection.displayName = "CardSection";
