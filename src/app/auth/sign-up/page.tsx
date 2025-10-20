'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/auth-layout';
import SignUpForm from '@/components/auth/sign-up-form';
import { useAuth } from '@/providers/auth-provider';
import type { SignUpFormData } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp, user } = useAuth();

  // Check if this is a signup from desktop app
  const isDesktopLogin = searchParams.get('source') === 'desktop';

  // If already signed in, redirect appropriately
  useEffect(() => {
    if (user) {
      if (isDesktopLogin) {
        router.replace('/auth/callback?source=desktop');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [user, router, isDesktopLogin]);

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      // Use Supabase authentication via our auth provider
      const { error } = await signUp(data.email, data.password, data.name);

      if (error) {
        const lowered = error.toLowerCase();
        if (
          lowered.includes('already registered') ||
          lowered.includes('already exists') ||
          lowered.includes('user exists')
        ) {
          throw new Error('Email already registered. Please sign in instead.');
        }
        throw new Error(error);
      }
      // Redirect based on signup source
      if (isDesktopLogin) {
        router.push('/auth/callback?source=desktop');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      // Re-throw error so SignUpForm can display it
      throw error;
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        isDesktopLogin
          ? 'Create an account to connect your Romo desktop app'
          : 'Join us and start your journey'
      }
    >
      {isDesktopLogin && (
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-400 text-center flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Signing up for desktop app
          </p>
        </div>
      )}
      <div className="space-y-6">
        {/* OAuth Provider Sign-up */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={async () => {
            // Store desktop login flag before OAuth redirect
            if (isDesktopLogin) {
              localStorage.setItem('auth_source', 'desktop');
            }

            const supabase = (
              await import('@/lib/supabase/client')
            ).createClient();
            const redirectTo = isDesktopLogin
              ? `${window.location.origin}/auth/callback?source=desktop`
              : `${window.location.origin}/dashboard`;

            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: { redirectTo },
            });

            if (error) throw new Error(error.message);
          }}
        >
          <FaGoogle className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>

        <div className="relative flex items-center justify-center">
          <span className="text-xs text-neutral-500 px-2 bg-neutral-900/60">
            or
          </span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-neutral-800 -z-10" />
        </div>

        <SignUpForm onSubmit={handleSignUp} />

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-400">
            Already have an account?{' '}
            <Link
              href={
                isDesktopLogin
                  ? '/auth/sign-in?source=desktop'
                  : '/auth/sign-in'
              }
              className="text-white hover:text-neutral-300 underline transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center">
          <p className="text-xs text-neutral-400">
            By creating an account, you agree to our{' '}
            <Link
              href="/terms"
              className="underline hover:text-neutral-300 transition-colors"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
