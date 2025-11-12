"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Building2, User, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import authService from '@/services/auth.service'

interface ProfileDropdownProps {
  className?: string
}

export function ProfileDropdown({ className }: ProfileDropdownProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { user: authUser } = useAuth()

  // Use NextAuth session first, fallback to AuthContext
  const sessionUser = session?.user
  const user = sessionUser || authUser

  if (!user) {
    return null
  }

  // Get display values with fallbacks
  const displayName = sessionUser?.name || authUser?.fullName || 'User'
  const displayEmail = sessionUser?.email || authUser?.email || ''
  const profilePictureUrl = authUser?.profilePictureUrl

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleOrganizationClick = () => {
    router.push('/organization')
  }

  const handleProfileClick = () => {
    router.push('/profile')
  }

  const handleLogout = async () => {
    // Clear both NextAuth and local storage
    await authService.logout()
    await signOut({ callbackUrl: '/signin' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={`h-14 w-14 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200 ring-2 ring-transparent hover:ring-slate-200 ${className}`}>
          {profilePictureUrl && (
            <AvatarImage src={profilePictureUrl} alt={displayName} />
          )}
          <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-semibold text-base">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 p-0 shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-xl overflow-hidden"
        sideOffset={8}
      >
        <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <p className="text-sm font-semibold text-slate-900">{displayName}</p>
          <p className="text-xs text-slate-500 mt-0.5">{displayEmail}</p>
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
          <DropdownMenuSeparator className="bg-slate-100 mx-2" />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="mx-2 rounded-lg px-3 py-2.5 hover:bg-red-50 focus:bg-red-50 transition-colors duration-150"
          >
            <LogOut className="mr-3 h-4 w-4 text-red-600" />
            <span className="text-red-700 font-medium">Logout</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}