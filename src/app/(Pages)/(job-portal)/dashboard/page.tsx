'use client';

import React from 'react';
import Sidebar from '@/components/pages/common/Sidebar';
import StatCard from '@/components/pages/job-portal/dashboard/Card';
import TrendOverviewCard from '@/components/pages/job-portal/dashboard/TrendOverviewCard';
import RightCard from '@/components/pages/job-portal/dashboard/RightCard';
import ActivityCard from '@/components/pages/job-portal/dashboard/ActivityCard';
import TotalApplicationsCard from '@/components/pages/job-portal/dashboard/TotalApplicationsCard';

const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7089 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 4L12 14.01L9 11.01" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="pt-7 pr-8 pb-8 pl-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
          
          {/* Top Content Area */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-3">
            {/* left column: stat cards + activity (expanded width) */}
            <div className="flex flex-col gap-3 w-full md:max-w-[700px]">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[repeat(2,max-content)] sm:justify-start sm:justify-items-start">
                <StatCard count={932} label="Applied Jobs" icon={<BriefcaseIcon />} />
                <StatCard count={25} label="Interviews" icon={<UsersIcon />} />
                <StatCard count={8} label="Offers" icon={<CheckCircleIcon />} />
                <StatCard count={156} label="Saved Jobs" />
              </div>

              <div className="flex flex-col">
                <ActivityCard />
                <div className="w-full mt-3">
                  <TotalApplicationsCard />
                </div>
              </div>
            </div>

            {/* right column: trend overview and recent activity */}
            <div className="flex flex-col gap-3 md:flex-row md:gap-3 md:mt-0 mt-2">
              <TrendOverviewCard />
              <RightCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
