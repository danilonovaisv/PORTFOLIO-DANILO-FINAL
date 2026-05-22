'use client';

import React, { forwardRef } from 'react';
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
  };

/**
 * Native breakpoint switching via <source media>.
 * Browser picks correct source at parse time — no JS hydration, no re-mount, no AbortError storm.
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
      className = '',
      objectPosition,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const poster = mobilePoster || desktopPoster;
    const hasMobile = Boolean(mobileSrc && mobileSrc !== desktopSrc);
    const objectFitClass =
      fitPolicy === 'cover' ? 'object-cover' : 'object-contain';

    return (
      <video
        ref={ref}
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
