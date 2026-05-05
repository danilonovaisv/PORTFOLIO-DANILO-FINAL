'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ResponsiveCaptionTrack } from '@/components/ui/ResponsiveCaptionTrack';
import { cn } from '@/lib/utils';
import { GHOST_EASE, viewportConfig } from '@/config/motion';
import { applyImageFallback } from '@/lib/utils';
import { DEFAULT_VIDEO_POSTER, DEFAULT_CAPTIONS } from '@/lib/video';
import { COLORS } from '@/config/colors';
import { MOTION_TOKENS } from '@/config/motion';

import { useGhostParallaxY } from '@/hooks/useGhostParallaxY';

// ... (Category interface, etc.)

interface Category {
  id: string;
  title: string | string[] | readonly string[];
  mobileTitle?: string[] | readonly string[];
  slug: string;
  thumbnail: string;
  alignment: 'left' | 'center' | 'right';
  showLabel: boolean;
}

interface CategoryStripeProps {
  category: Category;
  index: number;
  isHovered: boolean;
  onHover: (_id: string | null) => void;
  prefersReducedMotion: boolean;
}

/**
 * ⚡ BOLT OPTIMIZATION: Wrapped with React.memo to prevent unnecessary re-renders.
 * PortfolioShowcase maps over categories and passes an `isHovered` boolean to each stripe.
 * Whenever the hovered stripe changes, the parent's state updates, which normally causes
 * all stripes to re-render. Memoizing prevents recalculating media URLs, motion properties,
 * and DOM layout for stripes whose hover state hasn't changed.
 * Expected impact: Significant reduction in render time during hover interactions on the homepage.
 */
export const CategoryStripe = React.memo(function CategoryStripe({
  category,
  index,
  isHovered,
  onHover,
  prefersReducedMotion,
}: CategoryStripeProps) {
  const title = Array.isArray(category.title)
    ? category.title
    : [category.title];
  const mobileTitle =
    category.mobileTitle && category.mobileTitle.length > 0
      ? [...category.mobileTitle]
      : title;

  const stripeRef = useRef<HTMLDivElement>(null);
  const parallaxY = useGhostParallaxY(stripeRef, 18);
  const isVideo = category.thumbnail.endsWith('.mp4');

  return (
    <m.div
      ref={stripeRef}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{
        duration: MOTION_TOKENS.duration.normal,
        ease: GHOST_EASE,
        delay: index * MOTION_TOKENS.stagger.normal,
      }}
    >
      <Link
        href={`/portfolio?category=${category.slug}`}
        className="block group"
        onMouseEnter={() => onHover(category.id)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Desktop Stripe */}
        <div
          className={cn(
            'hidden lg:flex items-center py-8 border-t border-blueAccent/40 transition-all duration-standard',
            category.alignment === 'right' && 'justify-end',
            category.alignment === 'center' && 'justify-center',
            category.alignment === 'left' && 'justify-start',
            isHovered ? 'gap-10' : 'gap-6'
          )}
        >
          <m.div
            className="relative overflow-hidden rounded-lg shrink-0 h-[162px]"
            initial={false}
            animate={{
              width: isHovered ? 288 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: MOTION_TOKENS.duration.normal,
              ease: GHOST_EASE,
            }}
          >
            <div className="relative w-[288px] h-full rounded-lg bg-[#0a0f1c] overflow-hidden">
              <m.div
                style={{ y: prefersReducedMotion ? 0 : parallaxY }}
                className="absolute inset-0 h-full w-full"
              >
                {isVideo ? (
                  <video
                    src={category.thumbnail}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={DEFAULT_VIDEO_POSTER}
                    className="h-full w-full object-cover"
                  >
                    <ResponsiveCaptionTrack src={DEFAULT_CAPTIONS} />
                  </video>
                ) : (
                  <Image
                    src={category.thumbnail}
                    alt={title.join(' ')}
                    fill
                    className="object-cover object-center"
                    sizes="288px"
                    loading="lazy"
                    priority={false}
                    onError={applyImageFallback}
                  />
                )}
              </m.div>
            </div>
          </m.div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              {title.map((line, i) => (
                <span
                  key={i}
                  className={cn(
                    'text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight transition-colors duration-standard',
                    isHovered ? 'text-bluePrimary' : 'text-white'
                  )}
                >
                  {line}
                </span>
              ))}
            </div>

            <m.div
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-standard"
              initial={false}
              animate={{
                y: isHovered ? -1 : 0,
                backgroundColor: isHovered
                  ? COLORS.purpleDetails
                  : COLORS.bluePrimary,
              }}
              transition={{
                duration: MOTION_TOKENS.duration.modal,
                ease: GHOST_EASE,
              }}
            >
              <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </m.div>
          </div>
        </div>

        {/* Mobile Card - Simplified per UI refinement spec (no thumbnails) */}
        <div className="lg:hidden flex flex-col gap-6 py-8 border-t border-blueAccent/40 active:bg-white/5 transition-colors duration-fast rounded-lg -mx-2 px-4">
          {/* Title + Arrow Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col flex-1">
              {mobileTitle.map((line, i) => (
                <span
                  key={i}
                  className="text-[1.9rem] sm:text-[2.2rem] font-light tracking-[-0.04em] text-white leading-[0.92]"
                >
                  {line}
                </span>
              ))}
            </div>
            {/* Touch target: 48px minimum for accessibility */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-bluePrimary active:bg-purpleDetails transition-all duration-fast">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </m.div>
  );
});
