'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
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

export default function OrganizationPage() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [organizationName, setOrganizationName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [organizationType, setOrganizationType] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [aiAgentAddon, setAiAgentAddon] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Handle reCAPTCHA verification
  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  const handleNext = () => {
    // Save organization data to localStorage for persistence
    const organizationData = {
      organizationName,
      contactEmail,
      organizationType,
      aiAgentAddon,
      createdAt: new Date().toISOString(),
      step: 'organization-created'
    };

    localStorage.setItem('organizationSetup', JSON.stringify(organizationData));

    // Navigate to add members page
    router.push('/add-members');
  };

  const handleLogoClick = () => {
    setShowExitDialog(true);
  };

  const handleExitConfirm = () => {
    setShowExitDialog(false);
    router.push('/dashboard');
  };

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

          {/* Organization Setup Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Tell us about your organization
                </h1>
                <h2 className="text-xl font-semibold text-gray-700">
                  Set up your Organization
                </h2>
              </div>

              {/* Organization Name */}
              <div className="mb-6">
                <Label htmlFor="orgName" className="text-sm font-medium text-gray-700 mb-2 block">
                  Organization Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="orgName"
                  type="text"
                  placeholder="Enter organization name"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-1">
                  This will be the name of your account on Onedot.
                </p>
                <p className="text-sm text-gray-600">
                  Your URL will be: https://onedot.tech/
                </p>
              </div>

              {/* Contact Email */}
              <div className="mb-6">
                <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700 mb-2 block">
                  Contact email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="Enter contact email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Organization Type */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700 mb-4 block">
                  This organization belongs to: <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={organizationType} onValueChange={setOrganizationType}>
                  <div className="flex items-center space-x-2 -mb-1">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal" className="text-sm text-gray-700">
                      My personal account
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6 mb-1">
                    I.e., Johndee (John Dee)
                  </p>

                  <div className="flex items-center space-x-2 -mb-1">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business" className="text-sm text-gray-700">
                      A Business or Institution
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    For example: Onedot, Inc., Example Institute, American Red Cross
                  </p>
                </RadioGroup>
              </div>

              {/* Verify Account with reCAPTCHA */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700 mb-4 block">
                  Verify your account <span className="text-red-500">*</span>
                  {isCaptchaVerified && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </Label>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    {isCaptchaVerified 
                      ? "Verification complete! You can now proceed with your organization setup."
                      : "Please verify you're human by completing the reCAPTCHA below"
                    }
                  </p>

                  {/* Google reCAPTCHA */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LckigosAAAAABf-pV0XnaMDWFTCkQajpm7U4Z0X"}
                      onChange={handleRecaptchaChange}
                      theme="light"
                    />
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700 mb-4 block">
                  Add-ons <span className="text-red-500">*</span>
                </Label>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="aiAgent"
                      checked={aiAgentAddon}
                      onCheckedChange={(checked) => setAiAgentAddon(checked === true)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="aiAgent" className="text-sm font-medium text-gray-900 cursor-pointer">
                        Get AI Agent Business in this organization
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Boost developer productivity for $19/user/month. Pay only for assigned seats after setup.
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Boost developer productivity for $19/user/month. Pay only for assigned seats after setup.
                      </p>
                      <a
                        href="#"
                        className="text-sm text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                      >
                        See Onedot Business docs
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Acceptance */}
              <div className="mb-8">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    className="mt-1 flex-shrink-0"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                    I hereby accept the <a href="#" className="text-blue-600 hover:text-blue-800 underline">Terms of Service</a>. For more information about Onedot's privacy practices, see the <a href="#" className="text-blue-600 hover:text-blue-800 underline">OneDot Privacy Statement</a>.
                  </label>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <Button
                  onClick={handleNext}
                  disabled={!organizationName || !contactEmail || !organizationType || !isCaptchaVerified || !acceptTerms}
                  className="bg-[#03A9F5] hover:bg-[#0288D1] text-white px-8 py-2 rounded-lg font-semibold text-lg"
                >
                  NEXT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

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