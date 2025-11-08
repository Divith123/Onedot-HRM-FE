'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageTransition from '../../../../components/animations/PageTransition';
import { Rectangle } from '../../../../components/pages/auth/ui/Rectangle';
import authService from '@/services/auth.service';
import { useToast } from '@/components/providers/ToastProvider';

export default function ForgotPassword() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsResponsive(window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      showToast({ variant: 'error', message: 'Please enter your email' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.forgotPassword({
        email: email.trim(),
      });

      if (response.success) {
        showToast({ variant: 'success', message: response.message || 'OTP sent to your email. Please check your inbox.' });

        // Store email temporarily for OTP verification
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('resetEmail', email.trim());
        }

        // Redirect to OTP verification page
        setTimeout(() => {
          router.push('/otp');
        }, 1500);
      } else {
        showToast({ variant: 'error', message: response.message || 'Failed to send OTP' });
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);

      if (error.response?.data?.message) {
        showToast({ variant: 'error', message: error.response.data.message });
      } else if (error.message) {
        showToast({ variant: 'error', message: error.message });
      } else {
        showToast({ variant: 'error', message: 'An error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 20px',
            paddingBottom: '50px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
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
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
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
              height: 'auto',
              width: '100px',
              marginBottom: '20px',
              alignSelf: 'flex-start',
            }}
          />

          {/* Title */}
          <h1
            style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: 'clamp(28px, 6vw, 40px)',
              lineHeight: '120%',
              color: '#171923',
              marginBottom: '8px',
            }}
          >
            Forgot Password
          </h1>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 'clamp(13px, 3vw, 16px)',
              lineHeight: '150%',
              color: '#718096',
              marginBottom: '30px',
              display: 'flex',
              gap: '4px',
              flexWrap: 'wrap',
            }}
          >
            <span>Enter your email address and we'll send you a link to reset your password.</span>
          </div>

          {/* Form Container */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            {/* Email Input */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <label
                style={{
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: 'clamp(12px, 3vw, 16px)',
                  lineHeight: '20px',
                  letterSpacing: '-0.154px',
                  color: '#718096',
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  background: '#F7FAFC',
                  border: '1px solid #CBD5E0',
                  boxShadow: 'inset 0px 2px 0px rgba(231, 235, 238, 0.2)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  fontFamily: 'Montserrat',
                  fontSize: 'clamp(12px, 3vw, 16px)',
                  lineHeight: '20px',
                  color: '#4A5568',
                  letterSpacing: '-0.154px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1CB75E';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#CBD5E0';
                }}
                required
              />
            </div>

            {/* Send Reset Link Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                minHeight: '44px',
                border: 'none',
                borderRadius: '10px',
                background: '#1CB75E',
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: 'clamp(14px, 3vw, 18px)',
                lineHeight: '28px',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#168A47';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1CB75E';
              }}
            >
              Send Reset Link
            </button>

            {/* Back to Sign In */}
            <div
              style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: 'clamp(13px, 3vw, 16px)',
                lineHeight: '150%',
                color: '#718096',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span>Remember your password?</span>
              <a
                href="/signin"
                style={{
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: 'clamp(13px, 3vw, 16px)',
                  lineHeight: '150%',
                  color: '#1C4532',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Desktop Layout (>= 1024px) - Original design
  return (
    <PageTransition>
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
          zIndex: 10,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1B20" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back</span>
      </button>

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
        {/* Green Rectangle Decoration */}
        <div
          className="green-floating-shapes"
          style={{
            position: 'absolute',
            width: '40%',
            height: '76%',
            right: '10%',
            top: '13.3%',
            background: '#1CB75E',
            overflow: 'hidden',
          }}
        >
          {/* Gradient Circle Background */}
          <div
            className="animated-circle"
            style={{
              position: 'absolute',
              width: '40.3%',
              height: '62.1%',
              left: '8.3%',
              top: '-26.8%',
              background: 'linear-gradient(180deg, rgba(247, 250, 252, 0.8) 0%, rgba(237, 242, 247, 0.4) 100%)',
              transform: 'matrix(0.93, 0.38, -0.53, 0.85, 0, 0)',
              borderRadius: '50%',
            }}
          />
          {/* Floating Shapes */}
          <div
            className="shape-1"
            style={{
              position: 'absolute',
              width: '45px',
              height: '45px',
              left: '18%',
              top: '30%',
              background: 'rgba(255, 255, 255, 0.22)',
              borderRadius: '22px',
              backdropFilter: 'blur(9px)',
            }}
          />
          <div
            className="shape-2"
            style={{
              position: 'absolute',
              width: '30px',
              height: '30px',
              left: '68%',
              top: '50%',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              backdropFilter: 'blur(5px)',
            }}
          />
          <div
            className="shape-3"
            style={{
              position: 'absolute',
              width: '65px',
              height: '20px',
              left: '28%',
              top: '72%',
              background: 'rgba(255, 255, 255, 0.18)',
              borderRadius: '10px',
              backdropFilter: 'blur(11px)',
            }}
          />
          {/* Lock Icon */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '33%',
              transform: 'translateX(-50%)',
            }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4V6H10V4C10 2.9 10.9 2 12 2ZM8 6V4C8 1.79 9.79 0 12 0C14.21 0 16 1.79 16 4V6H18C19.1 6 20 6.9 20 8V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V8C4 6.9 4.9 6 6 6H8ZM6 8V20H18V8H6ZM12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14Z" fill="#F7FAFC"/>
            </svg>
          </div>
          {/* Title in rectangle */}
          <h2
            style={{
              position: 'absolute',
              left: '50%',
              top: '46%',
              transform: 'translateX(-50%)',
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              color: '#F7FAFC',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Secure Password Recovery
          </h2>
          {/* Subtitle in rectangle */}
          <p
            style={{
              position: 'absolute',
              left: '50%',
              top: '60%',
              transform: 'translateX(-50%)',
              fontFamily: 'Montserrat',
              fontWeight: 400,
              fontSize: 'clamp(12px, 1.5vw, 16px)',
              color: '#F7FAFC',
              textAlign: 'center',
              opacity: 0.9,
              maxWidth: '80%',
              lineHeight: '1.4',
            }}
          >
            Don't worry, we've got you covered. Follow the instructions to reset your password safely.
          </p>
        </div>

        {/* Logo */}
        <img
          src="/onedot-large.svg"
          alt="OneDot"
          style={{
            position: 'absolute',
            left: '18.5%',
            top: '29%',
            height: '4.4vh',
            width: 'auto',
          }}
        />

        {/* Title */}
        <h1
          style={{
            position: 'absolute',
            width: '15%',
            height: '3.7%',
            left: '18.5%',
            top: '34.3%',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 'clamp(24px, 3.7vh, 40px)',
            lineHeight: '100%',
            color: '#171923',
          }}
        >
          Forgot Password
        </h1>

        {/* Subtitle */}
        <div
          style={{
            position: 'absolute',
            width: '25%',
            height: '2.5%',
            left: '18.7%',
            top: '44.3%',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.7vh, 18px)',
            lineHeight: '150%',
            color: '#718096',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>Enter your email address and we'll send you a link to reset your password.</span>
        </div>

        {/* Email Input */}
        <div
          style={{
            position: 'absolute',
            width: '26.1%',
            height: '7.8%',
            left: '18.7%',
            top: '48.3%',
          }}
        >
          <label
            style={{
              position: 'absolute',
              width: '2.7vw',
              height: '1.9vh',
              left: '-1px',
              top: '0px',
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 'clamp(12px, 1.5vh, 16px)',
              lineHeight: '20px',
              letterSpacing: '-0.154px',
              color: '#718096',
            }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              position: 'absolute',
              width: '27.5vw',
              height: '5.1vh',
              left: '0px',
              top: '3.2vh',
              background: '#F7FAFC',
              border: '1px solid #CBD5E0',
              boxShadow: 'inset 0px 2px 0px rgba(231, 235, 238, 0.2)',
              borderRadius: '10px',
              padding: '10px 12px',
              fontFamily: 'Montserrat',
              fontSize: 'clamp(12px, 1.5vh, 16px)',
              lineHeight: '20px',
              color: '#4A5568',
              letterSpacing: '-0.154px',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#03A9F5';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#CBD5E0';
            }}
            required
          />
        </div>

        {/* Send Reset Link Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            position: 'absolute',
            width: '27.5%',
            height: '5.6%',
            left: '18.7%',
            top: '58.3%',
            border: 'none',
            borderRadius: '10px',
            background: isLoading ? '#CBD5E0' : '#ED1C24',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 'clamp(14px, 1.7vh, 18px)',
            lineHeight: '28px',
            color: '#FFFFFF',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
            opacity: isLoading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.currentTarget.style.background = '#D0161E';
          }}
          onMouseLeave={(e) => {
            if (!isLoading) e.currentTarget.style.background = '#ED1C24';
          }}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {/* Back to Sign In */}
        <div
          style={{
            position: 'absolute',
            width: '18.2%',
            height: '2.5%',
            left: '18.7%',
            top: '66.3%',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.7vh, 18px)',
            lineHeight: '150%',
            color: '#718096',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>Remember your password?</span>
          <a
            href="/signin"
            style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 'clamp(14px, 1.7vh, 18px)',
              lineHeight: '150%',
              color: '#1C4532',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Sign In
          </a>
        </div>

        {/* Support Label */}
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