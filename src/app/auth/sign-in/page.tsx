'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/auth-layout';
import SignInForm from '@/components/auth/sign-in-form';
import { useAuth } from '@/providers/auth-provider';
import type { SignInFormData } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, user } = useAuth();

  // Check if this is a login from desktop app
  const isDesktopLogin = searchParams.get('source') === 'desktop';
  const callbackUrl = searchParams.get('callback'); // Preserve callback URL

  // TODO: Remove redirect when ready to launch auth pages
  // Redirect non-desktop users to home page (preserve desktop app flow)
  useEffect(() => {
    if (!isDesktopLogin) {
      router.push('/');
    }
  }, [isDesktopLogin, router]);

  // If already signed in, redirect appropriately
  useEffect(() => {
    if (user) {
      if (isDesktopLogin) {
        const callbackParams = new URLSearchParams({ source: 'desktop' });
        if (callbackUrl) {
          callbackParams.set('callback', callbackUrl);
        }
        router.replace(`/auth/callback?${callbackParams.toString()}`);
      } else {
        router.replace('/dashboard');
      }
    }
  }, [user, router, isDesktopLogin, callbackUrl]);

  const handleSignIn = async (data: SignInFormData) => {
    try {
      // Use Supabase authentication via our auth provider
      const { error } = await signIn(data.email, data.password);
      if (error) {
        throw new Error(error);
      }
      // Redirect based on login source
      if (isDesktopLogin) {
        const callbackParams = new URLSearchParams({ source: 'desktop' });
        if (callbackUrl) {
          callbackParams.set('callback', callbackUrl);
        }
        router.push(`/auth/callback?${callbackParams.toString()}`);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      // Re-throw error so SignInForm can display it
      throw error;
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
        isDesktopLogin
          ? 'Sign in to connect your Romo desktop app'
          : 'Sign in to your account to continue'
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
            Signing in for desktop app
          </p>
        </div>
      )}
      <div className="space-y-6">
        {/* OAuth Provider Sign-in */}
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

            // Build callback URL with all necessary parameters
            const callbackParams = new URLSearchParams({ source: 'desktop' });
            if (callbackUrl) {
              callbackParams.set('callback', callbackUrl);
            }
            const redirectTo = isDesktopLogin
              ? `${window.location.origin}/auth/callback?${callbackParams.toString()}`
              : `${window.location.origin}/dashboard`;

            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: { redirectTo },
            });

            if (error) {
              throw new Error(error.message);
            }
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

        <SignInForm onSubmit={handleSignIn} />

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-neutral-400">
            Don&apos;t have an account?{' '}
            <Link
              href={
                isDesktopLogin
                  ? '/auth/sign-up?source=desktop'
                  : '/auth/sign-up'
              }
              className="text-white hover:text-neutral-300 underline transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-neutral-400 hover:text-neutral-300 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <AuthLayout title="Sign In" subtitle="Loading...">
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </AuthLayout>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
