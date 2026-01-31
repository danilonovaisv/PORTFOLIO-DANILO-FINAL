import React from 'react';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/sobre/AboutHero';
import AboutOrigin from '@/components/sobre/AboutOrigin';
import { AboutWhatIDo } from '@/components/sobre/AboutWhatIDo';
import AboutMethod from '@/components/sobre/AboutMethod';
import { AboutBeliefs } from '@/components/sobre/AboutBeliefs';
import { AboutClosing } from '@/components/sobre/AboutClosing';
import { SiteClosure } from '@/components/layout/SiteClosure';

import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a trajetória, o método e a visão de Danilo Novais por trás do design e desenvolvimento criativo.',
  openGraph: {
    title: 'Sobre | Danilo Novais',
    description: 'Trajetória, método e visão criativa de Danilo Novais.',
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
    description: 'Trajetória, método e visão criativa de Danilo Novais.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: `https://${BRAND.domain}/sobre`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-white">
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
