'use client';

import { m } from 'motion/react';
import { useMotionGate } from '@/hooks/useMotionGate';
import { ABOUT_CONTENT, HOME_CONTENT } from '@/config/content';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import { GHOST_EASE, MOTION_TOKENS, viewportConfig } from '@/config/motion';
import { DynamicAssetImage } from '@/components/ui/shared/DynamicAssetImage';

// =============================================================================
// AboutProof — Ghost System
// Âncora de prova/autoridade ANTES do Fechamento.
// Logos: dados reais (Supabase). Métricas/depoimentos: renderizam só quando
// preenchidos em ABOUT_CONTENT.proof (Real Content Only — sem dados inventados).
// =============================================================================

const PROOF = ABOUT_CONTENT.proof;

export function AboutProof() {
  const reduceMotion = useMotionGate();
  const logos = HOME_CONTENT.clients.logos.slice(0, 12);
  const hasMetrics = PROOF.metrics.length > 0;
  const hasTestimonials = PROOF.testimonials.length > 0;

  const reveal = {
    initial: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 18, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: viewportConfig,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: GHOST_EASE as [number, number, number, number],
    },
  };

  return (
    <section
      id="prova"
      className="relative z-[var(--z-layer-content)] w-full bg-background text-text"
      aria-labelledby="proof-heading"
    >
      <div className="std-grid py-16 md:py-24">
        {/* Header */}
        <m.div {...reveal} className="mb-12 text-center md:mb-16">
          <p className="mb-3 text-small font-medium uppercase tracking-[0.2em] text-bluePrimary">
            {PROOF.eyebrow}
          </p>
          <h2
            id="proof-heading"
            className="text-h1 font-black tracking-tight text-text"
          >
            {PROOF.title[0]}{' '}
            <span className="text-bluePrimary">{PROOF.title[1]}</span>
          </h2>
        </m.div>

        {/* Métricas (renderiza só com dados reais) */}
        {hasMetrics && (
          <m.ul
            {...reveal}
            role="list"
            className="mx-auto mb-16 grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {PROOF.metrics.map((metric) => (
              <li key={metric.label} className="text-center">
                <p className="text-display font-black leading-none text-bluePrimary">
                  {metric.value}
                </p>
                <p className="mt-2 text-small font-medium uppercase tracking-[0.16em] text-textSecondary">
                  {metric.label}
                </p>
              </li>
            ))}
          </m.ul>
        )}

        {/* Logos de clientes (dados reais via Supabase) */}
        <m.ul
          {...reveal}
          role="list"
          aria-label="Logotipos das marcas com as quais já trabalhei"
          className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 md:gap-10 lg:grid-cols-6 lg:gap-12"
        >
          {logos.map((logo, index) => (
            <li key={logo.id} role="listitem">
              <div className="group relative flex h-16 w-32 items-center justify-center p-2 sm:h-20 sm:w-40 md:h-24 md:w-48">
                <DynamicAssetImage
                  assetKey={SITE_ASSET_KEYS.clients.strips[index]}
                  alt={logo.alt}
                  fallbackUrl={logo.src || ''}
                  priority={false}
                  width={192}
                  height={96}
                  objectFit="contain"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                  className="h-full w-full opacity-50 brightness-0 invert transition-opacity duration-modal group-hover:opacity-90"
                />
              </div>
            </li>
          ))}
        </m.ul>

        {/* Depoimentos (renderiza só com dados reais) */}
        {hasTestimonials && (
          <m.ul
            {...reveal}
            role="list"
            className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
          >
            {PROOF.testimonials.map((t) => (
              <li
                key={t.author}
                className="rounded-2xl border border-bluePrimary/15 bg-neutral p-6 md:p-8"
              >
                <blockquote className="text-body font-medium leading-relaxed text-text/90">
                  “{t.quote}”
                </blockquote>
                <footer className="mt-4 text-small text-textSecondary">
                  <span className="font-semibold text-text">{t.author}</span>
                  {t.role ? ` · ${t.role}` : null}
                </footer>
              </li>
            ))}
          </m.ul>
        )}
      </div>
    </section>
  );
}
