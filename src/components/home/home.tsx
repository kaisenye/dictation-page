'use client';

import { Button } from '@/components/ui/button';
// TODO: Restore FaApple import when restoring download button
// import { FaApple } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import VideoModal from '@/components/VideoModal';
import { useEmailCapture } from '@/hooks/useEmailCapture';
import { useVideoModal } from '@/hooks/useVideoModal';
import EmergeAnimation from '@/components/EmergeAnimation';
import ColourfulText from '@/components/ColourfulText';

import Footer from '@/components/Footer';

export default function Home() {
  // TODO: Restore openDownloadModal when ready to launch download feature
  // Email modal is now rendered globally at app level
  const { openWaitlistModal } = useEmailCapture();
  const { isOpen: isVideoOpen, closeModal: closeVideoModal } = useVideoModal();

  return (
    <div className="min-h-screen max-w-7xl mx-auto w-full overflow-x-hidden bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <main className="container mx-auto px-4 pt-22 flex-1 flex flex-col">
        {/* Hero Section */}
        <EmergeAnimation delay={100}>
          <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center text-center px-4">
            {/* Title and Description */}
            <div className="max-w-3xl mx-auto mb-12">
              <h1 className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
                Your best <ColourfulText text="ideas" />
                <br />
                die in your <span className="text-gray-500">keyboard</span>
              </h1>
              <p className="text-md md:text-md lg:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
                Just speak mumble, Romo turns it into polished output.
              </p>
              <p className="text-md md:text-md lg:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed0">
                Ideas. Notes. Emails. Code. Docs. Done.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-2">
              <Button
                variant="default"
                size="lg"
                className="rounded-full bg-black text-white hover:bg-gray-900 px-8 py-6 text-lg font-medium transition-all duration-300"
                onClick={openWaitlistModal}
              >
                Join Waitlist
              </Button>
              <p className="text-sm text-gray-500 mt-3">Built for Mac.</p>
            </div>
          </section>
        </EmergeAnimation>

        {/* Content Sections */}
        <section className="mt-24 md:mt-32 mb-24 space-y-24 md:space-y-32">
          {/* THE PROBLEM */}
          <EmergeAnimation delay={100}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div>
                  <h2 className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                    THE PROBLEM
                  </h2>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
                    You think in ideas. You type in characters.
                  </h3>
                </div>
                <div className="pt-8 md:pt-0">
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                    The average person thinks <strong>4x faster</strong> than
                    they type. Every day, you lose hours translating thoughts
                    into keystrokes.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Meetings. Emails. Slack messages. Documentation. Code
                    comments.
                  </p>
                </div>
              </div>
            </div>
          </EmergeAnimation>

          {/* WHAT EXISTS */}
          <EmergeAnimation delay={200}>
            <div className="max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div>
                  <h2 className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                    WHAT EXISTS
                  </h2>
                  <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight mb-2">
                    Current tools just transcribe.
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-700">
                    Word for word. Uh for uh.
                  </p>
                </div>
                <div className="pt-8 md:pt-0 space-y-3">
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Same mess. Just typed for you.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    You still have to clean it up.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    That&apos;s not saving time.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    That&apos;s moving the work.
                  </p>
                </div>
              </div>
            </div>
          </EmergeAnimation>

          {/* HOW IT WORKS */}
          <EmergeAnimation delay={300}>
            <div
              id="how-it-works"
              className="max-w-5xl mx-auto px-4 scroll-mt-24"
            >
              <div>
                <h2 className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                  HOW IT WORKS
                </h2>
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight mb-6">
                  Romo understands what you{' '}
                  <span className="underline">meant</span>.<br />
                  Not just what you said.
                </h3>
                <div className="max-w-3xl space-y-4">
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Speak naturally. Mumble. Think out loud. Jump around.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Romo uses AI to transform your raw thoughts into structured,
                    polished output—ready to send, paste, or ship.
                  </p>
                </div>
              </div>
            </div>
          </EmergeAnimation>

          {/* FEATURES */}
          <EmergeAnimation delay={400}>
            <div id="features" className="max-w-5xl mx-auto px-4 scroll-mt-24">
              <div>
                <h2 className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                  CONTEXT AWARE
                </h2>
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight mb-6">
                  Romo knows what you <span className="underline">work on</span>
                  .<br />
                  Not just your voice.
                </h3>
                <div className="max-w-3xl">
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    Open in Gmail? Romo formats for email. In VS Code? It writes
                    code. Browsing docs? It matches the style.
                  </p>
                </div>
              </div>
            </div>
          </EmergeAnimation>

          {/* USE CASES */}
          <EmergeAnimation delay={500}>
            <div id="use-cases" className="max-w-5xl mx-auto px-4 scroll-mt-24">
              <div>
                <h2 className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                  USE CASES
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {/* Placeholder for use cases section */}
                </p>
              </div>
            </div>
          </EmergeAnimation>
        </section>

        {/* Footer Section */}
        <Footer />
      </main>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={closeVideoModal}
        videoUrl="https://romo-app-2025.s3.us-west-1.amazonaws.com/romo-demo.mp4"
      />
    </div>
  );
}
