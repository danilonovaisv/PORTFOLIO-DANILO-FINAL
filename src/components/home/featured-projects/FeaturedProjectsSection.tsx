'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  MOTION_TOKENS,
  ghostTransition,
  staggerContainer,
} from '@/config/motion';
import FeaturedProjectCard from './FeaturedProjectCard';
import CTAProjectCard from './CTAProjectCard';
import type { PortfolioProject } from '@/types/project';
import { Container } from '@/components/layout/Container';

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
const BENTO_GRID_LAYOUT = [
  'md:col-span-4 lg:col-span-5', // Card 0: 5 colunas
  'md:col-span-4 lg:col-span-7', // Card 1: 7 colunas
  'md:col-span-8 lg:col-span-12', // Card 2: Full-width
  'md:col-span-5 lg:col-span-8', // Card 3: 8 colunas (antes do CTA)
];

export default function FeaturedProjectsSection({
  projects,
  onProjectOpen,
}: FeaturedProjectsSectionProps) {
  const reducedMotion = useReducedMotion();
  const featuredProjects = projects.filter((project) => project.isFeatured);

  // Card variants sem scale (Ghost Design System proíbe scale em elementos principais)
  const cardVariants = {
    hidden: reducedMotion
      ? {}
      : { opacity: 0, y: offset.dramatic, filter: 'blur(4px)' },
    visible: reducedMotion
      ? { opacity: 1 }
      : {
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
        <motion.div
          initial={reducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.12)}
          // Layout fixo Bento Grid - 12 colunas com gaps consistentes
          className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6"
        >
          {featuredProjects.slice(0, 4).map((project, index) => {
            if (!project) return null;
            // Usar layout fixo baseado no índice, não no project.layout.cols
            const gridCols =
              BENTO_GRID_LAYOUT[index] || 'md:col-span-4 lg:col-span-4';

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                // Mobile: full-width (col-span-4) | Desktop: Bento Grid fixo
                // Added h-full and flex flex-col to ensure child card stretches
                className={`w-full col-span-4 ${gridCols} h-full flex flex-col`}
              >
                <FeaturedProjectCard project={project} onOpen={onProjectOpen} />
              </motion.div>
            );
          })}

          {/* CTA Card - Sempre 4 colunas no desktop, alinhado com o Card 3 para completar a row */}
          <motion.div
            variants={cardVariants}
            className="w-full col-span-4 md:col-span-3 lg:col-span-4 h-full flex flex-col"
          >
            <CTAProjectCard />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
