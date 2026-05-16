'use client';

import { m } from 'motion/react';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
// dynamic import removed as it was unused
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { LANDING_PAGE_BACK, LANDING_PAGE_CTA } from '@/config/cta';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';
import { getAssetUrl, supabaseLoader } from '@/lib/utils';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { DEFAULT_CAPTIONS } from '@/lib/video';
import type {
  MasterProjectAsset,
  MasterProjectTemplateV2Data,
} from '@/types/project-template';
import SectionFeatures3 from '@/components/projects/templates/master-v2/SectionFeatures3';
import SectionFullHighlight from '@/components/projects/templates/master-v2/SectionFullHighlight';
import SectionGrid from '@/components/projects/templates/master-v2/SectionGrid';
import SectionQuote from '@/components/projects/templates/master-v2/SectionQuote';
import SectionSplit from '@/components/projects/templates/master-v2/SectionSplit';
import { useLandingBackLink } from '@/components/projects/templates/useLandingBackLink';
import { HeroBackCTA } from '@/components/ui/HeroBackCTA';

// LiquidEther removed as it was unused
// const DEFAULT_ETHER_COLORS = ['#5227FF', '#FF9FFC', '#B19EEF'];

const VIDEO_PATTERN = /\.(mp4|webm|ogg|mov)$/i;

type ProjectTemplateMasterRendererProps = {
  project: MasterProjectTemplateV2Data;
};

const isVideoAsset = (asset: MasterProjectAsset) =>
  asset.kind === 'video' || VIDEO_PATTERN.test(asset.src);

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

// buildEtherPalette removed as it was unused

