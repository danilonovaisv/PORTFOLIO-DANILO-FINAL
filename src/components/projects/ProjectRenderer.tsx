'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { LandingPageBlock } from '@/types/landing-page';
import BlockRenderer from './BlockRenderer';

interface ProjectRendererProps {
  project: {
    title: string;
    cover: string;
    content: LandingPageBlock[];
  };
}

export default function ProjectRenderer({ project }: ProjectRendererProps) {
  // Resolve cover URL
  const supabaseBaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '') ?? '';
  const coverUrl =
    project.cover && !project.cover.startsWith('http')
      ? supabaseBaseUrl
        ? `${supabaseBaseUrl}/storage/v1/object/public/site-assets/${project.cover}`
        : ''
      : project.cover || '';

  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const backUrl = from === 'portfolio' ? '/portfolio' : '/';
  const backLabel =
    from === 'portfolio' ? 'Voltar ao Portfólio' : 'Voltar para Home';

  return (
    <div className="bg-[#040013] text-white selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden">
        {coverUrl && (
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={coverUrl}
              alt={project.title}
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#040013]/50 to-[#040013]" />
          </motion.div>
        )}

        <div className="absolute top-0 left-0 z-50 p-6 md:p-10 w-full flex justify-between items-start pointer-events-none">
          <Link
            href={backUrl}
            className="pointer-events-auto group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md group-hover:bg-white/10 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              {backLabel}
            </span>
          </Link>
        </div>

        <div className="std-grid relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
          >
            {project.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12 flex justify-center"
          >
            <div className="w-px h-24 bg-linear-to-b from-blue-600 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <div className="space-y-32 md:space-y-64 pb-32">
        {project.content && Array.isArray(project.content) ? (
          (project.content as LandingPageBlock[]).map(
            (block: LandingPageBlock, index: number) => (
              <BlockRenderer
                key={block.id ?? `block-${index}`}
                block={block}
                index={index}
              />
            )
          )
        ) : (
          <div className="text-center text-slate-500 py-20">
            Sem conteúdo disponível.
          </div>
        )}
      </div>

      {/* Footer / CTA */}
      <section className="py-32 border-t border-white/5">
        <div className="std-grid text-center space-y-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400 font-bold">
            Obrigado por assistir
          </p>
          <h2 className="text-4xl md:text-6xl font-bold">
            Quer criar algo incrível?
          </h2>
          <div className="flex justify-center pt-8">
            <Link
              href="/#contact"
              className="inline-block px-12 py-5 bg-blue-600 rounded-full text-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-500"
            >
              Vamos Conversar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
