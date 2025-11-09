/**
 * useAuth Hook
 * Location: src/hooks/useAuth.ts
 * Provides access to authentication session and methods
 */

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

interface UseAuthReturn {
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: Session['user'] | null;
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
    user: session?.user ?? null,
    signIn,
    signOut,
  };
}
