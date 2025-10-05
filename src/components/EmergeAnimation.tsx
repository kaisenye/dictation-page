'use client';

import { useEffect, useState } from 'react';

interface EmergeAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function EmergeAnimation({
  children,
  delay = 0,
  duration = 600,
  className = '',
}: EmergeAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
