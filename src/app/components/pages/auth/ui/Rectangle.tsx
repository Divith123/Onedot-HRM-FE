import React from 'react';

export type RectangleColor = 'green' | 'yellow' | 'red' | 'blue';

interface RectangleProps {
  color?: RectangleColor;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
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
  children
}) => {
  return (
    <div
      className={className}
      style={{
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
      {children}
    </div>
  );
};