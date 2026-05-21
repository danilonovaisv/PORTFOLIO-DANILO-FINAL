'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export type ResponsiveVideoProps =
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    desktopSrc: string;
    mobileSrc?: string;
    desktopPoster?: string;
    mobilePoster?: string;
  };

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
    const isMobile = useMediaQuery('(max-width: 767px)');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const hasMobile = mobileSrc && mobileSrc !== desktopSrc;

    // Define o poster ativo com base no breakpoint após a montagem no cliente
    const activePoster =
      mounted && isMobile && mobilePoster
        ? mobilePoster
        : desktopPoster || mobilePoster;

    // Chave dinâmica baseada no estado de montagem e no breakpoint para forçar o browser
    // a reavaliar as tags source e carregar a mídia responsiva adequada no resize dinâmico.
    const videoKey =
      mounted && hasMobile ? (isMobile ? 'mobile' : 'desktop') : 'ssr';

    return (
      <video
        key={videoKey}
        ref={ref}
        poster={activePoster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={className}
        {...rest}
      >
        {hasMobile ? (
          <>
            <source src={mobileSrc} media="(max-width: 767px)" />
            <source src={desktopSrc} media="(min-width: 768px)" />
          </>
        ) : (
          <source src={desktopSrc} />
        )}
        {children}
      </video>
    );
  }
);

ResponsiveVideo.displayName = 'ResponsiveVideo';
