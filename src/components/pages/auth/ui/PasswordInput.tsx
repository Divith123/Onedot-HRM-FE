import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isResponsive?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  showPassword,
  setShowPassword,
  isResponsive
}) => {
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
        height: '7.7%',
        left: '17.7%',
        top: '42.1%',
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
      <div style={isResponsive ? { position: 'relative', width: '100%' } : { position: 'relative', width: '100%', height: '100%' }}>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          style={isResponsive ? {
            width: '100%',
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
            minHeight: '44px',
            boxSizing: 'border-box' as const,
          } : {
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
          style={isResponsive ? {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '10px',
            width: '40px',
            height: '40px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
          } : {
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
          {!isResponsive && (
            <div
              style={{
                width: '1px',
                height: '60%',
                background: '#CFD9E0',
                marginRight: '10px',
              }}
            />
          )}
          {showPassword ? (
            <EyeOff size={18} color="#718096" />
          ) : (
            <Eye size={18} color="#718096" />
          )}
        </button>
      </div>
    </div>
  );
};