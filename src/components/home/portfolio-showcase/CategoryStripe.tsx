'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GHOST_EASE } from '@/config/motion';
import { applyImageFallback } from '@/utils/utils';
import { DEFAULT_CAPTIONS, DEFAULT_VIDEO_POSTER } from '@/lib/video';

const GHOST_SPRING = { damping: 30, stiffness: 200, mass: 1 } as const;

interface Category {
  id: string;
  title: string | string[] | readonly string[];
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

export function CategoryStripe({
  category,
  index,
  isHovered,
  onHover,
  prefersReducedMotion,
}: CategoryStripeProps) {
  const title = Array.isArray(category.title)
    ? category.title
    : [category.title];

  const stripeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stripeRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, GHOST_SPRING);
  const parallaxY = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const isVideo = category.thumbnail.endsWith('.mp4');
  const shouldEagerLoad = index < 3;

  return (
    <motion.div
      ref={stripeRef}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: GHOST_EASE,
        delay: index * 0.12,
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
            'hidden lg:flex items-center py-8 border-t border-blueAccent/40 transition-all duration-300',
            category.alignment === 'right' && 'justify-end',
            category.alignment === 'center' && 'justify-center',
            category.alignment === 'left' && 'justify-start',
            isHovered ? 'gap-10' : 'gap-6'
          )}
        >
          {category.showLabel && (
            <span className="absolute left-6 lg:left-8 text-sm font-normal text-blueAccent/80 whitespace-nowrap">
              [what we love working on]
            </span>
          )}

          <motion.div
            className="relative overflow-hidden rounded-lg shrink-0"
            initial={false}
            animate={{
              width: isHovered ? 288 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: GHOST_EASE,
            }}
          >
            <div className="relative w-[288px] aspect-video">
              <motion.div
                style={{ y: prefersReducedMotion ? 0 : parallaxY }}
                className="absolute inset-0 w-full h-[120%]"
              >
                {isVideo ? (
                  <video
                    src={category.thumbnail}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={DEFAULT_VIDEO_POSTER}
                    className="object-cover w-full h-full"
                  >
                    <track
                      kind="captions"
                      src={DEFAULT_CAPTIONS}
                      srcLang="pt-BR"
                      label="Português"
                      default
                    />
                  </video>
                ) : (
                  <Image
                    src={category.thumbnail}
                    alt={title.join(' ')}
                    fill
                    className="object-cover"
                    sizes="288px"
                    loading={shouldEagerLoad ? 'eager' : 'lazy'}
                    priority={shouldEagerLoad}
                    onError={applyImageFallback}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              {title.map((line, i) => (
                <span
                  key={i}
                  className={cn(
                    'text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight transition-colors duration-300',
                    isHovered ? 'text-bluePrimary' : 'text-white'
                  )}
                >
                  {line}
                </span>
              ))}
            </div>

            <motion.div
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
              initial={false}
              animate={{
                rotate: isHovered ? 0 : -45,
                backgroundColor: isHovered ? '#8705f2' : '#0048ff',
              }}
              transition={{
                duration: 0.5,
                ease: GHOST_EASE,
              }}
            >
              <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Mobile Card - Enhanced with thumbnail preview and better touch targets */}
        <div className="lg:hidden flex flex-col gap-4 py-5 border-t border-blueAccent/40 active:bg-white/5 transition-colors duration-200 rounded-lg -mx-2 px-2">
          {/* Thumbnail Preview - Mobile */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            {isVideo ? (
              <video
                src={category.thumbnail}
                autoPlay
                loop
                muted
                playsInline
                poster={DEFAULT_VIDEO_POSTER}
                className="object-cover w-full h-full"
              >
                <track
                  kind="captions"
                  src={DEFAULT_CAPTIONS}
                  srcLang="pt-BR"
                  label="Português"
                  default
                />
              </video>
            ) : (
              <Image
                src={category.thumbnail}
                alt={title.join(' ')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw"
                loading={shouldEagerLoad ? 'eager' : 'lazy'}
                priority={shouldEagerLoad}
                onError={applyImageFallback}
              />
            )}
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
          </div>

          {/* Title + Arrow Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col flex-1">
              {title.map((line, i) => (
                <span
                  key={i}
                  className="text-lg sm:text-xl font-medium tracking-tight text-white leading-tight"
                >
                  {line}
                </span>
              ))}
            </div>
            {/* Touch target: 48px minimum for accessibility */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#0048ff] active:bg-[#8705f2] active:scale-95 transition-all duration-200">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
