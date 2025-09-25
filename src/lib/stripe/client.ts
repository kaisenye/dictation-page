import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
};

export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error('Stripe failed to initialize');
  }

  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (error) {
    throw error;
  }
};

export const formatPrice = (
  amount: number,
  currency: string = 'usd',
  locale: string = 'en-US'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  }).format(amount / 100);
};

export const formatInterval = (interval: string, intervalCount: number = 1) => {
  if (intervalCount === 1) {
    return interval;
  }
  return `${intervalCount} ${interval}s`;
};
