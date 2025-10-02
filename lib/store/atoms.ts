import { atom } from 'jotai';
import { User } from '@/types/auth';

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

// Signup email for verification
export const signupEmailAtom = atom<string>('');

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
