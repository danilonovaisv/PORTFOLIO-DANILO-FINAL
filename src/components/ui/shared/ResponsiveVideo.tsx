'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export type ResponsiveVideoProps =
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    desktopSrc: string;
    mobileSrc?: string;
    desktopPoster?: string;
    mobilePoster?: string;
    breakpoint?: string;
    fitPolicy?: 'contain' | 'cover';
    objectPosition?: React.CSSProperties['objectPosition'];
    pauseOffscreen?: boolean;
  };

/**
 * Native breakpoint switching via <source media>.
 * Browser picks correct source at parse time — no JS hydration, no re-mount, no AbortError storm.
 * Includes optional IntersectionObserver viewport pause/play management.
 */
export const ResponsiveVideo = forwardRef<
  HTMLVideoElement,
  ResponsiveVideoProps
>(
  (
    {
      desktopSrc,
      mobileSrc,
      desktopPoster,
      mobilePoster,
      breakpoint = '(max-width: 767px)',
      fitPolicy = 'contain',
      autoPlay = true,
      muted = true,
      loop = true,
      playsInline = true,
      pauseOffscreen = true,
      className = '',
      objectPosition,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const innerRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLVideoElement);

    const poster = mobilePoster || desktopPoster;
    const hasMobile = Boolean(mobileSrc && mobileSrc !== desktopSrc);
    const objectFitClass =
      fitPolicy === 'cover' ? 'object-cover' : 'object-contain';

    useEffect(() => {
      const videoEl = innerRef.current;
      if (!videoEl || !pauseOffscreen || typeof IntersectionObserver === 'undefined') return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            if (!videoEl.paused) {
              videoEl.pause();
            }
          } else {
            if (videoEl.paused && autoPlay) {
              videoEl.play().catch(() => {});
            }
          }
        },
        { threshold: 0.05 }
      );

      observer.observe(videoEl);
      return () => observer.disconnect();
    }, [pauseOffscreen, autoPlay]);

    return (
      <video
        ref={innerRef}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={cn(objectFitClass, className)}
        style={{ objectPosition, ...style }}
        {...rest}
      >
        {hasMobile && (
          <source src={mobileSrc} media={breakpoint} type="video/mp4" />
        )}
        <source src={desktopSrc} type="video/mp4" />
        {children}
      </video>
    );
  }
);

ResponsiveVideo.displayName = 'ResponsiveVideo';

