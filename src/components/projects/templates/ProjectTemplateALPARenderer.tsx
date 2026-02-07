'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { ArrowLeft, Play, X } from 'lucide-react';
import { GHOST_EASE } from '@/config/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { resolveSiteAssetUrl } from '@/lib/projects/template-schema';
import type { LandingPageBlock } from '@/types/landing-page';
import type { MasterProjectTemplateV3Data } from '@/types/project-template';

const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false });
const DEFAULT_ETHER_COLORS = ['#5227FF', '#FF9FFC', '#B19EEF'];
const VIDEO_PATTERN = /\.(mp4|webm|ogg|mov)$/i;
const YOUTUBE_PATTERN =
  /(youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/)/i;

const normalizeHexColor = (value?: string, fallback = '#0048ff'): string => {
  if (!value) return fallback;
  const cleaned = value.trim();

  if (/^#[0-9a-fA-F]{3}$/.test(cleaned)) {
    const shortHex = cleaned.slice(1);
    return `#${shortHex
      .split('')
      .map((char) => char + char)
      .join('')}`.toLowerCase();
  }

  if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) {
    return cleaned.toLowerCase();
  }

  return fallback;
};

const hexToRgb = (hex: string) => {
  const normalized = normalizeHexColor(hex, '#0048ff').slice(1);
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const mixHex = (fromHex: string, toHex: string, amount: number): string => {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);
  return rgbToHex(
    from.r + (to.r - from.r) * amount,
    from.g + (to.g - from.g) * amount,
    from.b + (to.b - from.b) * amount
  );
};

const buildEtherPalette = (baseHex: string): string[] => [
  baseHex,
  mixHex(baseHex, '#ffffff', 0.3),
  mixHex(baseHex, '#12002c', 0.22),
];

type AssetKind = 'image' | 'video' | 'youtube';

type ZoomAsset = {
  src: string;
  kind: AssetKind;
  alt: string;
  poster?: string;
  youtubeId?: string;
};

type ProjectTemplateALPARendererProps = {
  project: MasterProjectTemplateV3Data;
};

const getYouTubeId = (url: string): string | null => {
  const expression =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(expression);
  return match && match[2].length === 11 ? match[2] : null;
};

const getAssetKind = (
  src?: string,
  mediaType?: LandingPageBlock['content']['mediaType']
): AssetKind => {
  if (mediaType === 'youtube') return 'youtube';
  if (mediaType === 'video') return 'video';

  const value = src ?? '';
  if (!value) return 'image';
  if (YOUTUBE_PATTERN.test(value)) return 'youtube';
  if (VIDEO_PATTERN.test(value)) return 'video';
  return 'image';
};

function AssetLightbox({
  asset,
  onClose,
}: {
  asset: ZoomAsset | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!asset) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement as HTMLElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [asset, onClose]);

  if (!asset) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#040013]/94 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Pré-visualização ampliada do asset"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-black"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 inline-flex min-h-12 min-w-12 items-center justify-center border border-white/20 bg-black/80 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="Fechar visualização"
        >
          <X className="h-5 w-5" />
        </button>

        {asset.kind === 'image' ? (
          <div className="relative h-[82vh] w-full">
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ) : asset.kind === 'youtube' && asset.youtubeId ? (
          <div className="aspect-video w-full bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${asset.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${asset.youtubeId}&controls=0&modestbranding=1&rel=0`}
              title={asset.alt || 'Vídeo do YouTube'}
              className="h-full w-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            className="h-[82vh] w-full object-contain"
            src={asset.src}
            poster={asset.poster}
            autoPlay
            muted
            loop
            controls={false}
            playsInline
          />
        )}
      </div>
    </div>
  );
}

