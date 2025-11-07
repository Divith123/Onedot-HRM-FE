'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  EmailInput,
  PasswordInput,
  RememberMeCheckbox,
  SignInButton,
  GoogleButton,
  GitHubButton,
  ForgotPasswordLink,
  OrDivider,
  Rectangle
} from '../../../../components/pages/auth/ui';
import PageTransition from '../../../../components/animations/PageTransition';
import authService from '@/services/auth.service';
import { useAuth } from '@/contexts/AuthContext';

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.signin({
        email: email.trim(),
        password: password,
      });

      if (response.success && response.user) {
        toast.success(response.message || 'Login successful!');

        // Login user
        login(response.user);

        // Redirect to dashboard or setup page
        setTimeout(() => {
          router.push('/setup-org');
        }, 1000);
      } else {
        toast.error(response.message || 'Failed to sign in');
      }
    } catch (error: any) {
      console.error('Signin error:', error);

      // Handle error response
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred during sign in. Please try again.');
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
            Welcome Back
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
            <span>Don't have an account?</span>
            <a
              href="/signup"
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
              Create now
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

            {/* Remember Me & Forgot Password */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                flexWrap: 'wrap',
                marginTop: '4px',
              }}
            >
              {/* Remember Me Checkbox */}
              <RememberMeCheckbox checked={rememberMe} onChange={setRememberMe} />

              {/* Forgot Password Link */}
              <ForgotPasswordLink />
            </div>

            {/* Sign In Button */}
            <SignInButton 
              onClick={handleSubmit}
              isResponsive={true}
            />

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
          Welcome Back
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
            gap: '4px',
          }}
        >
          <span>Don't have an account?</span>
          <a
            href="/signup"
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
            Create now
          </a>
        </div>

        {/* Email Input */}
        <EmailInput 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          isResponsive={false}
        />

        {/* Password Input */}
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          isResponsive={false}
        />

        {/* Remember Me & Forgot Password */}
        <div
          style={{
            position: 'absolute',
            width: '27.5vw',
            height: '2.2%',
            left: '17.7%',
            top: '51.8%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Remember Me Checkbox */}
          <RememberMeCheckbox checked={rememberMe} onChange={setRememberMe} />

          {/* Forgot Password Link */}
          <ForgotPasswordLink />
        </div>

        {/* Sign In Button */}
        <SignInButton 
          onClick={handleSubmit}
          isResponsive={false}
        />

        {/* OR Divider */}
        <OrDivider isResponsive={false} />

        {/* Google Button */}
        <GoogleButton isResponsive={false} />

        {/* GitHub Button */}
        <GitHubButton isResponsive={false} />

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