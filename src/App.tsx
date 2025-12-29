'use client';

import React, { useState } from 'react';

import FluidGlassHeader from './components/header/webgl/FluidGlass';

const navItems = [
  { label: 'Home', href: '#hero', ariaLabel: 'Ir para a Home' },
  {
    label: 'Sobre',
    href: '/sobre',
    ariaLabel: 'Ir para a página Sobre',
    description: 'portifoliodanilo.com/sobre',
  },
  {
    label: 'Portfólio',
    href: '/portfolio',
    ariaLabel: 'Ir para o portfólio',
    description: 'portifoliodanilo.com/portfolio',
  },
  { label: 'Contato', href: '#contact', ariaLabel: 'Ir para contato' },
];

export default function App() {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060b] via-[#0c1021] to-[#05060b] text-white">
      <div
        className="relative h-[96px] w-screen"
        onPointerMove={handlePointer}
        onPointerLeave={() => setPointer({ x: 0.5, y: 0.5 })}
      >
        <FluidGlassHeader
          mode="bar"
          pointer={pointer}
          className="absolute inset-0"
          barProps={{
            navItems,
            materialProps: {
              scale: [1.85, 0.26, 0.22],
              ior: 1.15,
              thickness: 2,
              chromaticAberration: 0.05,
              anisotropy: 0.01,
            },
          }}
        />

        <div className="relative z-10 flex h-full items-center justify-between px-10">
          <div className="flex items-center gap-3 font-semibold uppercase tracking-[0.1em] text-white/80">
            <span className="h-9 w-9 rounded-full bg-white/20 backdrop-blur" />
            Logo Dark
          </div>
          <nav className="flex items-center gap-6 text-xs font-medium uppercase tracking-[0.12em]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-white/70 transition hover:scale-[1.04] hover:text-white"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-2 h-px origin-center scale-x-0 bg-gradient-to-r from-cyan-200 via-white to-cyan-200/20 transition-transform duration-300 hover:scale-x-100" />
              </a>
            ))}
          </nav>
        </div>
      </div>

      <main className="px-10 py-20">
        <section id="hero" className="max-w-4xl space-y-6">
          <p className="text-sm uppercase tracking-[0.12em] text-cyan-200">
            Demo — Fluid Glass BAR
          </p>
          <h1 className="text-4xl font-bold leading-tight">
            Copie e cole este header para obter o efeito “Fluid Glass” do React
            Bits.
          </h1>
          <p className="max-w-2xl text-base text-white/70">
            O exemplo acima usa câmera ortográfica, refração customizada,
            aberração cromática e itens de navegação magnetizados. Ajuste
            rapidamente os links e o material do vidro alterando as props
            passadas para o componente.
          </p>
        </section>
      </main>
    </div>
  );
}
