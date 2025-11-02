'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InterestType = 'download' | 'waitlist';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  interestType: InterestType;
  title: string;
  description: string;
  ctaText: string;
}

interface SubmitState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function EmailCaptureModal({
  isOpen,
  onClose,
  interestType,
  title,
  description,
  ctaText,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setSubmitState({
        status: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    setSubmitState({ status: 'loading' });

    try {
      const response = await fetch('/api/capture-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, interestType }),
      });

      if (!response.ok) {
        // Try to get error message from server response
        const errorData = await response.json().catch(() => ({}));
        const serverMessage = errorData.error || 'Failed to process request';
        throw new Error(serverMessage);
      }

      const data = await response.json();
      setSubmitState({
        status: 'success',
        message: data.message || 'Check your email for the next steps!',
      });
      setEmail('');

      // Close modal after 2 seconds on success
      setTimeout(() => {
        onClose();
        setSubmitState({ status: 'idle' });
      }, 2000);
    } catch (error) {
      setSubmitState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });
    }
  };

  const handleClose = () => {
    if (submitState.status !== 'loading') {
      onClose();
      setEmail('');
      setSubmitState({ status: 'idle' });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-sm px-4 py-6 bg-neutral-950 rounded-lg shadow-xl animate-in zoom-in-95 duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={submitState.status === 'loading'}
          className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="py-8 px-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            <p className="text-sm text-neutral-400">{description}</p>
          </div>

          {/* Success State */}
          {submitState.status === 'success' && (
            <div className="text-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-green-400 font-medium">
                {submitState.message}
              </p>
            </div>
          )}

          {/* Form */}
          {submitState.status !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={cn(
                    'w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-100 focus:border-transparent transition-colors',
                    submitState.status === 'error' && 'border-red-500'
                  )}
                  disabled={submitState.status === 'loading'}
                  required
                />
              </div>

              {/* Error Message */}
              {submitState.status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{submitState.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={submitState.status === 'loading' || !email}
              >
                {submitState.status === 'loading' ? 'Sending...' : ctaText}
              </Button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
