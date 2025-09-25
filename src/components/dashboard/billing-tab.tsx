'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/providers/subscription-provider';
import { useSubscriptionActions } from '@/hooks/useSubscriptionActions';

export default function BillingTab() {
  const { subscription, loading, hasActivePaidSubscription } =
    useSubscription();
  const { manageBilling } = useSubscriptionActions();

  const handleManageBilling = async () => {
    try {
      await manageBilling();
    } catch (error) {
      console.error('Error opening billing portal:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-white mb-2">
            Billing & Invoices
          </h1>
          <p className="text-neutral-400 text-sm">
            Loading billing information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white mb-2">
          Billing & Invoices
        </h1>
        <p className="text-neutral-400 text-sm">
          Manage your billing information and view invoice history.
        </p>
      </div>

      {hasActivePaidSubscription ? (
        <>
          <Card className="bg-neutral-800 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Current Plan</div>
                    <div className="text-sm text-neutral-400">
                      {subscription!.plan_id || 'Pro Plan'} - Monthly
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">$20</div>
                    <div className="text-sm text-neutral-400">per month</div>
                  </div>
                </div>
                <div className="text-xs text-neutral-400">
                  <p>
                    Next billing date:{' '}
                    {subscription!.current_period_end
                      ? new Date(
                          subscription!.current_period_end
                        ).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-800">
                  <Button variant="outline" onClick={handleManageBilling}>
                    Manage Payment & Invoices
                  </Button>
                  <p className="text-xs text-neutral-400 mt-2">
                    Update payment methods, view invoices, and manage billing
                    details
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-800 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Subscription Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Status</span>
                  <Badge
                    className={
                      subscription!.status === 'active'
                        ? 'bg-green-900 text-green-300'
                        : subscription!.status === 'canceled'
                          ? 'bg-red-900 text-red-300'
                          : 'bg-yellow-900 text-yellow-300'
                    }
                  >
                    {subscription!.status.charAt(0).toUpperCase() +
                      subscription!.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Started</span>
                  <span className="text-white">
                    {subscription!.created_at
                      ? new Date(subscription!.created_at).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Current Period</span>
                  <span className="text-white">
                    {subscription!.current_period_start &&
                    subscription!.current_period_end
                      ? `${new Date(subscription!.current_period_start).toLocaleDateString()} - ${new Date(subscription!.current_period_end).toLocaleDateString()}`
                      : 'N/A'}
                  </span>
                </div>
                {subscription!.cancel_at_period_end &&
                  subscription!.current_period_end && (
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Cancels At</span>
                      <span className="text-yellow-400">
                        {new Date(
                          subscription!.current_period_end
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="bg-neutral-800 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">
              Basic Plan - No Billing Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-neutral-400 mb-4">
                You&apos;re on the free Basic plan. No payment method or billing
                information required.
              </p>
              <Button
                className="bg-gradient-to-r from-lime-400 to-lime-500 text-black hover:from-lime-500 hover:to-lime-600"
                onClick={() => (window.location.href = '/pricing')}
              >
                Upgrade to Pro Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
