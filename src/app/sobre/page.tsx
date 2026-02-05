import React from 'react';
import type { Metadata } from 'next';
import {
  AboutHero,
  AboutOrigin,
  AboutWhatIDo,
  AboutMethod,
  AboutBeliefs,
  AboutClosing,
} from '@/components/sobre/sections';
import { SiteClosure } from '@/components/layout/SiteClosure';
import JsonLd from '@/components/ui/JsonLd';

import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Sobre | Danilo Novais',
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
      <JsonLd pageType="about" />
      {/* Seção 01 — Hero/Manifesto */}
      <AboutHero />
      {/* Seção 02 — Origem Criativa */}
      <AboutOrigin />
      {/* Seção 03 — O Que Eu Faço */}
      <AboutWhatIDo />
      {/* Seção 04 — Como Eu Trabalho */}
      <AboutMethod />
      {/* Seção 05 — O Que Me Move (Beliefs) */}
      <AboutBeliefs />
      {/* Seção 06 — Fechamento/Confirmação */}
      <AboutClosing />
      <SiteClosure />
    </div>
  );
}
