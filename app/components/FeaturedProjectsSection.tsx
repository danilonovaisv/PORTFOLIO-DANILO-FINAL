'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects, Project } from '@/content/projects';
import ProjectCard from './ProjectCard';

type FeaturedProjectsSectionProps = {
  projects?: Project[];
};

const ctaVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const FeaturedProjectsSection = ({ projects = featuredProjects }: FeaturedProjectsSectionProps) => {
  const arranged = projects.slice(0, 4);
  const [smallProject, mediumProject, wideProject, rectangleProject] = arranged;

  return (
    <section id="featured-projects" className="bg-[#F4F5F7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-8">
          {(smallProject || mediumProject) && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
              {smallProject && (
                <ProjectCard project={smallProject} index={0} className="w-full" />
              )}
              {mediumProject && (
                <ProjectCard project={mediumProject} index={1} className="w-full" />
              )}
            </div>
          )}

          {wideProject && (
            <div className="w-full">
              <ProjectCard project={wideProject} index={2} className="w-full" />
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] lg:items-stretch">
            {rectangleProject && (
              <ProjectCard project={rectangleProject} index={3} className="w-full h-full" />
            )}

            <motion.div
                variants={ctaVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                className="flex min-h-[260px] w-full flex-col justify-center gap-6 rounded-[1.5rem] bg-[#F4F5F7] p-8"
              >
                <p className="text-sm font-normal text-[#7D8297] tracking-normal">Like what</p>
                <h3 className="text-4xl font-light text-[#111111] leading-tight">
                  you see?
                </h3>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-6 py-3 text-sm font-semibold tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#0045d6]"
                >
                  <span>view projects</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0057FF]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
