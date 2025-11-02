'use client';

import { Button } from '@/components/ui/button';
import { FaApple } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import EmailCaptureModal from '@/components/EmailCaptureModal';
import VideoModal from '@/components/VideoModal';
import { useEmailCapture } from '@/hooks/useEmailCapture';
import { useVideoModal } from '@/hooks/useVideoModal';
import EmergeAnimation from '@/components/EmergeAnimation';
import UseCaseCard from '@/components/UseCaseCard';

export default function Home() {
  const { modalState, openDownloadModal, closeModal } = useEmailCapture();
  const { isOpen: isVideoOpen, closeModal: closeVideoModal } = useVideoModal();

  return (
    <div className="min-h-screen max-w-7xl mx-auto w-full overflow-x-hidden bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <main className="container mx-auto px-4 pt-22">
        {/* Video Banner Section */}
        <EmergeAnimation delay={100}>
          <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl">
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/demo.mp4" type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-500 to-neutral-900"></div>
            </video>

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              {/* Logo and Title */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
                  Type Less. Think More.
                </h1>
                <p className="font-medium text-sm md:text-sm lg:text-lg text-neutral-400 max-w-2xl mx-auto">
                  Anytime. Anywhere.
                </p>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8">
                <Button
                  variant="default"
                  size="lg"
                  className="flex items-center justify-center hover:scale-99 transition-all duration-300"
                  onClick={openDownloadModal}
                >
                  <FaApple className="w-4 h-4 md:w-5 md:h-5 mr-1" />
                  Download for Free
                </Button>
              </div>
            </div>
          </section>
        </EmergeAnimation>

        {/* Use Cases Section */}
        <section className="mt-24 md:mt-32 mb-24">
          <EmergeAnimation delay={100}>
            <div className="max-w-2xl mx-auto mb-18 space-y-4">
              <h2 className="text-2xl md:text-3xl text-neutral-100 font-medium text-center">
                Instant thoughts to output
              </h2>
              <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto text-center">
                Designed for people who think faster than keyboards.
              </p>
            </div>
          </EmergeAnimation>
          <div className="space-y-6 md:space-y-12">
            <UseCaseCard
              title="Email & Messaging"
              description="Speak your thoughts and instantly turn them into clean, professional messages; no editing marathon needed."
              mediaType="video"
              mediaSrc="/videos/email.mov"
              delay={500}
            />

            <UseCaseCard
              title="Code by Voice"
              description="Talk through logic, functions, and changes while Romo structures clean, editable code. Surprisingly natural, especially in flow."
              mediaType="video"
              mediaSrc="/videos/coding.mov"
              reverse={true}
              delay={400}
            />

            <UseCaseCard
              title="Note Taking"
              description="Capture ideas in real time. Perfect for meetings, research, and flashes of inspiration—when typing slows you down."
              mediaType="video"
              mediaSrc="/videos/notion.mov"
              delay={300}
            />

            <UseCaseCard
              title="Smart Search"
              description="Say detailed search queries and jump straight to relevant results. Long-tail searches without fighting the keyboard."
              mediaType="video"
              mediaSrc="/videos/search.mov"
              reverse={true}
              delay={600}
            />

            <UseCaseCard
              title="Prompt by Voice"
              description="Stop typing long prompts. Speak them naturally—Romo formats, expands, and makes them prompt-engineer-clean."
              mediaType="video"
              mediaSrc="/videos/chat.mov"
              delay={700}
            />
          </div>
        </section>

        {/* Footer Section */}
        <footer className="text-center mt-12 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-sm font-bold text-white">Romo</span>
          </div>
          <p className="text-xs text-gray-400 mb-1">
            We value your privacy, no data collected!
          </p>
          <p className="text-xs text-gray-500">
            &copy; 2025 Romo. All rights reserved.
          </p>
        </footer>
      </main>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        interestType={modalState.interestType}
        title={modalState.title}
        description={modalState.description}
        ctaText={modalState.ctaText}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={closeVideoModal}
        videoUrl="https://romo-app-2025.s3.us-west-1.amazonaws.com/romo-demo.mp4"
      />
    </div>
  );
}
