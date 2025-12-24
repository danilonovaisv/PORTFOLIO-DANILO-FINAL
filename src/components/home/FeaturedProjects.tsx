'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { Project } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      aria-label="Featured Projects"
      className="relative py-24 bg-[#F4F5F7] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[92%] xl:max-w-[1680px] relative z-10">
        <h2 className="sr-only">Projetos em Destaque</h2>
        {/* Section Header (Optional/Hidden based on design - usually Showcase covers it, but nice to simply list) */}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-20">
          {(HOME_CONTENT.featuredProjects as Project[]).map(
            (project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            )
          )}

          {/* "Like what you see?" Block - Occupies the last grid slot or spans common width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center items-center text-center min-h-[300px] md:min-h-auto p-8 md:p-0 rounded-2xl bg-black/5 md:bg-transparent border border-black/5 md:border-none"
          >
            <h3 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-[#111111] mb-8 leading-tight">
              Like what
              <br />
              you see?
            </h3>

            <Link
              href="/portfolio"
              className="group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-8 py-4 md:px-10 md:py-5 text-white shadow-lg shadow-[#0057FF]/20 hover:shadow-[#0057FF]/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="text-base md:text-lg font-bold tracking-wide">
                view projects
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#0057FF] transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
