'use client';

import React, { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  CheckSquare,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Bell,
  User,
  Menu,
  X,
} from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems?: Array<{ label: string; href: string }>;
}

// Create context for sidebar state
const SidebarContext = createContext<{ isOpen: boolean } | null>(null);
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

const Sidebar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      href: '/dashboard',
    },
    {
      label: 'Jobs',
      icon: <Briefcase size={20} />,
      href: '/jobs',
    },
    {
      label: 'Internships',
      icon: <Users size={20} />,
      href: '/internships',
    },
    {
      label: 'Applied Jobs',
      icon: <CheckSquare size={20} />,
      href: '/applied-jobs',
    },
    {
      label: 'Saved Jobs',
      icon: <FileText size={20} />,
      href: '/saved-jobs',
    },
  ];

  const recruitmentItems: MenuItem[] = [
    {
      label: 'Shortlisted',
      icon: <FileText size={20} />,
      href: '/shortlisted',
    },
    {
      label: 'Assessments',
      icon: <CheckSquare size={20} />,
      href: '/assessments',
    },
    {
      label: 'Interviews',
      icon: <MessageSquare size={20} />,
      href: '/interviews',
    },
    {
      label: 'Onboarding',
      icon: <Users size={20} />,
      href: '/onboarding',
    },
  ];

  const organizationItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: <User size={20} />,
      href: '/profile',
    },
    {
      label: 'Chats',
      icon: <MessageSquare size={20} />,
      href: '/chats',
    },
    {
      label: 'Settings',
      icon: <Settings size={20} />,
      href: '/settings',
    },
  ];

  const handleLogout = () => {
    router.push('/signin');
  };

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <SidebarContext.Provider value={{ isOpen }}>
      <div className="flex h-screen bg-gray-50 flex-col lg:flex-row">
        {/* Mobile Menu Toggle */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:hidden z-40">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <img src="/onedot.svg" alt="OneDot" className="h-6 w-auto ml-4" />
        </div>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30 top-16"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:relative left-0 top-0 h-full lg:h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 flex flex-col overflow-y-visible ${
            isOpen ? 'w-64' : 'w-20'
          } pt-2 ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
          style={{
            marginTop: 'env(safe-area-inset-top)',
          }}
        >
          {/* Logo Section (clickable toggle) - large centered at top when open */}
          <div className="flex items-center justify-start mb-4 px-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              className="flex items-center justify-center rounded-full transition-transform hover:scale-105"
              style={{ background: 'transparent', border: 'none', padding: 0 }}
            >
              <div
                style={{
                  width: isOpen ? 96 : 44,
                  height: isOpen ? 96 : 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src="/onedot.svg"
                  alt="OneDot"
                  style={{ width: isOpen ? 80 : 36, height: 'auto', display: 'block' }}
                />
              </div>
            </button>
          </div>

          {/* Main Menu */}
          <nav className={`${isOpen ? 'flex-1' : 'flex-none'} px-3 space-y-1 overflow-y-visible`}>
            {/* Main Items */}
            <div className="space-y-0.5 pb-4 border-b border-gray-200">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    title={!isOpen ? item.label : ''}
                  >
                    <span className={`shrink-0 ${isActive(item.href) ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    {isOpen && <span className="text-xs font-medium whitespace-nowrap truncate">{item.label}</span>}
                  </div>
                </Link>
              ))}
            </div>

            {/* Recruitment Section */}
            <div className="pt-3 pb-4 border-b border-gray-200">
              {isOpen && (
                <h3 className="px-3 py-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  RECRUITMENT
                </h3>
              )}
              {recruitmentItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    title={!isOpen ? item.label : ''}
                  >
                    <span className={`shrink-0 ${isActive(item.href) ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    {isOpen && <span className="text-xs font-medium whitespace-nowrap truncate">{item.label}</span>}
                  </div>
                </Link>
              ))}
            </div>

            {/* Organization Section */}
            <div className="pt-3 pb-4 border-b border-gray-200">
              {isOpen && (
                <h3 className="px-3 py-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                  ORGANIZATION
                </h3>
              )}
              {organizationItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    title={!isOpen ? item.label : ''}
                  >
                    <span className={`shrink-0 ${isActive(item.href) ? 'text-blue-600' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>
                    {isOpen && <span className="text-xs font-medium whitespace-nowrap truncate">{item.label}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          {/* Support Badge (keeps user help at bottom) */}
          <div className="px-3 pt-4 pb-3 border-t border-gray-200">
            {isOpen ? (
              <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg p-3 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                    {/* small icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#FFFFFF" opacity="0.08" />
                      <path d="M11 17h2v-2h-2v2zm0-4h2V7h-2v6z" fill="#FFFFFF" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Need help?</p>
                    <p className="text-xs text-blue-100 mt-1">Please contact our agent</p>
                    <button className="mt-3 bg-white text-blue-600 text-xs font-medium px-3 py-1 rounded-lg">Contact Support</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 17h2v-2h-2v2zm0-4h2V7h-2v6z" fill="#fff" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* (bottom area reserved for support only) */}
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 lg:mt-0 mt-16 w-full overflow-hidden">
          {/* Top Navbar */}
          <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 shrink-0">
            {/* Left Side - Empty or additional elements */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Breadcrumb or title can go here */}
            </div>

            {/* Right Side - Notification and Profile */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Notification Bell */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Avatar/Dropdown */}
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all">
                <div className="w-8 h-8 bg-linear-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">H</span>
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700">Harlee</span>
              </button>
            </div>
          </nav>

          {/* Main Content - Scrollable */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 md:p-8 max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
