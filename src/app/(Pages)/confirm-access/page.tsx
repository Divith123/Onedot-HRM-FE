'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Smartphone, AlertCircle, Shield, Eye, EyeOff, CheckCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/components/providers/ToastProvider';
import authService from '@/services/auth.service';

interface User {
  id: number;
  email: string;
  fullName: string;
  profilePictureUrl?: string;
  oAuthProvider?: string;
}

interface OrganizationData {
  organizationName: string;
  contactEmail: string;
  organizationType: string;
  aiAgentAddon: boolean;
  members?: any[];
  step: string;
}

export default function ConfirmAccessPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [organizationData, setOrganizationData] = useState<OrganizationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'gmail' | 'password' | null>(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Load user and organization data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const orgData = localStorage.getItem('organizationSetup');

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/signin');
        return;
      }
    } else {
      router.push('/signin');
      return;
    }

    if (orgData) {
      try {
        const parsedOrgData = JSON.parse(orgData);
        setOrganizationData(parsedOrgData);
      } catch (error) {
        console.error('Error parsing organization data:', error);
        router.push('/organization');
        return;
      }
    } else {
      router.push('/organization');
      return;
    }
  }, [router]);

  // Get username from email (before @)
  const getUsername = (email: string) => {
    return email.split('@')[0];
  };

  const handleGmailApproval = async () => {
    setIsLoading(true);
    setAuthMethod('gmail');

    // Simulate Gmail approval process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, this would verify with backend
    console.log('Gmail approval completed');

    // Complete the organization setup
    completeSetup();
  };

  const handlePasswordAuth = () => {
    // Open password dialog instead of directly authenticating
    setAuthMethod('password');
    setShowPasswordDialog(true);
  };

  const handlePasswordVerification = async () => {
    if (!password) {
      showToast({ variant: 'error', message: 'Please enter your password' });
      return;
    }

    if (!user) {
      showToast({ variant: 'error', message: 'User information not found' });
      return;
    }

    setIsVerifying(true);

    try {
      // Verify password with backend using authService
      const response = await authService.signin({
        email: user.email,
        password: password,
      });

      if (response.success && response.token) {
        // Password is correct - create NextAuth session
        const sessionResult = await signIn("credentials", {
          email: user.email,
          token: response.token,
          refreshToken: response.refreshToken,
          tokenExpiry: response.tokenExpiry,
          user: JSON.stringify(response.user),
          redirect: false,
        });

        setIsVerifying(false);
        setShowPasswordDialog(false);
        setPassword('');
        
        if (sessionResult?.ok) {
          // Show success announcement
          setShowSuccessDialog(true);
          
          // Complete setup after showing success
          setTimeout(() => {
            completeSetup();
          }, 2000);
        } else {
          showToast({ variant: 'error', message: 'Failed to create session. Please try again.' });
        }
      } else {
        setIsVerifying(false);
        showToast({ variant: 'error', message: 'Invalid password. Please try again.' });
      }
    } catch (error: any) {
      setIsVerifying(false);
      const errorMsg = error?.response?.data?.message || 'Invalid password. Please try again.';
      showToast({ variant: 'error', message: errorMsg });
    }
  };

  const completeSetup = () => {
    // Get final organization data
    const finalOrganizationData = localStorage.getItem('organizationSetup');

    if (finalOrganizationData) {
      const orgData = JSON.parse(finalOrganizationData);
      console.log('Organization setup completed with authentication:', {
        ...orgData,
        authenticatedAt: new Date().toISOString(),
        authMethod: authMethod
      });
    }

    // Clear organization setup data
    localStorage.removeItem('organizationSetup');

    // Set sudo mode timestamp (would normally be set by backend)
    localStorage.setItem('sudoModeExpiry', (Date.now() + 4 * 60 * 60 * 1000).toString()); // 4 hours

    // Navigate to dashboard
    router.push('/dashboard');
  };

  const handleLogoClick = () => {
    setShowExitDialog(true);
  };

  const handleExitConfirm = () => {
    setShowExitDialog(false);
    router.push('/dashboard');
  };

  if (!user || !organizationData) {
    return (
      <ProtectedLayout>
        <div className="flex h-screen bg-gray-50">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Main Content - Full Width without Sidebar */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Logo Header - Replaces Navbar */}
          <div className="shrink-0 px-8 py-6 bg-gray-50">
            <div 
              className="cursor-pointer inline-block hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <Image
                src="/onedot.svg"
                alt="Onedot Logo"
                width={140}
                height={32}
                priority
              />
            </div>
          </div>

          {/* Confirm Access Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Confirm access
                </h1>
                <p className="text-sm text-gray-600">
                  Signed in as @{getUsername(user.email)}
                </p>
              </div>

              {/* Authentication Options */}
              <div className="space-y-4">
                {/* Gmail Approval */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-700 mb-2">
                      When your phone is ready, click the button below.
                    </p>
                    <div className="flex justify-center mb-4">
                      <Smartphone className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>

                  <Button
                    onClick={handleGmailApproval}
                    disabled={isLoading}
                    className="w-full bg-red-500 hover:bg-red-600 text-white mb-3 flex items-center justify-center space-x-2"
                  >
                    {isLoading && authMethod === 'gmail' ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    <span>Approve in Gmail</span>
                  </Button>

                  <div className="text-center">
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Having Problem?
                    </a>
                  </div>
                </div>

                {/* Password Authentication */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Button
                    onClick={handlePasswordAuth}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    {isLoading && authMethod === 'password' ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    ) : (
                      <Shield className="w-4 h-4" />
                    )}
                    <span>Use Your Password</span>
                  </Button>
                </div>
              </div>

              {/* Sudo Mode Info */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <strong>Tip:</strong> You are entering sudo mode. After you've performed a sudo-protected action, you'll only be asked to re-authenticate again after a few hours of inactivity.
                  </div>
                </div>
              </div>

              {/* Loading States */}
              {isLoading && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    <span>
                      {authMethod === 'gmail'
                        ? 'Waiting for Gmail approval...'
                        : 'Verifying password...'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password Verification Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify your password</DialogTitle>
            <DialogDescription>
              Enter password for <strong>{user?.email}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isVerifying) {
                    handlePasswordVerification();
                  }
                }}
                className="pr-10"
                disabled={isVerifying}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isVerifying}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordDialog(false);
                setPassword('');
                setShowPassword(false);
              }}
              disabled={isVerifying}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePasswordVerification}
              disabled={isVerifying || !password}
              className="bg-[#03A9F5] hover:bg-[#0288D1]"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <DialogTitle className="text-center text-2xl">
                Organization Created!
              </DialogTitle>
              <DialogDescription className="text-center">
                Your organization <strong>{organizationData?.organizationName}</strong> has been successfully created. Redirecting to dashboard...
              </DialogDescription>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Exit Warning Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave organization setup?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be saved, but you'll need to complete the setup process later to access all features. Are you sure you want to leave?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay on this page</AlertDialogCancel>
            <AlertDialogAction onClick={handleExitConfirm} className="bg-[#03A9F5] hover:bg-[#0288D1]">
              Leave setup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ProtectedLayout>
  );
}