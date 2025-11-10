'use client';

import EmailCaptureModal from '@/components/EmailCaptureModal';
import { useEmailCapture } from '@/hooks/useEmailCapture';

export default function GlobalEmailModal() {
  const { modalState, closeModal } = useEmailCapture();

  return (
    <EmailCaptureModal
      isOpen={modalState.isOpen}
      onClose={closeModal}
      interestType={modalState.interestType}
      title={modalState.title}
      description={modalState.description}
      ctaText={modalState.ctaText}
    />
  );
}
