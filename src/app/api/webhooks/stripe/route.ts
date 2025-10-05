import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import stripe from '@/lib/stripe/server';
import { manageSubscriptionStatusChange } from '@/lib/stripe/supabase-admin';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      console.log('Missing signature or webhook secret');
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 400 }
      );
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log(`🔔 Webhook received: ${event.type}`);
  } catch (err: unknown) {
    console.log(
      `❌ Webhook signature verification failed.`,
      (err as Error).message
    );
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === 'customer.subscription.created'
          );
          break;
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true
            );
          }
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Webhook handler failed' },
        { status: 400 }
      );
    }
  } else {
    console.log(`Unsupported event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
