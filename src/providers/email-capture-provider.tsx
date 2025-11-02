'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { InterestType } from '@/components/EmailCaptureModal';

interface EmailCaptureModalState {
  isOpen: boolean;
  interestType: InterestType;
  title: string;
  description: string;
  ctaText: string;
}

interface EmailCaptureContextType {
  modalState: EmailCaptureModalState;
  openDownloadModal: () => void;
  openWaitlistModal: () => void;
  closeModal: () => void;
}

const modalConfigs = {
  download: {
    title: 'Get Your Free Download',
    description: 'Enter your email to receive the download link!',
    ctaText: 'Send Download Link',
  },
  waitlist: {
    title: 'Join the Waitlist',
    description: 'Be the first to try Romo for free!',
    ctaText: 'Join Waitlist',
  },
} as const;

const EmailCaptureContext = createContext<EmailCaptureContextType | undefined>(
  undefined
);

export function EmailCaptureProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<EmailCaptureModalState>({
    isOpen: false,
    interestType: 'download',
    title: '',
    description: '',
    ctaText: '',
  });

  const openModal = (interestType: InterestType) => {
    const config = modalConfigs[interestType];
    setModalState({
      isOpen: true,
      interestType,
      ...config,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const openDownloadModal = () => openModal('download');
  const openWaitlistModal = () => openModal('waitlist');

  return (
    <EmailCaptureContext.Provider
      value={{
        modalState,
        openDownloadModal,
        openWaitlistModal,
        closeModal,
      }}
    >
      {children}
    </EmailCaptureContext.Provider>
  );
}

export function useEmailCapture() {
  const context = useContext(EmailCaptureContext);
  if (context === undefined) {
    throw new Error(
      'useEmailCapture must be used within an EmailCaptureProvider'
    );
  }
  return context;
}
