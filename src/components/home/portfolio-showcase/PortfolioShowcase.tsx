'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Ghost easing
const GHOST_EASE = [0.22, 1, 0.36, 1] as const;

// Category data with assets
const CATEGORIES = [
  {
    id: 'brand-campaigns',
    title: 'Brand & Campaigns',
    slug: 'branding',
    thumbnail:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    alignment: 'right' as const,
    showLabel: true, // Show floating label on this stripe
  },
  {
    id: 'videos-motions',
    title: 'Videos & Motions',
    slug: 'motion',
    thumbnail:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    alignment: 'center' as const,
    showLabel: false,
  },
  {
    id: 'websites-tech',
    title: ['Web Campaigns,', 'Websites & Tech'],
    slug: 'web',
    thumbnail:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
    alignment: 'left' as const,
    showLabel: false,
  },
] as const;

/**
 * Compound Fusion CTA Button
 * Pill + Circle design with hover levitation
 */
function CompoundCTA({ href }: { href: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-row items-center justify-center h-[56px] lg:h-[64px]',
        'cursor-pointer transition-transform duration-200 ease-out',
        !prefersReducedMotion && 'hover:-translate-y-px'
      )}
      aria-label="Let's build something great"
    >
      {/* Pill Text (Left) */}
      <div
        className={cn(
          'flex items-center justify-center h-full pl-6 pr-4 lg:pl-8 lg:pr-5',
          'bg-[#0048ff] group-hover:bg-[#3366ff]',
          'text-white rounded-l-full',
          'transition-colors duration-300'
        )}
      >
        <span className="text-sm lg:text-base font-medium tracking-wide whitespace-nowrap">
          let&apos;s build something great
        </span>
      </div>

      {/* Circle Icon (Right) */}
      <div
        className={cn(
          'flex items-center justify-center h-full aspect-square',
          'bg-[#0048ff] group-hover:bg-[#3366ff]',
          'text-white rounded-r-full',
          'transition-colors duration-300'
        )}
      >
        <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2} />
      </div>
    </Link>
  );
}

/**
 * Category Stripe Component (Accordion-style)
 * Reference: Lo&Behold style with cyan borders
 */
function CategoryStripe({
  category,
  index,
  isHovered,
  onHover,
  prefersReducedMotion,
}: {
  category: (typeof CATEGORIES)[number];
  index: number;
  isHovered: boolean;
  onHover: (_id: string | null) => void;
  prefersReducedMotion: boolean;
}) {
  const title = Array.isArray(category.title)
    ? category.title
    : [category.title];

  return (
    <motion.div
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
            'hidden lg:flex items-center py-8 border-t border-[#4fe6ff]/40 transition-all duration-300',
            // Alignment based on category
            category.alignment === 'right' && 'justify-end',
            category.alignment === 'center' && 'justify-center',
            category.alignment === 'left' && 'justify-start',
            isHovered ? 'gap-10' : 'gap-6'
          )}
        >
          {/* Floating Label - Only on first stripe, left side */}
          {category.showLabel && (
            <span className="absolute left-6 lg:left-8 text-sm font-normal text-[#4fe6ff]/80 whitespace-nowrap">
              [what we love working on]
            </span>
          )}

          {/* Thumbnail (revealed on hover) */}
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
              <Image
                src={category.thumbnail}
                alt={
                  (Array.isArray(category.title)
                    ? category.title.join(' ')
                    : category.title) as string
                }
                fill
                className="object-cover"
                sizes="288px"
              />
            </div>
          </motion.div>

          {/* Title + Arrow Container */}
          <div className="flex items-center gap-4">
            {/* Title */}
            <div className="flex flex-col">
              {title.map((line, i) => (
                <span
                  key={i}
                  className={cn(
                    'text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight transition-colors duration-300',
                    isHovered ? 'text-[#0048ff]' : 'text-white'
                  )}
                >
                  {line}
                </span>
              ))}
            </div>

            {/* Arrow Icon - Small circle */}
            <motion.div
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#0048ff] flex items-center justify-center shrink-0"
              initial={false}
              animate={{
                rotate: isHovered ? 0 : -45,
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

        {/* Mobile Card */}
        <div className="lg:hidden flex items-center justify-between py-6 border-t border-[#4fe6ff]/40">
          {/* Title */}
          <div className="flex flex-col">
            {title.map((line, i) => (
              <span
                key={i}
                className="text-xl font-normal tracking-tight text-white"
              >
                {line}
              </span>
            ))}
          </div>

          {/* Arrow Icon */}
          <div className="w-8 h-8 rounded-full bg-[#0048ff] flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Portfolio Showcase Section
 * Lo&Behold inspired accordion stripes with category navigation
 */
export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const prefersReducedMotion = !!useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#040013] py-20 lg:py-32"
      aria-labelledby="portfolio-showcase-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* Headline - "portfólio" italic, "showcase" normal */}
        <motion.header
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: GHOST_EASE }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2
            id="portfolio-showcase-heading"
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
          >
            <span className="text-[#0048ff] italic font-light">portfólio </span>
            <span className="text-white font-bold">showcase</span>
          </h2>
        </motion.header>

        {/* Category Stripes */}
        <div className="relative flex flex-col">
          {CATEGORIES.map((category, index) => (
            <CategoryStripe
              key={category.id}
              category={category}
              index={index}
              isHovered={hoveredCategory === category.id}
              onHover={setHoveredCategory}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}

          {/* Bottom border */}
          <div className="border-t border-[#4fe6ff]/40" />
        </div>

        {/* CTA Button - Compound Fusion Style */}
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: GHOST_EASE, delay: 0.4 }}
          className="flex justify-center mt-12 lg:mt-16"
        >
          <CompoundCTA href="/#contact" />
        </motion.div>
      </div>
    </section>
  );
}
