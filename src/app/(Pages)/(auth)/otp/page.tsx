'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Rectangle } from '../../../../components/pages/auth/ui';
import PageTransition from '../../../../components/animations/PageTransition';

export default function OTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isResponsive, setIsResponsive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkResponsive = () => {
      setIsResponsive(window.innerWidth < 1024);
    };

    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
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
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  if (!isMounted) {
    return null;
  }

  // Mobile/Tablet Layout (< 1024px)
  if (isResponsive) {
    return (
      <PageTransition>
        <div
          style={{
            width: '100vw',
            minHeight: '100vh',
            background: '#FFFFFF',
            fontFamily: 'Montserrat, sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated Yellow Rectangle Background - Fixed */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <Rectangle color="yellow" isResponsive={true} />
          </div>

          {/* Content Wrapper - Above Rectangle */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              padding: '30px 20px',
              paddingBottom: '50px',
              overflow: 'auto',
              minHeight: '100vh',
            }}
          >
          {/* Logo */}
          <img
            src="/onedot-large.svg"
            alt="OneDot"
            style={{
              height: 'auto',
              width: '100px',
              marginBottom: '20px',
              alignSelf: 'flex-start',
            }}
          />

          {/* Back Button */}
          <button
            onClick={() => router.push('/signin')}
            style={{
              alignSelf: 'flex-start',
              marginBottom: '20px',
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
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1B20" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: 'clamp(22px, 5vw, 32px)',
              lineHeight: '120%',
              color: '#171923',
              marginBottom: '8px',
            }}
          >
            Enter OTP
          </h1>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 'clamp(13px, 2vw, 16px)',
              lineHeight: '150%',
              color: '#718096',
              marginBottom: '22px',
            }}
          >
            We have sent a 6-digit code to your email address
          </div>

          {/* Form Container */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            {/* OTP Input Fields */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '12px',
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
                    width: '40px',
                    height: '40px',
                    border: '2px solid #E2E8F0',
                    borderRadius: '8px',
                    fontFamily: 'Montserrat',
                    fontSize: '18px',
                    fontWeight: 600,
                    textAlign: 'center',
                    color: '#1D1B20',
                  }}
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              style={{
                width: '140px',
                height: '44px',
                border: 'none',
                borderRadius: '8px',
                background: isComplete ? '#FFDE17' : '#CBD5E0',
                fontFamily: 'Montserrat',
                fontWeight: 600,
                fontSize: '16px',
                color: isComplete ? '#000000' : '#A0AEC0',
                cursor: isComplete ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
              }}
            >
              Verify
            </button>

            {/* Resend Link */}
            <p
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 400,
                fontSize: '13px',
                color: '#718096',
                marginTop: '12px',
              }}
            >
              Didn't receive the code?{' '}
              <button
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
                  color: '#FFDE17',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
                onClick={() => console.log('Resend OTP')}
              >
                Resend
              </button>
            </p>
          </div>
        </div>
        </div>
      </PageTransition>
    );
  }

  // Desktop Layout (>= 1024px) - Original design
  return (
    <PageTransition>
      <div
        className="relative"
        style={{
          width: '100vw',
          height: '100vh',
          background: '#FFFFFF',
          fontFamily: 'Montserrat, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Yellow Rectangle Decoration */}
        <Rectangle color="yellow" isResponsive={false} />

        {/* Logo */}
        <img
          src="/onedot-large.svg"
          alt="OneDot"
          style={{
            position: 'absolute',
            left: '17.5%',
            top: '13.9%',
            height: '4.4vh',
            width: 'auto',
          }}
        />

        {/* Title */}
        <h1
          style={{
            position: 'absolute',
            width: '8.25%',
            height: '3.7%',
            left: '17.5%',
            top: '20.1%',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 'clamp(24px, 3.7vh, 40px)',
            lineHeight: '100%',
            color: '#171923',
          }}
        >
          Enter OTP
        </h1>

        {/* Subtitle */}
        <div
          style={{
            position: 'absolute',
            width: '18.2%',
            height: '2.5%',
            left: '17.7%',
            top: '28.5%',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.7vh, 18px)',
            lineHeight: '150%',
            color: '#718096',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>We have sent a 6-digit code to your email</span>
        </div>

        {/* OTP Input Fields Container */}
        <div
          style={{
            position: 'absolute',
            left: '17.7%',
            top: '36%',
            width: '27.5vw',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
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
                width: '50px',
                height: '50px',
                border: '2px solid #E2E8F0',
                borderRadius: '8px',
                fontFamily: 'Montserrat',
                fontSize: '22px',
                fontWeight: 600,
                textAlign: 'center',
                color: '#1D1B20',
              }}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          style={{
            position: 'absolute',
            left: '17.7%',
            top: '52%',
            width: '140px',
            height: '44px',
            border: 'none',
            borderRadius: '8px',
            background: isComplete ? '#03A9F5' : '#CBD5E0',
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '16px',
            color: isComplete ? '#FFFFFF' : '#A0AEC0',
            cursor: isComplete ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
          }}
        >
          Verify
        </button>

        {/* Resend Link */}
        <p
          style={{
            position: 'absolute',
            left: '17.7%',
            top: '58%',
            fontFamily: 'Montserrat',
            fontWeight: 400,
            fontSize: '14px',
            color: '#718096',
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
              fontSize: '14px',
            }}
            onClick={() => console.log('Resend OTP')}
          >
            Resend
          </button>
        </p>

        {/* Support Label (no button) */}
        <div
          style={{
            position: 'absolute',
            width: 'auto',
            height: '2.2%',
            left: '80.7%',
            top: '16.3%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg style={{ width: 'clamp(16px, 1.9vh, 20px)', height: 'clamp(16px, 1.9vh, 20px)' }} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.25 15.275C26.25 8.4125 20.925 3.75 15 3.75C9.1375 3.75 3.75 8.3125 3.75 15.35C3 15.775 2.5 16.575 2.5 17.5V20C2.5 21.375 3.625 22.5 5 22.5H6.25V14.875C6.25 10.0375 10.1625 6.125 15 6.125C19.8375 6.125 23.75 10.0375 23.75 14.875V23.75H13.75V26.25H23.75C25.125 26.25 26.25 25.125 26.25 23.75V22.225C26.9875 21.8375 27.5 21.075 27.5 20.175V17.3C27.5 16.425 26.9875 15.6625 26.25 15.275Z" fill="#F7FAFC"/>
            <path d="M11.25 17.5C11.9404 17.5 12.5 16.9404 12.5 16.25C12.5 15.5596 11.9404 15 11.25 15C10.5596 15 10 15.5596 10 16.25C10 16.9404 10.5596 17.5 11.25 17.5Z" fill="#F7FAFC"/>
            <path d="M18.75 17.5C19.4404 17.5 20 16.9404 20 16.25C20 15.5596 19.4404 15 18.75 15C18.0596 15 17.5 15.5596 17.5 16.25C17.5 16.9404 18.0596 17.5 18.75 17.5Z" fill="#F7FAFC"/>
            <path d="M22.5 13.7875C22.2019 12.0302 21.2918 10.435 19.9306 9.28423C18.5694 8.1335 16.8449 7.50146 15.0625 7.5C11.275 7.5 7.19999 10.6375 7.52499 15.5625C9.06641 14.9317 10.4278 13.9294 11.4878 12.6447C12.5478 11.3601 13.2734 9.83315 13.6 8.2C15.2375 11.4875 18.6 13.75 22.5 13.7875Z" fill="#F7FAFC"/>
          </svg>
          <span
            style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 'clamp(16px, 1.9vh, 20px)',
              lineHeight: '150%',
              color: '#F7FAFC',
            }}
          >
            Support
          </span>
        </div>
      </div>
    </PageTransition>
  );
}