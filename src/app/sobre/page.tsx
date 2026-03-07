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

import { BRAND } from '@/config/brand';
import { toCanonicalUrl } from '@/lib/seo';

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
    url: toCanonicalUrl('/sobre'),
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
    canonical: toCanonicalUrl('/sobre'),
  },
};

import { preload } from 'react-dom';

export default function AboutPage() {
  const siteUrl = toCanonicalUrl('/');
  const selfUrl = toCanonicalUrl('/sobre');

  // Preload video posters for LCP optimization
  preload(BRAND.assets.video.manifestoPosterDesk, {
    as: 'image',
    fetchPriority: 'high',
  });
  preload(BRAND.assets.video.manifestoPosterMobile, {
    as: 'image',
    fetchPriority: 'high',
  });

  return (
    <div className="min-h-screen bg-background text-white">
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