export default function ProjectTemplateMasterRenderer({
  project,
}: ProjectTemplateMasterRendererProps) {
  const prefersReducedMotion = useReducedMotion();
  const backHref = useLandingBackLink();

  const heroImage = getAssetUrl(project.hero_cover_image.src, { width: 1920, quality: 90 });
  const heroLogo = project.hero_logo_image?.src
    ? getAssetUrl(project.hero_logo_image.src, { width: 400 })
    : '';

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
  // etherColors removed as it was unused

  const revealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: MOTION_TOKENS.offset.standard,
        filter: MOTION_TOKENS.blur.hidden,
      };
  const revealVisible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: MOTION_TOKENS.blur.visible };

  const nextLabel = project.navigation?.next_label ?? 'próximo projeto';
  const nextHref = project.navigation?.next_project_slug
    ? `/projects/${project.navigation.next_project_slug}`
    : '/portfolio';

  return (
    <article className="relative min-h-screen bg-background text-text">
      {prefersReducedMotion ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-linear-to-b from-abyssStart via-abyssMid to-background"
        />
      ) : (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          {/* LiquidEther omitted for reduced motion or if not loaded */}
        </div>
      )}

      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-background/72 backdrop-blur-xl">
          <nav
            className="std-grid flex min-h-16 items-center justify-between py-2"
            aria-label="Navegação da landing"
          >
            <Link
              href="/"
              className="inline-flex min-h-12 items-center text-sm font-semibold tracking-[0.08em] text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Danilo Novais
            </Link>
            <ul className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/85 md:gap-4">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-12 items-center px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="inline-flex min-h-12 items-center px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-12 items-center px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Portfólio
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <div role="region" aria-label="Conteúdo do projeto">
          <section className="relative flex min-h-[86vh] items-end overflow-hidden pt-20">
            {heroImage ? (
              <div className="absolute inset-0">
                {isVideoAsset(project.hero_cover_image) ? (
                  <video
                    className="h-full w-full object-cover"
                    src={heroImage}
                    poster={getAssetUrl(project.hero_cover_image.poster)}
                    autoPlay={!prefersReducedMotion}
                    loop={!prefersReducedMotion}
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
                  </video>
                ) : (
                  <Image
                    loader={supabaseLoader}
                    src={heroImage}
                    alt={project.hero_cover_image.alt || project.project_title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                )}
              </div>
            ) : (
              <div className="absolute inset-0 bg-linear-to-b from-abyssStart via-abyssMid to-background" />
            )}

            <div className="absolute inset-0 bg-background/78" />

            <div className="std-grid relative z-10 w-full space-y-6 pb-16 md:pb-20">
              {heroLogo ? (
                <m.div
                  initial={revealInitial}
                  animate={revealVisible}
                  transition={{
                    duration: MOTION_TOKENS.duration.normal,
                    ease: GHOST_EASE,
                  }}
                  className="relative h-16 w-40 md:h-24 md:w-56"
                >
                  <Image
                    loader={supabaseLoader}
                    src={heroLogo}
                    alt={
                      project.hero_logo_image?.alt ||
                      `Logo do projeto ${project.project_title}`
                    }
                    fill
                    className="object-contain object-left"
                    sizes="224px"
                  />
                </m.div>
              ) : null}

              <m.h1
                initial={revealInitial}
                animate={revealVisible}
                transition={{
                  duration: MOTION_TOKENS.duration.normal,
                  ease: GHOST_EASE,
                  delay: MOTION_TOKENS.stagger.tight,
                }}
                className="max-w-5xl text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl"
              >
                {project.project_title}
              </m.h1>

              {project.project_subtitle ? (
                <m.p
                  initial={revealInitial}
                  animate={revealVisible}
                  transition={{
                    duration: MOTION_TOKENS.duration.normal,
                    ease: GHOST_EASE,
                    delay: MOTION_TOKENS.stagger.normal,
                  }}
                  className="max-w-3xl text-lg leading-relaxed text-white/84 md:text-2xl"
                >
                  {project.project_subtitle}
                </m.p>
              ) : null}

              <m.div
                initial={revealInitial}
                animate={revealVisible}
                transition={{
                  duration: MOTION_TOKENS.duration.normal,
                  ease: GHOST_EASE,
                  delay: MOTION_TOKENS.delay.short,
                }}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em]"
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
              </m.div>

              <m.div
                initial={revealInitial}
                animate={revealVisible}
                transition={{
                  duration: MOTION_TOKENS.duration.normal,
                  ease: GHOST_EASE,
                  delay:
                    MOTION_TOKENS.delay.short + MOTION_TOKENS.stagger.normal,
                }}
                className="relative z-20 grid gap-2 pt-8 text-xs uppercase tracking-[0.15em] text-white/88 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-3"
              >
                <HeroBackCTA href={backHref} label={LANDING_PAGE_BACK.label} />
                <a
                  href="#project-intro"
                  className="inline-flex min-h-12 items-center gap-2 px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:justify-center"
                >
                  explorar
                  <ArrowDown className="h-4 w-4" />
                </a>
                <Link
                  href={nextHref}
                  className="inline-flex min-h-12 items-center gap-2 px-2 text-left transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:justify-end sm:text-right"
                >
                  {nextLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </m.div>
            </div>
          </section>

          <m.section
            id="project-intro"
            className="std-grid py-20 md:py-28"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: MOTION_TOKENS.duration.normal,
              ease: GHOST_EASE,
            }}
          >
            <div className="mx-auto max-w-4xl space-y-5 text-center">
              <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
                {project.intro_headline || project.project_title}
              </h2>
              {introParagraphs.length > 0 ? (
                <div className="space-y-4 text-base leading-relaxed text-white/80 md:text-lg">
                  {introParagraphs.map((paragraph, index) => (
                    <p key={`intro-${index}`}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </m.section>

          <section
            aria-labelledby="dynamic-content-heading"
            className="pb-14 md:pb-20"
          >
            <h2 id="dynamic-content-heading" className="sr-only">
              Conteúdo dinâmico do projeto
            </h2>
            {project.gallery_grid.map((item, index) => {
              switch (item.layout_type) {
                case 'grid_2_col':
                case 'grid_1_col':
                  return (
                    <SectionGrid
                      key={item.id}
                      item={item}
                      index={index}
                      accentColor={accentColor}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  );
                case 'grid_feat':
                  return (
                    <SectionFullHighlight
                      key={item.id}
                      item={item}
                      index={index}
                      accentColor={accentColor}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  );
                case 'grid_features_3':
                  return (
                    <SectionFeatures3
                      key={item.id}
                      item={item}
                      index={index}
                      accentColor={accentColor}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  );
                case 'grid_quote':
                  return (
                    <SectionQuote
                      key={item.id}
                      item={item}
                      index={index}
                      accentColor={accentColor}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  );
                case 'grid_split':
                  return (
                    <SectionSplit
                      key={item.id}
                      item={item}
                      index={index}
                      accentColor={accentColor}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  );
                default:
                  return (
                    <SectionGrid
                      key={item.id}
                      item={item}
                      index={index}
                      accentColor={accentColor}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  );
              }
            })}
          </section>

          <m.section
            id="project-contact-master"
            className="std-grid pb-24 md:pb-28"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: MOTION_TOKENS.duration.normal,
              ease: GHOST_EASE,
            }}
          >
            <div className="rounded-3xl border border-white/16 bg-black/28 px-6 py-10 md:px-10 md:py-12">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">
                    contato
                  </p>
                  <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
                    Vamos criar o próximo projeto?
                  </h2>
                </div>

                <div className="relative block w-fit">
                  <AntigravityCTA
                    href={LANDING_PAGE_CTA.href}
                    text={LANDING_PAGE_CTA.label}
                    color={LANDING_PAGE_CTA.color}
                    className="relative"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-center md:justify-start">
                <HeroBackCTA
                  href={backHref}
                  label={LANDING_PAGE_BACK.label}
                  size="compact"
                />
              </div>
            </div>
          </m.section>
        </div>
      </div>
    </article>
  );
}
