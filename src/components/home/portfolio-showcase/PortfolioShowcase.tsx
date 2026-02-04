'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { Container } from '@/components/layout/Container';
import { CategoryStripe } from './CategoryStripe';
import { getAssetUrl } from '@/utils/utils';
import { GHOST_EASE } from '@/config/motion';

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
    id: 'websites-tech',
    title: ['Web Campaigns,', 'Websites & Tech'],
    slug: 'web',
    thumbnail: getAssetUrl('site-assets/home/showcase/webdesigner-2.gif'),
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
  const prefersReducedMotion = !!useReducedMotion();

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
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: GHOST_EASE }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2
            id="portfolio-showcase-heading"
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
          >
            <span className="text-white italic font-light">portfólio </span>
            <span className="text-bluePrimary font-bold">showcase</span>
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
          viewport={{ once: true }}
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
