'use client';

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

export type ResponsiveVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  desktopSrc: string;
  mobileSrc: string;
  desktopPoster?: string;
  mobilePoster?: string;
};

export const ResponsiveVideo = forwardRef<HTMLVideoElement, ResponsiveVideoProps>(
  (
    {
      desktopSrc,
      mobileSrc,
      desktopPoster,
      mobilePoster,
      autoPlay = true,
      muted = true,
      loop = true,
      playsInline = true,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLVideoElement | null>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement);
    
    // Default to desktop poster for SSR to avoid hydration mismatch,
    // we'll swap it to mobile poster (if necessary) post-hydration.
    const [currentPoster, setCurrentPoster] = useState<string | undefined>(desktopPoster);

    useEffect(() => {
      if (!desktopPoster && !mobilePoster) return;

      const mediaQuery = window.matchMedia('(max-width: 767px)');
      
      const handlePosterChange = (e: MediaQueryListEvent | MediaQueryList) => {
        if (e.matches) {
          setCurrentPoster(mobilePoster || desktopPoster);
        } else {
          setCurrentPoster(desktopPoster || mobilePoster);
        }
      };

      // Set initial post-hydration poster based on actual viewport
      handlePosterChange(mediaQuery);

      // Listen for changes
      mediaQuery.addEventListener('change', handlePosterChange);
      return () => mediaQuery.removeEventListener('change', handlePosterChange);
    }, [desktopPoster, mobilePoster]);

    useEffect(() => {
      // Browsers often don't hot-swap <source> media query changes without `.load()`.
      // We force a re-load when crossing the 767px breakpoint.
      const mediaQuery = window.matchMedia('(max-width: 767px)');
      
      const handleSourceChange = () => {
        if (internalRef.current) {
          // Optional: store current time if we wanted seamless resume, 
          // but for looping background videos, a reset is usually acceptable.
          const isPaused = internalRef.current.paused;
          
          internalRef.current.load();
          
          if (!isPaused && autoPlay) {
            internalRef.current.play().catch(() => {
              // Ignore play interruptions
            });
          }
        }
      };

      mediaQuery.addEventListener('change', handleSourceChange);
      return () => mediaQuery.removeEventListener('change', handleSourceChange);
    }, [autoPlay]);

    return (
      <video
        ref={internalRef}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={className}
        poster={currentPoster}
        {...rest}
      >
        {/* Mobile source first for mobile-first processing where applicable */}
        <source src={mobileSrc} media="(max-width: 767px)" />
        <source src={desktopSrc} media="(min-width: 768px)" />
        {/* Fallback if media queries aren't evaluated correctly */}
        <source src={desktopSrc} />
        {children}
      </video>
    );
  }
);

ResponsiveVideo.displayName = 'ResponsiveVideo';
