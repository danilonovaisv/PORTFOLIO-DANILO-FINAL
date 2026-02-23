import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import {
  AboutHero,
  AboutOrigin,
  AboutWhatIDo,
  AboutMethod,
  AboutClosing,
} from '@/components/sobre/sections';
import AboutBeliefsNoSSR from '@/components/sobre/sections/AboutBeliefsNoSSR';
import { SiteClosure } from '@/components/layout/SiteClosure';
import JsonLd from '@/components/ui/JsonLd';
import { generateVideoSchema } from '@/lib/schema';

import { BRAND } from '@/config/brand';

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
  title: 'Sobre — Trajetória e Visão | Danilo Novais',
  description:
    'Conheça a trajetória, o método e a visão de Danilo Novais — Creative Developer focado em branding, motion e experiências digitais que conectam pessoas e marcas.',
  openGraph: {
    title: 'Sobre | Danilo Novais',
    description:
      'Trajetória, método e visão criativa de Danilo Novais com foco em experiências digitais, branding e motion design.',
    url: `https://${BRAND.domain}/sobre`,
    siteName: BRAND.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sobre | Danilo Novais',
      },
    ],
    locale: 'pt_BR',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre | Danilo Novais',
    description:
      'Trajetória, método e visão criativa de Danilo Novais com foco em experiências digitais, branding e motion design.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: `https://${BRAND.domain}/sobre`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <JsonLd
        pageType="about"
        breadcrumbs={[
          { name: 'Home', url: `https://${BRAND.domain}` },
          { name: 'Sobre', url: `https://${BRAND.domain}/sobre` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateVideoSchema({
              name: 'Sobre Danilo Novais — Trajetória Criativa',
              description:
                'Vídeo apresentando a trajetória, método e visão criativa de Danilo Novais como Creative Developer.',
              thumbnailUrl: `https://${BRAND.domain}/opengraph-image`,
              uploadDate: '2025-01-01',
              embedUrl: `https://${BRAND.domain}/sobre`,
            })
          ),
        }}
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
      {/* Seção 05 — O Que Me Move (Beliefs) */}
      <AboutBeliefsNoSSR />
      {/* Seção 06 — Fechamento/Confirmação */}
      <Suspense fallback={<SectionSkeleton label="Fechamento" />}>
        <AboutClosing />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Footer" />}>
        <SiteClosure />
      </Suspense>
    </div>
  );
}
