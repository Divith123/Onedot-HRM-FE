import React from 'react';

interface SignInButtonProps {
  onClick: (e: React.FormEvent) => void;
  isResponsive?: boolean;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ onClick, isResponsive }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      style={isResponsive ? {
        width: '100%',
        background: '#03A9F5',
        borderRadius: '10px',
        border: 'none',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 'clamp(16px, 1.9vh, 20px)',
        lineHeight: '28px',
        color: '#F7FAFC',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 24px',
        minHeight: '44px',
      } : {
        position: 'absolute',
        width: '27.6%',
        height: '5.6%',
        left: '17.7%',
        top: '56.9%',
        background: '#03A9F5',
        borderRadius: '10px',
        border: 'none',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 'clamp(16px, 1.9vh, 20px)',
        lineHeight: '28px',
        color: '#F7FAFC',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#0291D6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#03A9F5';
      }}
    >
      Sign in
    </button>
  );
};