"use client"

import React from 'react'
import { ProfileDropdown } from '@/components/ui/profile-dropdown'
import authService from '@/services/auth.service'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const user = authService.getStoredUser()

  return (
    <nav className={`bg-[#fafbfc] px-11 py-8 flex items-center justify-between ${className}`}>
      {/* Welcome Message */}
      {user && (
        <div className="flex items-baseline gap-3">
          <span 
            className="text-3xl text-slate-600 font-normal tracking-tight leading-none"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
          >
            Welcome,
          </span>
          <span 
            className="text-4xl font-bold text-[#03A9F5] tracking-tight leading-none" 
            style={{ 
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            {user.fullName}
          </span>
        </div>
      )}

      {/* Profile Dropdown */}
      <ProfileDropdown />
    </nav>
  )
}