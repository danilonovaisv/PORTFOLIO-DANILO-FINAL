'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import {
  MOTION_TOKENS,
  ghostTransition,
  staggerContainer,
} from '@/config/motion';
import FeaturedProjectCard from '@/components/home/featured-projects/FeaturedProjectCard';
import CTAProjectCard from '@/components/home/featured-projects/CTAProjectCard';
import { getFeaturedProjectBackgroundVariant } from '@/components/home/featured-projects/animated-backgrounds';
import type { PortfolioProject } from '@/types/project';
import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/skeleton';

const { duration, offset } = MOTION_TOKENS;

type FeaturedProjectsSectionProps = {
  projects: PortfolioProject[];
  onProjectOpen?: (_project: PortfolioProject) => void;
};

/**
 * Layout Fixo Bento Grid para Home - Featured Projects
 * Pattern baseado no design reference:
 * - Row 1: 5col + 7col = 12
 * - Row 2: 12col (full-width)
 * - Row 3: 8col + 4col (CTA) = 12
 */
const FEATURED_GRID_LAYOUT = [
  {
    gridClass: 'md:col-span-4 lg:col-span-5',
    frameClass:
      'max-md:aspect-square max-md:h-auto min-h-[220px] md:min-h-[420px] lg:min-h-[520px]',
  },
  {
    gridClass: 'md:col-span-4 lg:col-span-7',
    frameClass:
      'max-md:aspect-square max-md:h-auto min-h-[220px] md:min-h-[420px] lg:min-h-[520px]',
  },
  {
    gridClass: 'md:col-span-8 lg:col-span-12',
    frameClass:
      'max-md:aspect-square max-md:h-auto min-h-[220px] md:min-h-[320px] lg:min-h-[380px]',
  },
  {
    gridClass: 'md:col-span-5 lg:col-span-8',
    frameClass:
      'max-md:aspect-square max-md:h-auto min-h-[220px] md:min-h-[320px] lg:min-h-[360px]',
  },
] as const;

const CTA_FRAME_CLASS =
  'max-md:aspect-square max-md:h-auto min-h-[220px] md:min-h-[320px] lg:min-h-[360px]';

function FeaturedProjectsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6"
    >
      {FEATURED_GRID_LAYOUT.map((layout, index) => (
        <div
          key={`featured-skeleton-${index}`}
          className={`col-span-4 ${layout.gridClass}`}
        >
          <Skeleton className={`w-full rounded-md ${layout.frameClass}`} />
        </div>
      ))}
      <div className="col-span-4 md:col-span-3 lg:col-span-4">
        <Skeleton className={`w-full rounded-md ${CTA_FRAME_CLASS}`} />
      </div>
    </div>
  );
}

export default function FeaturedProjectsSection({
  projects,
  onProjectOpen,
}: FeaturedProjectsSectionProps) {
  const reducedMotion = useMotionGate();
  const featuredProjects = useMemo(() => {
    const source = projects.filter(
      (project) => project.featuredOnHome ?? project.isFeatured
    );
    return source;
  }, [projects]);

  if (featuredProjects.length === 0) {
    return (
      <section
        id="featured-projects"
        aria-label="Projetos em Destaque"
        className="relative z-10 bg-background py-16 md:py-24"
      >
        <Container>
          <h2 className="sr-only">Projetos em Destaque</h2>
          <FeaturedProjectsSkeleton />
        </Container>
      </section>
    );
  }

  const cardVariants = {
    hidden: reducedMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
          y: offset.standard,
          filter: 'blur(6px)',
        },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: ghostTransition(0, duration.normal),
    },
  };

  return (
    <section
      id="featured-projects"
      aria-label="Projetos em Destaque"
      className="relative z-10 bg-background py-16 md:py-24"
    >
      <Container>
        <h2 className="sr-only">Projetos em Destaque</h2>
        <motion.div
          initial={reducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.18, margin: '-64px 0px' }}
          variants={staggerContainer(0.12)}
          // Layout fixo Bento Grid - 12 colunas com gaps consistentes
          className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6"
        >
          {featuredProjects.slice(0, 4).map((project, index) => {
            if (!project) return null;
            const layout = FEATURED_GRID_LAYOUT[index];
            const gridCols = layout?.gridClass ?? 'md:col-span-4 lg:col-span-4';
            const frameClass =
              layout?.frameClass ??
              'min-h-[220px] md:min-h-[320px] lg:min-h-[360px]';

            return (
              <motion.div
                key={project.id}
                layout="position"
                variants={cardVariants}
                transition={ghostTransition(0, duration.normal)}
                // Mobile: full-width (col-span-4) | Desktop: Bento Grid fixo
                // Added h-full and flex flex-col to ensure child card stretches
                className={`w-full col-span-4 ${gridCols} h-full flex flex-col`}
              >
                <FeaturedProjectCard
                  project={project}
                  onOpen={onProjectOpen}
                  priority={index < 3}
                  backgroundVariant={getFeaturedProjectBackgroundVariant(
                    project.id
                  )}
                  frameClassName={frameClass}
                />
              </motion.div>
            );
          })}

          {/* CTA Card - Sempre 4 colunas no desktop, alinhado com o Card 3 para completar a row */}
          <motion.div
            layout="position"
            variants={cardVariants}
            transition={ghostTransition(0, duration.normal)}
            className="w-full col-span-4 md:col-span-3 lg:col-span-4 h-full flex flex-col"
          >
            <CTAProjectCard className={CTA_FRAME_CLASS} />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
