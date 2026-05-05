'use client';

import React from 'react';

interface PreloaderProps {
  preloaderRef: React.RefObject<HTMLDivElement | null>;
  progressBarRef: React.RefObject<HTMLDivElement | null>;
}

export const Preloader: React.FC<PreloaderProps> = ({
  preloaderRef,
  progressBarRef,
}) => {
  return (
    <div
      ref={preloaderRef}
      className="preloader-overlay absolute inset-0 z-50 flex items-center justify-center bg-[#070b15] transition-opacity"
      style={{
        transitionDuration: 'var(--duration-normal)',
        transitionTimingFunction: 'var(--ease-ghost)',
      }}
    >
      <div className="flex flex-col items-center gap-4 w-64">
        <div className="h-0.5 w-full overflow-hidden bg-white/5">
          <div
            ref={progressBarRef}
            className="h-full bg-[#0048ff] transition-all"
            style={{
              transitionDuration: 'var(--duration-fast)',
              transitionTimingFunction: 'var(--ease-ghost)',
              width: '0%',
            }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
          Initializing Spectral System
        </span>
      </div>
    </div>
  );
};
