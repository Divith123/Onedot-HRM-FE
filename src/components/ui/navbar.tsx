"use client"

import React from 'react'
import { ProfileDropdown } from '@/components/ui/profile-dropdown'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav className={`bg-[#fafbfc] px-6 py-4 flex justify-end ${className}`}>
      <ProfileDropdown />
    </nav>
  )
}