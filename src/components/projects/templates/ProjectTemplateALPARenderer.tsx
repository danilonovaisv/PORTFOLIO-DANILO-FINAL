'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LANDING_PAGE_BACK, LANDING_PAGE_CTA } from '@/config/cta';
import { GHOST_EASE } from '@/config/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { resolveSiteAssetUrl } from '@/lib/projects/template-schema';
import type { LandingPageBlock } from '@/types/landing-page';
import type { MasterProjectTemplateV3Data } from '@/types/project-template';
import { useLandingBackLink } from '@/components/projects/templates/useLandingBackLink';
import { HeroBackCTA } from '@/components/ui/HeroBackCTA';
import { GhostMarkdown } from '@/components/ui/GhostMarkdown';

// Extracted Components
import { AssetLightbox } from './AssetLightbox';
import { AssetInteractive } from './AssetInteractive';
import { BlockTextMd } from './BlockTextMd';

// Extracted Utils & Types
import { normalizeHexColor, mixHex } from '@/lib/colors';
import { getAssetKind, getYouTubeId } from '@/lib/projects/asset-utils';
import type { ZoomAsset, IntroBodyBlock } from './types';

const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false });
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

export default function ProjectTemplateALPARenderer({
  project,
}: {
  project: MasterProjectTemplateV3Data;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const backHref = useLandingBackLink();
  const [zoomAsset, setZoomAsset] = useState<ZoomAsset | null>(null);
  const lastFocusedTriggerRef = useRef<HTMLElement | null>(null);

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

  const revealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 18 };
  const revealVisible = { opacity: 1, y: 0 };

  const heroLogo = project.hero_logo_image?.src
    ? resolveSiteAssetUrl(project.hero_logo_image.src)
    : '';

  const openAsset = useCallback(
    (asset: ZoomAsset, event: React.MouseEvent<HTMLButtonElement>) => {
      lastFocusedTriggerRef.current = event.currentTarget;
      setZoomAsset(asset);
    },
    []
  );

  const closeAsset = useCallback(() => {
    setZoomAsset(null);
    lastFocusedTriggerRef.current?.focus();
  }, []);

  const renderDynamicBlock = (block: LandingPageBlock, index: number) => {
    const kind = getAssetKind(block.content.media, block.content.mediaType);
    const kind2 = getAssetKind(block.content.media2, block.content.mediaType2);
    const blockDelay = prefersReducedMotion ? 0 : index * 0.02;

    switch (block.type) {
      case 'text':
        return (
          <motion.section
            key={block.id}
            className="std-grid py-14 md:py-20"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: GHOST_EASE, delay: blockDelay }}
          >
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 text-center">
              <BlockTextMd
                text={block.content.text}
                textConfig={block.content.textConfig}
              />
            </div>
          </motion.section>
        );

      case 'image':
      case 'video':
      case 'video-autoplay':
        return (
          <motion.section
            key={block.id}
            className="std-grid py-8 md:py-12"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: GHOST_EASE, delay: blockDelay }}
          >
            <AssetInteractive
              src={block.content.media}
              alt={block.content.alt}
              kind={kind}
              poster={block.content.poster}
              videoAutoplay={block.type === 'video-autoplay'}
              displayMode="full"
              prefersReducedMotion={prefersReducedMotion}
              onOpen={openAsset}
            />
          </motion.section>
        );

      case 'image-text':
      case 'video-text': {
        return (
          <motion.section
            key={block.id}
            className="std-grid py-10 md:py-14"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: GHOST_EASE, delay: blockDelay }}
          >
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <AssetInteractive
                src={block.content.media}
                alt={block.content.alt}
                kind={kind}
                poster={block.content.poster}
                videoAutoplay={block.type === 'video-text'}
                prefersReducedMotion={prefersReducedMotion}
                onOpen={openAsset}
              />
              <div className="flex w-full flex-col gap-4 text-center md:text-left">
                <BlockTextMd
                  text={block.content.text}
                  textConfig={block.content.textConfig}
                  alignClass="text-center md:text-left"
                />
              </div>
            </div>
          </motion.section>
        );
      }

      case 'text-image': {
        return (
          <motion.section
            key={block.id}
            className="std-grid py-10 md:py-14"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: GHOST_EASE, delay: blockDelay }}
          >
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div className="flex w-full flex-col gap-4 text-center md:text-right">
                <BlockTextMd
                  text={block.content.text}
                  textConfig={block.content.textConfig}
                  alignClass="text-center md:text-right"
                />
              </div>
              <AssetInteractive
                src={block.content.media}
                alt={block.content.alt}
                kind={kind}
                poster={block.content.poster}
                prefersReducedMotion={prefersReducedMotion}
                onOpen={openAsset}
              />
            </div>
          </motion.section>
        );
      }

      case 'image-image':
      case 'image-video':
        return (
          <motion.section
            key={block.id}
            className="std-grid py-8 md:py-12"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: GHOST_EASE, delay: blockDelay }}
          >
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <AssetInteractive
                src={block.content.media}
                alt={block.content.alt}
                kind={kind}
                poster={block.content.poster}
                prefersReducedMotion={prefersReducedMotion}
                onOpen={openAsset}
              />
              <AssetInteractive
                src={block.content.media2}
                alt={block.content.alt2 || block.content.alt}
                kind={kind2}
                poster={block.content.poster2}
                videoAutoplay={block.type === 'image-video'}
                prefersReducedMotion={prefersReducedMotion}
                onOpen={openAsset}
              />
            </div>
          </motion.section>
        );

      case 'quote-band': {
        const bandColor = normalizeHexColor(
          block.content.bandColor,
          accentColor
        );
        return (
          <motion.section
            key={block.id}
            className="alpa-quote-band w-full px-4 py-20 md:px-8 md:py-32 flex items-center justify-center !ml-0 !mr-0"
            style={{ backgroundColor: mixHex(bandColor, '#050013', 0.18) }}
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: GHOST_EASE, delay: blockDelay }}
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 text-center">
              <p className="text-3xl font-semibold leading-tight text-white md:text-6xl">
                {block.content.text || 'Criar com intenção.'}
              </p>
              {block.content.text2 ? (
                <p className="max-w-4xl whitespace-pre-line text-base text-white/86 md:text-xl">
                  {block.content.text2}
                </p>
              ) : null}
            </div>
          </motion.section>
        );
      }

      default:
        return null;
    }
  };

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

          <section
            aria-labelledby="dynamic-content-v3-heading"
            className="pb-12 md:pb-16"
          >
            <h2 id="dynamic-content-v3-heading" className="sr-only">
              Conteúdo dinâmico da landing
            </h2>
            {project.gallery_grid.map((block, index) =>
              renderDynamicBlock(block, index)
            )}
          </section>

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
