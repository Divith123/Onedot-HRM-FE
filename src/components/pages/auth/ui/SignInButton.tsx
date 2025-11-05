import React from 'react';

interface SignInButtonProps {
  onClick: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ onClick, isLoading = false }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isLoading}
      style={{
        position: 'absolute',
        width: '27.6%',
        height: '5.6%',
        left: '17.7%',
        top: '56.9%',
        background: isLoading ? '#CBD5E0' : '#03A9F5',
        borderRadius: '10px',
        border: 'none',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 'clamp(16px, 1.9vh, 20px)',
        lineHeight: '28px',
        color: '#F7FAFC',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isLoading ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isLoading) e.currentTarget.style.background = '#0291D6';
      }}
      onMouseLeave={(e) => {
        if (!isLoading) e.currentTarget.style.background = '#03A9F5';
      }}
    >
      {isLoading ? 'Signing in...' : 'Sign in'}
    </button>
  );
};