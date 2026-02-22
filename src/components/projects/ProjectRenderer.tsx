'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { HeroBackCTA } from '@/components/ui/HeroBackCTA';
import { LANDING_PAGE_BACK, LANDING_PAGE_CTA } from '@/config/cta';
import { LandingPageBlock } from '@/types/landing-page';
import {
  parseLandingPageContent,
  resolveSiteAssetUrl,
} from '@/lib/projects/template-schema';
import {
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
} from '@/types/project-template';
import BlockRenderer from '@/components/projects/BlockRenderer';
import MasterProjectTemplate from '@/components/projects/templates/MasterProjectTemplate';
import ProjectTemplateMasterRenderer from '@/components/projects/templates/ProjectTemplateMasterRenderer';
import ProjectTemplateALPARenderer from '@/components/projects/templates/ProjectTemplateALPARenderer';
import { useLandingBackLink } from '@/components/projects/templates/useLandingBackLink';

interface ProjectRendererProps {
  project: {
    title: string;
    slug?: string;
    cover?: string | null;
    content: unknown;
  };
}

function LegacyProjectRenderer({
  project,
  blocks,
}: {
  project: { title: string; cover?: string | null };
  blocks: LandingPageBlock[];
}) {
  const coverUrl = resolveSiteAssetUrl(project.cover ?? '');
  const backHref = useLandingBackLink();

  return (
    <div className="bg-background text-white selection:bg-blue-600 selection:text-white">
      <section className="relative flex h-[90vh] w-full flex-col items-center justify-center overflow-hidden">
        {coverUrl && (
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={coverUrl}
              alt={project.title}
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
          </motion.div>
        )}

        <div className="std-grid relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl font-bold tracking-tighter md:text-8xl lg:text-9xl"
          >
            {project.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex justify-center"
          >
            <div className="h-24 w-px bg-linear-to-b from-blue-600 to-transparent" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto absolute inset-x-0 bottom-8 z-20"
        >
          <div className="std-grid flex justify-start">
            <HeroBackCTA href={backHref} label={LANDING_PAGE_BACK.label} />
          </div>
        </motion.div>
      </section>

      <div className="space-y-32 pb-32 md:space-y-64">
        {blocks.length > 0 ? (
          blocks.map((block, index) => (
            <BlockRenderer
              key={block.id ?? `block-${index}`}
              block={block}
              index={index}
            />
          ))
        ) : (
          <div className="py-20 text-center text-slate-500">
            Sem conteúdo disponível.
          </div>
        )}
      </div>

      <section className="border-t border-white/5 py-32">
        <div className="std-grid space-y-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
            Obrigado por assistir
          </p>
          <h2 className="text-4xl font-bold md:text-6xl">
            Quer criar algo incrível?
          </h2>
          <div className="flex justify-center pt-8">
            <Link
              href={LANDING_PAGE_CTA.href}
              className="relative inline-block rounded-full focus:outline-none"
            >
              <AntigravityCTA
                as="div"
                text={LANDING_PAGE_CTA.label}
                color={LANDING_PAGE_CTA.color}
                className="relative"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProjectRenderer({ project }: ProjectRendererProps) {
  const parsed = parseLandingPageContent(project.content, {
    slug: project.slug,
    title: project.title,
    cover: project.cover,
  });

  if (parsed.template === MASTER_PROJECT_TEMPLATE) {
    return <MasterProjectTemplate project={parsed.data} />;
  }

  if (parsed.template === MASTER_PROJECT_TEMPLATE_V2) {
    return <ProjectTemplateMasterRenderer project={parsed.data} />;
  }

  if (parsed.template === MASTER_PROJECT_TEMPLATE_V3) {
    return <ProjectTemplateALPARenderer project={parsed.data} />;
  }

  return <LegacyProjectRenderer project={project} blocks={parsed.blocks} />;
}
