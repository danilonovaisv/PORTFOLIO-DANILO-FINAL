'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '@/src/lib/constants';
import ProjectsGrid from '@/app/_components/projects/ProjectsGrid';
import { ArrowUpRight } from 'lucide-react';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      className="relative py-24 bg-[#F4F5F7] overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <ProjectsGrid projects={FEATURED_PROJECTS}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center gap-6 rounded-3xl border border-neutral-200 bg-white/95 px-6 py-10 text-center shadow-xl min-h-[400px]"
          >
            <h3 className="text-4xl md:text-5xl font-light text-[#111111] leading-tight">
              Like what
              <br />
              you see?
            </h3>

            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 text-white shadow-xl hover:shadow-[#0057FF]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:ring-[#0057FF]/70"
            >
              <span className="text-lg font-bold tracking-wide">
                view projects
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-[#0057FF] transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#0057FF]" />
              </span>
            </motion.a>
          </motion.div>
        </ProjectsGrid>
      </div>
    </section>
  );
};

export default FeaturedProjects;
