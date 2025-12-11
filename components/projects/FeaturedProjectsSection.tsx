'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type Project = {
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  imageUrl: string;
};

const FEATURED_PROJECTS: Project[] = [
  {
    slug: 'magic-radio-branding',
    title: 'Magic — devolvendo a magia ao rádio',
    category: 'branding & campanha',
    client: 'Magic',
    year: '2023',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
  },
  {
    slug: 'branding-project-01',
    title: 'Uma marca ousada e consistente',
    category: 'branding',
    client: 'Cliente confidencial',
    year: '2022',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
  },
  {
    slug: 'key-visual-campaign',
    title: 'Key visual para campanha sazonal',
    category: 'campanha',
    client: 'Cliente confidencial',
    year: '2021',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
  },
  {
    slug: 'webdesigner-motion',
    title: 'Experiência web em movimento',
    category: 'web & motion',
    client: 'Cliente confidencial',
    year: '2023',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
  },
];

export default function FeaturedProjectsSection() {
  const reduced = usePrefersReducedMotion();

  const sectionProps = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.6 },
      };

  return (
    <motion.section className="bg-[#F4F5F7] py-16" {...sectionProps}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-2xl font-semibold text-[#0057FF]">
          Projetos em Destaque
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, index) => (
            <motion.article
              key={project.slug}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm"
              initial={reduced ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
              }}
            >
              <div className="overflow-hidden">
                <motion.div
                  whileHover={reduced ? undefined : { scale: 1.03, y: -4 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={800}
                    height={500}
                    className="h-56 w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              </div>
              <div className="flex flex-1 flex-col gap-1 px-5 py-4">
                <h3 className="text-base font-semibold text-[#111111]">
                  {project.title}
                </h3>
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  {project.category}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {project.client} • {project.year}
                </p>
                <div className="mt-3">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex text-xs font-medium text-[#0057FF] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7]"
                  >
                    ver projeto →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Card CTA */}
          <motion.article
            className="flex flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-sm md:col-span-2 lg:col-span-1"
            initial={reduced ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-4 text-lg font-semibold text-[#111111]">
              Like what you see?
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-[#0057FF] px-5 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#0044cc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7]"
            >
              <span>view projects</span>
              <motion.span
                className="inline-block"
                animate={reduced ? undefined : { x: [0, 4, 0] }}
                transition={
                  reduced
                    ? undefined
                    : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                →
              </motion.span>
            </Link>
          </motion.article>
        </div>
      </div>
    </motion.section>
  );
}
