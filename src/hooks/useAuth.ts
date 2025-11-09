/**
 * useAuth Hook
 * Location: src/hooks/useAuth.ts
 * Provides access to authentication session and methods
 */

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';

interface UseAuthReturn {
  session: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  signIn: typeof signIn;
  signOut: typeof signOut;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  return {
    session,
    isAuthenticated,
    isLoading,
    user: session?.user,
    signIn,
    signOut,
  };
}
