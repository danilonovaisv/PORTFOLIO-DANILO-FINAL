'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { useCallback, useMemo, useRef, useState } from 'react';
import { LANDING_PAGE_BACK, LANDING_PAGE_CTA } from '@/config/cta';
import { GHOST_EASE } from '@/config/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { resolveSiteAssetUrl } from '@/lib/projects/template-schema';
import type { MasterProjectTemplateV3Data } from '@/types/project-template';
import { useLandingBackLink } from '@/components/projects/templates/useLandingBackLink';
import { HeroBackCTA } from '@/components/ui/HeroBackCTA';
import { GhostMarkdown } from '@/components/ui/GhostMarkdown';
import { normalizeHexColor, mixHex } from '@/lib/colors';
import { getYouTubeId } from '@/lib/projects/asset-utils';
import { AssetLightbox } from '../AssetLightbox';
import type { ZoomAsset, IntroBodyBlock } from '../types';

const LiquidEther = dynamic(() => import('../LiquidEther'), { ssr: false });

const DEFAULT_ETHER_COLORS = ['#5227FF', '#FF9FFC', '#B19EEF'];

const buildEtherPalette = (baseHex: string): string[] => [
  baseHex,
  mixHex(baseHex, '#ffffff', 0.3),
  mixHex(baseHex, '#12002c', 0.22),
];

const toIntroBodyBlocks = (
  introBody?: MasterProjectTemplateV3Data['intro_body']
): IntroBodyBlock[] => {
  if (!Array.isArray(introBody)) return [];

  return introBody
    .map((item) => {
      if (typeof item === 'string') {
        if (!item.trim()) return null;
        return {
          type: 'text' as const,
          value: item,
          settings: { autoplay: false },
        };
      }

      if (!item || typeof item !== 'object') return null;
      const block = item as IntroBodyBlock;
      if (!block.value?.trim()) return null;

      return {
        type: block.type === 'video_youtube' ? 'video_youtube' : 'text',
        value: block.value,
        settings: {
          autoplay:
            typeof block.settings?.autoplay === 'boolean'
              ? block.settings.autoplay
              : block.type === 'video_youtube',
        },
      };
    })
    .filter(Boolean) as IntroBodyBlock[];
};

interface AlpaLayoutProps {
  project: MasterProjectTemplateV3Data;
  children: React.ReactNode;
  // We pass these down so AlpaContent can use them consistently
  revealInitial: any;
  revealVisible: any;
  openAsset: (asset: ZoomAsset, event: React.MouseEvent<HTMLButtonElement>) => void;
  zoomAsset: ZoomAsset | null;
  closeAsset: () => void;
}

