'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

type Alignment = 'start' | 'center' | 'end';

export type CategoryStripeConfig = {
  id: string;
  titleDesktop: string;
  titleMobile: string;
  align: Alignment;
  thumb: string;
};

interface CategoryStripeProps {
  category: CategoryStripeConfig;
  index: number;
  parentInView: boolean;
}

const alignmentClasses: Record<Alignment, string> = {
  start: 'items-start md:items-start',
  center: 'items-start md:items-center',
  end: 'items-start md:items-end',
};

const contentAlignmentClasses: Record<Alignment, string> = {
  start: 'text-left md:text-left',
  center: 'text-left md:text-center',
  end: 'text-left md:text-right',
};

export default function CategoryStripe({
  category,
  index,
  parentInView,
}: CategoryStripeProps) {
  const prefersReducedMotion = useReducedMotion();
  const delay = index * 0.12;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className="w-full border-b border-white/10"
    >
      <Link
        href={`/portfolio?category=${category.id}`}
        className={`group flex w-full flex-col py-10 md:py-16 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${alignmentClasses[category.align]}`}
        role="button"
        aria-label={`Ver projetos de ${category.titleDesktop.replace(/\n/g, ' ')}`}
      >
        <div
          className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-7 transition-all duration-300 group-hover:md:gap-10 ${alignmentClasses[category.align]}`}
        >
          {/* Thumbnail - Only visible on Desktop (Workflow Rule) */}
          <div className="relative hidden md:block h-32 w-0 overflow-hidden rounded-md bg-white/5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:md:w-72">
            <Image
              src={category.thumb}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="288px"
            />
          </div>

          {/* Content Block: Title + Arrow */}
          <div className={`flex items-center gap-4 md:gap-8 ${contentAlignmentClasses[category.align]}`}>
            <h3 className="text-3xl md:text-[clamp(2.5rem,5.5vw,5.5rem)] font-medium leading-[1.1] tracking-tighter text-white transition-colors duration-500 group-hover:text-primary whitespace-pre-line wrap-break-word hyphens-auto">
              <span className="hidden md:inline">{category.titleDesktop}</span>
              <span className="md:hidden">{category.titleMobile}</span>
            </h3>

            {/* Arrow Icon in Circle - Ghost Design: glow sutil no mobile */}
            <div className="flex h-10 w-10 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-500 shadow-[0_0_12px_rgba(0,72,255,0.15)] md:shadow-none group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:shadow-[0_0_24px_rgba(0,72,255,0.5)]">
              <ArrowIcon className="h-4 w-4 md:h-8 md:w-8 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
