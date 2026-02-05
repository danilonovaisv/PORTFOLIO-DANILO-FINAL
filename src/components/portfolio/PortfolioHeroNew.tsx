// =============================================================================
// PortfolioHeroNew - Ghost Era v2.2
// Hero com video loop responsivo, atmosfera Ghost e animações etéreas
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { PORTFOLIO_CONTENT } from '@/config/content';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';


const HERO_POSTER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#040013"/>
        <stop offset="50%" stop-color="#0b0d3a"/>
        <stop offset="100%" stop-color="#040013"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#g)"/>
    <text x="50%" y="50%" fill="#4fe6ff" font-size="48" font-family="Arial, sans-serif" text-anchor="middle" dominant-baseline="middle" opacity="0.6">portfolio showcase</text>
  </svg>`
)}`;

export default function PortfolioHeroNew() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const desktopVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.portfolioDesktop,
    PORTFOLIO_CONTENT.hero.video.desktop ?? undefined
  );
  const mobileVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.portfolioMobile,
    PORTFOLIO_CONTENT.hero.video.mobile ?? undefined
  );

  // Seleciona o vídeo correto baseado no dispositivo
  const videoSrc = isMobile ? mobileVideo : desktopVideo;
  const shouldShowVideo = useMemo(
    () => Boolean(videoSrc) && !prefersReducedMotion && !videoFailed,
    [prefersReducedMotion, videoFailed, videoSrc]
  );

  return (
    <section
      id="portfolio-hero"
      aria-labelledby="portfolio-hero-heading"
      className="relative h-screen w-full overflow-hidden bg-background z-10"
    >
      {/* Video Background - Responsivo Desktop/Mobile */}
      <div className="absolute inset-0 z-0">
        {shouldShowVideo ? (
          <video
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            className="h-full w-full object-cover"
            onError={() => setVideoFailed(true)}
          >
            <source src={videoSrc} type="video/mp4" />

          </video>
        ) : (
          <Image
            src={HERO_POSTER}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-black/40 to-black/60" />

      {/* Ghost Atmospheric Radial Gradients - Enhanced */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 portfolio-hero-glow-primary opacity-60" />
        <div className="absolute inset-0 portfolio-hero-glow-accent opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Hero Content - Title Centered */}
      <div className="absolute bottom-0 left-0 w-full z-30 pb-10 md:pb-16 px-4 md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center">
          {/* Title - "portfólio showcase" - Centered */}
          <h1
            id="portfolio-hero-heading"
            className="text-4xl sm:text-6xl md:text-8xl tracking-tighter leading-none font-bold text-center"
          >
            <span className="text-[#4fe6ff] italic font-light mr-3 md:mr-6">portfólio</span>
            <span className="text-white font-bold">showcase</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
