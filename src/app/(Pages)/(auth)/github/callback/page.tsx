'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/services/api';
import authService from '@/services/auth.service';
import { useToast } from '@/components/providers/ToastProvider';

function GitHubCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleGitHubCallback = async () => {
      try {
        // Get authorization code from URL
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          showToast({ variant: 'error', message: 'GitHub authorization was denied' });
          router.push('/signin');
          return;
        }

        if (!code) {
          showToast({ variant: 'error', message: 'No authorization code received from GitHub' });
          router.push('/signin');
          return;
        }

        // Send authorization code to backend
        // Backend will securely exchange it for access token and authenticate user
        const response = await api.post('/auth/github-callback', {
          Code: code,  // Capital C to match backend DTO
        });

        if (response.data.success) {
          // Save tokens and user data using authService
          if (response.data.token) {
            authService.saveAuthData(response.data);
          }

          showToast({ variant: 'success', message: response.data.message || 'Login successful!' });
          router.push('/setup-org');
        } else {
          showToast({ variant: 'error', message: response.data.message || 'GitHub login failed' });
          router.push('/signin');
        }
      } catch (error: any) {
        console.error('GitHub callback error:', error);
        const errorMsg = error?.response?.data?.message || 'GitHub login failed. Please try again.';
        showToast({ variant: 'error', message: errorMsg });
        router.push('/signin');
      } finally {
        setIsProcessing(false);
      }
    };

    handleGitHubCallback();
  }, [searchParams, router]);

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
        {isProcessing ? 'Completing GitHub login...' : 'Redirecting...'}
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

export default function GitHubCallbackPage() {
  return (
    <Suspense fallback={
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
      </div>
    }>
      <GitHubCallbackContent />
    </Suspense>
  );
}
