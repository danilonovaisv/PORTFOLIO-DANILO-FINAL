// =============================================================================
// PortfolioHeroNew - Ghost Era v2.2
// Hero com video loop responsivo, atmosfera Ghost e animações etéreas
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import { PORTFOLIO_CONTENT } from '@/config/content';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

export default function PortfolioHeroNew() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const desktopVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.portfolioDesktop,
    PORTFOLIO_CONTENT.hero.video.desktop
  );
  const mobileVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.portfolioMobile,
    PORTFOLIO_CONTENT.hero.video.mobile
  );

  // Seleciona o vídeo correto baseado no dispositivo
  const videoSrc = isMobile ? mobileVideo : desktopVideo;

  return (
    <section
      id="portfolio-hero"
      aria-label="Portfolio Hero"
      className="relative h-[78vh] md:h-screen w-full overflow-hidden"
    >
      {/* Video Background - Responsivo Desktop/Mobile */}
      <div className="absolute inset-0 z-0">
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Main Gradient Overlay - Intenso nas bordas para legibilidade */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/70 via-black/30 to-black/70" />

      {/* Ghost Atmospheric Radial Gradients - Enhanced */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 portfolio-hero-glow-primary" />
        <div className="absolute inset-0 portfolio-hero-glow-accent" />
        <div className="absolute inset-0 portfolio-hero-glow-purple" />
        <div className="absolute inset-0 portfolio-hero-vignette" />
      </div>

      {/* Hero sem CTA; título e call-to-action movidos para a seção abaixo */}
    </section>
  );
}
