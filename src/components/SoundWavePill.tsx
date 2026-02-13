'use client';

import { useEffect, useRef, useState } from 'react';

interface SoundWavePillProps {
  isVisible: boolean;
  className?: string;
}

/**
 * SoundWavePill component - Animated pill-shaped sound wave visualization
 * Slides down when triggered and displays animated sound wave bars
 */
export default function SoundWavePill({
  isVisible,
  className = '',
}: SoundWavePillProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && !shouldAnimate) {
      // Start animation immediately
      setShouldAnimate(true);
    }
  }, [isVisible, shouldAnimate]);

  // Generate random heights for sound wave bars
  const generateWaveHeights = () => {
    return Array.from({ length: 6 }, () => Math.random() * 0.5 + 0.4);
  };

  const [waveHeights, setWaveHeights] = useState(generateWaveHeights());

  // Animate wave heights
  useEffect(() => {
    if (!shouldAnimate) return;

    const interval = setInterval(() => {
      setWaveHeights(generateWaveHeights());
    }, 150); // Update every 150ms for smooth animation

    return () => clearInterval(interval);
  }, [shouldAnimate]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ease-out ${
        shouldAnimate
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0'
      } ${className}`}
    >
      {/* Pill container */}
      <div className="relative bg-neutral-900 rounded-full px-4 py-2 md:px-6 md:py-3">
        {/* Sound wave bars */}
        <div className="flex items-center justify-center gap-1 md:gap-1.5 h-4 md:h-6">
          {waveHeights.map((height, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-sm transition-all duration-150 ease-out w-[4px] md:w-[5px] min-h-[3px] md:min-h-[4px]"
              style={{
                height: `${height * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
