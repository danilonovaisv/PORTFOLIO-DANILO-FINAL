'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import FeaturedProjectCard, {
  type FeaturedProject,
} from './featured-projects/FeaturedProjectCard';
import CTAProjectCard from './featured-projects/CTAProjectCard';

type FeaturedProjectsSectionProps = {
  onProjectOpen?: (project: FeaturedProject) => void;
};

export default function FeaturedProjectsSection({
  onProjectOpen,
}: FeaturedProjectsSectionProps) {
  const reducedMotion = useReducedMotion();
  const featuredProjects = HOME_CONTENT.featuredProjects;

  const cardVariants = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 40, scale: 0.96 },
    show: reducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
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
          initial={reducedMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: reducedMotion ? {} : { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: reducedMotion ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
                duration: reducedMotion ? 0 : 0.7,
              },
            },
          }}
          // Mobile: single column stack | Desktop: 12-col grid
          className="flex flex-col gap-8 md:grid md:grid-cols-12 md:gap-y-16 md:gap-x-6"
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
                <FeaturedProjectCard
                  project={project}
                  onOpen={onProjectOpen}
                />
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
