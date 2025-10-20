'use client';

import { Button } from '@/components/ui/button';
import { FaApple, FaPlay } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import EmailCaptureModal from '@/components/EmailCaptureModal';
import VideoModal from '@/components/VideoModal';
import { useEmailCapture } from '@/hooks/useEmailCapture';
import { useVideoModal } from '@/hooks/useVideoModal';
import EmergeAnimation from '@/components/EmergeAnimation';

export default function Home() {
  const { modalState, openDownloadModal, closeModal } = useEmailCapture();
  const {
    isOpen: isVideoOpen,
    openModal: openVideoModal,
    closeModal: closeVideoModal,
  } = useVideoModal();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <main className="container mx-auto px-4 pt-22">
        {/* Video Banner Section */}
        <EmergeAnimation delay={100}>
          <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-[3rem]">
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"></div>
            </video>

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              {/* Logo and Title */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Type Less. Think More.
                </h1>
                <p className="font-semibold text-sm md:text-sm lg:text-lg text-neutral-400 max-w-2xl mx-auto">
                  anytime. anywhere.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center hover:scale-98 transition-all duration-300"
                  onClick={openVideoModal}
                >
                  <FaPlay className="size-3 mr-1" />
                  Watch Demo
                </Button>
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

        {/* Footer Section */}
        <footer className="text-center mt-12 mb-12">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-sm font-bold text-white">romo.</span>
          </div>
          <p className="text-xs text-gray-400 mb-1">
            we value your privacy, no data collected!
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
