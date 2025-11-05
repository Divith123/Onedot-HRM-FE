'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import PageTransition from '../../../../components/animations/PageTransition';
import authService from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';

export default function OTP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [otpType, setOtpType] = useState<'verification' | 'reset'>('reset');

  useEffect(() => {
    // Get email and type from session storage or URL params
    if (typeof window !== 'undefined') {
      // Check URL params first for type
      const type = searchParams.get('type');

      if (type === 'verification') {
        setOtpType('verification');
        const verificationEmail = sessionStorage.getItem('verificationEmail');
        if (verificationEmail) {
          setEmail(verificationEmail);
        } else {
          toast.error('No email found. Please sign up first.');
          router.push('/signup');
        }
      } else {
        // Default to reset password flow
        setOtpType('reset');
        const resetEmail = sessionStorage.getItem('resetEmail');
        if (resetEmail) {
          setEmail(resetEmail);
        } else {
          toast.error('No email found. Please start the password reset process again.');
          router.push('/forgot-password');
        }
      }
    }
  }, [router, searchParams]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      if (otpType === 'verification') {
        // Email verification flow
        const response = await authService.verifyEmail({
          email: email,
          verificationCode: otpValue,
        });

        if (response.success && response.user) {
          toast.success(response.message || 'Email verified successfully!');

          // Login user
          login(response.user);

          // Clear session storage
          sessionStorage.removeItem('verificationEmail');

          // Redirect to dashboard or org setup
          setTimeout(() => {
            router.push('/setup-org');
          }, 1000);
        } else {
          toast.error(response.message || 'Invalid verification code');
        }
      } else {
        // Password reset OTP verification flow
        const response = await authService.verifyOtp({
          email: email,
          otp: otpValue,
        });

        if (response.success) {
          toast.success(response.message || 'OTP verified successfully!');

          // Redirect to reset password page
          setTimeout(() => {
            router.push('/reset-password');
          }, 1000);
        } else {
          toast.error(response.message || 'Invalid OTP');
        }
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (otpType === 'verification') {
      toast.info('Resend verification code feature coming soon. Please check your email.');
    } else {
      // Resend OTP for password reset
      try {
        await authService.forgotPassword({ email });
        toast.success('New OTP sent to your email!');
      } catch (error) {
        toast.error('Failed to resend OTP. Please try again.');
      }
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <PageTransition>
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          background: '#FFFFFF',
          fontFamily: 'Montserrat, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => router.push('/signin')}
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            padding: '6px 12px',
            background: 'none',
            border: 'none',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: '16px',
            color: '#1D1B20',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#F3F4F6')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1B20" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back</span>
        </button>

        {/* Logo */}
        <img
          src="/onedot-large.svg"
          alt="OneDot"
          style={{
            height: '28px',
            width: 'auto',
            marginBottom: '18px',
          }}
        />

        {/* Title */}
        <h1
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: 'clamp(22px, 3vw, 32px)',
            color: '#171923',
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          {otpType === 'verification' ? 'Verify Your Email' : 'Enter OTP'}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 400,
            fontSize: 'clamp(13px, 1.5vw, 16px)',
            color: '#718096',
            textAlign: 'center',
            marginBottom: '8px',
            maxWidth: '380px',
            padding: '0 20px',
          }}
        >
          {otpType === 'verification'
            ? `We sent a verification code to ${email || 'your email'}`
            : 'We have sent a 6-digit code to your email address'}
        </p>

        {/* Info text based on type */}
        <p
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 400,
            fontSize: 'clamp(12px, 1.3vw, 14px)',
            color: '#A0AEC0',
            textAlign: 'center',
            marginBottom: '22px',
            maxWidth: '320px',
          }}
        >
          {otpType === 'verification'
            ? 'Code expires in 24 hours'
            : 'Code expires in 10 minutes'}
        </p>

        {/* OTP Input Fields */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '18px',
          }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              style={{
                width: '38px',
                height: '38px',
                border: '2px solid #E2E8F0',
                borderRadius: '8px',
                background: '#FFFFFF',
                fontFamily: 'Montserrat',
                fontSize: '18px',
                fontWeight: 600,
                textAlign: 'center',
                color: '#171923',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#03A9F5';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E2E8F0';
              }}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete || isLoading}
          style={{
            width: '160px',
            height: '38px',
            border: 'none',
            borderRadius: '8px',
            background: (isComplete && !isLoading) ? '#03A9F5' : '#CBD5E0',
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '16px',
            color: '#FFFFFF',
            cursor: (isComplete && !isLoading) ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s',
            marginBottom: '16px',
            opacity: isLoading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (isComplete && !isLoading) {
              e.currentTarget.style.background = '#0291D6';
            }
          }}
          onMouseLeave={(e) => {
            if (isComplete && !isLoading) {
              e.currentTarget.style.background = '#03A9F5';
            }
          }}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>

        {/* Resend Text */}
        <p
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 400,
            fontSize: '13px',
            color: '#718096',
            textAlign: 'center',
            marginBottom: '0',
          }}
        >
          Didn&apos;t receive the code?{' '}
          <button
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 500,
              color: '#03A9F5',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              padding: 0,
            }}
            onClick={handleResend}
          >
            Resend
          </button>
        </p>
      </div>
    </PageTransition>
  );
}
