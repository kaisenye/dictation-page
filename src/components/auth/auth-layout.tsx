import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start px-4 pt-32">
      {/* Romo Logo - Above the card */}
      <div className="mb-8">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Romo Logo"
            width={24}
            height={24}
            className="opacity-50 hover:opacity-100 hover:translate-y-[-2px] hover:scale-105 transition-all duration-200"
          />
        </Link>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 shadow-xl backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-neutral-400 mb-6">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
