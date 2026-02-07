'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { GHOST_EASE } from '@/config/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { resolveSiteAssetUrl } from '@/lib/projects/template-schema';
import type {
  MasterProjectAsset,
  MasterProjectTemplateV2Data,
} from '@/types/project-template';
import SectionFeatures3 from './master-v2/SectionFeatures3';
import SectionFullHighlight from './master-v2/SectionFullHighlight';
import SectionGrid from './master-v2/SectionGrid';
import SectionQuote from './master-v2/SectionQuote';
import SectionSplit from './master-v2/SectionSplit';

const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false });
const DEFAULT_ETHER_COLORS = ['#5227FF', '#FF9FFC', '#B19EEF'];

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

const buildEtherPalette = (baseHex: string): string[] => [
  baseHex,
  mixHex(baseHex, '#ffffff', 0.3),
  mixHex(baseHex, '#12002c', 0.22),
];

export default function ProjectTemplateMasterRenderer({
  project,
}: ProjectTemplateMasterRendererProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const heroImage = resolveSiteAssetUrl(project.hero_cover_image.src);
  const heroLogo = project.hero_logo_image?.src
    ? resolveSiteAssetUrl(project.hero_logo_image.src)
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
  const etherColors = project.theme_color
    ? buildEtherPalette(accentColor)
    : DEFAULT_ETHER_COLORS;

  const revealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 18, filter: 'blur(8px)' };
  const revealVisible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  const backLabel = project.navigation?.back_label ?? 'voltar';
  const nextLabel = project.navigation?.next_label ?? 'próximo projeto';
  const nextHref = project.navigation?.next_project_slug
    ? `/projects/${project.navigation.next_project_slug}`
    : '/portfolio';
  const ctaLabel = project.cta?.label ?? 'vamos trabalhar juntos →';
  const ctaHref = project.cta?.href ?? '/#contact';

  return (
    <article className="relative min-h-screen bg-[#040013] text-[#fcffff]">
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

      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040013]/72 backdrop-blur-xl">
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

        <main id="main-content">
          <section className="relative flex min-h-[86vh] items-end overflow-hidden pt-20">
            {heroImage ? (
              <div className="absolute inset-0">
                {isVideoAsset(project.hero_cover_image) ? (
                  <video
                    className="h-full w-full object-cover"
                    src={heroImage}
                    poster={resolveSiteAssetUrl(
                      project.hero_cover_image.poster
                    )}
                    autoPlay={!prefersReducedMotion}
                    loop={!prefersReducedMotion}
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
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
              <div className="absolute inset-0 bg-linear-to-b from-[#111b61] via-[#08031f] to-[#040013]" />
            )}

            <div className="absolute inset-0 bg-[#040013]/78" />

            <div className="std-grid relative z-10 w-full space-y-6 pb-16 md:pb-20">
              {heroLogo ? (
                <motion.div
                  initial={revealInitial}
                  animate={revealVisible}
                  transition={{ duration: 0.7, ease: GHOST_EASE }}
                  className="relative h-16 w-40 md:h-24 md:w-56"
                >
                  <Image
                    src={heroLogo}
                    alt={
                      project.hero_logo_image?.alt ||
                      `Logo do projeto ${project.project_title}`
                    }
                    fill
                    className="object-contain object-left"
                    sizes="224px"
                  />
                </motion.div>
              ) : null}

              <motion.h1
                initial={revealInitial}
                animate={revealVisible}
                transition={{ duration: 0.84, ease: GHOST_EASE, delay: 0.04 }}
                className="max-w-5xl text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl"
              >
                {project.project_title}
              </motion.h1>

              {project.project_subtitle ? (
                <motion.p
                  initial={revealInitial}
                  animate={revealVisible}
                  transition={{
                    duration: 0.74,
                    ease: GHOST_EASE,
                    delay: 0.08,
                  }}
                  className="max-w-3xl text-lg leading-relaxed text-white/84 md:text-2xl"
                >
                  {project.project_subtitle}
                </motion.p>
              ) : null}

              <motion.div
                initial={revealInitial}
                animate={revealVisible}
                transition={{
                  duration: 0.74,
                  ease: GHOST_EASE,
                  delay: 0.12,
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
                {project.project_tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </motion.div>

              <motion.div
                initial={revealInitial}
                animate={revealVisible}
                transition={{
                  duration: 0.72,
                  ease: GHOST_EASE,
                  delay: 0.16,
                }}
                className="flex flex-wrap items-center justify-between gap-3 pt-6 text-xs uppercase tracking-[0.15em] text-white/88"
              >
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-12 items-center gap-2 px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {backLabel}
                </Link>
                <a
                  href="#project-intro"
                  className="inline-flex min-h-12 items-center gap-2 px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  explorar
                  <ArrowDown className="h-4 w-4" />
                </a>
                <Link
                  href={nextHref}
                  className="inline-flex min-h-12 items-center gap-2 px-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {nextLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </section>

          <motion.section
            id="project-intro"
            className="std-grid py-20 md:py-28"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.76, ease: GHOST_EASE }}
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
          </motion.section>

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

          <motion.section
            id="contact"
            className="std-grid pb-24 md:pb-28"
            initial={revealInitial}
            whileInView={revealVisible}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: GHOST_EASE }}
          >
            <div className="rounded-3xl border border-white/16 bg-black/28 px-6 py-10 md:px-10 md:py-12">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="space-y-3">
                  <p
                    className="text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: mixHex(accentColor, '#ffffff', 0.35) }}
                  >
                    contato
                  </p>
                  <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
                    Vamos criar o próximo projeto?
                  </h2>
                </div>

                <Link
                  href={ctaHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  style={{ backgroundColor: accentColor }}
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </article>
  );
}
