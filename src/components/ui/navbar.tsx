"use client"

import React from 'react'
import { ProfileDropdown } from '@/components/ui/profile-dropdown'
import { useSession } from 'next-auth/react'
import { useAuth } from '@/contexts/AuthContext'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const { data: session } = useSession()
  const { user: authUser } = useAuth()

  // Use NextAuth session first, fallback to AuthContext
  const user = session?.user || authUser
  const displayName = session?.user?.name || authUser?.fullName || 'User'

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
            {displayName}
          </span>
        </div>
      )}

      {/* Profile Dropdown */}
      <ProfileDropdown />
    </nav>
  )
}