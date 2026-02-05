'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import { GHOST_EASE } from '@/config/motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { resolveSiteAssetUrl } from '@/lib/projects/template-schema';
import type {
  MasterProjectAsset,
  MasterProjectGalleryItem,
  MasterProjectTemplateData,
} from '@/types/project-template';

type MasterProjectTemplateProps = {
  project: MasterProjectTemplateData;
};

const VIDEO_PATTERN = /\.(mp4|webm|ogg|mov)$/i;

const isVideoAsset = (asset: MasterProjectAsset | MasterProjectGalleryItem) =>
  asset.kind === 'video' || VIDEO_PATTERN.test(asset.src);

const normalizeHighlightColor = (value?: string): string => {
  if (!value) return '#0048ff';
  const hex = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(hex) || /^#[0-9a-fA-F]{3}$/.test(hex)) {
    return hex;
  }
  return '#0048ff';
};

const getGridSpanClass = (layout: MasterProjectGalleryItem['layout']) => {
  switch (layout) {
    case 'feature':
      return 'lg:col-span-12 lg:row-span-2';
    case 'split-left':
    case 'split-right':
      return 'lg:col-span-6';
    case 'quote-band':
      return 'lg:col-span-12';
    case 'full':
    default:
      return 'lg:col-span-12';
  }
};

function GalleryMedia({
  item,
  title,
  priority = false,
}: {
  item: MasterProjectGalleryItem;
  title: string;
  priority?: boolean;
}) {
  const src = resolveSiteAssetUrl(item.src);

  if (!src) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-sm text-white/70">
        Mídia indisponível
      </div>
    );
  }

  if (isVideoAsset(item)) {
    return (
      <video
        className="h-full w-full rounded-2xl object-cover"
        src={src}
        poster={resolveSiteAssetUrl(item.poster)}
        controls
        muted
        playsInline
        preload={priority ? 'metadata' : 'none'}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={item.alt || title}
      width={1920}
      height={1080}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 1024px) 100vw, 80vw"
      className="h-full w-full rounded-2xl object-cover"
    />
  );
}

