'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../../content/projects';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    }),
  };

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      className="relative z-10 w-full overflow-hidden bg-[#F4F5F7] py-24"
    >
      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {featuredProjects.map((project, index) => {
            const isWide = project.layout === 'wide';
            const aspectRatioClass = isWide
              ? 'aspect-video md:aspect-[2.35/1]'
              : 'aspect-[4/3]';

            return (
              <motion.a
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                variants={fadeIn}
                className={`group relative flex w-full flex-col ${isWide ? 'md:col-span-2' : ''}`}
              >
                <div
                  className={`relative mb-6 w-full overflow-hidden rounded-2xl bg-gray-200 shadow-sm transition-shadow duration-500 hover:shadow-md ${aspectRatioClass}`}
                >
                  <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Tags Pill Container */}
                  <div className="absolute top-6 right-6 z-20 flex items-center justify-end gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#111111] shadow-sm backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-[#0057FF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-end justify-between px-1">
                  <div className="flex flex-col gap-2 pr-6">
                    <h3 className="text-2xl font-bold leading-tight text-[#111111] transition-colors duration-300 group-hover:text-[#0057FF] md:max-w-md md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500">
                      {project.client}
                    </p>
                  </div>
                  <div className="mb-1 shrink-0">
                    <div className="flex h-10 w-10 transform items-center justify-center rounded-full bg-[#0057FF] text-white shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12">
                      <ArrowRight
                        size={20}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}

          {/* Call to Action Block */}
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex min-h-[300px] flex-col items-center justify-center text-center p-6"
          >
            <h3 className="mb-8 text-4xl font-light leading-tight text-[#111111] md:text-5xl">
              Like what
              <br />
              you see?
            </h3>
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-8 py-4 text-white shadow-xl transition-all duration-300 hover:shadow-[#0057FF]/40"
            >
              <span className="text-base font-bold tracking-wide">
                view projects
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[#0057FF] transition-colors duration-300 group-hover:bg-white group-hover:text-[#0057FF]">
                <ArrowUpRight className="h-4 w-4 text-white group-hover:text-[#0057FF]" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
