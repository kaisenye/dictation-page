'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>(
    'loading'
  );
  const [deepLink, setDeepLink] = useState<string>('');
  const hasRunRef = useRef(false); // Prevent double-run in React Strict Mode

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent double execution in React Strict Mode (development)
      if (hasRunRef.current) return;
      hasRunRef.current = true;

      try {
        const supabase = createClient();
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          console.error('[Callback] No session:', error);
          setStatus('error');
          return;
        }

        // Check if this is a desktop login (from URL param or localStorage)
        const urlSource = searchParams?.get('source');
        const storageSource = localStorage.getItem('auth_source');
        const callbackUrl = searchParams?.get('callback'); // DevAuthServer callback URL
        console.log('[Callback] URL source:', urlSource);
        console.log('[Callback] Storage source:', storageSource);
        console.log('[Callback] Callback URL:', callbackUrl);
        console.log('[Callback] Full URL:', window.location.href);

        // Prefer URL parameter, fall back to localStorage
        const isDesktopLogin =
          urlSource === 'desktop' || storageSource === 'desktop';

        // Clear the localStorage flag
        localStorage.removeItem('auth_source');

        // If not desktop login, redirect to dashboard
        if (!isDesktopLogin) {
          console.log('[Callback] Not desktop login, redirecting to dashboard');
          router.push('/dashboard');
          return;
        }

        console.log('[Callback] Desktop login detected, generating token...');

        // Generate hashed token for desktop app
        const response = await fetch('/api/auth/desktop-token', {
          method: 'POST',
        });

        if (!response.ok) {
          setStatus('error');
          return;
        }

        const { hashed_token, email } = await response.json();

        // If callback URL is provided (DevAuthServer), redirect there instead of deep link
        if (callbackUrl) {
          console.log('[Callback] Using DevAuthServer callback URL');
          const callbackUrlWithParams = new URL(callbackUrl);
          callbackUrlWithParams.searchParams.set('hashed_token', hashed_token);
          callbackUrlWithParams.searchParams.set('email', email);

          console.log(
            '[Callback] Redirecting to:',
            callbackUrlWithParams.toString()
          );
          setStatus('redirecting');

          // Redirect to DevAuthServer callback
          window.location.href = callbackUrlWithParams.toString();
          return;
        }

        // Fallback to deep link if no callback URL
        const deepLinkUrl = `romo://auth?hashed_token=${hashed_token}&email=${encodeURIComponent(email)}`;

        console.log(
          '[Callback] Generated deep link:',
          deepLinkUrl.substring(0, 50) + '...'
        );

        setDeepLink(deepLinkUrl);
        setStatus('redirecting');

        // Store deep link for manual fallback
        (window as typeof window & { deepLink: string }).deepLink = deepLinkUrl;

        // Open desktop app via deep link
        console.log('[Callback] Opening desktop app...');
        window.location.href = deepLinkUrl;

        // Redirect to dashboard after showing success message
        // Give user 2 seconds to see the success confirmation
        setTimeout(() => {
          console.log('[Callback] Redirecting to dashboard...');
          router.push('/dashboard');
        }, 2000);
      } catch (err) {
        console.error('Error in auth callback:', err);
        setStatus('error');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="w-full max-w-md p-8">
        <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-800 p-8 shadow-2xl">
          {status === 'loading' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-6 animate-pulse">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Authenticating...
              </h2>
              <p className="text-neutral-400 text-sm">
                Setting up your session
              </p>
            </div>
          )}

          {status === 'redirecting' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Success!
              </h2>
              <p className="text-neutral-400 text-sm mb-4">
                Opening Romo desktop app...
              </p>
              <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700 space-y-3">
                <p className="text-xs text-neutral-400 mb-2">
                  Desktop app not opening?
                </p>

                {/* Manual deep link for development */}
                <div className="space-y-2">
                  <p className="text-xs text-neutral-500">
                    Desktop app not opening? Use manual method:
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(deepLink);
                        alert(
                          'Deep link copied! Now go to desktop app → Menu → Romo → Paste Auth URL (Dev)'
                        );
                      }}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                    >
                      Copy Deep Link
                    </button>
                    <a
                      href={deepLink}
                      className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded transition-colors"
                    >
                      Try Deep Link
                    </a>
                  </div>
                  <details className="text-xs text-neutral-500">
                    <summary className="cursor-pointer hover:text-neutral-400">
                      Show full URL
                    </summary>
                    <code className="block mt-2 p-2 bg-neutral-900/50 rounded break-all">
                      {deepLink}
                    </code>
                  </details>
                </div>

                <div className="border-t border-neutral-700 pt-3">
                  <p className="text-xs text-neutral-500 mb-2">
                    Redirecting to dashboard...
                  </p>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="text-xs text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    Go to dashboard now
                  </button>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-6">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Authentication Failed
              </h2>
              <p className="text-neutral-400 text-sm mb-6">
                Unable to complete authentication
              </p>
              <button
                onClick={() => router.push('/auth/sign-in')}
                className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
          <div className="w-full max-w-md p-8">
            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-800 p-8 shadow-2xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-6 animate-pulse">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Loading...
                </h2>
                <p className="text-neutral-400 text-sm">Please wait</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
