'use client';

import Image from 'next/image';

interface GhostFallbackProps {
  mode?: 'loading' | 'static';
}

export function GhostFallback({ mode = 'static' }: GhostFallbackProps) {
  return (
    <div
      className="absolute inset-0 z-[70] flex items-center justify-center overflow-hidden pointer-events-none"
      data-testid="ghost-fallback"
      aria-hidden="true"
    >
      <div className="hidden md:block absolute right-0 top-0 w-full h-full opacity-60">
        <Image
          src="/site.assets/3d/fallback-ghost.jpg"
          alt=""
          fill
          className="object-contain object-right"
          sizes="(min-width: 768px) 100vw, 0px"
          priority={mode === 'static'}
        />
      </div>

      <div className="block md:hidden absolute left-0 top-[10vh] w-full h-[80vh] opacity-50">
        <Image
          src="/site.assets/3d/fallback-ghost-mobile.png"
          alt=""
          fill
          className="object-contain object-left"
          sizes="(max-width: 767px) 100vw, 0px"
          priority={mode === 'static'}
        />
      </div>
    </div>
  );
}
