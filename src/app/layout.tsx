import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/providers/auth-provider';
import { SubscriptionProvider } from '@/providers/subscription-provider';
import { EmailCaptureProvider } from '@/providers/email-capture-provider';
import { PostHogProvider } from '@/providers/posthog-provider';
import GlobalEmailModal from '@/components/GlobalEmailModal';
import JsonLd from '@/components/JsonLd';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tryromo.com'),
  title: {
    default: "Romo - Don't type. Just Talk.",
    template: '%s | Romo',
  },
  description:
    'Local AI assistant, dictation, and a friendly companion. Privacy-focused and built for Mac.',
  keywords: [
    'AI dictation',
    'local AI',
    'voice to text',
    'mac app',
    'privacy focused AI',
    'speech to text mac',
    'dictation software Mac',
  ],
  authors: [{ name: 'Romo Team' }],
  creator: 'Romo Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tryromo.com',
    title: "Romo - Don't type. Just Talk.",
    description:
      'Local AI assistant, dictation, and a friendly companion. Privacy-focused and built for Mac.',
    siteName: 'Romo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Romo - Local AI Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Romo - Don't type. Just Talk.",
    description: 'Local AI assistant, dictation, and a friendly companion.',
    images: [
      {
        url: 'https://tryromo.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Romo - Local AI Assistant',
      },
    ],
    creator: '@romo_app',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <EmailCaptureProvider>
                {children}
                <GlobalEmailModal />
              </EmailCaptureProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </PostHogProvider>
        <JsonLd />
      </body>
    </html>
  );
}
