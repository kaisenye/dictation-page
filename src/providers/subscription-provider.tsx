'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { createClient } from '@/lib/supabase/client';

type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'unpaid'
  | 'paused';

interface Subscription {
  id: string;
  user_id: string;
  status: SubscriptionStatus;
  stripe_price_id: string;
  plan_id: string;
  quantity: number | null;
  cancel_at_period_end: boolean | null;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
  canceled_at: string | null;
  cancel_at: string | null;
  trial_start: string | null;
  trial_end: string | null;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  loading: boolean;
  isSubscribed: boolean; // true if user has paid subscription
  isPro: boolean;
  hasActivePaidSubscription: boolean;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchSubscriptionData = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      // Fetch user's active subscription directly from Supabase
      const { data: subscriptionData, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        setSubscription(null);
      } else {
        setSubscription(subscriptionData || null);
      }
    } catch (error) {
      console.error('Error in fetchSubscriptionData:', error);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchSubscriptionData();

    // Listen for auth changes
    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        fetchSubscriptionData();
      }
    });

    return () => {
      authSubscription.unsubscribe();
    };
  }, [fetchSubscriptionData, supabase.auth]);

  const refreshSubscription = async () => {
    setLoading(true);
    await fetchSubscriptionData();
  };

  // Users are always "subscribed" to at least the basic plan
  const isSubscribed =
    subscription?.status === 'active' || subscription?.status === 'trialing';
  const isPro =
    isSubscribed && (subscription?.plan_id?.includes('pro') ?? false);
  const hasActivePaidSubscription = isSubscribed;

  const value: SubscriptionContextType = {
    subscription,
    loading,
    isSubscribed,
    isPro,
    hasActivePaidSubscription,
    refreshSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      'useSubscription must be used within a SubscriptionProvider'
    );
  }
  return context;
}
