'use client';

import React from 'react';
import { initiateLinkedInLogin } from '@/utils/linkedinOAuth';
import toast from 'react-hot-toast';

interface LinkedInButtonProps {
  isResponsive?: boolean;
  onError?: (error: string) => void;
}

export const LinkedInButton: React.FC<LinkedInButtonProps> = ({
  isResponsive,
  onError
}) => {
  const handleLinkedInLogin = () => {
    try {
      initiateLinkedInLogin();
    } catch (error: any) {
      const errorMsg = error?.message || 'LinkedIn login failed. Please try again.';
      toast.error(errorMsg);
      console.error('LinkedIn login error:', error);
      if (onError) onError(errorMsg);
    }
  };

  return (
    <button
      onClick={handleLinkedInLogin}
      style={isResponsive ? {
        width: '100%',
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
        padding: '12px 24px',
        minHeight: '44px',
      } : {
        position: 'absolute',
        width: '27.5%',
        height: '5.6%',
        left: '17.7%',
        top: '89.2%',
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      <span>LinkedIn</span>
    </button>
  );
};
