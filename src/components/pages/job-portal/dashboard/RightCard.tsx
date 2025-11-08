'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface RightCardProps {
  className?: string;
  profileVisitors?: number;
  visitorData?: number[];
  activities?: Array<{
    title: string;
    time: string;
    color: string;
  }>;
}



const RightCard: React.FC<RightCardProps> = ({ 
  className,
  profileVisitors = 345,
  visitorData,
  activities
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [visitorCount, setVisitorCount] = React.useState(0);
  const lineRef = React.useRef<SVGPathElement>(null);

  React.useEffect(() => {
    setIsVisible(true);
    
    // Animate visitor count
    let start = 0;
    const end = profileVisitors;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setVisitorCount(end);
        clearInterval(timer);
      } else {
        setVisitorCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [profileVisitors]);

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
      }, 200);
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
        'w-full lg:w-[340px] xl:w-[360px] h-full bg-white rounded-2xl border border-[#e8e8ea] shadow-sm p-4 lg:p-5 flex flex-col transition-all duration-700',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm lg:text-base font-bold text-[#111827]">Profile Visitors</h3>
          <p className="text-xs text-[#6b7280] mt-0.5">Last 30 days</p>
        </div>
        <div className="text-right">
          <div className="text-xl lg:text-2xl font-bold text-[#111827]">{visitorCount}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[100px] mb-3">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full h-full">
          <defs>
            <linearGradient id="visitor-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#03A9F5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#03A9F5" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Area */}
          {areaD && (
            <path 
              d={areaD} 
              fill="url(#visitor-grad)"
              className="transition-opacity duration-1000"
              style={{ 
                opacity: isVisible ? 1 : 0,
                transitionDelay: '400ms'
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
                transition: 'stroke-dashoffset 1.8s ease-out',
              }}
            />
          )}
        </svg>
      </div>

      {/* Recent Activity Section */}
      <div className="border-t border-[#e8e8ea] pt-3">
        <h4 className="text-xs lg:text-sm font-bold text-[#111827] mb-2.5">Recent Activity</h4>
        
        {/* Activity Items - Compact */}
        <div className="space-y-2">
          {(activities || [
            { title: 'New application received', time: '2 minutes ago', color: 'bg-[#03a9f5]' },
            { title: 'Interview scheduled', time: '1 hour ago', color: 'bg-[#10b981]' },
            { title: 'Profile updated', time: '3 hours ago', color: 'bg-[#f59e0b]' },
            { title: 'Job posting created', time: '5 hours ago', color: 'bg-[#8b5cf6]' },
          ]).map((activity, index) => (
            <div 
              key={index} 
              className="flex items-start gap-2 transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: `${400 + index * 100}ms`
              }}
            >
              <div 
                className={cn('w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-transform duration-300 hover:scale-150', activity.color)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#111827] font-medium leading-tight">{activity.title}</p>
                <p className="text-[10px] text-[#6b7280] mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightCard;