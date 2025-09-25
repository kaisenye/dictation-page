'use client';

import { useState } from 'react';
import type { InterestType } from '@/components/EmailCaptureModal';

interface EmailCaptureModalState {
  isOpen: boolean;
  interestType: InterestType;
  title: string;
  description: string;
  ctaText: string;
}

const modalConfigs = {
  download: {
    title: 'Get Your Free Download',
    description: 'Enter your email to receive the download link!',
    ctaText: 'Send Download Link',
  },
  waitlist: {
    title: 'Join the Waitlist',
    description: 'Be the first to know when Romo Agent is available.',
    ctaText: 'Join Waitlist',
  },
} as const;

export function useEmailCapture() {
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

  return {
    modalState,
    openDownloadModal,
    openWaitlistModal,
    closeModal,
  };
}
