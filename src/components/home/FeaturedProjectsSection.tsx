'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

type FeaturedProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: number;
  tags: string[];
  image: string;
  layout: { h: string; cols: string; sizes: string };
};

const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    slug: 'magic-radio-branding',
    title: 'Magic — devolvendo a magia ao rádio',
    category: 'branding & campanha',
    client: 'Magic',
    year: 2023,
    tags: ['Branding', 'Strategy', 'Campaign'],
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    layout: {
      h: 'h-[500px]',
      cols: 'md:col-span-5',
      sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 44vw, 36vw',
    },
  },
  {
    id: 2,
    slug: 'branding-project-01',
    title: 'Uma marca ousada e consistente',
    category: 'branding',
    client: 'Cliente confidencial',
    year: 2022,
    tags: ['Branding', 'Identity'],
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
    layout: {
      h: 'h-[500px]',
      cols: 'md:col-span-7',
      sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 56vw, 58vw',
    },
  },
  {
    id: 3,
    slug: 'key-visual-campaign',
    title: 'Key visual para campanha sazonal',
    category: 'campanha',
    client: 'Cliente confidencial',
    year: 2021,
    tags: ['Campaign', 'Print', 'Art Direction'],
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    layout: {
      h: 'h-[600px]',
      cols: 'md:col-span-12',
      sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 94vw, 100vw',
    },
  },
  {
    id: 4,
    slug: 'webdesigner-motion',
    title: 'Experiência web em movimento',
    category: 'web & motion',
    client: 'Cliente confidencial',
    year: 2023,
    tags: ['Web', 'Motion', 'UX'],
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    layout: {
      h: 'h-[400px]',
      cols: 'md:col-span-8',
      sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 68vw, 64vw',
    },
  },
];

function ProjectCard({ project }: { project: FeaturedProject }) {
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md"
      aria-label={`Ver projeto: ${project.title}`}
    >
      <div
        className={`relative overflow-hidden rounded-md ${project.layout.h} w-full bg-white shadow-[0_12px_48px_-28px_rgba(0,87,255,0.35)] transition-shadow duration-500 ${
          reducedMotion
            ? ''
            : 'group-hover:shadow-[0_22px_54px_-26px_rgba(0,87,255,0.26)]'
        }`}
      >
        <div className="absolute top-4 right-4 z-20 flex gap-1.5 flex-wrap justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#E6EFEF]/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs md:text-sm font-medium uppercase tracking-wide text-text-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Media: GIF como imagem (não vídeo) */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={project.layout.sizes}
          className={`object-cover transition-transform duration-500 ${
            reducedMotion
              ? ''
              : 'group-hover:scale-[1.03] group-hover:-translate-y-1'
          }`}
        />
      </div>

      <div className="mt-4 flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#6B7280] text-sm md:text-base leading-tight">
            <span className="uppercase tracking-wide text-xs md:text-sm">
              {project.category}
            </span>
            <span aria-hidden className="text-xs md:text-sm">
              •
            </span>
            <span className="text-sm md:text-base">
              {project.client} • {project.year}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-medium leading-tight text-text-dark mt-1.5">
            {project.title}
          </h3>
        </div>

        <div
          className={`bg-[#0057FF] w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0 transition-transform duration-700 ${
            reducedMotion ? '' : 'group-hover:translate-x-5'
          }`}
        >
          <ArrowIcon className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

function CTAProjectCard() {
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href="/portfolio"
      className="group flex flex-col h-full justify-center p-6 md:p-8 bg-[#0057FF] text-white rounded-md hover:bg-[#E6F0FF] hover:text-[#0057FF] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
      aria-label="Ver todos os projetos"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-4">Like what you see?</h3>

      <div className="flex items-center gap-2">
        <span className="font-medium">view projects</span>
        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black/90 group-hover:bg-[#0057FF] transition-colors">
          <ArrowIcon
            className={`w-4 h-4 text-white transition-transform ${reducedMotion ? '' : 'group-hover:translate-x-1'}`}
          />
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProjectsSection() {
  const reducedMotion = useReducedMotion();

  const cardVariants = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 40, scale: 0.96 },
    show: reducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
  };

  return (
    <section
      id="featured-projects"
      aria-label="Projetos em Destaque"
      className="bg-[#F4F5F7] py-16 md:py-24"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.h2
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-2xl md:text-3xl font-bold text-[#0057FF] text-center mb-12 md:mb-16"
        >
          Projetos em Destaque
        </motion.h2>

        <motion.div
          initial={reducedMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: reducedMotion ? {} : { opacity: 0, y: 40 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: reducedMotion ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
                duration: reducedMotion ? 0 : 0.7,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-16 gap-x-6"
        >
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={featuredProjects[index].id}
              variants={cardVariants}
              className={featuredProjects[index].layout.cols}
            >
              <ProjectCard project={featuredProjects[index]} />
            </motion.div>
          ))}

          <motion.div variants={cardVariants} className="md:col-span-4">
            <CTAProjectCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
