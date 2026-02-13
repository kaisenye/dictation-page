'use client';

import { useEffect, useRef, useState } from 'react';

interface LoopingVideoProps {
  src: string;
  webmSrc?: string; // Optional WebM version for better compression
  poster?: string; // Poster image shown while loading
  className?: string;
  preload?: 'none' | 'metadata' | 'auto';
  onLoadStart?: () => void;
  onCanPlay?: () => void;
}

/**
 * LoopingVideo component optimized for large video files
 * 
 * Features:
 * - Lazy loading with Intersection Observer
 * - Seamless looping (no controls, autoplay, muted)
 * - Poster image support
 * - Progressive loading strategy
 * - Multiple format support (MP4 + WebM)
 */
export default function LoopingVideo({
  src,
  webmSrc,
  poster,
  className = '',
  preload = 'none',
  onLoadStart,
  onCanPlay,
}: LoopingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Start loading when video is about to be visible
            if (videoRef.current && !hasStartedLoading) {
              setHasStartedLoading(true);
              videoRef.current.load();
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [hasStartedLoading]);

  // Handle video loading states
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      onLoadStart?.();
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      onCanPlay?.();
      // Ensure video plays when ready
      video.play().catch((error) => {
        console.warn('Video autoplay failed:', error);
      });
    };

    const handleLoadedData = () => {
      setIsLoading(false);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [onLoadStart, onCanPlay]);

  // Ensure video loops seamlessly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Loading overlay */}
      {isLoading && poster && (
        <div className="absolute inset-0 z-10">
          <img
            src={poster}
            alt="Video poster"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload={isInView ? 'auto' : preload}
        poster={poster}
      >
        {/* WebM source (better compression, load first if available) */}
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        {/* MP4 fallback */}
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
