'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { Container } from '@/components/layout/Container';
import { CategoryStripe } from '@/components/home/portfolio-showcase/CategoryStripe';
import { getAssetUrl } from '@/lib/utils';
import { GHOST_EASE, viewportConfig } from '@/config/motion';

// Category data with assets
const CATEGORIES = [
  {
    id: 'brand-campaigns',
    title: 'Brand & Campaigns',
    slug: 'branding',
    thumbnail: getAssetUrl('site-assets/home/showcase/Branding-Project.webp'),
    alignment: 'right' as const,
    showLabel: true, // Show floating label on this stripe
  },
  {
    id: 'videos-motions',
    title: 'Videos & Motions',
    slug: 'motion',
    thumbnail: getAssetUrl('site-assets/home/showcase/show.video.mp4'),
    alignment: 'center' as const,
    showLabel: false,
  },
  {
    id: 'web-tech',
    title: 'Websites & Tech',
    slug: 'web',
    // GIF substituído por frame estático WebP para reduzir LCP e peso inicial
    thumbnail: getAssetUrl('site-assets/home/showcase/Branding-Project.webp'),
    alignment: 'left' as const,
    showLabel: false,
  },
] as const;

/**
 * Portfolio Showcase Section
 * Lo&Behold inspired accordion stripes with category navigation
 */
export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const prefersReducedMotion = useMotionGate();

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative w-full bg-background py-20 lg:py-32"
      aria-labelledby="portfolio-showcase-heading"
    >
      <Container>
        {/* Headline - "portfólio" italic, "showcase" normal */}
        <motion.header
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.7, ease: GHOST_EASE }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2
            id="portfolio-showcase-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none"
          >
            <span className="text-bluePrimary italic font-light block sm:inline">
              portfólio{' '}
            </span>
            <span className="text-white font-bold block sm:inline">
              showcase
            </span>
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
          <div className="border-t border-blueAccent/40" />
        </div>

        {/* CTA Button - Compound Fusion Style */}
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease: GHOST_EASE, delay: 0.4 }}
          className="flex justify-center mt-12 lg:mt-16"
        >
          <AntigravityCTA
            href="/#contact"
            text="let's build something great"
            className="relative"
          />
        </motion.div>
      </Container>
    </section>
  );
}
