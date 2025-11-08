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
        'relative w-full max-w-[568px] h-[88px] bg-white rounded-2xl border border-transparent shadow-lg',
        className,
      )}
      style={{
        boxShadow: '0px 18px 32px 0px rgba(208, 210, 218, 0.15)',
      }}
    >
      <div className="flex items-center justify-between h-full px-6">
        {displayItems.map((item, index) => (
          <React.Fragment key={index}>
            {/* Item Container */}
            <div className="flex items-center gap-3">
              {/* Icon Background */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center opacity-65 shrink-0"
                style={{ backgroundColor: item.bgColor }}
              >
                {item.icon}
              </div>

              {/* Text Container */}
              <div className="flex flex-col">
                <span className="text-[#92959e] text-xs font-semibold">{item.label}</span>
                <span className="text-[#15192c] text-sm font-normal mt-0.5">{item.value}</span>
              </div>
            </div>

            {/* Divider */}
            {index < displayItems.length - 1 && (
              <div className="h-[55px] w-px bg-[#ececee]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
