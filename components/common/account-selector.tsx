"use client";

import { useAccounts } from "@/lib/hooks/use-accounts";
import { usePathname, useRouter } from "next/navigation";
import { User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
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
    return null;
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
      <SelectTrigger className="sm:!h-12 !h-9 sm:min-w-[220px] min-w-[120px] sm:border-2 border border-white/10 sm:bg-transparent bg-white/5 text-white hover:opacity-80 transition-opacity font-lay-grotesk">
        <div className="flex items-center gap-2 w-full">
          <User className="w-4 h-4 text-white/80" />
          <div className="flex flex-col items-start text-left flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-lay-grotesk sm:text-sm text-xs">
                #{currentAccount.login}<span className="sm:inline hidden"> • {formatChallengeType(currentAccount.challengeType)}</span>
              </span>
              {currentAccount.status === 'failed' && (
                <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-red-600 text-white">
                  FAILED
                </span>
              )}
            </div>
            <span className="text-white/60 font-lay-grotesk text-xs sm:block hidden">
              {formatCurrency(currentAccount.balance)} Balance
            </span>
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-black border-gray-600 text-white w-[var(--radix-select-trigger-width)] z-[9999]" position="popper">
        {accounts.map((account) => (
          <SelectItem 
            key={account.id} 
            value={account.id}
            className="focus:bg-gray-800 focus:text-white cursor-pointer"
          >
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-300" />
                <div className="flex flex-col items-start">
                  <span className="text-white font-lay-grotesk text-sm">
                    #{account.login}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-lay-grotesk text-xs">
                      {formatChallengeType(account.challengeType)}
                    </span>
                    {account.status === 'failed' && (
                      <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-red-600 text-white">
                        FAILED
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right sm:block hidden">
                <div className="text-white font-lay-grotesk text-sm">
                  {formatCurrency(account.balance)}
                </div>
                <div className="text-gray-400 font-lay-grotesk text-xs">
                  Balance
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

