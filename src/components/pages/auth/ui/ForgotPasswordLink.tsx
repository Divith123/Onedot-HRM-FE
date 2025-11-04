import React from 'react';
import { useRouter } from 'next/navigation';

export const ForgotPasswordLink: React.FC = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/forgot-password');
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      style={{
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 'clamp(12px, 1.5vh, 16px)',
        lineHeight: '20px',
        color: '#1C4532',
        textDecoration: 'underline',
        letterSpacing: '-0.154px',
        cursor: 'pointer',
      }}
    >
      Forgot password?
    </a>
  );
};