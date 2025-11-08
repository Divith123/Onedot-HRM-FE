'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  section?: string;
  isActive?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('dashboard');

  const sidebarSections: SidebarSection[] = [
    {
      title: '',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: '/icons/dashboard.svg',
          href: '/dashboard',
          isActive: true,
        },
        {
          id: 'jobs',
          label: 'Jobs',
          icon: '/icons/jobs.svg',
          href: '/jobs',
        },
        {
          id: 'internships',
          label: 'Internships',
          icon: '/icons/internships.svg',
          href: '/internships',
        },
        {
          id: 'applied-jobs',
          label: 'Applied Jobs',
          icon: '/icons/appliedjobs.svg',
          href: '/applied-jobs',
        },
        {
          id: 'saved-jobs',
          label: 'Saved Jobs',
          icon: '/icons/savedjobs.svg',
          href: '/saved-jobs',
        },
      ],
    },
    {
      title: 'RECRUITMENT',
      items: [
        {
          id: 'shortlisted',
          label: 'Shortlisted',
          icon: '/icons/shortlisted.svg',
          href: '/shortlisted',
        },
        {
          id: 'assessments',
          label: 'Assesments',
          icon: '/icons/assesments.svg',
          href: '/assessments',
        },
        {
          id: 'interviews',
          label: 'Interviews',
          icon: '/icons/interviews.svg',
          href: '/interviews',
        },
        {
          id: 'onboarding',
          label: 'Onboarding',
          icon: '/icons/onboarding.svg',
          href: '/onboarding',
        },
      ],
    },
    {
      title: 'ORGANIZATION',
      items: [
        {
          id: 'profile',
          label: 'Profile',
          icon: '/icons/profile.svg',
          href: '/profile',
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: '/icons/settings.svg',
          href: '/settings',
        },
        {
          id: 'chats',
          label: 'Chats',
          icon: '/icons/chats.svg',
          href: '/chats',
        },
      ],
    },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  const SidebarItem: React.FC<{
    item: SidebarItem;
    isActive: boolean;
  }> = ({ item, isActive }) => {
    const baseStyles =
      'flex items-center gap-4 px-5 py-3 rounded-md transition-all duration-200 text-sm font-medium';
    const activeStyles = isActive
      ? 'text-[#03a9f5] bg-[#e1f6ff]'
      : 'text-[#21252b] hover:bg-gray-100';

    return (
      <Link href={item.href || '#'}>
        <button
          onClick={() => handleItemClick(item.id)}
          className={`${baseStyles} ${activeStyles} w-full text-left`}
        >
          <img
            src={item.icon}
            alt={item.label}
            className="w-5 h-5 shrink-0"
          />
          <span>{item.label}</span>
        </button>
      </Link>
    );
  };

  const SidebarSection: React.FC<{ section: SidebarSection }> = ({ section }) => (
    <div className="space-y-3">
      {section.title && (
        <div className="px-5 py-3">
          <h3 className="text-xs font-bold text-[#21252b] uppercase tracking-wider opacity-70">
            {section.title}
          </h3>
        </div>
      )}
      <div className="space-y-3 px-3">
        {section.items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
          />
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-71 bg-white flex flex-col h-screen">
      {/* Fixed Logo Section */}
      <div className="shrink-0 px-8 py-7 border-b border-gray-100">
        <Image
          src="/onedot-large.svg"
          alt="Onedot Logo"
          width={100}
          height={20}
          priority
        />
      </div>

      {/* Scrollable Navigation Section */}
      <nav className="flex-1 overflow-y-auto custom-sidebar-scrollbar py-6 space-y-2">
        {sidebarSections.map((section, idx) => (
          <SidebarSection key={idx} section={section} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
