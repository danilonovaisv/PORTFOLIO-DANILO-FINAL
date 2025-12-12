'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { FEATURED_PROJECTS } from '../../lib/constants';
import type { Project } from '../../lib/types';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const PortfolioShowcaseSection: FC<{ projects?: Project[] }> = ({
  projects = FEATURED_PROJECTS,
}) => {
  return (
    <section
      className="bg-[#f5f5f5] px-6 py-24 text-[#111111] md:px-12 md:py-40"
      aria-labelledby="portfolio-showcase-title"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:gap-16">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500"
          >
            [ portfolio em destaque ]
          </motion.p>
          <motion.h2
            id="portfolio-showcase-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 text-4xl font-bold tracking-tight md:mt-5 md:text-6xl"
          >
            <span className="text-[#0057FF]">portfólio</span>{' '}
            <span>showcase</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-5 max-w-2xl text-base text-neutral-600 md:text-lg"
          >
            Seleção de projetos que equilibram estratégia, estética e
            performance digital.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              className="group relative"
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#0057FF]">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  priority={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    {project.displayCategory}
                  </p>
                  <h3 className="text-xl font-semibold text-white leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-white shadow-lg shadow-[#0057FF]/30 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="text-base font-semibold tracking-wide">
              let’s build something great
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-white">
              <ArrowUpRight className="h-5 w-5 text-white group-hover:text-[#0057FF]" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
