'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PageTransition from '../../../../components/animations/PageTransition';
import { Rectangle } from '../../../../components/pages/auth/ui/Rectangle';
import { PasswordInput } from '../../../../components/pages/auth/ui';
import authService from '@/services/auth.service';

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Get email from session storage
    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('resetEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        toast.error('Session expired. Please start the password reset process again.');
        router.push('/forgot-password');
      }
    }
  }, [router]);

  useEffect(() => {
    setIsMounted(true);
    const checkResponsive = () => {
      setIsResponsive(window.innerWidth < 1024);
    };
    
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!newPassword) {
      toast.error('Please enter a new password');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.resetPassword({
        email: email,
        newPassword: newPassword,
      });

      if (response.success) {
        toast.success(response.message || 'Password reset successfully!');

        // Clear session storage
        sessionStorage.removeItem('resetEmail');

        // Redirect to signin
        setTimeout(() => {
          router.push('/signin');
        }, 1500);
      } else {
        toast.error(response.message || 'Failed to reset password');
      }
    } catch (error: any) {
      console.error('Reset password error:', error);

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
            overflow: 'auto',
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
            Reset Password
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
            <span>Enter your new password below to complete the reset process.</span>
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
            {/* New Password Input */}
            <PasswordInput
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
              isResponsive={true}
            />

            {/* Confirm Password Input */}
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              isResponsive={true}
            />

            {/* Reset Password Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                minHeight: '44px',
                border: 'none',
                borderRadius: '10px',
                background: '#ED1C24',
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
                e.currentTarget.style.background = '#D0161E';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ED1C24';
              }}
            >
              Reset Password
            </button>
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
        {/* Red Rectangle Decoration - Left Side */}
        <div
          className="red-floating-shapes"
          style={{
            position: 'absolute',
            width: '40%',
            height: '76%',
            left: '10%',
            top: '13.3%',
            background: '#ED1C24',
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
              right: '8.3%',
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
              width: '50px',
              height: '50px',
              left: '20%',
              top: '25%',
              background: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '25px',
              backdropFilter: 'blur(8px)',
            }}
          />
          <div
            className="shape-2"
            style={{
              position: 'absolute',
              width: '35px',
              height: '35px',
              left: '65%',
              top: '55%',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              backdropFilter: 'blur(6px)',
            }}
          />
          <div
            className="shape-3"
            style={{
              position: 'absolute',
              width: '70px',
              height: '25px',
              left: '30%',
              top: '70%',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
            }}
          />
          {/* Support Label in rectangle */}
          <div
            style={{
              position: 'absolute',
              width: 'auto',
              height: '2.2%',
              left: '5%',
              top: '5%',
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

        {/* Logo */}
        <img
          src="/onedot-large.svg"
          alt="OneDot"
          style={{
            position: 'absolute',
            left: '57%',
            top: '28%',
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
            left: '57%',
            top: '35%',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: 'clamp(24px, 3.7vh, 40px)',
            lineHeight: '100%',
            color: '#171923',
            whiteSpace: 'nowrap',
          }}
        >
          Reset Password
        </h1>

        {/* Subtitle */}
        <div
          style={{
            position: 'absolute',
            width: '18.2%',
            height: '2.5%',
            left: '57.2%',
            top: '40%',
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
          <span>Enter your new password below to complete the reset process.</span>
        </div>

        {/* New Password Input */}
        <div
          style={{
            position: 'absolute',
            width: '26.1%',
            height: '7.8%',
            left: '57.2%',
            top: '44%',
          }}
        >
          <label
            style={{
              position: 'absolute',
              width: '3.1vw',
              height: '1.9vh',
              left: '0px',
              top: '0px',
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 'clamp(12px, 1.5vh, 16px)',
              lineHeight: '20px',
              letterSpacing: '-0.154px',
              color: '#718096',
              whiteSpace: 'nowrap',
            }}
          >
            New Password
          </label>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
                padding: '10px 48px 10px 12px',
                fontFamily: 'Montserrat',
                fontSize: 'clamp(12px, 1.5vh, 16px)',
                lineHeight: '20px',
                color: '#4A5568',
                letterSpacing: '-0.154px',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#03A9F5';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#CBD5E0';
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={{
                position: 'absolute',
                top: '3.2vh',
                right: '0px',
                width: '48px',
                height: '5.1vh',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0 10px 10px 0',
                marginRight: '2px',
              }}
            >
              <div
                style={{
                  width: '1px',
                  height: '60%',
                  background: '#CFD9E0',
                  marginRight: '10px',
                }}
              />
              {showNewPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div
          style={{
            position: 'absolute',
            width: '26.1%',
            height: '7.8%',
            left: '57.2%',
            top: '52%',
          }}
        >
          <label
            style={{
              position: 'absolute',
              width: '4.5vw',
              height: '1.9vh',
              left: '0px',
              top: '0px',
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 'clamp(12px, 1.5vh, 16px)',
              lineHeight: '20px',
              letterSpacing: '-0.154px',
              color: '#718096',
              whiteSpace: 'nowrap',
            }}
          >
            Confirm Password
          </label>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                padding: '10px 48px 10px 12px',
                fontFamily: 'Montserrat',
                fontSize: 'clamp(12px, 1.5vh, 16px)',
                lineHeight: '20px',
                color: '#4A5568',
                letterSpacing: '-0.154px',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#03A9F5';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#CBD5E0';
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                top: '3.2vh',
                right: '0px',
                width: '48px',
                height: '5.1vh',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0 10px 10px 0',
                marginRight: '2px',
              }}
            >
              <div
                style={{
                  width: '1px',
                  height: '60%',
                  background: '#CFD9E0',
                  marginRight: '10px',
                }}
              />
              {showConfirmPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Reset Password Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            position: 'absolute',
            width: '27.5%',
            height: '5.6%',
            left: '57.2%',
            top: '64%',
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
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>

      </div>
    </PageTransition>
  );
}
