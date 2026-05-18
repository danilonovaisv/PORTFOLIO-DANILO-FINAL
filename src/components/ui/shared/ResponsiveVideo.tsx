'use client';

import React, { forwardRef } from 'react';

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
    // Para resolver o FCP sem flash, o poster do desktop é o padrão
    // Em dispositivos reais, o <source media> lida com o vídeo correto nativamente.

    const hasMobile = mobileSrc && mobileSrc !== desktopSrc;

    return (
      <video
        ref={ref}
        poster={desktopPoster || mobilePoster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={className}
        {...rest}
      >
        {/* Nativamente resolve SSR e evita remount de React ao hidratar */}
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
