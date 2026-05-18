'use client';

import { useEffect, useRef, useState } from 'react';
import { m } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';

import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { ABOUT_CONTENT } from '@/config/content';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import { BRAND } from '@/config/brand';

import {
  ghostReveal,
  ghostRevealSimple,
  viewportConfig,
} from '@/config/motion';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';

import { getAssetUrl } from '@/lib/utils';
import { ResponsiveVideo } from '@/components/ui/shared/ResponsiveVideo';
import { RESPONSIVE_VIDEOS } from '@/lib/video-assets';
export function AboutClosing() {
  const prefersReducedMotion = useMotionGate();

  // Closing Assets
  const closingVideoDesk = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.closingDesktop,
    BRAND.assets.video.aboutClosing
  );
  const closingVideoMobile = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.closingMobile,
    BRAND.assets.video.aboutClosingMobile
  );
  const posterDesk = DEFAULT_VIDEO_POSTER;
  const posterMobile = DEFAULT_VIDEO_POSTER;

  const activePosterDesk = getAssetUrl(posterDesk, {
    width: 1920,
    quality: 60,
  });
  const activePosterMobile = getAssetUrl(posterMobile, {
    width: 1080,
    quality: 60,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Resume play if not reduced motion
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion && !hasVideoError) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Safe to ignore autoplay errors (usually permissions)
      });
    }
  }, [
    prefersReducedMotion,
    hasVideoError,
    closingVideoDesk,
    closingVideoMobile,
  ]);

  return (
    <section
      className="std-grid bg-background py-20 md:py-32"
      aria-labelledby="about-closing-title"
    >
      <m.div
        variants={prefersReducedMotion ? ghostRevealSimple : ghostReveal}
        initial={prefersReducedMotion ? 'hidden' : 'hidden'}
        whileInView="visible"
        viewport={viewportConfig}
        className="w-full flex flex-col items-center text-center"
      >
        {/* Bloco 1: Título Principal e Linhas */}
        <div className="w-full">
          <div className="mb-10 h-px w-full bg-blueAccent/30" />
          <h2
            id="about-closing-title"
            className="font-sans text-display text-[clamp(40px,5vw,48px)] font-bold leading-tight text-text max-w-[800px] mx-auto text-center"
          >
            Hoje sou{' '}
            <span className="text-bluePrimary">Diretor de Criação</span>,
            <br />
            com mais de{' '}
            <span className="text-bluePrimary">10 anos de estrada.</span>
          </h2>
          <div className="mt-10 h-px w-full bg-blueAccent/30" />
        </div>

        {/* Bloco 2: Frase 1 e Vídeo */}
        <div className="mt-16 flex w-full flex-col items-center md:mt-20">
          <p className="text-[clamp(20px,2vw,24px)] leading-normal text-text opacity-90 max-w-[700px] mx-auto text-center">
            Já liderei marcas, agências, eventos e{' '}
            <span className="text-bluePrimary">criei experiências</span> para
            todos os canais.
          </p>

          {/* Vídeo em Loop - Ghost Orchestration Logic */}
          <div
            className="relative mt-12 flex aspect-[9/16] min-h-[180px] w-screen items-center justify-center overflow-hidden bg-background/30 md:mt-11 md:aspect-video md:min-h-[360px]"
            style={{
              marginLeft: 'calc((min(100vw, 1680px) - 100vw) / 2)',
              // The poster is handled natively by the ResponsiveVideo component
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-background/30 via-background/15 to-transparent pointer-events-none" />

            {!hasVideoError && (
              <ResponsiveVideo
                ref={videoRef}
                className="relative z-[var(--z-layer-content)] block h-full w-full object-cover"
                desktopSrc={
                  closingVideoDesk || RESPONSIVE_VIDEOS.aboutClosing.desktop
                }
                mobileSrc={
                  closingVideoMobile || RESPONSIVE_VIDEOS.aboutClosing.mobile
                }
                desktopPoster={activePosterDesk}
                mobilePoster={activePosterMobile}
                autoPlay={!prefersReducedMotion}
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Demonstração visual de experiências"
                onError={() => setHasVideoError(true)}
              >
                <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
              </ResponsiveVideo>
            )}
          </div>
        </div>

        {/* Bloco 3: Frase 2 e CTAs */}
        <div className="mt-16 md:mt-20 flex flex-col items-center">
          <p className="text-[clamp(20px,2vw,24px)] leading-normal text-text opacity-90">
            Agora, quero criar algo que permaneça —{' '}
            <span className="text-bluePrimary">com você.</span>
          </p>

          <div className="mt-12 flex flex-row flex-wrap items-center justify-center gap-6 md:mt-16 md:gap-8">
            {ABOUT_CONTENT.closing.ctas.map((cta, index) => (
              <AntigravityCTA
                key={index}
                href={cta.href}
                text={cta.label}
                className="relative"
                target={cta.external ? '_blank' : undefined}
                rel={cta.external ? 'noopener noreferrer' : undefined}
              />
            ))}
          </div>
        </div>
      </m.div>
    </section>
  );
}
