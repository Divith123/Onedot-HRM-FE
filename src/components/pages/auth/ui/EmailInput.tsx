import React from 'react';

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isResponsive?: boolean;
}

export const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, isResponsive }) => {
  return (
    <div
      style={isResponsive ? {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      } : {
        position: 'absolute',
        width: '26.1%',
        height: '7.8%',
        left: '17.7%',
        top: '31.6%',
      }}
    >
      <label
        style={isResponsive ? {
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 'clamp(12px, 1.5vh, 16px)',
          lineHeight: '20px',
          letterSpacing: '-0.154px',
          color: '#718096',
        } : {
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
        value={value}
        onChange={onChange}
        style={isResponsive ? {
          width: '100%',
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
          height: 'auto',
          minHeight: '44px',
        } : {
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
          e.currentTarget.style.borderColor = '#03A9F5';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#CBD5E0';
        }}
        required
      />
    </div>
  );
};