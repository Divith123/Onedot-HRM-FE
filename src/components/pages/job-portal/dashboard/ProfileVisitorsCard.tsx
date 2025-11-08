'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileVisitorsCardProps {
  className?: string;
  visitorCount?: number;
  visitorData?: number[];
}

const ProfileVisitorsCard: React.FC<ProfileVisitorsCardProps> = ({ 
  className,
  visitorCount = 34,
  visitorData
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [animatedCount, setAnimatedCount] = React.useState(0);
  const lineRef = React.useRef<SVGPathElement>(null);

  React.useEffect(() => {
    setIsVisible(true);
    
    // Animate count
    let start = 0;
    const end = visitorCount;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedCount(end);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [visitorCount]);

  React.useEffect(() => {
    if (lineRef.current) {
      const pathLength = lineRef.current.getTotalLength();
      lineRef.current.style.strokeDasharray = `${pathLength}`;
      lineRef.current.style.strokeDashoffset = `${pathLength}`;
      
      // Trigger animation
      setTimeout(() => {
        if (lineRef.current) {
          lineRef.current.style.strokeDashoffset = '0';
        }
      }, 300);
    }
  }, []);

  // Sample data for the profile visitors chart
  const visitors = visitorData || [120, 136, 150, 140, 160, 174, 168, 180, 170, 185, 175, 190, 200, 215, 205, 220];

  // Build SVG path for the line chart
  const viewW = 300;
  const viewH = 100;
  const padX = 10;
  const padY = 15;

  const min = Math.min(...visitors);
  const max = Math.max(...visitors);
  const range = max - min || 1;
  const step = visitors.length > 1 ? (viewW - padX * 2) / (visitors.length - 1) : 0;

  const points = visitors.map((v, i) => {
    const x = padX + i * step;
    const y = padY + (1 - (v - min) / range) * (viewH - padY * 2);
    return { x, y };
  });

  const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');

  // Area path
  const areaD = points.length > 0
    ? `${points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ')} L ${points[points.length - 1].x} ${viewH - padY} L ${points[0].x} ${viewH - padY} Z`
    : '';

  return (
    <div
      className={cn(
        'w-full bg-white rounded-xl sm:rounded-2xl border border-[#e8e8ea] shadow-sm p-4 sm:p-5 md:p-6 flex flex-col h-full transition-all duration-700',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 sm:mb-5">
        <div className="flex-1">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#111827]">Profile Visitors</h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-[#6b7280] mt-0.5 sm:mt-1">Last 30 days</p>
        </div>
        <div className="text-right">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827]">{animatedCount.toLocaleString()}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[100px] sm:min-h-[120px]">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full h-full">
          <defs>
            <linearGradient id="profile-visitor-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#03A9F5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#03A9F5" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Area */}
          {areaD && (
            <path 
              d={areaD} 
              fill="url(#profile-visitor-grad)"
              className="animate-[fadeIn_1s_ease-in]"
              style={{ 
                animation: 'drawArea 1.5s ease-out forwards',
                opacity: 0
              }}
            />
          )}
          
          {/* Line */}
          {lineD && (
            <path
              ref={lineRef}
              d={lineD}
              fill="none"
              stroke="#03A9F5"
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 2s ease-out',
              }}
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default ProfileVisitorsCard;
