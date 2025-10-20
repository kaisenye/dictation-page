import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define public routes (accessible without authentication)
  const publicRoutes = [
    '/',
    '/about',
    '/features',
    '/pricing',
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/forgot-password',
    '/auth/update-password',
    '/terms',
    '/privacy',
  ];

  // Define protected routes (require authentication)
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
  const isRecoveryRoute = request.nextUrl.pathname === '/auth/update-password';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isNextInternalRoute = request.nextUrl.pathname.startsWith('/_next');

  // Handle desktop login: redirect authenticated users to callback with desktop flag
  const isCallbackRoute = request.nextUrl.pathname === '/auth/callback';
  const isDesktopLogin =
    request.nextUrl.searchParams.get('source') === 'desktop';

  if (user && isAuthRoute && !isRecoveryRoute && !isCallbackRoute) {
    const url = request.nextUrl.clone();

    // If this is a desktop login, redirect to callback to generate deep link
    if (isDesktopLogin) {
      url.pathname = '/auth/callback';
      url.searchParams.set('source', 'desktop');
      return NextResponse.redirect(url);
    }

    // Normal web login: redirect to dashboard
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users to sign-in for protected routes
  if (!user && !isPublicRoute && !isApiRoute && !isNextInternalRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/sign-in';
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // This ensures auth cookies are properly managed.
  return supabaseResponse;
}
