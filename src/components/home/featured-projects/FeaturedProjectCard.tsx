'use client';

import Image from 'next/image';
import React from 'react';
import { useReducedMotion } from 'framer-motion';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { PortfolioProject } from '@/types/project';
import { applyImageFallback, isVideo } from '@/lib/utils';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';

interface FeaturedProjectCardProps {
  project: PortfolioProject;
  onOpen?: (_project: PortfolioProject) => void;
  priority?: boolean;
}

export default function FeaturedProjectCard({
  project,
  onOpen,
  priority = false,
}: FeaturedProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const isModalMode = typeof onOpen === 'function';
  const mediaSource =
    project.thumbnailMedia ??
    project.videoPreview ??
    project.imageLandscape ??
    project.imageSquare ??
    project.image;

  const handleClick = () => {
    if (onOpen) {
      onOpen(project);
    }
  };

  const landingHref = project.landingPageSlug
    ? `/projects/${project.landingPageSlug}?from=home&originCard=${encodeURIComponent(project.slug)}`
    : undefined;
  const headingId = `featured-project-${project.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')}-title`;

  const CardContent = () => (
    <>
      <div
        className={`card-shell relative overflow-hidden rounded-md w-full bg-white/5 transition-all duration-500 ${
          reducedMotion
            ? ''
            : 'md:group-hover:shadow-[0_22px_54px_-12px_rgba(0,72,255,0.15)] md:group-hover:-translate-y-1'
        }`}
      >
        {/* Subtle Noise Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {isVideo(mediaSource) ? (
          <video
            src={mediaSource}
            autoPlay
            muted
            loop
            playsInline
            preload={priority ? 'auto' : 'metadata'}
            poster={DEFAULT_VIDEO_POSTER}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 md:group-hover:opacity-100"
          >
            <track
              kind="captions"
              src={DEFAULT_CAPTIONS}
              srcLang="pt-BR"
              label="Português"
              default
            />
          </video>
        ) : (
          <Image
            src={mediaSource}
            alt={`Logo da marca ${project.client} para ${project.category} - ${project.title}`}
            fill
            sizes={project.layout.sizes ?? '100vw'}
            className="object-cover transition-opacity duration-700 opacity-90 md:group-hover:opacity-100"
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            onError={applyImageFallback}
          />
        )}
      </div>

      {/* Metadata - Mobile: text left, arrow right | Desktop: left-aligned */}
      <div className="mt-6 flex flex-row justify-between items-start gap-4 md:gap-6 px-1 text-left">
        <div className="flex-1">
          {/* Category / Client / Year */}
          <div className="flex items-center justify-start gap-2 text-white/60 text-xs md:text-sm leading-tight mb-2">
            <span className="uppercase tracking-widest font-mono text-[9px] md:text-[10px]">
              {project.category}
            </span>
            <span aria-hidden className="opacity-30">
              •
            </span>
            <span className="font-light">
              {project.client} / {project.year}
            </span>
          </div>
          {/* Title */}
          <h3
            id={headingId}
            className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-[1.2] transition-colors duration-500 md:group-hover:text-primary"
          >
            {project.title}
          </h3>
        </div>

        {/* Arrow Icon Circle - Blue default, Purple on hover */}
        {/* Small CTA (Design Token) */}
        <div className="shrink-0">
          <div className="btn-icon-circle">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </>
  );

  const commonClasses =
    'group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md text-center md:text-left';

  if (isModalMode) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={commonClasses}
        aria-labelledby={headingId}
      >
        <CardContent />
      </button>
    );
  }

  if (landingHref) {
    return (
      <Link href={landingHref} className={commonClasses}>
        <CardContent />
      </Link>
    );
  }

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={commonClasses}
      aria-labelledby={headingId}
    >
      <CardContent />
    </Link>
  );
}
