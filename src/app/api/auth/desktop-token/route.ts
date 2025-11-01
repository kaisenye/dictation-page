import { createClient, createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Generate a hashed token for desktop app authentication
 * This follows Supabase best practices for Electron app auth
 * https://github.com/orgs/supabase/discussions/27181
 */
export async function POST() {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Generate a magic link using admin API
    const supabaseAdmin = createAdminClient();

    const { data: magicLinkData, error: magicLinkError } =
      await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: user.email!,
      });

    if (magicLinkError || !magicLinkData) {
      console.error('Failed to generate magic link:', magicLinkError);
      return NextResponse.json(
        { error: 'Failed to generate auth token' },
        { status: 500 }
      );
    }

    // Extract hashed_token from the properties
    const hashedToken = magicLinkData.properties.hashed_token;

    if (!hashedToken) {
      return NextResponse.json(
        { error: 'No hashed token in magic link' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      hashed_token: hashedToken,
      email: user.email,
    });
  } catch (error) {
    console.error('Error in desktop-token API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
