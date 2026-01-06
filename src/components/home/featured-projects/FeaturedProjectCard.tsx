'use client';

import Image from 'next/image';
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import Link from 'next/link';

export type FeaturedProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: number;
  tags: string[];
  img: string;
  layout: { h: string; cols: string; sizes: string };
};

interface FeaturedProjectCardProps {
  project: FeaturedProject;
  onOpen?: (_project: FeaturedProject) => void;
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
        className={`relative overflow-hidden rounded-md ${project.layout.h} w-full bg-section-manifesto border border-white/5 shadow-[0_12px_48px_-28px_rgba(0,0,0,0.5)] transition-all duration-500 ${
          reducedMotion
            ? ''
            : 'group-hover:shadow-[0_22px_54px_-12px_rgba(0,72,255,0.15)] group-hover:border-primary/20 group-hover:-translate-y-1 active:translate-y-0'
        }`}
      >
        {/* Subtle Noise Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Tags - Workflow Spec: Top Right, #E6EFEF 70% opacity */}
        <div className="absolute top-4 right-4 z-20 flex gap-1.5 flex-wrap justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#E6EFEF]/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-mono font-medium uppercase tracking-widest text-text-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        <Image
          src={project.img}
          alt={`Logo da marca ${project.client} para ${project.category} - ${project.title}`}
          fill
          sizes={project.layout.sizes}
          className={`object-cover transition-transform duration-700 opacity-90 group-hover:opacity-100 ${
            reducedMotion ? '' : 'group-hover:scale-103'
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/placeholder.webp';
          }}
        />
      </div>

      {/* Metadata - Center-aligned on mobile, left-aligned on desktop */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-6 px-1 text-center md:text-left">
        <div className="flex-1">
          {/* Category / Client / Year */}
          <div className="flex items-center justify-center md:justify-start gap-2 text-white/40 text-xs md:text-sm leading-tight mb-2">
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
          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-[1.2] transition-colors duration-500 group-hover:text-primary">
            {project.title}
          </h3>
        </div>

        {/* Arrow Icon Circle - Workflow Spec: translateY(-1) shadow-xl blue shadow-blue-500/10 */}
        <div
          className={`bg-white/5 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shrink-0 border border-white/10 transition-all duration-700 ${
            reducedMotion
              ? ''
              : 'group-hover:translate-x-5 group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,72,255,0.4)]'
          }`}
        >
          <ArrowIcon className="w-5 h-5 md:w-6 md:h-6 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </div>
      </div>
    </>
  );

  const commonClasses =
    'group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md text-left';

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
