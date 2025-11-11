'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';
import Sidebar from '@/components/pages/common/Sidebar';
import { Navbar } from '@/components/ui/navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RotateCcw, Check, RefreshCw } from 'lucide-react';

export default function OrganizationPage() {
  const router = useRouter();
  const [organizationName, setOrganizationName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [organizationType, setOrganizationType] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [aiAgentAddon, setAiAgentAddon] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaRotation, setCaptchaRotation] = useState(0);
  const [showAnimatedTick, setShowAnimatedTick] = useState(false);

  // Generate random captcha text
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Initialize captcha on component mount
  React.useEffect(() => {
    setCaptchaText(generateCaptcha());
    setCaptchaRotation(Math.random() * 10 - 5); // Fixed rotation for consistency
  }, []);

  // Regenerate captcha
  const regenerateCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCaptchaRotation(Math.random() * 10 - 5);
    setUserCaptchaInput('');
    setIsCaptchaVerified(false);
    setShowAnimatedTick(false);
  };

  // Verify captcha input
  const verifyCaptcha = (inputValue: string) => {
    const isCorrect = inputValue.toLowerCase() === captchaText.toLowerCase();
    setIsCaptchaVerified(isCorrect);
    
    if (isCorrect) {
      setShowAnimatedTick(true);
      // Hide the tick after animation
      setTimeout(() => setShowAnimatedTick(false), 2000);
    } else {
      setShowAnimatedTick(false);
      // Regenerate captcha on failed attempt
      setTimeout(() => {
        regenerateCaptcha();
      }, 1000);
    }
    
    return isCorrect;
  };

  // Handle captcha input change
  const handleCaptchaInputChange = (value: string) => {
    setUserCaptchaInput(value);
    
    // Auto-verify when input length matches captcha length
    if (value.length === captchaText.length) {
      // Use setTimeout to ensure state has updated
      setTimeout(() => {
        verifyCaptcha(value);
      }, 100);
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

  return (
    <ProtectedLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar />

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
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal" className="text-sm text-gray-700">
                      My personal account
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6 mb-3">
                    I.e., Johndee (John Dee)
                  </p>

                  <div className="flex items-center space-x-2 mb-3">
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

              {/* Verify Account */}
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
                      : "Please type the characters you see below to verify you're human"
                    }
                  </p>

                  {/* Captcha Display */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full max-w-xs">
                      {isCaptchaVerified ? (
                        /* Success State - Like Google reCAPTCHA */
                        <div className="bg-green-50 border-2 border-green-300 rounded-lg px-4 py-3 text-center cursor-not-allowed">
                          <div className="flex items-center justify-center space-x-2">
                            <Check className="w-5 h-5 text-green-600" />
                            <span className="text-green-700 font-medium text-sm">Verified</span>
                          </div>
                        </div>
                      ) : (
                        /* Captcha Input State */
                        <>
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg px-6 py-3 text-center">
                            <span
                              className="text-2xl font-bold tracking-wider text-blue-800 select-none"
                              style={{
                                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                                transform: `rotate(${captchaRotation}deg)`,
                                fontFamily: 'monospace'
                              }}
                            >
                              {captchaText}
                            </span>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={regenerateCaptcha}
                            className="absolute -right-2 -top-2 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-50"
                          >
                            <RefreshCw className="w-4 h-4 text-gray-600" />
                          </Button>
                        </>
                      )}

                      {/* Animated Tick Overlay for initial verification */}
                      {showAnimatedTick && !isCaptchaVerified && (
                        <div className="absolute inset-0 flex items-center justify-center bg-green-500/95 rounded-lg animate-in fade-in-0 zoom-in-95 duration-300">
                          <div className="bg-white rounded-full p-2 animate-bounce">
                            <Check className="w-6 h-6 text-green-600" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Captcha Input - Only show when not verified */}
                    {!isCaptchaVerified && (
                      <div className="w-full max-w-xs">
                        <Input
                          type="text"
                          placeholder="Type the characters above"
                          value={userCaptchaInput}
                          onChange={(e) => handleCaptchaInputChange(e.target.value)}
                          className={`text-center font-mono text-lg ${
                            userCaptchaInput && userCaptchaInput.length === captchaText.length
                              ? isCaptchaVerified
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : ''
                          }`}
                          maxLength={captchaText.length}
                        />
                        {userCaptchaInput && userCaptchaInput.length === captchaText.length && (
                          <p className={`text-xs mt-1 text-center font-medium ${
                            isCaptchaVerified ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isCaptchaVerified ? (
                              <span className="flex items-center justify-center space-x-1">
                                <Check className="w-3 h-3" />
                                <span>Verification successful!</span>
                              </span>
                            ) : (
                              '✗ Incorrect characters, try again'
                            )}
                          </p>
                        )}

                        {/* Manual Verify Button */}
                        <Button
                          onClick={() => verifyCaptcha(userCaptchaInput)}
                          disabled={!userCaptchaInput || userCaptchaInput.length !== captchaText.length}
                          variant="outline"
                          size="sm"
                          className="mt-2 w-full"
                        >
                          Verify
                        </Button>
                      </div>
                    )}
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
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg"
                >
                  NEXT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}