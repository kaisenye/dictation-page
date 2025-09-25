-- Enable the necessary extensions
create extension if not exists "uuid-ossp";

-- Create enum for subscription status
create type subscription_status as enum (
  'trialing',
  'active', 
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused'
);

-- Create customers table (maps Supabase users to Stripe customers)
create table public.customers (
  id uuid references auth.users(id) primary key,
  stripe_customer_id text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create subscriptions table (simplified - no price_id foreign key)
create table public.subscriptions (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  status subscription_status not null,
  stripe_price_id text not null, -- Just store the Stripe price ID as string
  plan_id text not null, -- Store our internal plan ID (basic, agent, agent_yearly)
  quantity integer,
  cancel_at_period_end boolean,
  cancel_at timestamp with time zone,
  canceled_at timestamp with time zone,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone,
  trial_start timestamp with time zone,
  trial_end timestamp with time zone
);

-- Row Level Security (RLS)
alter table public.customers enable row level security;
alter table public.subscriptions enable row level security;

-- RLS Policies
create policy "Users can view their own customer data" on public.customers for select using (auth.uid() = id);
create policy "Users can insert their own customer data" on public.customers for insert with check (auth.uid() = id);
create policy "Users can update their own customer data" on public.customers for update using (auth.uid() = id);

create policy "Users can view their own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Users can insert their own subscriptions" on public.subscriptions for insert with check (auth.uid() = user_id);
create policy "Users can update their own subscriptions" on public.subscriptions for update using (auth.uid() = user_id);

-- Functions for updating timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updating timestamps
create trigger handle_updated_at before update on public.customers
  for each row execute function public.handle_updated_at();

create trigger handle_updated_at before update on public.subscriptions
  for each row execute function public.handle_updated_at();