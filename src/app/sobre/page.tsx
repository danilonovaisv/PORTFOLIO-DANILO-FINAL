export const dynamic = 'force-static';

import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  AboutHero,
  AboutOrigin,
  AboutWhatIDo,
  AboutMethod,
  AboutClosing,
  AboutProof,
  ManifestoScrollSection,
  StickyContactCTA,
} from '@/components/sobre/sections';
import { SiteClosure } from '@/components/layout/SiteClosure';
import JsonLd from '@/components/ui/JsonLd';

import { BRAND } from '@/config/brand';
import { normalizeTemplatedTitle, toCanonicalUrl } from '@/lib/seo';

/** Minimal skeleton fallback for Suspense boundaries */
function SectionSkeleton({ label }: { label: string }) {
  return (
    <section
      className="relative w-full min-h-[60vh] bg-background"
      aria-label={label}
      aria-busy="true"
    >
      <div className="std-grid py-24">
        <div className="h-10 w-40 bg-bluePrimary/20 rounded-md animate-pulse" />
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: normalizeTemplatedTitle('Sobre — Trajetória e Visão'),
  description:
    'Conheça a trajetória, o método e a visão de Danilo Novais, com foco em branding, campanhas, vídeo, motion e soluções digitais.',
  openGraph: {
    title:
      'Sobre | Danilo Novais — Head de Criação & Diretor de Criação Sênior',
    description:
      'Trajetória, método e visão criativa de Danilo Novais — Head de Criação & Diretor de Criação Sênior com foco em branding, campanhas, vídeo, motion e soluções digitais.',
    url: toCanonicalUrl('/sobre'),
    siteName: BRAND.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sobre | Danilo Novais — Head de Criação & Diretor de Criação Sênior',
      },
    ],
    locale: 'pt_BR',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Sobre | Danilo Novais — Head de Criação & Diretor de Criação Sênior',
    description:
      'Trajetória, método e visão criativa de Danilo Novais — Head de Criação & Diretor de Criação Sênior com foco em branding, campanhas, vídeo, motion e soluções digitais.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: toCanonicalUrl('/sobre'),
  },
};

export default function AboutPage() {
  const siteUrl = toCanonicalUrl('/');
  const selfUrl = toCanonicalUrl('/sobre');

  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-background text-text"
    >
      <JsonLd
        pageType="about"
        breadcrumbs={[
          { name: 'Home', url: siteUrl },
          { name: 'Sobre', url: selfUrl },
        ]}
      />
      {/* Seção 01 — Hero/Manifesto */}
      <Suspense fallback={<SectionSkeleton label="Hero" />}>
        <AboutHero />
      </Suspense>
      {/* Seção 02 — Origem Criativa */}
      <Suspense fallback={<SectionSkeleton label="Origem Criativa" />}>
        <AboutOrigin />
      </Suspense>
      {/* Seção 03 — O Que Eu Faço */}
      <Suspense fallback={<SectionSkeleton label="O Que Eu Faço" />}>
        <AboutWhatIDo />
      </Suspense>
      {/* Seção 04 — Como Eu Trabalho */}
      <Suspense fallback={<SectionSkeleton label="Como Eu Trabalho" />}>
        <AboutMethod />
      </Suspense>
      {/* Seção 05 — O Que Me Move (Manifesto) */}
      <ManifestoScrollSection />
      {/* Seção 06 — Prova & Autoridade (âncora antes da decisão) */}
      <Suspense fallback={<SectionSkeleton label="Prova" />}>
        <AboutProof />
      </Suspense>
      {/* Seção 07 — Fechamento/Confirmação */}
      <Suspense fallback={<SectionSkeleton label="Fechamento" />}>
        <AboutClosing />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Footer" />}>
        <SiteClosure />
      </Suspense>
      {/* CTA persistente de conversão */}
      <StickyContactCTA />
    </main>
  );
}
