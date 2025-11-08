'use client';

import React from 'react';

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
  const defaultIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="w-[280px] h-[88px] rounded-2xl border-2 border-[#f5effc] p-6 flex flex-row items-center gap-16">
      {/* Icon Section */}
      <div className="shrink-0">
        {icon || defaultIcon}
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-start gap-8">
        {/* Label */}
        <div className="text-[#252525] text-left font-['Montserrat-Regular',sans-serif] text-xs font-normal">
          {label}
        </div>

        {/* Count */}
        <div className="text-[#252525] text-left font-['Cairo-Bold',sans-serif] text-2xl font-bold">
          {count}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
