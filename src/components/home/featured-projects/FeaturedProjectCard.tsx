'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMotionGate } from '@/hooks/useMotionGate';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import FeaturedProjectCardFrame from '@/components/home/featured-projects/FeaturedProjectCardFrame';
import {
  getNextFeaturedProjectBackgroundVariant,
  type FeaturedProjectBackgroundVariant,
} from '@/components/home/featured-projects/animated-backgrounds';
import { getCardMediaCandidates } from '@/lib/portfolio/card-media';
import type { PortfolioProject } from '@/types/project';

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
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [isCardInView, setIsCardInView] = useState(false);
  const [resolvedBackgroundVariant, setResolvedBackgroundVariant] =
    useState<FeaturedProjectBackgroundVariant>(backgroundVariant);

  useEffect(() => {
    setResolvedBackgroundVariant(backgroundVariant);
  }, [backgroundVariant, project.id]);

  useEffect(() => {
    const node = frameRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsCardInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCardInView(entry.isIntersecting && entry.intersectionRatio > 0.18);
      },
      { threshold: [0, 0.18, 0.35] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !isCardInView) {
      return;
    }

    let timeoutId: number | null = null;

    const clearScheduledRotation = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const scheduleRotation = () => {
      clearScheduledRotation();

      timeoutId = window.setTimeout(
        () => {
          setResolvedBackgroundVariant((current) =>
            getNextFeaturedProjectBackgroundVariant(current)
          );
          scheduleRotation();
        },
        6500 + Math.round(Math.random() * 3500)
      );
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearScheduledRotation();
        return;
      }

      scheduleRotation();
    };

    scheduleRotation();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearScheduledRotation();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isCardInView, reducedMotion]);

  const desktopMediaSource = useMemo(() => {
    return getCardMediaCandidates(project, 'landscape')[0];
  }, [project]);

  const mobileMediaSource = useMemo(() => {
    return getCardMediaCandidates(project, 'square')[0] ?? desktopMediaSource;
  }, [project, desktopMediaSource]);

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
    <div className="flex h-full min-h-full w-full flex-1 flex-col">
      <div
        ref={frameRef}
        className={`relative min-h-0 w-full flex-1 flex flex-col items-stretch ${frameClassName ?? ''}`}
      >
        <FeaturedProjectCardFrame
          project={project}
          backgroundVariant={resolvedBackgroundVariant}
          desktopMediaSource={desktopMediaSource}
          mobileMediaSource={mobileMediaSource}
          priority={priority}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Metadata - Mobile: text left, arrow right | Desktop: left-aligned */}
      <div className="mt-auto flex shrink-0 flex-row items-start justify-between gap-4 px-1 text-left md:gap-6 pt-6">
        <div className="flex-1">
          {/* Category / Client / Year */}
          <div className="flex items-center justify-start gap-2 text-white/60 text-xs md:text-sm leading-tight mb-2">
            <span className="uppercase tracking-widest font-mono text-[9px] md:text-[10px]">
              {project.category}
            </span>
            <span aria-hidden className="opacity-50">
              •
            </span>
            <span className="font-light text-textSecondary">
              {project.client} • {project.year}
            </span>
          </div>
          {/* Title */}
          <h3
            id={headingId}
            className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-[1.2] transition-colors duration-micro md:group-hover:duration-fast md:group-hover:text-bluePrimary"
          >
            {project.title}
          </h3>
        </div>

        {/* Arrow Icon Circle - Blue default, Purple on hover */}
        {/* Small CTA (Design Token) */}
        <div className="shrink-0">
          <div className="btn-icon-circle bg-bluePrimary shadow-[0_0_0_rgba(135,5,242,0)] transition-[background-color,box-shadow,transform] duration-micro md:group-hover:translate-x-5 md:group-hover:bg-purpleDetails md:group-hover:duration-fast ease-ghost md:group-hover:shadow-[0_0_28px_rgba(135,5,242,0.5)]">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );

  const commonClasses =
    'group flex flex-col h-full min-h-0 w-full rounded-md text-left transition-transform duration-fast ease-ghost hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bluePrimary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

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

  // SSR fallback: project without dedicated landing page must reach the
  // portfolio gallery, which renders the modal client-side per the
  // "POP-UP DE PROJETO (SEM LANDING PAGE)" spec. Never link to the
  // legacy `/portfolio/[slug]` page from a featured card without a landing.
  const portfolioCardAnchor = `portfolio-card-${project.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')}-0`;
  return (
    <Link
      href={`/portfolio#${portfolioCardAnchor}`}
      className={commonClasses}
      aria-labelledby={headingId}
    >
      <CardContent />
    </Link>
  );
}
