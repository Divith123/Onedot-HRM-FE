'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TotalApplicationsCardProps {
  className?: string;
}

const TotalApplicationsCard: React.FC<TotalApplicationsCardProps> = ({ className }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
  
  // Bar heights as percentages (matching the original design)
  const barHeights = [43.1, 19.52, 16.27, 21.15, 13.18, 29.28, 32.53, 20.01, 19.52, 21.8, 13.01, 29.28];

  return (
    <div
      className={cn(
  'relative w-full bg-white rounded-2xl border-2 border-[#f5effc] p-4 md:p-6',
        className,
      )}
    >
      {/* Chart Section */}
  <div className="mb-4">
        {/* Bar Chart Container */}
  <div className="relative w-full h-[170px] md:h-[220px] mb-3 overflow-x-auto">
          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-0.5 md:px-1 min-w-max">
            {barHeights.map((height, index) => (
              <div
                key={index}
                className={cn(
                  'rounded-t-md flex-1 mx-0.5 md:mx-1',
                  index === 6 ? 'bg-[#03a9f5]' : 'bg-[#03a9f5] opacity-20'
                )}
                style={{ height: `${height}%`, minWidth: '1rem' }}
              />
            ))}
          </div>

          {/* Highlight Circle on bar 7 (July) */}
          <div className="absolute bottom-[32.53%] left-[47.98%] transform -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 bg-[#03a9f5] border-2 border-white rounded-full" />
        </div>

        {/* Month Labels */}
  <div className="flex justify-between px-1 md:px-2 mt-2 overflow-x-auto gap-1">
          {months.map((month, index) => (
            <div key={index} className="text-[#a098ae] text-[10px] md:text-xs font-semibold whitespace-nowrap">
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
  <div className="h-px bg-[#f5effc] my-4" />

      {/* Details Section */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {/* Total Applications */}
        <div>
          <p className="text-[#a098ae] text-[10px] md:text-xs mb-0.5 md:mb-1">Total Applications</p>
          <p className="text-[#252525] text-base md:text-lg font-bold">345,678</p>
        </div>

        {/* Period Dropdown */}
        <div>
          <p className="text-[#a098ae] text-[10px] md:text-xs mb-0.5 md:mb-1">Period</p>
          <div className="flex items-center gap-1 md:gap-2">
            <p className="text-[#252525] text-base md:text-lg font-bold">Month</p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:w-5 md:h-5"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#252525"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* New Applications */}
        <div>
          <p className="text-[#a098ae] text-[10px] md:text-xs mb-0.5 md:mb-1">New Applications</p>
          <div className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="md:w-4 md:h-4"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="#03a9f5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[#252525] text-base md:text-lg font-bold">49</p>
          </div>
        </div>

        {/* Growth */}
        <div>
          <p className="text-[#a098ae] text-[10px] md:text-xs mb-0.5 md:mb-1">Growth</p>
          <p className="text-[#252525] text-base md:text-lg font-bold">+10%</p>
        </div>
      </div>
    </div>
  );
};

export default TotalApplicationsCard;
