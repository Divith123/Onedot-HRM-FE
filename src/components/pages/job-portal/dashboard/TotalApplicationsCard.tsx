'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TotalApplicationsCardProps {
  className?: string;
  totalApplications?: number;
  newApplications?: number;
  growth?: string;
}

const TotalApplicationsCard: React.FC<TotalApplicationsCardProps> = ({ 
  className,
  totalApplications = 345,
  newApplications = 49,
  growth = '+10%'
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);
  const [newCount, setNewCount] = React.useState(0);

  React.useEffect(() => {
    setIsVisible(true);
    
    // Animate Total Applications count
    let totalStart = 0;
    const totalEnd = totalApplications;
    const totalDuration = 2000;
    const totalIncrement = totalEnd / (totalDuration / 16);

    const totalTimer = setInterval(() => {
      totalStart += totalIncrement;
      if (totalStart >= totalEnd) {
        setTotalCount(totalEnd);
        clearInterval(totalTimer);
      } else {
        setTotalCount(Math.floor(totalStart));
      }
    }, 16);

    // Animate New Applications count
    let newStart = 0;
    const newEnd = newApplications;
    const newDuration = 1500;
    const newIncrement = newEnd / (newDuration / 16);

    const newTimer = setInterval(() => {
      newStart += newIncrement;
      if (newStart >= newEnd) {
        setNewCount(newEnd);
        clearInterval(newTimer);
      } else {
        setNewCount(Math.floor(newStart));
      }
    }, 16);

    return () => {
      clearInterval(totalTimer);
      clearInterval(newTimer);
    };
  }, [totalApplications, newApplications]);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Bar heights as percentages - extended to 12 months
  const barHeights = [38, 25, 42, 28, 70, 15, 35, 18, 48, 38, 55, 85];

  return (
    <div
      className={cn(
        'relative w-full bg-white rounded-xl sm:rounded-2xl border border-[#e8e8ea] shadow-sm p-4 sm:p-5 md:p-6 transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className,
      )}
    >
      {/* Details Section - Moved to Top */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-4 sm:mb-5">
        {/* Total Applications */}
        <div>
          <p className="text-[#9ca3af] text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">Total Applications</p>
          <p className="text-[#111827] text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{totalCount.toLocaleString()}</p>
        </div>

        {/* New Applications */}
        <div>
          <p className="text-[#9ca3af] text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">New Applications</p>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#10b981] rounded-full flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
              <svg width="6" height="6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-2 sm:h-2">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-[#111827] text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{newCount}</p>
          </div>
        </div>

        {/* Growth */}
        <div>
          <p className="text-[#9ca3af] text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">Growth</p>
          <p className="text-[#10b981] text-base sm:text-lg md:text-xl lg:text-2xl font-bold">{growth}</p>
        </div>

        {/* Period Dropdown */}
        <div>
          <p className="text-[#9ca3af] text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-1.5">Period</p>
          <button className="flex items-center gap-1 sm:gap-1.5 hover:bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors">
            <p className="text-[#111827] text-base sm:text-lg md:text-xl lg:text-2xl font-bold">Month</p>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-4 sm:h-4 md:w-5 md:h-5"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div>
        {/* Bar Chart Container */}
        <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] xl:h-[240px] mb-2 sm:mb-3">
          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-between gap-1.5 lg:gap-2">
            {barHeights.map((height, index) => (
              <div
                key={index}
                className={cn(
                  'rounded-t-lg flex-1 transition-all duration-300 hover:opacity-80 hover:scale-105',
                  index === 4 ? 'bg-[#03a9f5]' : 'bg-[#d1ecf7]'
                )}
                style={{ 
                  height: isVisible ? `${height}%` : '0%',
                  transitionDelay: `${index * 50}ms`,
                  transitionDuration: '800ms'
                }}
              />
            ))}
          </div>

          {/* Highlight Circle on tallest bar (May - index 4) */}
          <div 
            className="absolute transform -translate-x-1/2 w-3 h-3 bg-[#03a9f5] border-2 border-white rounded-full shadow-lg transition-all duration-500 animate-[bounce_2s_ease-in-out_infinite]" 
            style={{ 
              bottom: isVisible ? `${barHeights[4]}%` : '0%',
              left: `${((4 + 0.5) / months.length) * 100}%`,
              transitionDelay: '400ms',
              opacity: isVisible ? 1 : 0
            }}
          />
        </div>

        {/* Month Labels */}
        <div className="flex justify-between gap-1 lg:gap-1.5">
          {months.map((month, index) => (
            <div 
              key={index} 
              className={cn(
                "text-[10px] lg:text-xs font-medium text-center flex-1 transition-all duration-500",
                index === 4 ? "text-[#03a9f5] font-semibold" : "text-[#9ca3af]"
              )}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: `${index * 50}ms`
              }}
            >
              {month}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalApplicationsCard;