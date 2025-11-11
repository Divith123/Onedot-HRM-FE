"use client"

import React from 'react'
import { ProfileDropdown } from '@/components/ui/profile-dropdown'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav className={`bg-white border-b border-gray-200 px-6 py-3 flex justify-end ${className}`}>
      <ProfileDropdown />
    </nav>
  )
}