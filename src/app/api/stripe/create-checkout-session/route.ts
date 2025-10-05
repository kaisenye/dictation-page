import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createCheckoutSession } from '@/lib/stripe/server';
import { createOrRetrieveCustomer } from '@/lib/stripe/supabase-admin';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { priceId, metadata = {} } = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get or create customer
    const customerId = await createOrRetrieveCustomer({
      email: user.email!,
      uuid: user.id,
    });

    // Create checkout session
    const session = await createCheckoutSession({
      priceId,
      userId: user.id,
      email: user.email!,
      customerId,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
      metadata,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
