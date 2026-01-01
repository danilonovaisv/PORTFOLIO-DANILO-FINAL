'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

export type FeaturedProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: number;
  tags: string[];
  image: string;
  layout: { h: string; cols: string; sizes: string };
};

interface FeaturedProjectCardProps {
  project: FeaturedProject;
}

export default function FeaturedProjectCard({
  project,
}: FeaturedProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
      aria-label={`Ver projeto: ${project.title}`}
    >
      <div
        className={`relative overflow-hidden rounded-md ${project.layout.h} w-full bg-[#050511] border border-white/5 shadow-[0_12px_48px_-28px_rgba(0,0,0,0.5)] transition-all duration-500 ${
          reducedMotion
            ? ''
            : 'group-hover:shadow-[0_22px_54px_-26px_rgba(0,87,255,0.2)] group-hover:border-white/10'
        }`}
      >
        {/* Subtle Noise Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="absolute top-4 right-4 z-20 flex gap-1.5 flex-wrap justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-black/60 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-[#4fe6ff]"
            >
              {tag}
            </span>
          ))}
        </div>

        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={project.layout.sizes}
          className={`object-cover transition-transform duration-700 opacity-90 group-hover:opacity-100 ${
            reducedMotion ? '' : 'group-hover:scale-[1.02]'
          }`}
        />
      </div>

      <div className="mt-6 flex justify-between items-start gap-6 px-1">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-white/40 text-xs md:text-sm leading-tight mb-2">
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
          <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-[1.2] transition-colors duration-500 group-hover:text-[#0057FF]">
            {project.title}
          </h3>
        </div>

        <div
          className={`bg-white/5 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shrink-0 border border-white/10 transition-all duration-500 ${
            reducedMotion
              ? ''
              : 'group-hover:scale-110 group-hover:bg-[#0057FF] group-hover:border-[#0057FF] group-hover:shadow-[0_0_20px_rgba(0,87,255,0.4)]'
          }`}
        >
          <ArrowIcon className="w-5 h-5 md:w-6 md:h-6 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
        </div>
      </div>
    </Link>
  );
}
