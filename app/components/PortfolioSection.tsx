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
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const PortfolioSection: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();

  const motionProps = reducedMotion
    ? { initial: 'visible', whileInView: 'visible', viewport: { once: true } }
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-20% 0px' },
        transition: { duration: 0.6 },
      };

  const renderCard = (project: ProjectCard, index: number) => (
    <motion.article
      key={project.slug}
      {...motionProps}
      variants={cardVariants}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_25px_60px_rgba(15,23,42,0.15)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_35px_70px_rgba(15,23,42,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
    >
      <Link
        href={project.href}
        className="flex h-full flex-col"
        aria-label={`${project.title} — ${project.client}`}
      >
        <div className="relative overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-x-0 top-4 flex items-center justify-between px-4">
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={`${project.slug}-${tag}`}
                  className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold tracking-[0.35em] text-[#0057FF]"
                >
                  {tag}
                </span>
              ))}
            </div>
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
          <h3 className="text-lg font-semibold tracking-tight text-[#111111]">{project.title}</h3>
          <p className="text-sm font-medium text-[#111111]">
            {project.client}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-end px-6 pb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-[0_12px_25px_rgba(0,87,255,0.35)] transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );

  const [magicCard, sportsCard, epicCard, fffCard] = PROJECT_CARDS;

  return (
    <section
      id="portfolio-cards"
      aria-label="Sessão de projetos em destaque"
      className="relative bg-[#f3f4f6] px-4 py-14 md:px-6 lg:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:gap-12">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-[#111111]">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-y-14">
        <div className="col-span-12 md:col-span-5">{magicCard && renderCard(magicCard, 0)}</div>
        <div className="col-span-12 md:col-span-7">{sportsCard && renderCard(sportsCard, 1)}</div>

        <div className="col-span-12">{epicCard && renderCard(epicCard, 2)}</div>

        <div className="col-span-12 md:col-span-7">{fffCard && renderCard(fffCard, 3)}</div>
        <div className="col-span-12 md:col-span-5">
          <motion.div
            {...motionProps}
            variants={cardVariants}
            className="flex h-full flex-col items-start justify-center gap-6 p-2 md:pl-4"
          >
            <p className="text-2xl font-semibold leading-tight text-[#111111]">Like what you see?</p>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0057FF] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(0,87,255,0.35)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
              aria-label="view projects"
            >
              view projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
        <div className="flex justify-center md:justify-end">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(0,87,255,0.35)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
          >
            view projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
