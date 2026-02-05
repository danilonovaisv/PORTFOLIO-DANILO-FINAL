'use client';

import { motion, useReducedMotion } from 'framer-motion';

import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { ABOUT_CONTENT } from '@/config/content';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

import { motionTokens } from '../shared/motion';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';

export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();
  const desktopVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.beliefs.skillsVideo,
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/VIDEO-SKILLS-FINAL_compressed.mp4'
  );
  const mobileVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.about.beliefs.skillsVideoMobile,
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/VIDEO-SKILLS-MOBILE-FINAL.mp4'
  );

  return (
    <section
      className="std-grid bg-background py-20 md:py-32"
      aria-label="Fechamento do Manifesto"
    >
      <motion.div
        variants={motionTokens.fadeGhost}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="w-full flex-col items-center text-center"
      >
        {/* Bloco 1: Título Principal e Linhas */}
        <div className="w-full">
          <div className="mb-10 h-px w-full bg-blueAccent/30" />
          <h2 className="font-display text-[clamp(40px,5vw,48px)] font-bold leading-tight text-white max-w-[800px]">
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

          {/* Vídeo em Loop - alinhado ao grid, com overlay para contraste */}
          <div className="mt-12 md:mt-11 w-full max-w-[1680px] mx-auto overflow-hidden rounded-lg bg-black/30 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/15 to-transparent pointer-events-none" />
            {/* Desktop Video */}
            <video
              className="hidden md:block w-full h-full object-cover"
              src={desktopVideo ?? ''}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Demonstração visual de experiências"
              poster={DEFAULT_VIDEO_POSTER}
            >
              <track
                kind="captions"
                src={DEFAULT_CAPTIONS}
                srcLang="pt-BR"
                label="Português"
                default
              />
            </video>
            {/* Mobile Video */}
            <video
              className="md:hidden w-full h-full object-cover"
              src={mobileVideo ?? desktopVideo ?? ''}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Demonstração visual de experiências"
              poster={DEFAULT_VIDEO_POSTER}
            >
              <track
                kind="captions"
                src={DEFAULT_CAPTIONS}
                srcLang="pt-BR"
                label="Português"
                default
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
                className="relative min-w-50"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
