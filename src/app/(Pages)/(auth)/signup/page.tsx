'use client';

import { useState, useEffect } from 'react';
import PageTransition from '../../../../components/animations/PageTransition';
import { Rectangle } from '../../../../components/pages/auth/ui/Rectangle';
import {
  EmailInput,
  PasswordInput,
  RememberMeCheckbox,
  SignInButton,
  GoogleButton,
  GitHubButton,
  ForgotPasswordLink,
  OrDivider
} from '../../../../components/pages/auth/ui';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password, confirmPassword, agreeToTerms });
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
            Create Account
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
            <span>Already have an account?</span>
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
              Login Here
            </a>
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
            {/* Name Input */}
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
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                  e.target.style.borderColor = '#03A9F5';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#CBD5E0';
                }}
                required
              />
            </div>

            {/* Email Input */}
            <EmailInput 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              isResponsive={true}
            />

            {/* Password Input */}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              isResponsive={true}
            />

            {/* Confirm Password Input */}
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
                Confirm Password
              </label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    background: '#F7FAFC',
                    border: '1px solid #CBD5E0',
                    boxShadow: 'inset 0px 2px 0px rgba(231, 235, 238, 0.2)',
                    borderRadius: '10px',
                    padding: '10px 48px 10px 12px',
                    fontFamily: 'Montserrat',
                    fontSize: 'clamp(12px, 3vw, 16px)',
                    lineHeight: '20px',
                    color: '#4A5568',
                    letterSpacing: '-0.154px',
                    outline: 'none',
                    boxSizing: 'border-box',
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
                    top: '50%',
                    transform: 'translateY(-50%)',
                    right: '12px',
                    width: '24px',
                    height: '24px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {showConfirmPassword ? (
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

            {/* Terms & Sign Up */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: 'clamp(12px, 3vw, 16px)',
                lineHeight: '20px',
                color: '#718096',
                gap: '8px',
                marginTop: '8px',
                position: 'relative',
              }}
            >
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                style={{
                  minWidth: '16px',
                  minHeight: '16px',
                  border: '1px solid #CFD9E0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: 'transparent',
                  appearance: 'none',
                  position: 'relative',
                  outline: 'none',
                }}
              />
              {agreeToTerms && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    width: '10px',
                    height: '8px',
                    border: 'solid #03A9F5',
                    borderWidth: '0 0 3px 3px',
                    transform: 'rotate(-45deg)',
                    pointerEvents: 'none',
                    borderRadius: '1px',
                  }}
                />
              )}
              <span>I agree to the Terms & Conditions</span>
            </label>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                minHeight: '44px',
                border: 'none',
                borderRadius: '10px',
                background: '#FFDE17',
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
                e.currentTarget.style.background = '#E6C814';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFDE17';
              }}
            >
              Create Account
            </button>

            {/* OR Divider */}
            <OrDivider isResponsive={true} />

            {/* Google Button */}
            <GoogleButton isResponsive={true} />

            {/* GitHub Button */}
            <GitHubButton isResponsive={true} />
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
      {/* Blue Rectangle Decoration */}
      <div
        className="blue-floating-shapes"
        style={{
          position: 'absolute',
          width: '40%',
          height: '76%',
          left: '10%',
          top: '13.3%',
          background: '#03A9F5',
          overflow: 'hidden',
        }}
      >
        {/* Gradient Circle Background - moved to right side */}
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
            width: '60px',
            height: '60px',
            left: '15%',
            top: '20%',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            backdropFilter: 'blur(10px)',
          }}
        />
        <div
          className="shape-2"
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
            left: '70%',
            top: '60%',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            transform: 'rotate(45deg)',
            backdropFilter: 'blur(8px)',
          }}
        />
        <div
          className="shape-3"
          style={{
            position: 'absolute',
            width: '80px',
            height: '30px',
            left: '25%',
            top: '75%',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            backdropFilter: 'blur(12px)',
          }}
        />
        {/* Support Label in rectangle left corner */}
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
          top: '8%',
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
          top: '15%',
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: 'clamp(24px, 3.7vh, 40px)',
          lineHeight: '100%',
          color: '#171923',
          whiteSpace: 'nowrap',
        }}
      >
        Create Account
      </h1>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          width: '18.2%',
          height: '2.5%',
            left: '57.2%',
          top: '20%',
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
        <span>Already have an account?</span>
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
          Login Here
        </a>
      </div>

      {/* Name Input */}
      <div
        style={{
          position: 'absolute',
          width: '26.1%',
          height: '7.8%',
            left: '57.2%',
          top: '24%',
        }}
      >
        <label
          style={{
            position: 'absolute',
            width: '4.5vw',
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
            whiteSpace: 'nowrap',
          }}
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      {/* Email Input */}
      <div
        style={{
          position: 'absolute',
          width: '26.1%',
          height: '7.8%',
            left: '57.2%',
          top: '32%',
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

      {/* Password Input */}
      <div
        style={{
          position: 'absolute',
          width: '26.1%',
          height: '7.7%',
            left: '57.2%',
          top: '40%',
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
          }}
        >
          Password
        </label>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              position: 'absolute',
              width: '27.5vw',
              height: '5.1vh',
              left: '0px',
              top: '2.6vh',
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
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              top: '2.6vh',
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
            {showPassword ? (
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
          height: '7.7%',
            left: '57.2%',
          top: '48%',
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
              top: '2.6vh',
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
              top: '2.6vh',
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

      {/* Terms & Sign Up */}
      <div
        style={{
          position: 'absolute',
          width: '27.5vw',
          height: '2.2%',
            left: '57.2%',
          top: '57%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Terms Checkbox */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(12px, 1.5vh, 16px)',
            lineHeight: '20px',
            color: '#718096',
            gap: '8px',
          }}
        >
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              border: '1px solid #CFD9E0',
              borderRadius: '4px',
              cursor: 'pointer',
              background: 'transparent',
              appearance: 'none',
              position: 'relative',
              outline: 'none',
            }}
          />
          {agreeToTerms && (
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: '3px',
                width: '10px',
                height: '8px',
                border: 'solid #03A9F5',
                borderWidth: '0 0 3px 3px',
                transform: 'rotate(-45deg)',
                pointerEvents: 'none',
                borderRadius: '1px',
              }}
            />
          )}
          <span>I agree to the Terms & Conditions</span>
        </label>
      </div>

      {/* Sign Up Button */}
      <button
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          width: '27.5%',
          height: '5.6%',
            left: '57.2%',
          top: '62%',
          border: 'none',
          borderRadius: '10px',
          background: '#FFDE17',
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 'clamp(14px, 1.7vh, 18px)',
          lineHeight: '28px',
          color: '#FFFFFF',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#E6C814';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#FFDE17';
        }}
      >
        Create Account
      </button>

      {/* OR Divider */}
      <div
        style={{
          position: 'absolute',
          width: '27.5%',
          height: '1px',
            left: '57.2%',
          top: '70%',
          background: '#E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            background: '#FFFFFF',
            padding: '0 16px',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(12px, 1.5vh, 16px)',
            lineHeight: '20px',
            color: '#718096',
          }}
        >
          OR
        </span>
      </div>

      {/* Google Button */}
      <button
        style={{
          position: 'absolute',
          width: '27.5%',
          height: '5.6%',
            left: '57.2%',
          top: '73%',
          border: '1.5px solid #E2E8F0',
          borderRadius: '12px',
          background: '#FFFFFF',
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 'clamp(14px, 1.7vh, 18px)',
          lineHeight: '28px',
          color: '#1A202C',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 0.2s ease',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.03)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#03A9F5';
          e.currentTarget.style.boxShadow = '0px 4px 12px rgba(3, 169, 245, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.boxShadow = '0px 1px 2px rgba(0, 0, 0, 0.03)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Google</span>
      </button>

      {/* GitHub Button */}
      <button
        style={{
          position: 'absolute',
          width: '27.5%',
          height: '5.6%',
            left: '57.2%',
          top: '81%',
          border: '1.5px solid #E2E8F0',
          borderRadius: '12px',
          background: '#FFFFFF',
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 'clamp(14px, 1.7vh, 18px)',
          lineHeight: '28px',
          color: '#1A202C',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 0.2s ease',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.03)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#03A9F5';
          e.currentTarget.style.boxShadow = '0px 4px 12px rgba(3, 169, 245, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.boxShadow = '0px 1px 2px rgba(0, 0, 0, 0.03)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#181717">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>GitHub</span>
      </button>

    </div>
    </PageTransition>
  );
}
