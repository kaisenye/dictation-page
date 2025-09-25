'use client';

import { useState } from 'react';
import AuthLayout from '@/components/auth/auth-layout';
import { InputWithValidation } from '@/components/ui/input-with-validation';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus('sending');

    try {
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/update-password`
          : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      if (error) throw error;
      setStatus('sent');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to send reset email'
      );
      setStatus('error');
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We’ll send you a reset link by email"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <InputWithValidation
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={isValidEmail(email)}
            hasError={!!email && !isValidEmail(email)}
            showValidationOnlyAfterSubmit
            isSubmitted={status !== 'idle'}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-900/20 border border-red-800 rounded-md">
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          </div>
        )}

        {status === 'sent' && (
          <div className="p-3 bg-green-900/20 border border-green-800 rounded-md">
            <p className="text-sm text-green-400">
              Check your email for the reset link.
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={!isValidEmail(email) || status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send reset link'}
        </Button>
      </form>
    </AuthLayout>
  );
}
