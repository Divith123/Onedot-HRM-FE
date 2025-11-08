'use client';

import React, { useEffect, useState } from 'react';

interface StatCardProps {
  count?: number | string;
  icon?: React.ReactNode;
  label?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  count = '0',
  icon,
  label = 'Label'
}) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Animate count if it's a number
    if (typeof count === 'number') {
      let start = 0;
      const end = count;
      const duration = 1500; // 1.5 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayCount(end);
          clearInterval(timer);
        } else {
          setDisplayCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [count]);

  const defaultIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div 
      className={`w-full bg-white border border-[#e8e8ea] shadow-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex items-center justify-between hover:shadow-md transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: '100ms' }}
    >
      {/* Icon and Label - Same Line */}
      <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
        {/* Icon Section */}
        <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-[#e3f2fd] to-[#bbdefb] rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
          <div className="w-4 h-4 sm:w-5 sm:h-5 animate-[pulse_2s_ease-in-out_infinite]">
            {icon || defaultIcon}
          </div>
        </div>

        {/* Label */}
        <div className="text-[#6b7280] text-[10px] sm:text-xs md:text-sm font-medium leading-tight">
          {label}
        </div>
      </div>

      {/* Count - Same Line, Right Side */}
      <div className="text-[#111827] text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold leading-tight">
        {typeof count === 'number' ? displayCount : count}
      </div>
    </div>
  );
};

export default StatCard;
