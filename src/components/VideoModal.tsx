'use client';

import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-[1200px] mx-4 animate-in zoom-in-95 duration-300 ease-out">
        {/* Video container */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
          {/* Video element */}
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[90vh]"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          >
            <source src={videoUrl} type="video/mp4" />
            <div className="flex items-center justify-center h-64 bg-neutral-900 text-white">
              <div className="text-center">
                <Play className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
                <p className="text-neutral-400">
                  Video cannot be played in this browser
                </p>
              </div>
            </div>
          </video>
        </div>
      </div>
    </div>
  );
}
