'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { UserDto } from '@/types/api.types';
import authService from '@/services/auth.service';

interface AuthContextType {
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserDto) => void;
  logout: () => Promise<void>;
  updateUser: (user: UserDto) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sync with NextAuth session
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    if (status === 'authenticated' && session?.user) {
      // Check if we have full user data in localStorage
      const storedUser = authService.getStoredUser();
      if (storedUser) {
        // Use stored user data which has all UserDto fields
        setUser(storedUser);
      } else {
        // Convert NextAuth user to UserDto format with minimal data
        const userData: UserDto = {
          id: parseInt(session.user.id || '0'),
          email: session.user.email || '',
          fullName: session.user.name || '',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          profilePictureUrl: undefined,
          oAuthProvider: undefined,
        };
        setUser(userData);
      }
      setIsLoading(false);
    } else {
      // Check localStorage as fallback
      const storedUser = authService.getStoredUser();
      const isAuth = authService.isAuthenticated();

      if (isAuth && storedUser) {
        setUser(storedUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    }
  }, [session, status]);

  const login = (userData: UserDto) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const updateUser = (userData: UserDto) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: status === 'authenticated' || (!!user && authService.isAuthenticated()),
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
