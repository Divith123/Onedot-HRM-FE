'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageTransition from '@/components/animations/PageTransition';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';

export default function OrgPreferencePage() {
  const router = useRouter();
  const [selectedWorkType, setSelectedWorkType] = useState<string>('');

  const workTypes = [
    'Software Development',
    'Marketing',
    'Design',
    'Sales',
    'Ed Tech',
    'Medical',
    'Finance',
    'Consulting',
    'Manufacturing',
    'Retail',
    'Legal',
    'Other'
  ];

  return (
    <ProtectedLayout>
      <PageTransition>
      <div className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {/* Logo */}
        <div className="absolute w-[100px] h-5 left-7 top-7">
          <Image
            src="/onedot-large.svg"
            alt="Onedot Logo"
            width={100}
            height={20}
            priority
          />
        </div>

        {/* Avatar */}
        <div className="absolute top-7 right-7">
          <Avatar className="w-10 h-10 shadow-md">
            <AvatarImage src="/onedot.png" alt="User Avatar" />
            <AvatarFallback className="bg-blue-500 text-white text-xs">JD</AvatarFallback>
          </Avatar>
        </div>

        {/* Main Content Container */}
        <div className="flex flex-col items-center justify-center space-y-6 max-w-4xl w-full px-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="text-[#171923] text-center font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: '700', lineHeight: '100%' }}>
              What kind of work do you do?
            </div>
            <div className="text-black text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: '500', lineHeight: '100%' }}>
              This helps us suggest templates that help your team do their best work.
            </div>
          </div>

          {/* Work Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
            {workTypes.map((workType, index) => (
              <button
                key={workType}
                onClick={() => setSelectedWorkType(workType)}
                className={`w-full p-4 bg-white border rounded-lg text-left transition-all duration-200 hover:border-[#03A9F5] hover:shadow-md ${
                  selectedWorkType === workType
                    ? 'border-[#03A9F5] bg-blue-50 shadow-md'
                    : 'border-[#D9D9D9]'
                }`}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '100%',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {workType}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between w-full max-w-md pt-8">
            <button
              onClick={() => router.push('/basic-details')}
              style={{
                padding: '6px 12px',
                background: 'none',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontFamily: 'Montserrat',
                fontWeight: 500,
                fontSize: '16px',
                color: '#1D1B20',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>

            <button
              onClick={() => router.push('/finish-setup')}
              disabled={!selectedWorkType}
              style={{
                padding: '6px 12px',
                background: 'none',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: selectedWorkType ? 'pointer' : 'not-allowed',
                fontFamily: 'Montserrat',
                fontWeight: 500,
                fontSize: '16px',
                color: selectedWorkType ? '#1D1B20' : '#9CA3AF',
                transition: 'background 0.2s',
                opacity: selectedWorkType ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                if (selectedWorkType) e.currentTarget.style.background = '#F3F4F6';
              }}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              Next
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
    </ProtectedLayout>
  );
}