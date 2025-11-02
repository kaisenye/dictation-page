'use client';

import Link from 'next/link';
import { FaRegCircle } from 'react-icons/fa6';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { useEmailCapture } from '@/hooks/useEmailCapture';

export default function Navbar() {
  const { user } = useAuth();
  const { openWaitlistModal } = useEmailCapture();

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full md:max-w-[400px] px-4 py-4">
      <div className="flex items-center justify-between h-12 md:h-fit bg-black/10 backdrop-blur-sm rounded-xl px-4 py-2 ">
        <div>
          <Link
            href="/"
            className="flex items-center justify-center text-white hover:text-gray-300 transition-colors text-sm font-medium pl-1"
          >
            <FaRegCircle className="size-full" />
          </Link>
        </div>
        <div className="flex items-center md:space-x-10 space-x-6">
          <Link
            href="/features"
            className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
          >
            Features
          </Link>
          {/* TODO: Re-enable pricing page link when ready to launch
          <Link
            href="/pricing"
            className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
          >
            Pricing
          </Link>
          */}
          <Link
            href="/about"
            className="text-white hover:text-gray-300 transition-colors text-sm font-medium"
          >
            About
          </Link>
        </div>

        <div className="hidden md:flex items-center">
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center justify-center w-8 h-8 hover:bg-white/10 rounded-md transition-colors"
            >
              <User className="w-4 h-4 text-white" />
            </Link>
          ) : (
            // TODO: Restore link to /auth/sign-up when ready to launch
            <Button
              variant="outline"
              size="sm"
              className="rounded-md transition-colors"
              onClick={openWaitlistModal}
            >
              Join Waitlist
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
