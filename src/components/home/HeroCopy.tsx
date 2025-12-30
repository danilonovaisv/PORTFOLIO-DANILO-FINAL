// src/components/home/HeroCopy.tsx

'use client';

import React from 'react';

export default function HeroCopy() {
  return (
    <div className="text-[#d9dade] max-w-3xl mx-auto">
      <p className="font-mono text-sm uppercase tracking-widest mb-3">
        [BRAND AWARENESS]
      </p>

      <h1 className="font-bold text-5xl md:text-6xl leading-tight mb-6">
        Design, não é só estética.
      </h1>

      <p className="text-lg mb-8">[É intenção, é estratégia, é experiência.]</p>

      <a
        href="/sobre"
        aria-label="Ir para a página Sobre"
        className="inline-flex items-center gap-2 text-[#d9dade] hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded"
      >
        get to know me better →
      </a>
    </div>
  );
}