export default function MasterProjectTemplate({
  project,
}: MasterProjectTemplateProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 14]
  );

  const highlightColor = normalizeHighlightColor(project.highlight_color);
  const heroImage = resolveSiteAssetUrl(project.hero_cover_image.src);
  const heroLogo = project.hero_logo_image?.src
    ? resolveSiteAssetUrl(project.hero_logo_image.src)
    : '';

  const introParagraphs = useMemo(() => {
    const blocks = project.intro_body ?? [];
    if (blocks.length > 0) return blocks;
    if (project.project_summary) return [project.project_summary];
    return [];
  }, [project.intro_body, project.project_summary]);

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
    <article className="bg-[#040013] text-[#fcffff]">
      <header
        ref={heroRef}
        className="relative flex min-h-[88vh] items-end overflow-hidden pt-28"
      >
        {heroImage ? (
          <motion.div
            className="absolute inset-0"
            style={prefersReducedMotion ? undefined : { y: parallaxY }}
          >
            {isVideoAsset(project.hero_cover_image) ? (
              <video
                className="h-full w-full object-cover"
                src={heroImage}
                poster={resolveSiteAssetUrl(project.hero_cover_image.poster)}
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
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-linear-to-b from-[#0c1b58] via-[#07021f] to-[#040013]" />
        )}

        <div className="absolute inset-0 bg-[#040013]/80" />

        <div className="std-grid relative z-10 flex w-full flex-col gap-7 pb-16 md:pb-20">
          {heroLogo ? (
            <motion.div
              initial={revealInitial}
              animate={revealVisible}
              transition={{ duration: 0.72, ease: GHOST_EASE }}
              className="relative h-20 w-44 md:h-28 md:w-64"
            >
              <Image
                src={heroLogo}
                alt={
                  project.hero_logo_image?.alt ||
                  `Logo do projeto ${project.project_title}`
                }
                fill
                sizes="256px"
                className="object-contain object-left"
              />
            </motion.div>
          ) : null}

          <motion.h1
            initial={revealInitial}
            animate={revealVisible}
            transition={{ duration: 0.88, ease: GHOST_EASE, delay: 0.06 }}
            className="max-w-5xl text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl"
          >
            {project.project_title}
          </motion.h1>

          {project.project_subtitle ? (
            <motion.p
              initial={revealInitial}
              animate={revealVisible}
              transition={{ duration: 0.72, ease: GHOST_EASE, delay: 0.12 }}
              className="max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl"
            >
              {project.project_subtitle}
            </motion.p>
          ) : null}

          <motion.div
            initial={revealInitial}
            animate={revealVisible}
            transition={{ duration: 0.72, ease: GHOST_EASE, delay: 0.16 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-[#4fe6ff]"
          >
            {project.project_client ? (
              <span>{project.project_client}</span>
            ) : null}
            {project.project_year ? <span>{project.project_year}</span> : null}
            {project.project_tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </motion.div>

          <div className="flex items-center justify-between gap-4 pt-6 text-xs uppercase tracking-[0.14em] text-white/80">
            <Link
              href="/portfolio"
              className="inline-flex min-h-12 items-center gap-2 px-2 py-2 transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>

            <a
              href="#project-intro"
              className="inline-flex min-h-12 items-center gap-2 px-2 py-2 transition-opacity hover:opacity-80"
              aria-label="Ir para o conteúdo principal"
            >
              explorar
              <ArrowDown className="h-4 w-4" />
            </a>

            <Link
              href={nextHref}
              className="inline-flex min-h-12 items-center gap-2 px-2 py-2 text-right transition-opacity hover:opacity-80"
            >
              {nextLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <motion.section
          id="project-intro"
          className="std-grid py-20 md:py-28"
          initial={revealInitial}
          whileInView={revealVisible}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.76, ease: GHOST_EASE }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              {project.intro_headline || project.project_title}
            </h2>

            {project.project_subtitle ? (
              <p className="mt-5 text-xl text-white/90 md:text-3xl">
                {project.project_subtitle}
              </p>
            ) : null}

            <div className="mt-8 space-y-4 text-base leading-relaxed text-white/78 md:text-lg">
              {introParagraphs.map((paragraph, index) => (
                <p key={`intro-${index}`}>{paragraph}</p>
              ))}
            </div>

            {project.project_services && project.project_services.length > 0 ? (
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.16em] text-[#4fe6ff]">
                  serviços
                </p>
                <p className="mt-3 text-lg font-medium text-white/90 md:text-2xl">
                  {project.project_services.join(', ')}
                </p>
              </div>
            ) : null}
          </div>
        </motion.section>

        <section
          aria-labelledby="project-gallery-heading"
          className="std-grid pb-24 md:pb-28"
        >
          <h2 id="project-gallery-heading" className="sr-only">
            Galeria do projeto
          </h2>

          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:auto-rows-[minmax(220px,auto)] lg:grid-cols-12 lg:grid-flow-dense">
            {project.gallery_grid.map((item, index) => {
              const itemTitle = item.title || `Galeria ${index + 1}`;
              const spanClass = getGridSpanClass(item.layout);

              if (item.layout === 'quote-band') {
                return (
                  <motion.blockquote
                    key={item.id}
                    initial={revealInitial}
                    whileInView={revealVisible}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.74,
                      ease: GHOST_EASE,
                      delay: prefersReducedMotion ? 0 : index * 0.03,
                    }}
                    className={`${spanClass} rounded-2xl px-6 py-14 text-center md:px-12`}
                    style={{ backgroundColor: highlightColor }}
                  >
                    <p className="mx-auto max-w-4xl text-2xl font-semibold italic leading-tight md:text-5xl">
                      “{item.quote || item.title || project.project_title}”
                    </p>
                    {item.description ? (
                      <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-white/90 md:text-2xl">
                        {item.description}
                      </p>
                    ) : null}
                  </motion.blockquote>
                );
              }

              const isSplit =
                item.layout === 'split-left' || item.layout === 'split-right';

              return (
                <motion.figure
                  key={item.id}
                  initial={revealInitial}
                  whileInView={revealVisible}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.74,
                    ease: GHOST_EASE,
                    delay: prefersReducedMotion ? 0 : index * 0.03,
                  }}
                  className={`${spanClass} overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]`}
                >
                  <div
                    className={
                      item.layout === 'feature'
                        ? 'aspect-[16/10] md:aspect-[20/9]'
                        : 'aspect-[4/3] md:aspect-[16/10]'
                    }
                  >
                    <GalleryMedia
                      item={item}
                      title={itemTitle}
                      priority={index < 2}
                    />
                  </div>

                  {(item.title || item.description || item.eyebrow) && (
                    <figcaption className="p-5 md:p-6">
                      {item.eyebrow ? (
                        <p className="text-xs uppercase tracking-[0.16em] text-[#4fe6ff]">
                          {item.eyebrow}
                        </p>
                      ) : null}
                      {item.title ? (
                        <h3
                          className={`mt-2 text-2xl font-semibold md:text-3xl ${isSplit ? 'max-w-md' : ''}`}
                        >
                          {item.title}
                        </h3>
                      ) : null}
                      {item.description ? (
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">
                          {item.description}
                        </p>
                      ) : null}
                    </figcaption>
                  )}
                </motion.figure>
              );
            })}
          </div>
        </section>

        <motion.section
          id="contact"
          className="std-grid pb-28"
          initial={revealInitial}
          whileInView={revealVisible}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: GHOST_EASE }}
        >
          <div className="rounded-2xl border border-white/15 bg-white/[0.02] px-6 py-10 md:px-10 md:py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.16em] text-[#4fe6ff]">
                  contato
                </p>
                <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
                  Vamos criar o próximo projeto?
                </h2>
              </div>

              <Link
                href={ctaHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: highlightColor }}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </article>
  );
}
