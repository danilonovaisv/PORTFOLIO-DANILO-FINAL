import React from 'react';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/sobre/AboutHero';
import AboutOrigin from '@/components/sobre/AboutOrigin';
import { AboutWhatIDo } from '@/components/sobre/AboutWhatIDo';
import AboutMethod from '@/components/sobre/AboutMethod';
import { AboutBeliefs } from '@/components/sobre/AboutBeliefs';
import { AboutClosing } from '@/components/sobre/AboutClosing';

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a trajetória, o método e a visão de Danilo Novais por trás do design e desenvolvimento criativo.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ghost-bg text-white">
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
    </div>
  );
}
