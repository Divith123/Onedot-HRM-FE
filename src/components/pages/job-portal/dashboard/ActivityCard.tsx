'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ActivityItem {
  label: string;
  value: string | number;
  bgColor: string;
  icon: React.ReactNode;
}

interface ActivityCardProps {
  className?: string;
  items?: ActivityItem[];
}

// Icon components
const PaperIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#FF9800" fillOpacity="0.6"/>
  </svg>
);

const SwapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 16L3 12M3 12L7 8M3 12H21M17 8L21 12M21 12L17 16M21 12H3" stroke="#9C27B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.6"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="#00BCD4" fillOpacity="0.6"/>
    <path d="M4 20C4 16.134 7.582 13 12 13C16.418 13 20 16.134 20 20" fill="#00BCD4" fillOpacity="0.6"/>
  </svg>
);

const GraphIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21M3 9L7 15L11 8L15 12L21 5V2" stroke="#E91E63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.6"/>
  </svg>
);

const ActivityCard: React.FC<ActivityCardProps> = ({ className, items }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const defaultItems: ActivityItem[] = [
    {
      label: 'Projects',
      value: '3',
      bgColor: '#fff2e9',
      icon: <PaperIcon />,
    },
    {
      label: 'Requests',
      value: '3456',
      bgColor: '#ede8ff',
      icon: <SwapIcon />,
    },
    {
      label: 'Users',
      value: '3',
      bgColor: '#eaf9ff',
      icon: <ProfileIcon />,
    },
    {
      label: 'Storage',
      value: '128/500 GB',
      bgColor: '#ffebef',
      icon: <GraphIcon />,
    },
  ];

  const displayItems = items || defaultItems;

  return (
    <div
      className={cn(
        'w-full bg-white border border-[#e8e8ea] shadow-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className,
      )}
    >
      {/* Items Container with View All Button inline */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 md:gap-x-8 lg:gap-x-10">
        {displayItems.map((item, index) => (
          <React.Fragment key={index}>
            {/* Item Container */}
            <div 
              className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 transition-all duration-500`}
              style={{ 
                transitionDelay: `${200 + index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
              }}
            >
              {/* Icon Background */}
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transform hover:scale-110 hover:rotate-3 transition-all duration-300"
                style={{ backgroundColor: item.bgColor }}
              >
                {item.icon}
              </div>

              {/* Text Container */}
              <div className="flex flex-col">
                <span className="text-[#92959e] text-[11px] sm:text-xs md:text-sm font-medium leading-tight">{item.label}</span>
                <span className="text-[#15192c] text-sm sm:text-base md:text-lg font-bold mt-0.5 sm:mt-1">{item.value}</span>
              </div>
            </div>

            {/* Divider - Show between items on larger screens */}
            {index < displayItems.length - 1 && (
              <div className="hidden lg:block h-12 w-px bg-[#e8e8ea] animate-[fadeIn_0.5s_ease-in]" />
            )}
          </React.Fragment>
        ))}

        {/* View All Button - Inline with stats, pushes to right */}
        <button 
          className={`flex items-center gap-1 sm:gap-1.5 text-[#03a9f5] text-xs sm:text-sm font-semibold hover:text-[#0288d1] transition-all duration-300 cursor-pointer ml-auto hover:gap-2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <span>View All</span>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;