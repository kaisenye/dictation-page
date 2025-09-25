import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  appInfo: {
    name: 'Dictation Page',
    version: '1.0.0',
  },
});

export default stripe;

export async function createCheckoutSession({
  priceId,
  userId,
  email,
  customerId,
  successUrl,
  cancelUrl,
  metadata = {},
}: {
  priceId: string;
  userId: string;
  email: string;
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: customerId,
    customer_email: customerId ? undefined : email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      ...metadata,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    subscription_data: {
      metadata: {
        userId,
      },
    },
  });

  return session;
}

export async function createCustomerPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

export async function updateSubscription({
  subscriptionId,
  priceId,
}: {
  subscriptionId: string;
  priceId: string;
}) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const updatedSubscription = await stripe.subscriptions.update(
    subscriptionId,
    {
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId,
        },
      ],
      proration_behavior: 'create_prorations',
    }
  );

  return updatedSubscription;
}

export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  return subscription;
}

export async function getCustomer(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
}

export async function createCustomer({
  email,
  userId,
  name,
}: {
  email: string;
  userId: string;
  name?: string;
}) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      userId,
    },
  });

  return customer;
}
