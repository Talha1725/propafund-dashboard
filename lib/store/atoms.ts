import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { User } from "@/types/auth";
import type { MetaAccount } from "@/lib/api/endpoints/meta";
import type { Account } from "@/types/accounts";

// Auth atoms
export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));
export const signupEmailAtom = atomWithStorage<string>("signup_email", "");


// UI State atoms
export const sidebarCollapsedAtom = atom(false);
export const activeViewAtom = atom("dashboard");
export const selectedAccountAtom = atomWithStorage<string | null>("selected_account", null);

// Account data atoms
export const accountsRawDataAtom = atom<Record<string, MetaAccount>>({});
export const accountsDataAtom = atom<Account[]>([]);
export const accountsLoadingAtom = atom(false);
export const accountsErrorAtom = atom<string | null>(null);
export const accountsLastFetchAtom = atom<number | null>(null);

// Promise cache to prevent multiple simultaneous requests
let fetchPromise: Promise<void> | null = null;

// Derived atoms
export const currentAccountAtom = atom((get) => {
  const accounts = get(accountsDataAtom);
  const selectedAccountId = get(selectedAccountAtom);
  return accounts.find(acc => acc.id === selectedAccountId) || accounts[0] || null;
});

export const currentAccountDataAtom = atom((get) => {
  const rawData = get(accountsRawDataAtom);
  const selectedAccountId = get(selectedAccountAtom);
  return selectedAccountId ? rawData[selectedAccountId] || null : null;
});

// Actions
export const fetchAccountsActionAtom = atom(
  null,
  async (get, set, email: string) => {
    const lastFetch = get(accountsLastFetchAtom);
    const now = Date.now();
    
    // Skip if fetched in last 5 minutes (300000ms)
    if (lastFetch && (now - lastFetch) < 300000) {
      return;
    }

    // If there's already a fetch in progress, wait for it
    if (fetchPromise) {
      await fetchPromise;
      return;
    }

    // Create new fetch promise
    fetchPromise = (async () => {
      set(accountsLoadingAtom, true);
      set(accountsErrorAtom, null);
      
      try {
        const { metaApi } = await import('@/lib/api/endpoints/meta');
        const response = await metaApi.getAccounts(email);
        
        if (response.success && response.data?.accounts) {
          const rawAccounts = response.data.accounts;
          set(accountsRawDataAtom, rawAccounts);
          
          // Transform accounts
          const transformedAccounts: Account[] = Object.entries(rawAccounts).map(([login, metaAccount]) => {
            // Calculate win ratio - if lostTradesPercent exists, derive won trades percent
            const lostPercent = metaAccount.metaStats?.lostTradesPercent || 0;
            const winRatio = metaAccount.metaStats && metaAccount.metaStats.trades > 0 
              ? (100 - lostPercent) 
              : 0;
            
            // Calculate metrics from available data
            const avgLoss = metaAccount.metaStats?.averageLoss || 0;
            const profitFactor = (metaAccount.metaStats as MetaAccount['metaStats'] & { profitFactor?: number })?.profitFactor || 0;
            const lostTrades = metaAccount.metaStats?.lostTrades || 0;
            const totalTrades = metaAccount.metaStats?.trades || 0;
            const wonTrades = totalTrades - lostTrades;
            
            // Estimate average win based on available data
            const averageWin = profitFactor > 0 && avgLoss !== 0 
              ? Math.abs(avgLoss * profitFactor)
              : wonTrades > 0 && metaAccount.metaStats?.profit 
                ? metaAccount.metaStats.profit / wonTrades
                : 0;
            
            return {
              id: login,
              login: metaAccount.mtAccount.login,
              password: metaAccount.mtAccount.password,
              accountName: metaAccount.mtAccount.accountName,
              brokerName: metaAccount.mtAccount.brokerName,
              platform: metaAccount.mtAccount.platform,
              balance: metaAccount.metaStats?.balance || metaAccount.mtAccount.balance,
              challengeType: metaAccount.mtAccount.challengeType,
              status: metaAccount.mtAccount.status,
              equity: metaAccount.metaStats?.equity || metaAccount.mtAccount.balance,
              profit: metaAccount.metaStats?.profit || 0,
              trades: metaAccount.metaStats?.trades || 0,
              paymentStatus: metaAccount.payment?.status || 'unknown',
              accountProtectionUsed: metaAccount.payment?.accountProtectionUsed || false,
              createdAt: metaAccount.mtAccount.createdAt,
              updatedAt: metaAccount.mtAccount.updatedAt,
              startingBalance: metaAccount.analysis?.[0]?.startingBalance || metaAccount.mtAccount.balance,
              winRatio,
              averageWin,
              averageLoss: Math.abs(avgLoss),
              dailyGrowth: metaAccount.metaStats?.dailyGrowth || [],
            };
          });
          
          set(accountsDataAtom, transformedAccounts);
          set(accountsLastFetchAtom, now);
          
          // Set default account if none selected
          const selectedAccount = get(selectedAccountAtom);
          if (!selectedAccount && transformedAccounts.length > 0) {
            set(selectedAccountAtom, transformedAccounts[0].id);
          }
        } else {
          set(accountsErrorAtom, 'Failed to fetch accounts');
        }
      } catch (error: unknown) {
        console.error('Error fetching accounts:', error);
        const errorMessage = error instanceof Error 
          ? error.message 
          : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to fetch accounts';
        set(accountsErrorAtom, errorMessage);
      } finally {
        set(accountsLoadingAtom, false);
        fetchPromise = null; // Clear the promise cache
      }
    })();

    await fetchPromise;
  }
);

// Additional atoms for backward compatibility
export const authInitializedAtom = atom<boolean>(false);
export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<string | null>(null);

// Action atoms for authentication
export const setUserAtom = atom(
  null,
  async (get, set, user: User) => {
    set(userAtom, user);
    localStorage.setItem('user', JSON.stringify(user));
  }
);

export const setTokenAtom = atom(
  null,
  async (get, set, token: string) => {
    localStorage.setItem('token', token);
  }
);

export const clearAuthAtom = atom(
  null,
  async (get, set) => {
    set(userAtom, null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
);

// Action atom for initializing authentication
export const initializeAuthAtom = atom(
  null,
  async (get, set) => {
    try {
      // Check for token in localStorage
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        set(userAtom, user);
      } else {
        set(userAtom, null);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set(userAtom, null);
    } finally {
      set(authInitializedAtom, true);
    }
  }
);