'use client';

import React from 'react';
import { HOME_CONTENT } from '@/config/content';

export default function HeroCopy() {
  return (
    <div className="text-[#d9dade] max-w-3xl mx-auto">
      <p className="font-mono text-sm uppercase tracking-widest mb-3">
        {HOME_CONTENT.hero.tag}
      </p>

      <h1 className="font-bold text-5xl md:text-6xl leading-tight mb-6">
        {HOME_CONTENT.hero.title[0]}
        <br />
        {HOME_CONTENT.hero.title[1]}
      </h1>

      <p className="text-lg mb-8">{HOME_CONTENT.hero.subtitle}</p>

      <a
        href="/sobre"
        aria-label="Ir para a página Sobre"
        className="inline-flex items-center gap-2 text-[#d9dade] hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded"
      >
        {HOME_CONTENT.hero.cta} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
