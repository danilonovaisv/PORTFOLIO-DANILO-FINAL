'use client';

import { useRef, useState } from 'react';
import { m } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { Container } from '@/components/layout/Container';
import { CategoryStripe } from '@/components/home/portfolio-showcase/CategoryStripe';
import { getAssetUrl } from '@/lib/utils';
import { GHOST_EASE, MOTION_TOKENS, viewportConfig } from '@/config/motion';
import { SITE_ASSET_KEYS } from '@/config/site-assets';

// Category data with assets
const CATEGORIES = [
  {
    id: 'brand-campaigns',
    title: 'Brand & Campaigns',
    mobileTitle: ['Brand', '& Campaigns'],
    slug: 'branding',
    thumbnail: getAssetUrl(SITE_ASSET_KEYS.portfolioShowcase.brandCampaigns),
    alignment: 'right' as const,
    showLabel: true, // Show floating label on this stripe
  },
  {
    id: 'videos-motions',
    title: 'Videos & Motions',
    mobileTitle: ['Videos', '& Motions'],
    slug: 'motion',
    thumbnail: getAssetUrl(SITE_ASSET_KEYS.portfolioShowcase.videosMotions, {
      isVideo: true,
    }),
    alignment: 'center' as const,
    showLabel: false,
  },
  {
    id: 'web-tech',
    title: 'Websites & Tech',
    mobileTitle: ['Websites', '& Tech'],
    slug: 'web',
    thumbnail: getAssetUrl(SITE_ASSET_KEYS.portfolioShowcase.websitesTech),
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
        <m.header
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{
            duration: MOTION_TOKENS.duration.normal,
            ease: GHOST_EASE,
          }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2
            id="portfolio-showcase-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none"
          >
            <span className="text-white block sm:inline">portfólio </span>
            <span className="text-bluePrimary italic font-light block sm:inline">
              showcase
            </span>
          </h2>
        </m.header>

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
        <m.div
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{
            duration: MOTION_TOKENS.duration.GHOST_EXIT,
            ease: GHOST_EASE,
            delay: 0.4,
          }}
          className="flex justify-center mt-12 lg:mt-16"
        >
          <AntigravityCTA
            href="/#contact"
            text="let's build something great"
            className="relative"
          />
        </m.div>
      </Container>
    </section>
  );
}
