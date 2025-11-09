'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';
import PageTransition from '@/components/animations/PageTransition';

export default function SetupPage() {
  const router = useRouter();

  return (
    <ProtectedLayout>
      <PageTransition>
        <div className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="absolute w-[100px] h-5 left-7 top-7">
        <Image
          src="/onedot-large.svg"
          alt="Onedot Logo"
          width={100}
          height={20}
          priority
        />
      </div>

      {/* Main Content Container - Centered vertically and horizontally */}
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Header */}
        <div className="text-[#171923] text-center font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: '700', lineHeight: '100%' }}>
          Setup Organisation
        </div>

        {/* Welcome Text */}
        <div className="text-black text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: '500', lineHeight: '100%' }}>
          Welcome to OneDot HRM ! Let's get you set up.
        </div>

        {/* Primary Button */}
        <button
          className="flex flex-row justify-center items-center px-4 py-2 gap-2 w-60 h-12 min-h-9 bg-[#03A9F5] rounded-lg text-[#FAFAFA] font-bold transition-all duration-200 ease-in-out hover:shadow-lg hover:bg-[#0288D1] active:bg-[#0277BD]"
          onClick={() => router.push('/basic-details')}
          style={{ 
            fontFamily: 'Montserrat, sans-serif', 
            fontSize: '14px', 
            fontWeight: '700', 
            lineHeight: '150%', 
            letterSpacing: '0.005em', 
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer'
          }}
        >
          Create an Organisation
        </button>

        {/* Secondary Button */}
        <button
          className="flex flex-row justify-center items-center px-4 py-2 gap-2 w-[238px] h-8 min-h-9 bg-white/10 border border-[#03A9F5] rounded-lg text-[#0A0A0A] font-bold transition-all duration-200 ease-in-out"
          onClick={() => console.log('Secondary button clicked')}
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: '700', lineHeight: '150%', letterSpacing: '0.005em', boxShadow: '0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)' }}
        >
          Join Existing Organisation
        </button>

        {/* Input Chip */}
        <div
          className="flex flex-row justify-center items-center border border-[#CAC4D0] rounded-lg cursor-pointer bg-transparent overflow-hidden"
          onClick={() => console.log('Chip clicked')}
          style={{ height: '28px' }}
        >
          <div className="px-3 py-1 flex flex-row justify-center items-center gap-2">
            <div className="text-[#49454F] font-medium" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: '500', lineHeight: '20px', letterSpacing: '0.1px' }}>
              Dashboard →
            </div>
          </div>
        </div>
      </div>
      </div>
    </PageTransition>
    </ProtectedLayout>
  );
}
