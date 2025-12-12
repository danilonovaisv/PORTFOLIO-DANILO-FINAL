'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FEATURED_PROJECTS } from '../../lib/constants';
import { ArrowRight } from 'lucide-react';

const FeaturedProjects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section
      id="featured-projects"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F4F5F7] text-[#0b0b0b] py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Featured projects
            </h2>
            <span className="text-sm uppercase tracking-[0.2em] text-[#0057FF]">
              Destaques
            </span>
          </div>

          <motion.div
            className="flex gap-8 md:gap-12 overflow-x-auto snap-x snap-mandatory no-scrollbar"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {FEATURED_PROJECTS.map((project, index) => (
              <motion.a
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group snap-center min-w-full lg:min-w-[85vw] xl:min-w-[80vw] flex flex-col gap-6"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{
                  duration: 0.9,
                  ease: 'easeOut',
                  delay: index * 0.08,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden rounded-[28px] bg-[#0f0f11] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                >
                  <motion.div
                    style={{ y: parallaxY }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1280px) 80vw, (min-width: 768px) 85vw, 100vw"
                      className="object-cover transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />

                  <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 items-end">
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
                  style={{ y: textY }}
                  className="flex items-center justify-between gap-6"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl md:text-4xl font-semibold leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.22em] text-neutral-600">
                      {project.client}
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="w-12 h-12 rounded-full bg-[#0057FF] text-white flex items-center justify-center shadow-lg"
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
