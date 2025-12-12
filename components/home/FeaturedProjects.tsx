'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { FEATURED_PROJECTS } from '../../lib/constants';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: 0.05 },
  },
};

const FeaturedProjects: React.FC = () => {
  const heroProjectSlug = FEATURED_PROJECTS.find((p) => p.isHero)?.slug;

  return (
    <section
      id="featured-projects"
      className="relative w-full overflow-hidden bg-[#F4F5F7] text-[#0b0b0b] py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 auto-rows-max"
        >
          {FEATURED_PROJECTS.map((project) => {
            const isHero = project.slug === heroProjectSlug;

            return (
              <motion.a
                key={project.slug}
                variants={cardVariants}
                href={`/portfolio/${project.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-transparent transition-all duration-500 ${isHero ? 'md:col-span-2' : ''}`}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className={`relative w-full overflow-hidden ${isHero ? 'aspect-[2.1/1]' : 'aspect-[4/5]'} rounded-2xl bg-[#0f0f11] shadow-xl shadow-blue-500/10`}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes={
                      isHero
                        ? '(min-width: 1024px) 90vw, 100vw'
                        : '(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw'
                    }
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    priority={isHero}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                    <span className="bg-white/95 backdrop-blur-md text-[#0057FF] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      {project.category}
                    </span>
                    {project.displayCategory &&
                      project.displayCategory !== project.category && (
                        <span className="bg-[#111111]/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                          {project.displayCategory?.split('&')[1] || 'Design'}
                        </span>
                      )}
                  </div>
                </motion.div>

                <motion.div
                  variants={textVariants}
                  className="flex items-start justify-between gap-4 pt-4 px-1"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg md:text-xl font-medium text-[#1a1a1a] leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                      {project.client}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="w-10 h-10 rounded-full bg-[#0057FF] text-white flex items-center justify-center shadow-lg shadow-blue-500/25"
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.div>
              </motion.a>
            );
          })}

          {/* Card CTA */}
          <motion.div
            variants={cardVariants}
            className="relative flex flex-col justify-center items-start md:items-center text-left md:text-center gap-6 p-2 bg-transparent"
          >
            <h3 className="text-3xl md:text-4xl font-light text-[#111111] leading-tight">
              Like what
              <br />
              you see?
            </h3>
            <motion.a
              href="/portfolio"
              className="group relative inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-white font-semibold shadow-lg shadow-[#0057FF]/25 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              view projects
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30"
              >
                <ArrowUpRight className="w-4 h-4 text-white" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
