'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';
import { HOME_CONTENT } from '@/config/content';

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
  showFloatingLabel?: boolean;
}

const stripeAlignment: Record<Alignment, string> = {
  start: 'md:items-start',
  center: 'md:items-center',
  end: 'md:items-end',
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
  showFloatingLabel = false,
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
      className="w-full border-b border-purpleDetails/40"
    >
      <Link
        href={`/portfolio?category=${category.id}`}
        className={`group relative flex w-full flex-col py-12 md:py-24 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${stripeAlignment[category.align]} overflow-hidden md:overflow-visible`}
        role="button"
        aria-label={`Ver projetos de ${category.titleDesktop.replace(/\n/g, ' ')}`}
      >
        {/* Floating Label - Only for the first item, desktop only */}
        {showFloatingLabel && (
          <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex">
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">
              {HOME_CONTENT.showcase.floatingLabel}
            </span>
          </div>
        )}

        <div
          className={`relative z-10 flex flex-col items-start w-full md:w-auto md:flex-row md:items-center gap-6 md:gap-7 transition-all duration-300 group-hover:md:gap-10 ${contentAlignmentClasses[category.align]}`}
        >
          {/* Thumbnail - Only visible on Desktop */}
          <div
            className="hidden md:block relative h-[162px] w-0 overflow-hidden rounded-[18px] bg-black/30 opacity-0 transition-[width,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:md:w-[288px] group-hover:md:opacity-100 shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            aria-hidden="true"
          >
            <Image
              src={category.thumb}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="288px"
            />
          </div>

          {/* Content Block: Title + Arrow */}
          <div className="flex w-full md:w-auto items-center justify-between md:justify-start gap-5 md:gap-8">
            <motion.h3
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              animate={parentInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay,
              }}
              className="text-white text-3xl md:text-[clamp(2.5rem,5.5vw,5.2rem)] font-medium leading-[1.05] tracking-tight whitespace-pre-line group-hover:text-primary transition-all duration-500 text-left"
            >
              <span className="hidden md:inline">{category.titleDesktop}</span>
              <span className="md:hidden">{category.titleMobile}</span>
            </motion.h3>

            <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary text-white shadow-[0_4px_15px_rgba(0,72,255,0.25)] transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-black group-hover:shadow-[0_0_20px_rgba(79,230,255,0.5)]">
              <ArrowIcon
                className="h-4 w-4 md:h-6 md:w-6 -rotate-45 transition-transform duration-500 group-hover:rotate-0"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
