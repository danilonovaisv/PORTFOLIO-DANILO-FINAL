'use client';

import React, { useMemo } from 'react';
import { motion, type Variants, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { FEATURED_PROJECTS } from '@/lib/constants';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.05 },
  },
};

type Project = (typeof FEATURED_PROJECTS)[number];

const FeaturedProjects: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const cardAspectClass = 'aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/9]';

  const ProjectCard = ({ project }: { project: Project }) => {
    const tags = useMemo(() => {
      const items: string[] = [];
      if (project.category) items.push(project.category);
      if (
        project.displayCategory &&
        project.displayCategory !== project.category
      ) {
        items.push(
          ...project.displayCategory
            .split('&')
            .map((tag) => tag.trim())
            .filter(Boolean)
        );
      }
      return Array.from(new Set(items));
    }, [project.category, project.displayCategory]);

    return (
      <motion.a
        key={project.slug}
        href={`/portfolio/${project.slug}`}
        variants={cardVariants}
        className="group relative flex w-full flex-col gap-4 outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7]"
      >
        <div
          className={`relative w-full overflow-hidden rounded-[8px] bg-[#0f0f11] ${cardAspectClass}`}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 70vw, (min-width: 768px) 90vw, 100vw"
              className="object-cover brightness-[0.98]"
              priority={project.isHero}
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition duration-300">
              <span className="h-3 w-3 translate-x-0.5 border-l-[6px] border-l-white border-y-[6px] border-y-transparent" />
            </span>
          </div>

          <div className="absolute right-3 top-3 z-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/18 px-3 py-1 text-[10px] font-light uppercase tracking-[0.14em] text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <motion.h3
              variants={textVariants}
              className="text-base md:text-lg font-semibold text-[#111111] tracking-tight"
            >
              {project.title}
            </motion.h3>
            <motion.p
              variants={textVariants}
              className="text-sm font-light uppercase tracking-[0.12em] text-neutral-600"
            >
              {project.client || '—'}
            </motion.p>
          </div>

          <motion.span
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    scale: 1.08,
                    boxShadow: '0 10px 24px -12px rgba(0,87,255,0.65)',
                  }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-md"
          >
            <ArrowRight size={18} />
          </motion.span>
        </div>
      </motion.a>
    );
  };

  const [card1, card2, card3, card4] = FEATURED_PROJECTS;

  return (
    <section
      id="featured-projects"
      className="relative w-full bg-[#F4F5F7] text-[#0b0b0b] py-16 md:py-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:px-10"
      >
        {/* Primeira linha: dois cards verticais alinhados pela base */}
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            {card1 && <ProjectCard project={card1} />}
          </div>
          <div className="md:col-span-3">
            {card2 && <ProjectCard project={card2} />}
          </div>
        </div>

        {/* Segunda linha: card horizontal full width */}
        <div className="w-full">{card3 && <ProjectCard project={card3} />}</div>

        {/* Terceira linha: card + CTA lateral */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            {card4 && <ProjectCard project={card4} />}
          </div>
          <div className="md:col-span-2 flex flex-col items-center justify-center gap-4 rounded-[10px] bg-[#F4F5F7] px-8 py-10 text-center">
            <h3 className="text-2xl md:text-3xl font-light text-[#111111] leading-tight">
              Like what
              <br />
              you see?
            </h3>
            <motion.a
              href="/portfolio"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 14px 36px -18px rgba(0,87,255,0.6)',
              }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-6 py-3 text-white text-sm font-semibold shadow-lg shadow-[#0057FF]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF]"
            >
              view projects
              <motion.span
                variants={{
                  hover: { x: 6, rotate: 15 },
                  tap: { x: 2 },
                  initial: { x: 0, rotate: 0 },
                }}
                initial="initial"
                animate="initial"
                whileHover="hover"
                whileTap="tap"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-white/80"
              >
                <ArrowUpRight className="h-4 w-4 text-white" />
              </motion.span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
