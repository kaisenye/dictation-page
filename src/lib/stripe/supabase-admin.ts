import { createAdminClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

export const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', uuid)
    .single();

  if (error || !data?.stripe_customer_id) {
    // No customer record found, let's create a new one
    const { createCustomer } = await import('./server');
    const customer = await createCustomer({
      email,
      userId: uuid,
    });

    // Insert the customer ID into our Supabase table
    const { error: supabaseError } = await supabase
      .from('customers')
      .insert([{ id: uuid, stripe_customer_id: customer.id }]);

    if (supabaseError) throw supabaseError;

    return customer.id;
  }

  return data.stripe_customer_id;
};

// Define a minimal interface for the subscription properties we need
interface StripeSubscription {
  id: string;
  status: string;
  items: { data: Array<{ price: { id: string }; quantity: number }> };
  cancel_at_period_end: boolean | null;
  cancel_at: number | null;
  canceled_at: number | null;
  current_period_start: number | null;
  current_period_end: number | null;
  created: number;
  ended_at: number | null;
  trial_start: number | null;
  trial_end: number | null;
  default_payment_method: string | null;
}

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  const supabase = createAdminClient();

  // Get customer's UUID from mapping table
  const { data: customerData, error: customerError } = await supabase
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (customerError) throw customerError;

  const uuid = customerData!.id;

  const { getSubscription } = await import('./server');
  const subscription = (await getSubscription(
    subscriptionId
  )) as unknown as StripeSubscription;

  // Get the Stripe price ID
  const stripePriceId = subscription.items.data[0].price.id;

  // Upsert the latest status of the subscription object
  const subscriptionData = {
    id: subscription.id,
    user_id: uuid,
    status:
      subscription.status as Database['public']['Enums']['subscription_status'],
    metadata: {},
    price_id: stripePriceId,
    quantity: subscription.items.data[0].quantity ?? null,
    cancel_at_period_end: subscription.cancel_at_period_end ?? null,
    cancel_at: subscription.cancel_at
      ? new Date(subscription.cancel_at * 1000).toISOString()
      : null,
    canceled_at: subscription.canceled_at
      ? new Date(subscription.canceled_at * 1000).toISOString()
      : null,
    current_period_start: subscription.current_period_start
      ? new Date(subscription.current_period_start * 1000).toISOString()
      : null,
    current_period_end: subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toISOString()
      : null,
    created_at: new Date(subscription.created * 1000).toISOString(),
    ended_at: subscription.ended_at
      ? new Date(subscription.ended_at * 1000).toISOString()
      : null,
    trial_start: subscription.trial_start
      ? new Date(subscription.trial_start * 1000).toISOString()
      : null,
    trial_end: subscription.trial_end
      ? new Date(subscription.trial_end * 1000).toISOString()
      : null,
  };

  const { error } = await supabase
    .from('subscriptions')
    .upsert([subscriptionData]);

  if (error) throw error;

  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object
  if (createAction && subscription.default_payment_method && uuid) {
    // update customer record with billing details
  }
};
