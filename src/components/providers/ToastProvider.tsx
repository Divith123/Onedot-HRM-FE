'use client'

import React, { createContext, useContext, useRef, ReactNode } from 'react';
import Toaster, { ToasterRef } from '@/components/ui/toast';

interface ToastContextType {
  showToast: ToasterRef['show'];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const toasterRef = useRef<ToasterRef>(null);

  const showToast = (props: Parameters<ToasterRef['show']>[0]) => {
    toasterRef.current?.show(props);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster ref={toasterRef} defaultPosition="top-right" />
    </ToastContext.Provider>
  );
};