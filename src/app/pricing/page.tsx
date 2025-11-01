'use client';

import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import EmailCaptureModal from '@/components/EmailCaptureModal';
import { useEmailCapture } from '@/hooks/useEmailCapture';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useSubscriptionActions } from '@/hooks/useSubscriptionActions';
import { useSubscription } from '@/providers/subscription-provider';
import { PLANS } from '@/config/plans';
import EmergeAnimation from '@/components/EmergeAnimation';
import type { User } from '@supabase/supabase-js';

export default function Pricing() {
  const { modalState, openDownloadModal, closeModal } = useEmailCapture();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const { subscribe, loading } = useSubscriptionActions();
  const { hasActivePaidSubscription } = useSubscription();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleSubscribe = async (planId: 'pro' | 'proYearly') => {
    if (!user) {
      router.push('/auth/sign-in?redirect=/pricing');
      return;
    }

    const stripePriceId = PLANS[planId].stripePriceId;
    if (!stripePriceId) return;

    try {
      await subscribe(stripePriceId);
    } catch (error) {
      console.error('Error during subscription:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content */}
      <EmergeAnimation delay={100}>
        <div className="container mx-auto px-4 pt-36 pb-24">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Simple, Transparent Pricing
            </h1>

            <div className="text-center mb-12">
              <p className="text-base text-gray-300">
                Start free, upgrade when you need more features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
              {/* Free Tier */}
              <div className="bg-neutral-900/50 p-8 rounded-lg border border-neutral-800 text-center">
                <h2 className="text-xl font-bold mb-2">Basic</h2>
                <div className="text-3xl font-bold mb-2">$0</div>
                <p className="text-neutral-400 mb-6">Free forever</p>

                <ul className="flex flex-col align-center justify-center text-center gap-3 mb-8">
                  <li className="flex justify-center items-center">
                    AI Dictation
                  </li>
                  <li className="flex justify-center items-center">
                    Privacy Focused
                  </li>
                  <li className="flex justify-center items-center">
                    Offline Capable
                  </li>
                  <li className="flex justify-center items-center">
                    No Subscription
                  </li>
                </ul>

                {user ? (
                  !hasActivePaidSubscription ? (
                    <Button variant="outline" className="w-full" disabled>
                      ✓ Current Plan
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => router.push('/dashboard')}
                    >
                      Manage Account
                    </Button>
                  )
                ) : (
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={openDownloadModal}
                  >
                    Get Started Free
                  </Button>
                )}
              </div>

              {/* Agent Tier */}
              <div className="bg-neutral-900/50 p-8 rounded-lg border border-neutral-800 text-center relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-lime-400 to-lime-500 text-black px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2">Pro Plan</h2>
                <div className="text-3xl font-bold mb-2">
                  ${PLANS.pro.price}
                </div>
                <p className="text-neutral-400 mb-6">per month</p>

                <ul className="flex flex-col align-center justify-center gap-3 mb-8">
                  <li className="flex justify-center items-center text-lime-300 font-bold">
                    Agent Mode
                  </li>
                  <li className="flex justify-center items-center text-lime-300 font-bold">
                    Screen Aware
                  </li>
                  <li className="flex justify-center items-center">
                    Lifetime Updates
                  </li>
                  <li className="flex justify-center items-center">
                    Cancel Anytime
                  </li>
                </ul>

                <div className="space-y-3">
                  {user ? (
                    hasActivePaidSubscription ? (
                      <Button
                        variant="outline"
                        className="w-full font-semibold"
                        disabled
                      >
                        ✓ Current Plan
                      </Button>
                    ) : (
                      <Button
                        className="w-full font-semibold bg-gradient-to-r from-lime-400 to-lime-500 text-black hover:from-lime-500 hover:to-lime-600"
                        onClick={() => handleSubscribe('pro')}
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : 'Subscribe Monthly'}
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="secondary"
                      className="w-full font-semibold"
                      onClick={() =>
                        router.push('/auth/sign-in?redirect=/pricing')
                      }
                    >
                      Sign In to Subscribe
                    </Button>
                  )}
                  {!hasActivePaidSubscription && (
                    <div className="text-xs text-neutral-400">
                      Or save with yearly: $
                      {(PLANS.proYearly.price / 12).toFixed(0)}/month
                      {user && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 text-lime-400 hover:text-lime-300"
                          onClick={() => handleSubscribe('proYearly')}
                          disabled={loading}
                        >
                          Choose Yearly
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-sm text-center mt-8 text-neutral-400">
              <p>
                We make AI dictation FREE where alternatives cost $10+ per
                month.
              </p>
            </div>
          </div>
        </div>
      </EmergeAnimation>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        interestType={modalState.interestType}
        title={modalState.title}
        description={modalState.description}
        ctaText={modalState.ctaText}
      />
    </div>
  );
}
