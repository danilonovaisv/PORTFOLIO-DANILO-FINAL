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

const stripeAlignment: Record<Alignment, string> = {
  start: 'md:items-start md:justify-start',
  center: 'md:items-center md:justify-center',
  end: 'md:items-end md:justify-end',
};

const stripeDirection: Record<Alignment, string> = {
  start: 'md:flex-row',
  center: 'md:flex-row',
  end: 'md:flex-row-reverse',
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
        className={`group relative flex w-full flex-col py-10 md:py-16 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${stripeAlignment[category.align]} items-start md:items-stretch`}
        role="button"
        aria-label={`Ver projetos de ${category.titleDesktop.replace(/\n/g, ' ')}`}
      >
        <div
          className={`flex flex-col ${stripeDirection[category.align]} items-start md:items-center w-full gap-6 md:gap-7 transition-all duration-300 group-hover:md:gap-10 ${contentAlignmentClasses[category.align]}`}
        >
          {/* Thumbnail - Only visible on Desktop (Workflow Rule) */}
          <div
            className="hidden md:block relative h-[162px] w-0 overflow-hidden rounded-[24px] bg-black/30 opacity-0 transition-[width,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:md:w-[288px] group-hover:md:opacity-100"
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
          <div className="flex w-full items-center justify-between gap-4 md:gap-8">
            <div
              className={`flex-1 ${contentAlignmentClasses[category.align]}`}
            >
              <motion.h3
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                animate={parentInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay,
                }}
                className="text-white text-3xl md:text-[clamp(2.5rem,5.5vw,5.5rem)] font-medium md:font-normal leading-[1.1] tracking-tight whitespace-pre-line group-hover:text-primary transition-all duration-500"
              >
                <span className="hidden md:inline">
                  {category.titleDesktop}
                </span>
                <span className="md:hidden">{category.titleMobile}</span>
              </motion.h3>
            </div>

            <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary text-white shadow-[0_0_18px_rgba(0,72,255,0.4)] transition-all duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-black group-hover:shadow-[0_0_24px_rgba(79,230,255,0.6)]">
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
