import React from 'react';

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
  checked,
  onChange
}) => {
  return (
    <label
      style={{
        position: 'relative',
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
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          width: '16px',
          height: '16px',
          border: '1px solid #CFD9E0',
          borderRadius: '4px',
          cursor: 'pointer',
          background: 'transparent',
          appearance: 'none',
          outline: 'none',
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
      />
      {checked && (
        <svg
          viewBox="0 0 12 12"
          style={{
            position: 'absolute',
            top: '50%',
            left: '4px',
            width: '10px',
            height: '10px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <polyline points="1.5 6.5 4.5 9 10 2" fill="none" stroke="#03A9F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span>Remember me</span>
    </label>
  );
};