/**
 * Protected Layout Component
 * Location: src/components/auth/ProtectedLayout.tsx
 * Wraps protected pages and ensures user is authenticated
 */

'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { status } = useSession();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      setIsReady(true);
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px',
        fontFamily: 'Montserrat, sans-serif',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #E2E8F0',
          borderTop: '3px solid #03A9F5',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <p style={{
          fontSize: '18px',
          color: '#1A202C',
          fontWeight: 500,
        }}>
          Loading...
        </p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (status === 'unauthenticated' || !isReady) {
    return null;
  }

  return <>{children}</>;
}
