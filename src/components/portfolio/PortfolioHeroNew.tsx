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
import AntigravityCTA from '@/components/ui/AntigravityCTA';

export default function PortfolioHeroNew() {
  const isMobile = useMediaQuery('(max-width: 768px)');
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

      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/70 via-transparent to-black/90" />

      {/* Ghost Atmospheric Radial Gradients - Enhanced */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 portfolio-hero-glow-primary opacity-60" />
        <div className="absolute inset-0 portfolio-hero-glow-accent opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Hero Content - Title & CTA Fixed Bottom */}
      <div className="absolute bottom-0 left-0 w-full z-30 pb-8 md:pb-12">
        <div className="std-grid items-end gap-6 md:gap-0">
          {/* Title - Left aligned on desktop, Centered/Left on mobile */}
          <div className="col-span-full md:col-span-7 lg:col-span-8 flex flex-col items-center md:items-start text-center md:text-left">
            <h1
              id="portfolio-hero-heading"
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none"
            >
              <span className="text-bluePrimary italic font-light mr-2 md:mr-4">
                portfólio
              </span>
              <span className="text-white font-bold">showcase</span>
            </h1>
          </div>

          {/* CTA - Right aligned on desktop, Centered on mobile */}
          <div className="col-span-full md:col-span-6 lg:col-span-5 flex justify-center md:justify-end pb-2">
            <AntigravityCTA
              href="#contact" // Âncora para a seção de contato na mesma página (padrão para páginas internas)
              text="vamos trabalhar juntos"
              className="scale-90 md:scale-100 origin-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
