'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/stripe/client';
import { useSubscription } from '@/providers/subscription-provider';
import { useSubscriptionActions } from '@/hooks/useSubscriptionActions';

export default function PlanTab() {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-900 text-green-300">Active</Badge>;
      case 'canceled':
        return <Badge className="bg-red-900 text-red-300">Canceled</Badge>;
      case 'past_due':
        return (
          <Badge className="bg-yellow-900 text-yellow-300">Past Due</Badge>
        );
      case 'trialing':
        return <Badge className="bg-blue-900 text-blue-300">Trial</Badge>;
      default:
        return (
          <Badge className="bg-neutral-700 text-neutral-300">{status}</Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-white mb-2">Plans</h1>
          <p className="text-neutral-400 text-sm">
            Loading subscription information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white mb-2">Plans</h1>
        <p className="text-neutral-400 text-sm">
          Manage your plan and subscription.
        </p>
      </div>

      <Card className="bg-neutral-800 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hasActivePaidSubscription ? (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {subscription.product_name || 'Pro Plan'}
                      </span>
                      {getStatusBadge(subscription.status)}
                    </div>
                    <p className="text-sm text-neutral-400 mt-1">
                      {subscription.product_description ||
                        'Professional AI dictation with advanced features'}
                    </p>
                    {subscription.cancel_at_period_end &&
                      subscription.current_period_end && (
                        <p className="text-sm text-yellow-400 mt-1">
                          Cancels at period end:{' '}
                          {new Date(
                            subscription.current_period_end
                          ).toLocaleDateString()}
                        </p>
                      )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {subscription.unit_amount
                        ? formatPrice(
                            subscription.unit_amount,
                            subscription.currency || 'usd'
                          )
                        : '$20'}
                    </div>
                    <div className="text-sm text-neutral-400">
                      per {subscription.interval_type || 'month'}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-neutral-400">
                  <p>
                    Next billing:{' '}
                    {subscription.current_period_end
                      ? new Date(
                          subscription.current_period_end
                        ).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>
                <div className="pt-4 border-t border-neutral-800">
                  <Button
                    variant="outline"
                    className="mr-3"
                    onClick={handleManageBilling}
                  >
                    Manage Billing
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">Basic Plan</span>
                      <Badge className="bg-green-900 text-green-300">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-neutral-400 mt-1">
                      AI dictation, privacy focused, offline capable
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">$0</div>
                    <div className="text-sm text-neutral-400">forever</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-neutral-800">
                  <Button
                    className="bg-gradient-to-r from-lime-400 to-lime-500 text-black hover:from-lime-500 hover:to-lime-600"
                    onClick={() => (window.location.href = '/pricing')}
                  >
                    Upgrade to Pro Plan
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
