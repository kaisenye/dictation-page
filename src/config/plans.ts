export const PLANS = {
  basic: {
    id: 'basic',
    name: 'Basic Plan',
    description: 'Free access to basic AI dictation features',
    price: 0,
    currency: 'usd',
    interval: 'month',
    features: [
      'AI Dictation',
      'Privacy Focused',
      'Offline Capable',
      'No Subscription',
    ],
    stripePriceId: null, // No Stripe interaction for free plan
    popular: false,
  },
  pro: {
    id: 'pro',
    name: 'Pro Plan',
    description: 'Professional AI dictation with advanced features',
    price: 10,
    currency: 'usd',
    interval: 'month',
    features: [
      'Advanced AI Features',
      'Context Aware Dictation',
      'Lifetime Updates',
      'Cancel Anytime',
    ],
    stripePriceId: 'price_1SANpVIYFkABJIarTIb0VU4O',
    popular: true,
  },
  proYearly: {
    id: 'pro_yearly',
    name: 'Pro Plan',
    description: 'Professional AI dictation with advanced features',
    price: 100,
    currency: 'usd',
    interval: 'year',
    features: [
      'Advanced AI Features',
      'Context Aware Dictation',
      'Lifetime Updates',
      'Cancel Anytime',
      '2 months free',
    ],
    stripePriceId: 'price_1SANpWIYFkABJIardDdbxmVc',
    popular: false,
  },
} as const;

export type PlanId = keyof typeof PLANS;
export type Plan = (typeof PLANS)[PlanId];

// Helper functions
export const getDisplayPrice = (plan: Plan) => {
  if (plan.price === 0) return 'Free';
  const monthlyPrice = plan.interval === 'year' ? plan.price / 12 : plan.price;
  return `$${monthlyPrice.toFixed(0)}`;
};

export const getStripePriceId = (planId: PlanId) => {
  return PLANS[planId].stripePriceId;
};

export const getPlanByStripePrice = (stripePriceId: string) => {
  return Object.values(PLANS).find(
    (plan) => plan.stripePriceId === stripePriceId
  );
};
