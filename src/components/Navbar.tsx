'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { useEmailCapture } from '@/hooks/useEmailCapture';

export default function Navbar() {
  const { user } = useAuth();
  const { openWaitlistModal } = useEmailCapture();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    // Close mobile menu if open
    setIsMobileMenuOpen(false);

    if (pathname !== '/') {
      // If not on home page, navigate to home first, then scroll
      window.location.href = `/${href}`;
    } else {
      // If already on home page, just scroll smoothly
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleBlogClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 py-2 flex justify-center">
        <div className="flex items-center justify-between h-12 md:h-fit bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 w-full md:max-w-3xl">
          <div>
            <Link
              href="/"
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/nav-logo.png"
                alt="Romo"
                width={400}
                height={400}
                className="h-5 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center md:space-x-10">
            <a
              href="#how-it-works"
              onClick={(e) => handleAnchorClick(e, '#how-it-works')}
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors text-sm font-medium cursor-pointer"
            >
              How it works
            </a>
            <a
              href="#features"
              onClick={(e) => handleAnchorClick(e, '#features')}
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors text-sm font-medium cursor-pointer"
            >
              Features
            </a>
            <a
              href="#use-cases"
              onClick={(e) => handleAnchorClick(e, '#use-cases')}
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors text-sm font-medium cursor-pointer"
            >
              Use cases
            </a>
            <Link
              href="/blog"
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors text-sm font-medium"
            >
              Blog
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-md transition-colors"
              >
                <User className="w-4 h-4 text-gray-900" />
              </Link>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="rounded-full bg-black text-white hover:bg-gray-900 transition-colors"
                onClick={openWaitlistModal}
              >
                Join Waitlist
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white/70 backdrop-blur-xl md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col h-full pt-20 px-6 pb-8">
            {/* Close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="mt-auto flex flex-col items-end space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-6 text-right">
                <a
                  href="#how-it-works"
                  onClick={(e) => handleAnchorClick(e, '#how-it-works')}
                  className="nav-item-animate text-gray-900 text-3xl md:text-3xl font-semibold py-1"
                >
                  How it works
                </a>
                <a
                  href="#features"
                  onClick={(e) => handleAnchorClick(e, '#features')}
                  className="nav-item-animate text-gray-900 text-3xl md:text-3xl font-semibold py-1"
                >
                  Features
                </a>
                <a
                  href="#use-cases"
                  onClick={(e) => handleAnchorClick(e, '#use-cases')}
                  className="nav-item-animate text-gray-900 text-3xl md:text-3xl font-semibold py-1"
                >
                  Use cases
                </a>
                <Link
                  href="/blog"
                  onClick={handleBlogClick}
                  className="nav-item-animate text-gray-900 text-3xl md:text-3xl font-semibold py-1"
                >
                  Blog
                </Link>
              </nav>

              {/* Mobile CTA */}
              <div>
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Dashboard
                  </Link>
                ) : (
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-full bg-black text-white hover:bg-gray-900 transition-colors px-8 py-6 text-lg mt-10"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openWaitlistModal();
                    }}
                  >
                    Join Waitlist
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
