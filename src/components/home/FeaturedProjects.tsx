'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { Project } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Projetos vindos da config
  const projects = HOME_CONTENT.featuredProjects as Project[];

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      aria-label="Featured Projects"
      className="relative py-8 md:py-12 bg-section-bg overflow-hidden"
    >
      <div className="mx-auto w-full px-[clamp(1.5rem,5vw,6rem)] max-w-[1680px] relative z-10">
        {/* Grid Layout - Bento Style como na referência */}
        {/* 
          Layout da referência:
          Row 1: Card vertical (3/4) à esquerda | Card horizontal (16/9) à direita
          Row 2: Card ultra-wide (full width)
          Row 3: Card horizontal | CTA Card
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Card 1 - Vertical Portrait (Esquerda) */}
          {projects[0] && (
            <div className="md:col-span-5 h-[380px] md:h-[480px]">
              <ProjectCard project={projects[0]} index={0} className="h-full" />
            </div>
          )}

          {/* Card 2 - Horizontal (Direita) */}
          {projects[1] && (
            <div className="md:col-span-7 h-[280px] md:h-[480px]">
              <ProjectCard project={projects[1]} index={1} className="h-full" />
            </div>
          )}

          {/* Card 3 - Full Width Cinematic */}
          {projects[2] && (
            <div className="md:col-span-12 h-[240px] md:h-[360px]">
              <ProjectCard project={projects[2]} index={2} className="h-full" />
            </div>
          )}

          {/* Card 4 - Horizontal */}
          {projects[3] && (
            <div className="md:col-span-7 h-[280px] md:h-[340px]">
              <ProjectCard project={projects[3]} index={3} className="h-full" />
            </div>
          )}

          {/* CTA Card - "Like what you see?" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="md:col-span-5 h-[280px] md:h-[340px] group relative flex flex-col justify-center items-center p-8 md:p-10 rounded-3xl bg-section-bg hover:bg-section-bg-hover transition-colors duration-500"
          >
            {/* Background Pattern (opcional) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,var(--color-primary)_0%,transparent_50%)]" />
            </div>

            <div className="relative z-10 flex flex-col gap-6 items-center text-center">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-text-dark leading-[0.95]">
                Like what
                <br />
                you see?
              </h3>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 w-fit rounded-full bg-primary px-7 py-3.5 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-sm font-bold tracking-wide uppercase">
                  view projects
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
