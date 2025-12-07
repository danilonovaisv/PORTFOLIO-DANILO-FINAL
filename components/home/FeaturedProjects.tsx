'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '../../lib/constants';
import { ArrowUpRight } from 'lucide-react';
import ProjectsGrid from '../ui/ProjectsGrid';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      className="relative py-24 bg-[#F4F5F7] overflow-hidden"
    >
      {/* 
        Ajuste de container: 
        O ProjectsGrid já tem max-w-7xl e mx-auto. 
        Precisamos apenas garantir o padding lateral do wrapper ou passar padding para ob grid.
      */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <ProjectsGrid projects={FEATURED_PROJECTS} className="lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center items-center text-center min-h-[400px] md:col-span-1"
          >
            <h3 className="text-4xl md:text-5xl font-light text-[#111111] mb-8 leading-tight">
              Like what
              <br />
              you see?
            </h3>

            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 text-white shadow-xl hover:shadow-[#0057FF]/40 transition-all duration-300"
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
