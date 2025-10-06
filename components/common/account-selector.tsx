"use client";

import { useAccounts } from "@/lib/hooks/use-accounts";
import { usePathname, useRouter } from "next/navigation";
import { User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AccountSelector() {
  const { accounts, currentAccount, selectedAccount, setSelectedAccount, loading } = useAccounts();
  const pathname = usePathname();
  const router = useRouter();

  const formatChallengeType = (type: string) => {
    switch (type) {
      case 'twoPhase': return 'Two Phase';
      case 'instantFund': return 'Instant Fund';
      default: return type;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAccountSelection = (accountId: string) => {
    setSelectedAccount(accountId);
    
    if (pathname === '/user/account-details') {
      const selectedAccountData = accounts.find(account => account.id === accountId);
      if (selectedAccountData) {
        router.push(`/user/account-details?accountId=${selectedAccountData.login}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 border border-white/10 rounded-lg">
        <User className="w-4 h-4 text-white/50" />
        <div className="flex flex-col">
          <div className="h-4 w-20 bg-white/20 rounded animate-pulse"></div>
          <div className="h-3 w-16 bg-white/20 rounded animate-pulse mt-1"></div>
        </div>
      </div>
    );
  }

  if (!currentAccount || accounts.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 border border-white/10 rounded-lg">
        <User className="w-4 h-4 text-white/50" />
        <span className="text-white/50 text-sm">No Accounts</span>
      </div>
    );
  }

  return (
    <Select value={selectedAccount || ''} onValueChange={handleAccountSelection}>
      <SelectTrigger className="w-auto min-w-[200px] border-white/10 bg-transparent text-white hover:bg-white/5">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">
                #{currentAccount.login}
              </span>
              <span className="text-xs text-white/70">
                • {formatChallengeType(currentAccount.challengeType)}
              </span>
              {currentAccount.status === 'failed' && (
                <span className="text-xs bg-red-500/20 text-red-400 px-1 rounded">
                  FAILED
                </span>
              )}
            </div>
            <span className="text-xs text-white/60">
              {formatCurrency(currentAccount.balance)} Balance
            </span>
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-dark border-white/10">
        {accounts.map((account) => (
          <SelectItem 
            key={account.id} 
            value={account.id}
            className="text-white hover:bg-white/10 focus:bg-white/10"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <span className="font-medium">#{account.login}</span>
                  <span className="text-xs text-white/70">
                    {formatChallengeType(account.challengeType)}
                  </span>
                  {account.status === 'failed' && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-1 rounded">
                      FAILED
                    </span>
                  )}
                </div>
                <span className="text-xs text-white/60">
                  {account.accountName} • {account.brokerName}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  {formatCurrency(account.balance)}
                </span>
                <span className="text-xs text-white/60">Balance</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Mobile version for smaller screens
export function AccountSelectorMobile() {
  const { accounts, currentAccount, selectedAccount, setSelectedAccount, loading } = useAccounts();
  const pathname = usePathname();
  const router = useRouter();

  const formatChallengeType = (type: string) => {
    switch (type) {
      case 'twoPhase': return 'Two Phase';
      case 'instantFund': return 'Instant Fund';
      default: return type;
    }
  };

  const handleAccountSelection = (accountId: string) => {
    setSelectedAccount(accountId);
    
    if (pathname === '/user/account-details') {
      const selectedAccountData = accounts.find(account => account.id === accountId);
      if (selectedAccountData) {
        router.push(`/user/account-details?accountId=${selectedAccountData.login}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 border border-white/10 rounded">
        <User className="w-4 h-4 text-white/50" />
        <div className="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!currentAccount || accounts.length === 0) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 border border-white/10 rounded">
        <User className="w-4 h-4 text-white/50" />
        <span className="text-white/50 text-xs">No Accounts</span>
      </div>
    );
  }

  return (
    <Select value={selectedAccount || ''} onValueChange={handleAccountSelection}>
      <SelectTrigger className="w-auto min-w-[120px] border-white/10 bg-transparent text-white hover:bg-white/5">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">
            #{currentAccount.login}
          </span>
          {currentAccount.status === 'failed' && (
            <span className="text-xs bg-red-500/20 text-red-400 px-1 rounded">
              FAILED
            </span>
          )}
        </div>
      </SelectTrigger>
      <SelectContent className="bg-dark border-white/10">
        {accounts.map((account) => (
          <SelectItem 
            key={account.id} 
            value={account.id}
            className="text-white hover:bg-white/10 focus:bg-white/10"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">#{account.login}</span>
              <span className="text-xs text-white/70">
                {formatChallengeType(account.challengeType)}
              </span>
              {account.status === 'failed' && (
                <span className="text-xs bg-red-500/20 text-red-400 px-1 rounded">
                  FAILED
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
