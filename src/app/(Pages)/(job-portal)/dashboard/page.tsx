'use client';

import React from 'react';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';
import Sidebar from '@/components/pages/common/Sidebar';
import { Navbar } from '@/components/ui/navbar';
import StatCard from '@/components/pages/job-portal/dashboard/Card';
import TrendOverviewCard from '@/components/pages/job-portal/dashboard/TrendOverviewCard';
import ProfileVisitorsCard from '@/components/pages/job-portal/dashboard/ProfileVisitorsCard';
import RecentActivityCard from '@/components/pages/job-portal/dashboard/RecentActivityCard';
import ActivityCard from '@/components/pages/job-portal/dashboard/ActivityCard';
import TotalApplicationsCard from '@/components/pages/job-portal/dashboard/TotalApplicationsCard';

const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#03a9f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AssessmentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#FF9800" strokeWidth="2"/>
    <path d="M12 6v6l4 2" stroke="#FF9800" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ShortlistedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11l3 3L22 4" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <div className="flex h-screen bg-white overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto bg-[#fafbfc]">
            <div className="w-full px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 lg:px-6 lg:py-7 xl:px-8 xl:py-8 mx-auto max-w-[1600px]">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5">Dashboard</h1>
          
          {/* Dashboard Layout */}
          <div className="flex flex-col xl:flex-row gap-3 sm:gap-4 md:gap-5">
            {/* Left Column - Main Content */}
            <div className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 min-w-0">
              {/* Top Row: Stats Grid + Profile Visitors Card */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-3 sm:gap-4 md:gap-5">
                {/* Stats Grid - 2x2 */}
                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <StatCard count={32} label="Applied Jobs" icon={<BriefcaseIcon />} />
                  <StatCard count={32} label="Interviewed" icon={<UsersIcon />} />
                  <StatCard count={32} label="Assessment" icon={<AssessmentIcon />} />
                  <StatCard count={32} label="Shortlisted" icon={<ShortlistedIcon />} />
                </div>

                {/* Profile Visitors Card - Right side of Stats on large screens */}
                <div className="w-full">
                  <ProfileVisitorsCard />
                </div>
              </div>

              {/* Activity Card with View All Button */}
              <ActivityCard />

              {/* Total Applications Chart */}
              <TotalApplicationsCard />
            </div>

            {/* Right Column - Recent Activity & AI Improvements */}
            <div className="w-full xl:w-[300px] 2xl:w-[340px] flex flex-col gap-3 sm:gap-4 md:gap-5">
              {/* Recent Activity Card */}
              <div className="flex-1 min-h-[300px]">
                <RecentActivityCard />
              </div>
              
              {/* AI Improvements Card */}
              <TrendOverviewCard />
            </div>
          </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
}