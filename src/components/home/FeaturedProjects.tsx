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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {/* Card 1 - Vertical Portrait (Esquerda) */}
          {projects[0] && (
            <div className="md:col-span-5">
              <div className="h-[360px] w-full md:h-[520px]">
                <ProjectCard project={projects[0]} index={0} className="h-full" />
              </div>
            </div>
          )}

          {/* Card 2 - Horizontal (Direita) */}
          {projects[1] && (
            <div className="md:col-span-7">
              <div className="h-[320px] w-full md:h-[520px]">
                <ProjectCard project={projects[1]} index={1} className="h-full" />
              </div>
            </div>
          )}

          {/* Card 3 - Full Width Cinematic */}
          {projects[2] && (
            <div className="md:col-span-12">
              <div className="h-[300px] w-full md:h-[420px]">
                <ProjectCard project={projects[2]} index={2} className="h-full" />
              </div>
            </div>
          )}

          {/* Card 4 - Horizontal */}
          {projects[3] && (
            <div className="md:col-span-8">
              <div className="h-[280px] w-full md:h-[420px]">
                <ProjectCard project={projects[3]} index={3} className="h-full" />
              </div>
            </div>
          )}

          {/* CTA Card - "Like what you see?" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="md:col-span-4"
          >
            <div className="group relative flex h-[260px] w-full flex-col items-center justify-center rounded-3xl bg-section-bg p-8 transition-colors duration-500 hover:bg-section-bg-hover md:h-[420px] md:p-10">
              {/* Background Pattern (opcional) */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-[0.03]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,var(--color-primary)_0%,transparent_50%)]" />
              </div>

              <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-text-dark leading-[0.95]">
                  Like what
                  <br />
                  you see?
                </h3>

                <Link
                  href="/portfolio"
                  className="inline-flex w-fit items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/40"
                >
                  <span className="text-sm font-bold uppercase tracking-wide">
                    view projects
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
