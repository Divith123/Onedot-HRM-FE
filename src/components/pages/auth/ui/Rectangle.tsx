import React from 'react';

export type RectangleColor = 'green' | 'yellow' | 'red' | 'blue';

interface RectangleProps {
  color?: RectangleColor;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  isResponsive?: boolean;
}

const colorMap: Record<RectangleColor, string> = {
  green: '#1CB75E',
  yellow: '#FFDE17',
  red: '#ED1C24',
  blue: '#03A9F5',
};

export const Rectangle: React.FC<RectangleProps> = ({
  color = 'yellow',
  className,
  style,
  children,
  isResponsive
}) => {
  const getShapeClass = () => {
    switch (color) {
      case 'blue': return 'blue-floating-shapes';
      case 'red': return 'red-floating-shapes';
      case 'green': return 'green-floating-shapes';
      case 'yellow': return 'yellow-floating-shapes';
      default: return 'yellow-floating-shapes';
    }
  };

  return (
    <div
      className={`${className} ${getShapeClass()}`}
      style={isResponsive ? {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: colorMap[color],
        overflow: 'hidden',
        ...style,
      } : {
        position: 'absolute',
        width: '40%',
        height: '76%',
        left: '51%',
        top: '13.3%',
        background: colorMap[color],
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Gradient Circle Background */}
      <div
        className="animated-circle"
        style={{
          position: 'absolute',
          width: '40.3%',
          height: '62.1%',
          left: '8.3%',
          top: '-26.8%',
          background: 'linear-gradient(180deg, rgba(247, 250, 252, 0.8) 0%, rgba(237, 242, 247, 0.4) 100%)',
          transform: 'matrix(0.93, 0.38, -0.53, 0.85, 0, 0)',
          borderRadius: '50%',
        }}
      />
      {/* Floating Shapes */}
      <div
        className="shape-1"
        style={{
          position: 'absolute',
          width: color === 'yellow' ? '55px' : '50px',
          height: color === 'yellow' ? '55px' : '50px',
          left: '22%',
          top: '28%',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)',
        }}
      />
      <div
        className="shape-2"
        style={{
          position: 'absolute',
          width: color === 'yellow' ? '38px' : '35px',
          height: color === 'yellow' ? '38px' : '35px',
          left: '72%',
          top: '58%',
          background: 'rgba(255, 255, 255, 0.18)',
          borderRadius: '50%',
          backdropFilter: 'blur(7px)',
        }}
      />
      <div
        className="shape-3"
        style={{
          position: 'absolute',
          width: color === 'yellow' ? '75px' : '70px',
          height: color === 'yellow' ? '28px' : '25px',
          left: '32%',
          top: '74%',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '14px',
          backdropFilter: 'blur(12px)',
        }}
      />
      {children}
    </div>
  );
};