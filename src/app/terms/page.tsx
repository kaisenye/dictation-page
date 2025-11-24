import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Romo',
  description: 'Read the terms of service for Romo, the local AI dictation assistant for Mac.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-36 pb-16 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Terms of Service
        </h1>
        <div className="space-y-4 text-neutral-300">
          <p>
            By using Romo, you agree to use the app responsibly and in
            compliance with applicable laws.
          </p>
          <p>
            Romo is provided “as is” without warranties. We are not liable for
            damages arising from its use.
          </p>
          <p>
            We may update these terms periodically. Continued use constitutes
            acceptance of the updated terms.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
