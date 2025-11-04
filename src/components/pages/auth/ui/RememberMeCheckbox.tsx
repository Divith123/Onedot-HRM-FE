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
          position: 'relative',
          outline: 'none',
        }}
      />
      {checked && (
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
      <span>Remember me</span>
    </label>
  );
};