export function AlpaLayout({
  project,
  children,
  revealInitial,
  revealVisible,
  openAsset,
  zoomAsset,
  closeAsset,
}: AlpaLayoutProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const backHref = useLandingBackLink();

  const introBlocks = useMemo(() => {
    const structured = toIntroBodyBlocks(project.intro_body);
    if (structured.length > 0) return structured;

    if (project.project_summary?.trim()) {
      return [
        {
          type: 'text' as const,
          value: project.project_summary,
          settings: { autoplay: false },
        },
      ];
    }

    return [];
  }, [project.intro_body, project.project_summary]);

  const accentColor = normalizeHexColor(
    project.theme_color || project.highlight_color,
    '#0048ff'
  );
  const etherColors = project.theme_color
    ? buildEtherPalette(accentColor)
    : DEFAULT_ETHER_COLORS;

  const heroLogo = project.hero_logo_image?.src
    ? resolveSiteAssetUrl(project.hero_logo_image.src)
    : '';

  return (
    <article className="template-alpa relative min-h-screen bg-background text-text">
      <style jsx global>{`
        /* Garantir que assets em ALPA tenham cantos retos */
        .template-alpa :where(img, video, figure) {
          border-radius: 0 !important;
        }

        .template-alpa .alpa-circle {
          border-radius: 9999px !important;
        }
      `}</style>

      {prefersReducedMotion ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-linear-to-b from-abyssStart via-abyssMid to-background"
        />
      ) : (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <LiquidEther
            colors={etherColors}
            mouseForce={12}
            isViscous={false}
            iterationsPoisson={16}
            autoSpeed={0.1}
            autoIntensity={0.8}
            isBounce={false}
            autoDemo
            className="h-full w-full"
          />
        </div>
      )}

      <div className="relative z-10">
        <div role="region" aria-label="Conteúdo do projeto">
          <section className="relative flex min-h-[82vh] flex-col items-center justify-center overflow-hidden py-24 text-center">
            <div className="std-grid relative z-10 mx-auto w-full">
              <motion.div
                className="mx-auto flex max-w-5xl flex-col items-center gap-6"
                initial={revealInitial}
                animate={revealVisible}
                transition={{ duration: 0.7, ease: GHOST_EASE }}
              >
                {heroLogo ? (
                  <div className="relative h-20 w-40 md:h-28 md:w-64">
                    <Image
                      src={heroLogo}
                      alt={
                        project.hero_logo_image?.alt ||
                        `Logo de ${project.project_title}`
                      }
                      fill
                      sizes="256px"
                      className="object-contain"
                    />
                  </div>
                ) : null}

                <h1 className="max-w-5xl text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
                  {project.project_title}
                </h1>

                {project.project_subtitle ? (
                  <p className="max-w-3xl text-lg leading-relaxed text-white/85 md:text-2xl">
                    {project.project_subtitle}
                  </p>
                ) : null}

                <div
                  className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: mixHex(accentColor, '#ffffff', 0.4) }}
                >
                  {project.project_client ? (
                    <span>{project.project_client}</span>
                  ) : null}
                  {project.project_year ? (
                    <span>{project.project_year}</span>
                  ) : null}
                  {project.project_tags.map((tag, tagIndex) => (
                    <span key={`${project.project_slug}-${tag}-${tagIndex}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="pointer-events-auto absolute bottom-6 left-0 right-0 z-20 sm:bottom-8">
              <div className="flex justify-start px-4 md:px-8">
                <HeroBackCTA href={backHref} label={LANDING_PAGE_BACK.label} />
              </div>
            </div>
          </section>

          <motion.section
            className="std-grid py-14 md:py-20"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.64, ease: GHOST_EASE }}
          >
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
                {project.intro_headline || project.project_title}
              </h2>
              {introBlocks.map((block, paragraphIndex) => {
                if (block.type === 'video_youtube') {
                  const videoId = getYouTubeId(block.value);
                  if (!videoId) return null;

                  const shouldAutoplay = block.settings?.autoplay ?? true;
                  const autoplayParams = shouldAutoplay
                    ? 'autoplay=1&mute=1&loop=1'
                    : 'autoplay=0&mute=1&loop=0';

                  return (
                    <div
                      key={`intro-video-${paragraphIndex}`}
                      className="w-full max-w-3xl overflow-hidden bg-black/40"
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?${autoplayParams}&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`}
                        title={`Vídeo do projeto ${project.project_title}`}
                        className="aspect-video h-full w-full border-0"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  );
                }

                return (
                  <GhostMarkdown
                    key={`intro-md-${paragraphIndex}`}
                    content={block.value}
                    className="max-w-3xl"
                    proseClassName="prose-headings:text-bluePrimary prose-p:text-white/82"
                  />
                );
              })}
            </div>
          </motion.section>

          {children}

          <motion.section
            id="project-contact-alpa"
            className="std-grid pb-24 pt-10 text-center md:pb-28"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.62, ease: GHOST_EASE }}
          >
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5">
              <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
                Vamos criar o próximo projeto?
              </h2>
              <div className="relative block w-fit">
                <AntigravityCTA
                  href={LANDING_PAGE_CTA.href}
                  text={LANDING_PAGE_CTA.label}
                  color={LANDING_PAGE_CTA.color}
                  className="relative"
                />
              </div>
              <HeroBackCTA
                href={backHref}
                label={LANDING_PAGE_BACK.label}
                size="compact"
              />
            </div>
          </motion.section>
        </div>
      </div>

      <AssetLightbox asset={zoomAsset} onClose={closeAsset} />
    </article>
  );
}
