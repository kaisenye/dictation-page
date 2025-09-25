import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    // Provide a clear message in dev if env vars are missing
    console.error(
      'Supabase env missing: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
    throw new Error(
      'Supabase is not configured. See .env.example for details.'
    );
  }

  return createBrowserClient(url, anon);
}
