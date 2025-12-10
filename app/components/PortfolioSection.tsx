'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

type ProjectCard = {
  slug: string;
  title: string;
  client: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  overlayText?: string[];
};

const PROJECT_CARDS: ProjectCard[] = [
  {
    slug: 'magic-radio-branding',
    title: 'Bringing the Magic Back to Radio',
    client: 'Magic',
    href: '/portfolio/magic-radio-branding',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    imageAlt:
      'Magic — devolvendo a magia ao rádio, projeto de branding & campanha para Magic',
    tags: ['branding'],
  },
  {
    slug: 'taking-sportswear',
    title: 'Taking Sportswear to the Skies',
    client: 'Eurosport',
    href: '/portfolio/taking-sportswear',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    imageAlt:
      'Taking Sportswear to the Skies, campanha para Eurosport com atleta flutuando ao pôr do sol',
    tags: ['campaign'],
    overlayText: ['Fearless.', 'Unmatched.'],
  },
  {
    slug: 'epic-look',
    title: 'Epic look',
    client: 'EPIC',
    href: '/portfolio/epic-look',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    imageAlt:
      'Refreshing a Telecom Challenger, key visual de branding para Epic com pessoa usando celular',
    tags: ['branding'],
    overlayText: ['Refreshing a Telecom Challenger'],
  },
  {
    slug: 'fff-legal',
    title: 'Designing Trust – The FFF Legal Identity',
    client: 'FFF Legal',
    href: '/portfolio/fff-legal',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
    imageAlt:
      'Designing Trust — identidade visual da FFF Legal, placa preta e laranja com a marca',
    tags: ['branding', 'website'],
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const PortfolioSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  const motionProps = reducedMotion
    ? { initial: 'visible', whileInView: 'visible', viewport: { once: true } }
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-15% 0px' },
        transition: { duration: 0.6 },
      };

  const renderCard = (
    project: ProjectCard,
    extraClasses = '',
    imageClass = 'aspect-[4/3]'
  ) => (
    <motion.article
      key={project.slug}
      {...motionProps}
      variants={cardVariants}
      className={`group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,87,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF] ${extraClasses}`}
    >
      <Link
        href={project.href}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
        aria-label={`${project.title} — ${project.client}`}
      >
        <div className="relative overflow-hidden">
          <motion.div
            className={`relative ${imageClass} w-full`}
            whileHover={reducedMotion ? undefined : { scale: 1.02, y: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            <Image
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>

          <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4">
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={`${project.slug}-${tag}`}
                  className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0057FF]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-[#0057FF] shadow-sm">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {project.overlayText && (
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
              {project.overlayText.map((text, idx) => (
                <span
                  key={`${project.slug}-overlay-${idx}`}
                  className={`text-lg font-semibold drop-shadow-lg ${
                    idx === 0 ? 'self-start' : 'self-end'
                  }`}
                >
                  {text}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 px-6 py-5">
          <h3 className="text-lg font-semibold tracking-tight text-[#111111]">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-[#111111]">{project.client}</p>
        </div>

        <div className="mt-auto flex items-center justify-end px-6 pb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-[0_12px_25px_rgba(0,87,255,0.35)] transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
            <span className="sr-only">Abrir projeto</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );

  return (
    <section
      id="portfolio-cards"
      aria-label="Sessão de projetos em destaque"
      className="relative bg-[#f4f5f7] px-4 py-16 md:px-8 lg:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:gap-14">
        <div className="flex justify-center">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_14px_30px_rgba(0,87,255,0.28)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
            aria-label="let's build something great"
          >
            let’s build something great →
            <motion.span
              animate={reducedMotion ? undefined : { x: [0, 4, 0] }}
              transition={
                reducedMotion
                  ? undefined
                  : { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }
              }
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </div>

        <motion.div
          {...motionProps}
          variants={listVariants}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {renderCard(PROJECT_CARDS[0])}
          {renderCard(PROJECT_CARDS[1])}
          {renderCard(PROJECT_CARDS[2], 'md:col-span-2', 'aspect-[16/9]')}
          {renderCard(PROJECT_CARDS[3])}

          <motion.article
            {...motionProps}
            variants={cardVariants}
            className="flex h-full flex-col items-start justify-between rounded-[28px] bg-white px-8 py-10 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-[#111111]">
                Like what you see?
              </h3>
              <p className="text-base text-slate-600">
                Projetos selecionados, branding, campanhas e experiências
                digitais.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(0,87,255,0.28)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
              aria-label="view projects"
            >
              view projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