function AssetInteractive({
  src,
  alt,
  kind,
  poster,
  className,
  videoAutoplay,
  prefersReducedMotion,
  onOpen,
}: {
  src?: string;
  alt?: string;
  kind: AssetKind;
  poster?: string;
  className?: string;
  videoAutoplay?: boolean;
  prefersReducedMotion: boolean;
  onOpen: (
    _asset: ZoomAsset,
    _event: ReactMouseEvent<HTMLButtonElement>
  ) => void;
}) {
  if (!src) return null;

  const resolved = resolveSiteAssetUrl(src);
  const resolvedPoster = resolveSiteAssetUrl(poster);
  const youtubeId = kind === 'youtube' ? getYouTubeId(src) : null;

  return (
    <button
      type="button"
      onClick={(event) =>
        onOpen(
          {
            src: resolved,
            kind,
            alt: alt || 'Asset do projeto',
            poster: resolvedPoster,
            youtubeId: youtubeId ?? undefined,
          },
          event
        )
      }
      className={`group relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${className || ''}`}
      aria-label="Abrir asset ampliado"
    >
      {kind === 'image' ? (
        <div className="relative aspect-[16/10] w-full bg-black/30">
          <Image
            src={resolved}
            alt={alt || 'Asset do projeto'}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-cover"
          />
        </div>
      ) : kind === 'youtube' && youtubeId ? (
        <div className="relative aspect-video w-full bg-black/50">
          <Image
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={alt || 'Vídeo do YouTube'}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-cover"
            unoptimized
          />
          <span className="absolute inset-0 bg-black/35" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="alpa-circle inline-flex h-14 w-14 items-center justify-center border border-white/40 bg-[#0000ff] text-white">
              <Play className="h-5 w-5" />
            </span>
          </span>
        </div>
      ) : (
        <video
          className="aspect-video w-full bg-black object-cover"
          src={resolved}
          poster={resolvedPoster}
          autoPlay={videoAutoplay && !prefersReducedMotion}
          muted
          loop={videoAutoplay && !prefersReducedMotion}
          controls={false}
          playsInline
          preload="metadata"
        />
      )}

      <span className="pointer-events-none absolute inset-0 border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

function BlockText({
  text,
  alignClass,
}: {
  text?: string;
  alignClass?: string;
}) {
  if (!text?.trim()) return null;

  return (
    <p
      className={`max-w-3xl whitespace-pre-line text-lg leading-relaxed text-white/86 md:text-xl ${alignClass || 'text-center'}`}
    >
      {text}
    </p>
  );
}

export default function ProjectTemplateALPARenderer({
  project,
}: ProjectTemplateALPARendererProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [zoomAsset, setZoomAsset] = useState<ZoomAsset | null>(null);
  const lastFocusedTriggerRef = useRef<HTMLElement | null>(null);

  const introParagraphs = useMemo(() => {
    if (project.intro_body && project.intro_body.length > 0) {
      return project.intro_body;
    }
    if (project.project_summary) {
      return [project.project_summary];
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

  const backLabel = project.navigation?.back_label || 'voltar';
  const ctaLabel = project.cta?.label || 'vamos trabalhar juntos →';
  const ctaHref = project.cta?.href || '/#contact';

  const openAsset = useCallback(
    (asset: ZoomAsset, event: ReactMouseEvent<HTMLButtonElement>) => {
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
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
              <BlockText text={block.content.text} />
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
              <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 text-center md:items-start md:text-left">
                <BlockText
                  text={block.content.text}
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
              <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 text-center md:items-end md:text-right">
                <BlockText
                  text={block.content.text}
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
            className="w-full px-4 py-14 md:px-8 md:py-20"
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
    <article className="template-alpa relative min-h-screen bg-[#040013] text-[#fcffff]">
      <style jsx global>{`
        .template-alpa :where(*, *::before, *::after) {
          border-radius: 0 !important;
        }

        .template-alpa .alpa-circle {
          border-radius: 9999px !important;
        }
      `}</style>

      {prefersReducedMotion ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-linear-to-b from-[#0c1445] via-[#08031f] to-[#040013]"
        />
      ) : (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <LiquidEther
            colors={etherColors}
            mouseForce={20}
            isViscous
            viscous={30}
            isBounce={false}
            autoDemo
            className="h-full w-full"
          />
        </div>
      )}

      <Link
        href="/portfolio"
        className="fixed left-4 top-4 z-[60] inline-flex min-h-12 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <span className="alpa-circle inline-flex h-12 w-12 items-center justify-center border border-white/40 bg-[#0000ff] text-white">
          <ArrowLeft className="h-4 w-4" />
        </span>
        <span>{backLabel}</span>
      </Link>

      <div className="relative z-10">
        <main id="main-content">
          <section className="std-grid flex min-h-[82vh] items-center justify-center py-24 text-center">
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
                {project.project_tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
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
              {introParagraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={`intro-${paragraphIndex}`}
                  className="max-w-3xl text-base leading-relaxed text-white/82 md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
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
            id="contact"
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
              <Link
                href={ctaHref}
                className="inline-flex min-h-12 items-center justify-center border border-transparent px-8 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                style={{ backgroundColor: accentColor }}
              >
                {ctaLabel}
              </Link>
            </div>
          </motion.section>
        </main>
      </div>

      <AssetLightbox asset={zoomAsset} onClose={closeAsset} />
    </article>
  );
}
