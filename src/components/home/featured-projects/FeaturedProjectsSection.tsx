'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import {
  MOTION_TOKENS,
  ghostTransition,
  staggerContainer,
} from '@/config/motion';
import FeaturedProjectCard, {
  type FeaturedProject,
} from './FeaturedProjectCard';
import CTAProjectCard from './CTAProjectCard';

const { duration, offset } = MOTION_TOKENS;

type FeaturedProjectsSectionProps = {
  onProjectOpen?: (_project: FeaturedProject) => void;
};

import { Container } from '@/components/layout/Container';

export default function FeaturedProjectsSection({
  onProjectOpen,
}: FeaturedProjectsSectionProps) {
  const reducedMotion = useReducedMotion();
  const featuredProjects = HOME_CONTENT.featuredProjects;

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
          // Mobile: single column stack | Desktop: 12-col grid
          className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-6 md:gap-y-12"
        >
          {featuredProjects.map((project) => {
            if (!project?.layout) return null;
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                // Mobile: full-width | Desktop: bento-style spans
                className={`w-full col-span-4 ${project.layout.cols}`}
              >
                <FeaturedProjectCard project={project} onOpen={onProjectOpen} />
              </motion.div>
            );
          })}

          {/* CTA Card - Mobile: full-width button | Desktop: col-span-4 */}
          <motion.div
            variants={cardVariants}
            className="w-full col-span-4 md:col-span-3 lg:col-span-4"
          >
            <CTAProjectCard />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
