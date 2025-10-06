import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { User } from '@/types/auth';
import type { Account } from '@/types/accounts';
import type { MetaAccount } from '@/lib/api/endpoints/meta';

// ============================================================================
// AUTHENTICATION ATOMS
// ============================================================================

// User state
export const userAtom = atom<User | null>(null);

// Authentication state
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

// Loading states
export const authLoadingAtom = atom(false);
export const loginLoadingAtom = atom(false);
export const registerLoadingAtom = atom(false);
export const authInitializedAtom = atom(false);

// Error states
export const authErrorAtom = atom<string | null>(null);

// Token management
export const tokenAtom = atom<string | null>(null);

// Derived atoms
export const userEmailAtom = atom((get) => get(userAtom)?.email || '');
export const userNameAtom = atom((get) => get(userAtom)?.fullName || '');

// Signup email for verification (with persistence)
export const signupEmailAtom = atomWithStorage<string>("signup_email", "");

// Actions
export const setUserAtom = atom(
  null,
  (get, set, user: User | null) => {
    set(userAtom, user);
    if (user) {
      // Store user data in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('userData', JSON.stringify(user));
      }
    } else {
      // Clear user data from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userData');
      }
    }
  }
);

export const setTokenAtom = atom(
  null,
  (get, set, token: string | null) => {
    set(tokenAtom, token);
    if (token) {
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
    } else {
      // Clear token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
  }
);

export const clearAuthAtom = atom(
  null,
  (get, set) => {
    set(userAtom, null);
    set(tokenAtom, null);
    set(authErrorAtom, null);
    set(authLoadingAtom, false);
    set(loginLoadingAtom, false);
    set(registerLoadingAtom, false);
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
    }
  }
);

// Initialize from localStorage
export const initializeAuthAtom = atom(
  null,
  (get, set) => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('userData');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        try {
          const user = JSON.parse(storedUser);
          set(userAtom, user);
          set(tokenAtom, storedToken);
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          set(clearAuthAtom);
        }
      }
      
      // Mark auth as initialized regardless of whether we found stored data
      set(authInitializedAtom, true);
    } else {
      // On server side, mark as initialized immediately
      set(authInitializedAtom, true);
    }
  }
);

// ============================================================================
// UI STATE ATOMS
// ============================================================================

// Sidebar state (with persistence)
export const sidebarCollapsedAtom = atomWithStorage<boolean>("sidebar_collapsed", false);

// Active view/page state (with persistence)
export const activeViewAtom = atomWithStorage<string>("active_view", "dashboard");

// Global loading states for different UI sections
export const globalLoadingAtom = atom<Record<string, boolean>>({});

// ============================================================================
// ACCOUNT DATA ATOMS
// ============================================================================

// Account selection (with persistence)
export const selectedAccountAtom = atomWithStorage<string | null>("selected_account", null);

// Raw account data from API
export const accountsRawDataAtom = atom<Record<string, MetaAccount>>({});

// Processed account data
export const accountsDataAtom = atom<Account[]>((get) => {
  const rawData = get(accountsRawDataAtom);
  if (!rawData || Object.keys(rawData).length === 0) return [];
  
  return Object.entries(rawData).map(([login, metaAccount]) => ({
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
  }));
});

// Account loading and error states
export const accountsLoadingAtom = atom(false);
export const accountsErrorAtom = atom<string | null>(null);

// Cache timestamp for preventing unnecessary API calls
export const accountsLastFetchAtom = atom<number | null>(null);

// ============================================================================
// DERIVED ATOMS
// ============================================================================

// Current selected account
export const currentAccountAtom = atom<Account | null>((get) => {
  const accounts = get(accountsDataAtom);
  const selectedAccountId = get(selectedAccountAtom);
  
  if (!selectedAccountId || !accounts.length) return accounts[0] || null;
  
  return accounts.find(acc => acc.id === selectedAccountId) || accounts[0] || null;
});

// Current selected account raw data
export const currentAccountDataAtom = atom<MetaAccount | null>((get) => {
  const rawData = get(accountsRawDataAtom);
  const selectedAccountId = get(selectedAccountAtom);
  
  if (!rawData || Object.keys(rawData).length === 0) return null;
  
  // If no account is selected, return the first available account
  if (!selectedAccountId) {
    const firstKey = Object.keys(rawData)[0];
    return rawData[firstKey] || null;
  }
  
  return rawData[selectedAccountId] || null;
});

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

// Promise cache to prevent multiple simultaneous requests
let fetchPromise: Promise<void> | null = null;

// ============================================================================
// ACTIONS
// ============================================================================

// Fetch accounts with caching and deduplication
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
          set(accountsLastFetchAtom, now);
          
          // Set default account if none selected
          const selectedAccount = get(selectedAccountAtom);
          if (!selectedAccount && Object.keys(rawAccounts).length > 0) {
            const firstAccountId = Object.keys(rawAccounts)[0];
            set(selectedAccountAtom, firstAccountId);
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

// Global loading state management
export const setGlobalLoadingAtom = atom(
  null,
  (get, set, key: string, loading: boolean) => {
    const current = get(globalLoadingAtom);
    set(globalLoadingAtom, { ...current, [key]: loading });
  }
);

// Clear global loading state
export const clearGlobalLoadingAtom = atom(
  null,
  (get, set, key: string) => {
    const current = get(globalLoadingAtom);
    const { [key]: removed, ...rest } = current;
    set(globalLoadingAtom, rest);
  }
);

// Check if any global loading is active
export const isAnyGlobalLoadingAtom = atom((get) => {
  const loading = get(globalLoadingAtom);
  return Object.values(loading).some(Boolean);
});