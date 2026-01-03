'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import FeaturedProjectCard from './featured-projects/FeaturedProjectCard';
import CTAProjectCard from './featured-projects/CTAProjectCard';

export default function FeaturedProjectsSection() {
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
      className="relative z-10 bg-background py-16 md:py-24"
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
          className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-16 gap-x-6"
        >
          {featuredProjects.map((project) => {
            if (!project?.layout) return null;
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className={project.layout.cols}
              >
                <FeaturedProjectCard project={project} />
              </motion.div>
            );
          })}

          <motion.div variants={cardVariants} className="md:col-span-4">
            <CTAProjectCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
