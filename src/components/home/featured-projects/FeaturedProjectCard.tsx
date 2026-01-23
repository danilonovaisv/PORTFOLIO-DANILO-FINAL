'use client';

import Image from 'next/image';
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import Link from 'next/link';
import type { PortfolioProject } from '@/types/project';
import { applyImageFallback, isVideo } from '@/utils/utils';

interface FeaturedProjectCardProps {
  project: PortfolioProject;
  onOpen?: (_project: PortfolioProject) => void;
}

export default function FeaturedProjectCard({
  project,
  onOpen,
}: FeaturedProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const isModalMode = typeof onOpen === 'function';

  const handleClick = () => {
    if (onOpen) {
      onOpen(project);
    }
  };

  const CardContent = () => (
    <>
      <div
        className={`relative overflow-hidden rounded-md ${project.layout.height} w-full bg-white/5 transition-all duration-500 ${
          reducedMotion
            ? ''
            : 'md:group-hover:shadow-[0_22px_54px_-12px_rgba(0,72,255,0.15)] md:group-hover:-translate-y-1 active:scale-[0.98]'
        }`}
      >
        {/* Subtle Noise Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Tags - Mobile: Top Left | Desktop: Top Right */}
        <div className="absolute top-4 left-4 md:left-auto md:right-4 z-20 flex gap-1.5 flex-wrap justify-start md:justify-end">
          {(project.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="bg-[#E6EFEF]/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-mono font-medium uppercase tracking-widest text-[#040013]"
            >
              {tag}
            </span>
          ))}
        </div>

        {isVideo(project.image) ? (
          <video
            src={project.image}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-90 md:group-hover:opacity-100"
          />
        ) : (
          <Image
            src={project.image}
            alt={`Logo da marca ${project.client} para ${project.category} - ${project.title}`}
            fill
            sizes={project.layout.sizes ?? '100vw'}
            className={`object-cover transition-transform duration-700 opacity-90 md:group-hover:opacity-100 ${
              reducedMotion ? '' : 'md:group-hover:scale-103'
            }`}
            loading="lazy"
            onError={applyImageFallback}
          />
        )}
      </div>

      {/* Metadata - Mobile: text left, arrow right | Desktop: left-aligned */}
      <div className="mt-6 flex flex-row justify-between items-start gap-4 md:gap-6 px-1 text-left">
        <div className="flex-1">
          {/* Category / Client / Year */}
          <div className="flex items-center justify-start gap-2 text-white/40 text-xs md:text-sm leading-tight mb-2">
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
          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-[1.2] transition-colors duration-500 md:group-hover:text-primary">
            {project.title}
          </h3>
        </div>

        {/* Arrow Icon Circle - Blue default, Purple on hover */}
        <div
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shrink-0 border border-white/10 transition-all duration-700 bg-[#0048ff] ${
            reducedMotion
              ? ''
              : 'md:group-hover:translate-x-5 md:group-hover:bg-[#8705f2] md:group-hover:shadow-[0_0_20px_rgba(135,5,242,0.4)]'
          }`}
        >
          <ArrowIcon className="w-5 h-5 md:w-6 md:h-6 -rotate-45 transition-transform duration-500 md:group-hover:rotate-0" />
        </div>
      </div>
    </>
  );

  const commonClasses =
    'group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md text-center md:text-left';

  if (project.landingPageSlug) {
    return (
      <Link
        href={`/projects/${project.landingPageSlug}?from=home`}
        aria-label={`Ver Landing Page: ${project.title}`}
        className={commonClasses}
      >
        <CardContent />
      </Link>
    );
  }

  if (isModalMode) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Ver detalhes do projeto ${project.title}`}
        className={commonClasses}
      >
        <CardContent />
      </button>
    );
  }

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      aria-label={`Ver projeto: ${project.title}`}
      className={commonClasses}
    >
      <CardContent />
    </Link>
  );
}
