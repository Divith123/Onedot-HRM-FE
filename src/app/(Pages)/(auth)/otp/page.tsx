'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageTransition from '../../../components/animations/PageTransition';

export default function OTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      console.log('OTP submitted:', otpValue);
      // Handle OTP verification here
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
          Enter OTP
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Montserrat',
            fontWeight: 400,
            fontSize: 'clamp(13px, 1.5vw, 16px)',
            color: '#718096',
            textAlign: 'center',
            marginBottom: '22px',
            maxWidth: '320px',
          }}
        >
          We have sent a 6-digit code to your email address
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
          disabled={!isComplete}
          style={{
            width: '160px',
            height: '38px',
            border: 'none',
            borderRadius: '8px',
            background: isComplete ? '#03A9F5' : '#CBD5E0',
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '16px',
            color: '#FFFFFF',
            cursor: isComplete ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s',
            marginBottom: '16px',
          }}
          onMouseEnter={(e) => {
            if (isComplete) {
              e.currentTarget.style.background = '#0291D6';
            }
          }}
          onMouseLeave={(e) => {
            if (isComplete) {
              e.currentTarget.style.background = '#03A9F5';
            }
          }}
        >
          Verify
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
          Didn't receive the code?{' '}
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
            onClick={() => console.log('Resend OTP')}
          >
            Resend
          </button>
        </p>
      </div>
    </PageTransition>
  );
}   