import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center mt-auto w-full">
      <p className="text-xs text-gray-400 mb-1">
        We value your privacy, no data being sold!
      </p>
      <p className="text-xs text-gray-500 mb-8">
        &copy; {new Date().getFullYear()} Romo. All rights reserved.
      </p>
      <div className="relative flex items-center justify-center p-0 overflow-hidden pointer-events-none select-none">
        <span className="text-[120px] sm:text-[180px] lg:text-[320px] font-bold text-neutral-100 leading-none tracking-tighter">
          ROMO
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
    </footer>
  );
}
