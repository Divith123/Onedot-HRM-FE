import React from 'react';

interface OrDividerProps {
  isResponsive?: boolean;
}

export const OrDivider: React.FC<OrDividerProps> = ({ isResponsive }) => {
  return (
    <div
      style={isResponsive ? {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        margin: '12px 0',
      } : {
        position: 'absolute',
        width: '27.5%',
        height: '1.9%',
        left: '17.7%',
        top: '65.6%',
      }}
    >
      {isResponsive ? (
        <>
          <div style={{ flex: 1, height: '1px', background: '#A0AEC0' }} />
          <span
            style={{
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 'clamp(10px, 1.2vh, 12px)',
              lineHeight: '20px',
              letterSpacing: '-0.154px',
              color: '#718096',
              whiteSpace: 'nowrap',
            }}
          >
            OR
          </span>
          <div style={{ flex: 1, height: '1px', background: '#A0AEC0' }} />
        </>
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              width: '12.4vw',
              height: '0px',
              left: '0px',
              top: '50%',
              border: '1px solid #A0AEC0',
            }}
          />
          <span
            style={{
              position: 'absolute',
              width: '1vw',
              height: '1.9vh',
              left: '13.4vw',
              top: '0px',
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 'clamp(10px, 1.2vh, 12px)',
              lineHeight: '20px',
              letterSpacing: '-0.154px',
              color: '#718096',
            }}
          >
            OR
          </span>
          <div
            style={{
              position: 'absolute',
              width: '12.4vw',
              height: '0px',
              left: '15vw',
              top: '50%',
              border: '1px solid #A0AEC0',
            }}
          />
        </>
      )}
    </div>
  );
};