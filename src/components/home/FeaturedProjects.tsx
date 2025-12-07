'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '../../lib/constants';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      className="relative py-24 bg-[#F4F5F7] overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {FEATURED_PROJECTS.map((project, index) => {
            const isHero = project.isHero;

            // Define o aspect ratio: Hero é wide, cards normais são portrait
            const aspectRatioClass = isHero
              ? 'aspect-video md:aspect-[2.2/1]'
              : 'aspect-[4/5]';

            return (
              <motion.a
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 0.8,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  delay: index * 0.1,
                }}
                className={`group relative flex flex-col w-full ${isHero ? 'md:col-span-2' : ''}`}
              >
                {/* Container da Imagem */}
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gray-200 w-full ${aspectRatioClass} mb-6 shadow-sm`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />

                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badges de Categoria */}
                  <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 items-end">
                    <span className="bg-white/95 backdrop-blur-md text-[#0057FF] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      {project.category}
                    </span>
                    {project.displayCategory !== project.category && (
                      <span className="bg-[#111111]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {project.displayCategory.split('&')[1] || 'Design'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Informações do Projeto */}
                <div className="flex justify-between items-end px-2">
                  <div className="flex flex-col gap-1 pr-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111111] leading-tight group-hover:text-[#0057FF] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">
                      {project.client}
                    </p>
                  </div>

                  {/* Botão de Seta */}
                  <div className="mb-1 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#0057FF] text-white flex items-center justify-center transform translate-x-0 group-hover:translate-x-2 transition-all duration-300 shadow-lg group-hover:scale-110">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}

          {/* Bloco "Like what you see?" - Ocupa o último espaço do grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center items-center text-center min-h-[400px]"
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
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
