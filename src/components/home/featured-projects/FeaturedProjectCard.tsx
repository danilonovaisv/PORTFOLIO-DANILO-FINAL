'use client';

import React from 'react';
import { useMotionGate } from '@/hooks/useMotionGate';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import FeaturedProjectCardFrame from '@/components/home/featured-projects/FeaturedProjectCardFrame';
import type { FeaturedProjectBackgroundVariant } from '@/components/home/featured-projects/animated-backgrounds';
import type { PortfolioProject } from '@/types/project';
import { isVideo } from '@/lib/utils';

interface FeaturedProjectCardProps {
  project: PortfolioProject;
  onOpen?: (_project: PortfolioProject) => void;
  priority?: boolean;
  backgroundVariant: FeaturedProjectBackgroundVariant;
  frameClassName?: string;
}

export default function FeaturedProjectCard({
  project,
  onOpen,
  priority = false,
  backgroundVariant,
  frameClassName,
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

  const CardContent = () => (
    <div className="flex h-full w-full flex-col">
      <div className={`relative w-full flex-1 ${frameClassName ?? ''}`}>
        <FeaturedProjectCardFrame
          project={project}
          backgroundVariant={backgroundVariant}
          mediaSource={mediaSource}
          priority={priority}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Metadata - Mobile: text left, arrow right | Desktop: left-aligned */}
      <div className="mt-6 flex shrink-0 flex-row items-start justify-between gap-4 px-1 text-left md:gap-6">
        <div className="flex-1">
          {/* Category / Client / Year */}
          <div className="flex items-center justify-start gap-2 text-white/60 text-xs md:text-sm leading-tight mb-2">
            <span className="uppercase tracking-widest font-mono text-[9px] md:text-[10px]">
              {project.category}
            </span>
            <span aria-hidden className="opacity-50">
              •
            </span>
            <span className="font-light text-[#6B7280]">
              {project.client} • {project.year}
            </span>
          </div>
          {/* Title */}
          <h3
            id={headingId}
            className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-[1.2] transition-colors duration-150 md:group-hover:duration-200 md:group-hover:text-bluePrimary"
          >
            {project.title}
          </h3>
        </div>

        {/* Arrow Icon Circle - Blue default, Purple on hover */}
        {/* Small CTA (Design Token) */}
        <div className="shrink-0">
          <div className="btn-icon-circle bg-bluePrimary md:group-hover:bg-[#8705f2] shadow-[0_0_0_rgba(135,5,242,0)] transition-[background-color,box-shadow,transform] duration-150 md:group-hover:duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:shadow-[0_0_28px_rgba(135,5,242,0.5)]">
            <ArrowUpRight className="h-6 w-6 transition-transform duration-150 md:group-hover:duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-5" />
          </div>
        </div>
      </div>
    </div>
  );

  const commonClasses =
    'group block h-full w-full min-h-[48px] rounded-md text-left transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluePrimary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

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
