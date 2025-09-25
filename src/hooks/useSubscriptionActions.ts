'use client';

import { useState } from 'react';
import { redirectToCheckout } from '@/lib/stripe/client';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/providers/subscription-provider';

export function useSubscriptionActions() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshSubscription } = useSubscription();

  const subscribe = async (priceId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error creating checkout session:', data.error);
        if (response.status === 401) {
          router.push(
            '/auth/sign-in?redirect=' +
              encodeURIComponent(window.location.pathname)
          );
          return;
        }
        throw new Error(data.error);
      }

      await redirectToCheckout(data.sessionId);
    } catch (error) {
      console.error('Error during subscription:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const manageBilling = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error creating portal session:', data.error);
        if (response.status === 401) {
          router.push('/auth/sign-in');
          return;
        }
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error opening billing portal:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      await refreshSubscription();
    } catch (error) {
      console.error('Error refreshing subscription data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    subscribe,
    manageBilling,
    refreshData,
    loading,
  };
}
