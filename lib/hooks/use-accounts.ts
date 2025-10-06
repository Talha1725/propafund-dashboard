"use client";

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { 
  selectedAccountAtom, 
  userAtom,
  accountsDataAtom,
  accountsRawDataAtom,
  accountsLoadingAtom,
  accountsErrorAtom,
  currentAccountAtom,
  currentAccountDataAtom,
  fetchAccountsActionAtom
} from '@/lib/store/atoms';

export function useAccounts() {
  const [accounts] = useAtom(accountsDataAtom);
  const [accountsData] = useAtom(accountsRawDataAtom);
  const [loading] = useAtom(accountsLoadingAtom);
  const [error] = useAtom(accountsErrorAtom);
  const [selectedAccount, setSelectedAccount] = useAtom(selectedAccountAtom);
  const [currentAccount] = useAtom(currentAccountAtom);
  const [currentAccountData] = useAtom(currentAccountDataAtom);
  const [user] = useAtom(userAtom);
  const [, fetchAccounts] = useAtom(fetchAccountsActionAtom);

  useEffect(() => {
    if (user?.email) {
      fetchAccounts(user.email);
    }
  }, [user?.email, fetchAccounts]);

  const refetch = () => {
    if (user?.email) {
      fetchAccounts(user.email);
    }
  };

  return {
    accounts,
    accountsData,
    currentAccount,
    currentAccountData,
    selectedAccount,
    setSelectedAccount,
    loading,
    error,
    refetch,
  };
}