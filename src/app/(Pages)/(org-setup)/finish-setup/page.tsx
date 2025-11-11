'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageTransition from '@/components/animations/PageTransition';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion } from "motion/react";
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';

export default function FinishSetupPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/dashboard');
    }
  }, [countdown, router]);

  return (
    <ProtectedLayout>
      <PageTransition>
      <div className="relative w-full min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {/* Logo */}
        <div className="absolute w-[140px] h-8 left-7 top-7">
          <Image
            src="/onedot.svg"
            alt="Onedot Logo"
            width={140}
            height={32}
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

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center pl-24 pr-8">
          <div className="max-w-6xl w-full flex items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 max-w-lg space-y-6">
              <div
                className="text-[#171923] font-bold leading-tight"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '28px',
                  fontWeight: '700',
                  lineHeight: '100%'
                }}
              >
                Welcome, OneDot! Improve your Organisation
              </div>
              <div
                className="text-black leading-relaxed"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  fontWeight: '500',
                  lineHeight: '150%'
                }}
              >
                Your control center for tracking progress, managing workforce tasks, and keeping your HR operations running smoothly.
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center w-full max-w-md pt-8">
                <div className="relative flex flex-col items-center gap-6 pointer-events-none">
                  {/* Creative Loading Animation */}
                  <div className="relative">
                    {/* Outer rotating ring */}
                    <motion.div
                      className="w-24 h-24 border-4 border-[#03A9F5]/20 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Inner pulsing ring */}
                      <motion.div
                        className="absolute inset-2 border-2 border-[#03A9F5] rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#03A9F5] rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          marginLeft: '-4px',
                          marginTop: '-4px',
                        }}
                        animate={{
                          x: Math.cos((i * 60 * Math.PI) / 180) * 40,
                          y: Math.sin((i * 60 * Math.PI) / 180) * 40,
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    {/* Center countdown */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      key={countdown}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-4xl font-bold text-[#03A9F5] drop-shadow-sm">
                        {countdown}
                      </div>
                    </motion.div>
                  </div>

                  {/* Loading text with typing effect */}
                  <div className="text-center space-y-2">
                    <motion.div
                      className="text-black text-lg font-medium"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Redirecting to dashboard
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        ...
                      </motion.span>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-linear-to-r from-[#03A9F5] to-[#0288D1] rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((3 - countdown) / 3) * 100}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </div>

                    {/* Subtle hint text */}
                    <motion.p
                      className="text-sm text-gray-500"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Setting up your workspace...
                    </motion.p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-[#03A9F5]/30 rounded-full animate-ping" />
                  <div className="absolute -bottom-4 -right-4 w-6 h-6 border-2 border-[#03A9F5]/20 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="flex-1 flex justify-center">
              <div className="w-[570px] h-[416px] relative">
                <Image
                  src="/organisation/fina-setup-board.svg"
                  alt="HR Dashboard Illustration"
                  width={570}
                  height={416}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
    </ProtectedLayout>
  );
}
