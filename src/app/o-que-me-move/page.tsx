export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { ManifestoScrollSection } from '@/components/sobre/sections';
import { BRAND } from '@/config/brand';
import { normalizeTemplatedTitle, toCanonicalUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: normalizeTemplatedTitle('O Que Me Move'),
  description:
    'Os princípios e crenças que guiam o trabalho criativo de Danilo Novais.',
  alternates: {
    canonical: toCanonicalUrl('/o-que-me-move'),
  },
  openGraph: {
    title: 'O Que Me Move | Danilo Novais',
    description:
      'Os princípios e crenças que guiam o trabalho criativo de Danilo Novais.',
    url: toCanonicalUrl('/o-que-me-move'),
    siteName: BRAND.name,
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function WhatMovesMePage() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-background text-text"
    >
      <ManifestoScrollSection />
    </main>
  );
}
