import HomeContent from '@/components/home/home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Romo - Best AI Dictation & Voice to Text for Mac',
  description:
    'Transform your voice into structured text instantly. The best privacy-focused speech to text app for Mac. Perfect for emails, coding, and ADHD friendly writing.',
  keywords: [
    'speech to text mac',
    'dictation software Mac',
    'voice to text Mac',
    'speech recognition software',
    'typing pain relief',
    'best voice to text for disability Mac',
    'best AI dictation app for Mac',
    'dictate documents in Word for Mac',
    'rambling to structured text',
    'ADHD friendly writing tools Mac',
    'Dragon Professional for Mac alternatives 2025',
    'Wispr Flow vs MacWhisper',
    'Talon voice dictation alternative',
    'secure dictation software for lawyers',
  ],
};

export default function Home() {
  return <HomeContent />;
}
