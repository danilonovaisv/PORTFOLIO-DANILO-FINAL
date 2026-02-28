'use client';

import Image from 'next/image';
import React from 'react';
import { useMotionGate } from '@/hooks/useMotionGate';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { PortfolioProject } from '@/types/project';
import { applyImageFallback, isVideo } from '@/lib/utils';

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
  const reducedMotion = useMotionGate();
  const isModalMode = typeof onOpen === 'function';

  // Resolve the best static image for the card (never a video)
  const staticImageCandidates = [
    project.imageLandscape,
    project.imageSquare,
    project.image,
  ].filter((url): url is string => !!url && !isVideo(url));
  const staticImage = staticImageCandidates[0];

  // Resolve the video source (only if thumbnailMedia or videoPreview is a video)
  const videoSource = isVideo(project.thumbnailMedia)
    ? project.thumbnailMedia
    : isVideo(project.videoPreview)
      ? project.videoPreview
      : undefined;

  // Whether this card should show a video on hover
  const hasVideo = !!videoSource;

  // The media source for the static poster/image — always an image, never a video
  const mediaSource = staticImage;

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

  const hasHoverRef = React.useRef(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const CardContent = () => (
    <div
      onMouseEnter={() => {
        hasHoverRef.current = true;
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`card-shell relative overflow-hidden rounded-md w-full aspect-[4/3] sm:aspect-video lg:aspect-auto flex-1 min-h-[300px] bg-white/5 transition-all duration-500 ${
          reducedMotion
            ? ''
            : 'md:group-hover:shadow-[0_22px_54px_-12px_rgba(0,72,255,0.15)] md:group-hover:-translate-y-1'
        }`}
      >
        {/* Subtle Noise Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Static image — always visible by default */}
        {mediaSource ? (
          <Image
            src={mediaSource}
            alt={`${project.client} — ${project.title}`}
            fill
            sizes={project.layout.sizes ?? '100vw'}
            className={`object-cover transition-opacity duration-700 ${
              hasVideo && isHovered
                ? 'opacity-0'
                : 'opacity-90 md:group-hover:opacity-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            onError={applyImageFallback}
          />
        ) : (
          /* Styled fallback when no image is available */
          <div className="absolute inset-0 bg-gradient-to-br from-[#040013] via-[#0b0d3a] to-[#040013] flex items-center justify-center">
            <span className="text-bluePrimary/40 text-lg font-mono uppercase tracking-widest">
              {project.category}
            </span>
          </div>
        )}

        {/* Video — only loads on first hover, opacity toggles */}
        {hasVideo && hasHoverRef.current && (
          <video
            src={videoSource}
            autoPlay={isHovered}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
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
            <span aria-hidden className="opacity-50">
              •
            </span>
            <span className="font-light">
              {project.client} / {project.year}
            </span>
          </div>
          {/* Title */}
          <h3
            id={headingId}
            className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-[1.2] transition-colors duration-500 md:group-hover:text-bluePrimary"
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
    </div>
  );

  const commonClasses =
    'group block h-full min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluePrimary rounded-md text-center md:text-left';

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
