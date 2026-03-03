'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';

import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { ABOUT_CONTENT } from '@/config/content';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import { BRAND } from '@/config/brand';

import { motionTokens } from '@/config/about-motion';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';

/** SSR-safe breakpoint hook — returns true when viewport is ≤ 767px (mobile) */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

export function AboutClosing() {
  const prefersReducedMotion = useMotionGate();
  const isMobile = useIsMobile();

  // Closing Assets
  const closingVideoDesk = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.closingDesktop
  );
  const closingVideoMobile = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.closingMobile
  );
  const posterDesk = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.homeManifestoPosterDesk,
    BRAND.assets.video.manifestoPosterDesk
  );
  const posterMobile = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.homeManifestoPosterMobile,
    BRAND.assets.video.manifestoPosterMobile
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  // Resume play if source changes and not reduced motion
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Safe to ignore autoplay errors (usually permissions)
      });
    }
  }, [isMobile, prefersReducedMotion]);

  const activeVideo = isMobile
    ? (closingVideoMobile || closingVideoDesk)
    : closingVideoDesk;

  const activePoster = isMobile
    ? (posterMobile || posterDesk || DEFAULT_VIDEO_POSTER)
    : (posterDesk || DEFAULT_VIDEO_POSTER);

  return (
    <section
      className="std-grid bg-background py-20 md:py-32"
      aria-label="Fechamento do Manifesto"
    >
      <motion.div
        variants={motionTokens.fadeGhost}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: false, margin: '-80px' }}
        className="w-full flex flex-col items-center text-center"
      >
        {/* Bloco 1: Título Principal e Linhas */}
        <div className="w-full">
          <div className="mb-10 h-px w-full bg-blueAccent/30" />
          <h2 className="font-display text-[clamp(40px,5vw,48px)] font-bold leading-tight text-white max-w-[800px] mx-auto text-center">
            Hoje sou{' '}
            <span className="text-bluePrimary">Diretor de Criação</span>,
            <br />
            com mais de{' '}
            <span className="text-bluePrimary">10 anos de estrada.</span>
          </h2>
          <div className="mt-10 h-px w-full bg-blueAccent/30" />
        </div>

        {/* Bloco 2: Frase 1 e Vídeo */}
        <div className="mt-16 md:mt-20 flex flex-col items-center">
          <p className="text-[clamp(20px,2vw,24px)] leading-normal text-text opacity-92 max-w-[700px] mx-auto text-center">
            Já liderei marcas, agências, eventos e{' '}
            <span className="text-bluePrimary">criei experiências</span> para
            todos os canais.
          </p>

          {/* Vídeo em Loop - Ghost Orchestration Logic */}
          <div className="mt-12 md:mt-11 w-full max-w-[1680px] mx-auto overflow-hidden rounded-lg bg-black/30 relative">
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/15 to-transparent pointer-events-none" />

            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={activeVideo ?? ''}
              autoPlay={!prefersReducedMotion}
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Demonstração visual de experiências"
              poster={activePoster}
            >
              <track
                kind="captions"
                src={DEFAULT_CAPTIONS}
                srcLang="pt-BR"
                label="Português"
              />
            </video>
          </div>
        </div>

        {/* Bloco 3: Frase 2 e CTAs */}
        <div className="mt-16 md:mt-20 flex flex-col items-center">
          <p className="text-[clamp(20px,2vw,24px)] leading-normal text-text opacity-92">
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
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
