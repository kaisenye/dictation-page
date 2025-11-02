'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import EmergeAnimation from './EmergeAnimation';

interface UseCaseCardProps {
  title: string;
  description: string | ReactNode;
  mediaType: 'image' | 'video';
  mediaSrc: string;
  mediaAlt?: string;
  reverse?: boolean;
  delay?: number;
  className?: string;
}

export default function UseCaseCard({
  title,
  description,
  mediaType,
  mediaSrc,
  mediaAlt = '',
  reverse = false,
  delay = 0,
  className = '',
}: UseCaseCardProps) {
  const textContent = (
    <div className="flex flex-col justify-center space-y-4 md:space-y-4">
      <h2 className="text-xl md:text-xl lg:text-2xl font-mediun text-white">
        {title}
      </h2>
      <div className="text-sm md:text-base text-neutral-400 leading-relaxed">
        {description}
      </div>
    </div>
  );

  const mediaContent = (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-md md:rounded-lg overflow-hidden">
      {mediaType === 'video' ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={mediaSrc} type="video/mp4" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"></div>
        </video>
      ) : (
        <Image
          src={mediaSrc}
          alt={mediaAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </div>
  );

  return (
    <EmergeAnimation delay={delay}>
      <section
        className={`grid grid-cols-1 md:grid-cols-20 gap-8 md:gap-12 items-center bg-stone-950 px-4 md:px-6 py-4 rounded-lg md:rounded-xl ${className}`}
      >
        {reverse ? (
          <>
            <div className="order-2 md:order-1 md:col-span-13">
              {mediaContent}
            </div>
            <div className="order-1 md:order-2 md:col-span-7">
              {textContent}
            </div>
          </>
        ) : (
          <>
            <div className="md:col-span-7">{textContent}</div>
            <div className="md:col-span-13">{mediaContent}</div>
          </>
        )}
      </section>
    </EmergeAnimation>
  );
}
