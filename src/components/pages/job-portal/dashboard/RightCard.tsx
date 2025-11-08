'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface RightCardProps {
  className?: string;
}

const RightCard: React.FC<RightCardProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'w-[317px] h-[465px] relative',
        className,
      )}
    >
      <svg width="317" height="465" viewBox="0 0 373 543" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
        <g filter="url(#filter0_d_172_492)">
          <path d="M1 38.4C1 24.9587 1 18.2381 3.61584 13.1042C5.9168 8.58834 9.58834 4.9168 14.1042 2.61584C19.2381 0 25.9587 0 39.4 0H333.6C347.041 0 353.762 0 358.896 2.61584C363.412 4.9168 367.083 8.58834 369.384 13.1042C372 18.2381 372 24.9587 372 38.4V502.6C372 516.041 372 522.762 369.384 527.896C367.083 532.412 363.412 536.083 358.896 538.384C353.762 541 347.041 541 333.6 541H39.4C25.9587 541 19.2381 541 14.1042 538.384C9.58834 536.083 5.9168 532.412 3.61584 527.896C1 522.762 1 516.041 1 502.6V38.4Z" fill="white"/>
        </g>
        <defs>
          <filter id="filter0_d_172_492" x="0" y="0" width="373" height="543" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="1"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_172_492"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_172_492" result="shape"/>
          </filter>
        </defs>
      </svg>
      <div className="relative z-10 p-4">
        <h1 className="text-base font-bold text-gray-900">Recent Activity</h1>
      </div>
    </div>
  );
};

export default RightCard;