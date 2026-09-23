// =============================================================================
// PortfolioHeroNew - Ghost Era v2.2
// Hero com video loop responsivo, atmosfera Ghost e animações etéreas
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import Image from 'next/image';
import { useMotionGate } from '@/hooks/useMotionGate';
import { ResponsiveVideo } from '@/components/ui/shared/ResponsiveVideo';
import { RESPONSIVE_VIDEOS } from '@/lib/video-assets';
import { COLORS } from '@/config/colors';

const HERO_POSTER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${COLORS.background}"/>
        <stop offset="50%" stop-color="${COLORS.neutral}"/>
        <stop offset="100%" stop-color="${COLORS.background}"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#g)"/>
    <text x="50%" y="50%" fill="${COLORS.bluePrimary}" font-size="48" font-family="Arial, sans-serif" text-anchor="middle" dominant-baseline="middle" opacity="0.6">portfolio showcase</text>
  </svg>`
)}`;

export default function PortfolioHeroNew() {
  const prefersReducedMotion = useMotionGate();

  return (
    <section
      id="portfolio-hero"
      aria-labelledby="portfolio-hero-heading"
      className="relative left-1/2 z-10 min-h-[42svh] md:min-h-[50svh] w-screen max-w-none -translate-x-1/2 overflow-hidden bg-background flex flex-col justify-end"
    >
      {/* Video Background - Responsivo Desktop/Mobile com Sincronização Realtime */}
      <div className="absolute inset-0 z-0">
        {!prefersReducedMotion ? (
          <ResponsiveVideo
            desktopSrc={RESPONSIVE_VIDEOS.portfolioHero.desktop}
            mobileSrc={RESPONSIVE_VIDEOS.portfolioHero.mobile}
            desktopPoster={HERO_POSTER}
            mobilePoster={HERO_POSTER}
            fitPolicy={RESPONSIVE_VIDEOS.portfolioHero.fitPolicy}
            objectPosition="center center"
            className="h-full w-full min-w-full max-w-none"
            preload="metadata"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={HERO_POSTER}
            alt="Fundo decorativo principal do portfólio"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>


      {/* Ghost Atmospheric Radial Gradients - Enhanced */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_55%,oklch(from_var(--color-primary)_l_c_h_/_0.12),transparent_50%)] blur-[40px] opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,oklch(from_var(--color-accent)_l_c_h_/_0.08),transparent_45%)] blur-[40px] opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Hero Content - Title Centered */}
      <div className="relative z-30 w-full px-4 pb-6 md:px-12 md:pb-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center">
          {/* Title - "portfólio showcase" - Centered */}
          <h1
            id="portfolio-hero-heading"
            className="flex max-w-full flex-col items-center justify-center gap-2 text-center text-[clamp(2.25rem,9vw,3.75rem)] font-bold leading-none tracking-tighter sm:text-5xl md:flex-row md:gap-6 md:text-7xl [text-shadow:0_12px_34px_rgba(0,0,0,0.55)]"
          >
            <div className="flex max-w-full flex-col items-center md:flex-row">
              <span className="text-bluePrimary mb-1 italic font-light md:mb-0 md:mr-4">
                portfólio
              </span>
              <span className="text-white font-bold">showcase</span>
            </div>
          </h1>
        </div>
      </div>
    </section>
  );
}
