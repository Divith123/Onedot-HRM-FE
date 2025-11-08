'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface RecentActivityCardProps {
  className?: string;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'w-full h-full bg-white rounded-xl sm:rounded-2xl border border-[#e8e8ea] shadow-sm p-4 sm:p-5 md:p-6 flex flex-col',
        className,
      )}
    >
      {/* Header */}
      <h4 className="text-sm sm:text-base md:text-lg font-bold text-[#111827] mb-4 sm:mb-5">Recent Activity</h4>
      
      {/* Activity Items */}
      <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-5">
        {[
          { title: 'New application received', time: '2 minutes ago', color: 'bg-[#03a9f5]' },
          { title: 'Interview scheduled', time: '1 hour ago', color: 'bg-[#10b981]' },
          { title: 'Profile updated', time: '3 hours ago', color: 'bg-[#f59e0b]' },
          { title: 'Job posting created', time: '5 hours ago', color: 'bg-[#8b5cf6]' },
        ].map((activity, index) => (
          <div key={index} className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
            <div className={cn('w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mt-1 sm:mt-1.5 shrink-0', activity.color)} />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm md:text-base text-[#111827] font-medium leading-tight">{activity.title}</p>
              <p className="text-[10px] sm:text-xs md:text-sm text-[#6b7280] mt-0.5 sm:mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;
