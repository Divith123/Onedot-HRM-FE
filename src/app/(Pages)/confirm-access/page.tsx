'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';
import Sidebar from '@/components/pages/common/Sidebar';
import { Navbar } from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { Mail, Smartphone, AlertCircle, Shield } from 'lucide-react';

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
  const [user, setUser] = useState<User | null>(null);
  const [organizationData, setOrganizationData] = useState<OrganizationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'gmail' | 'password' | null>(null);

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

  const handlePasswordAuth = async () => {
    setIsLoading(true);
    setAuthMethod('password');

    // Simulate password verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would verify password with backend
    console.log('Password authentication completed');

    // Complete the organization setup
    completeSetup();
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

  if (!user || !organizationData) {
    return (
      <ProtectedLayout>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
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
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar />

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
    </ProtectedLayout>
  );
}