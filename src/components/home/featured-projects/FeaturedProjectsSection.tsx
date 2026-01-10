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

export default function FeaturedProjectsSection({
  onProjectOpen,
}: FeaturedProjectsSectionProps) {
  const reducedMotion = useReducedMotion();
  const featuredProjects = HOME_CONTENT.featuredProjects;

  // Card variants sem scale (Ghost Design System proíbe scale em elementos principais)
  const cardVariants = {
    hidden: reducedMotion
      ? {}
      : { opacity: 0, y: offset.large, filter: 'blur(4px)' },
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
      className="relative z-10 bg-ghost-bg py-16 md:py-24"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.div
          initial={reducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.08)}
          // Mobile: single column stack | Desktop: 12-col grid
          className="flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-y-12 md:gap-x-6"
        >
          {featuredProjects.map((project) => {
            if (!project?.layout) return null;
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                // Mobile: full-width | Desktop: bento-style spans
                className={`w-full ${project.layout.cols}`}
              >
                <FeaturedProjectCard project={project} onOpen={onProjectOpen} />
              </motion.div>
            );
          })}

          {/* CTA Card - Mobile: full-width button | Desktop: col-span-4 */}
          <motion.div variants={cardVariants} className="w-full md:col-span-4">
            <CTAProjectCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
