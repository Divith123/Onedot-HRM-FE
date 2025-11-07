'use client';

import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  );
};

export default DashboardLayout;
