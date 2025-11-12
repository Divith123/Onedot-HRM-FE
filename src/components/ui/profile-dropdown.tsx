"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Building2, User } from 'lucide-react'
import authService from '@/services/auth.service'

interface ProfileDropdownProps {
  className?: string
}

export function ProfileDropdown({ className }: ProfileDropdownProps) {
  const router = useRouter()
  const user = authService.getStoredUser()

  if (!user) {
    return null
  }

  // Get user initials for avatar fallback
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleOrganizationClick = () => {
    router.push('/organization') // Navigate to organization setup page
  }

  const handleProfileClick = () => {
    router.push('/profile') // Navigate to profile page
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={`h-14 w-14 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200 ring-2 ring-transparent hover:ring-slate-200 ${className}`}>
          <AvatarImage
            src={user.profilePictureUrl}
            alt={user.fullName}
          />
          <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-semibold text-base">
            {getInitials(user.fullName)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 p-0 shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden"
        sideOffset={8}
      >
        <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <p className="text-sm font-semibold text-slate-900">{user.fullName}</p>
          <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
        </div>
        <DropdownMenuSeparator className="bg-slate-100" />
        <div className="py-2">
          <DropdownMenuItem 
            onClick={handleOrganizationClick}
            className="mx-2 rounded-lg px-3 py-2.5 hover:bg-slate-50 focus:bg-slate-50 transition-colors duration-150"
          >
            <Building2 className="mr-3 h-4 w-4 text-slate-600" />
            <span className="text-slate-700 font-medium">Organization</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleProfileClick}
            className="mx-2 rounded-lg px-3 py-2.5 hover:bg-slate-50 focus:bg-slate-50 transition-colors duration-150"
          >
            <User className="mr-3 h-4 w-4 text-slate-600" />
            <span className="text-slate-700 font-medium">Profile</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}