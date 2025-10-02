'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { initializeAuthAtom } from '@/lib/store/atoms';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [, initializeAuth] = useAtom(initializeAuthAtom);

  useEffect(() => {
    // Initialize auth state from localStorage
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}
