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
}

export default function FeaturedProjectCard({
  project,
  onOpen,
  priority = false,
  backgroundVariant,
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
    <div>
      <div className="flex-1 min-h-[300px]">
        <FeaturedProjectCardFrame
          project={project}
          backgroundVariant={backgroundVariant}
          mediaSource={mediaSource}
          priority={priority}
          reducedMotion={reducedMotion}
        />
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
          <div className="btn-icon-circle bg-bluePrimary md:group-hover:bg-[#8705f2] shadow-[0_0_0_rgba(135,5,242,0)] transition-[background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:shadow-[0_0_28px_rgba(135,5,242,0.5)]">
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
