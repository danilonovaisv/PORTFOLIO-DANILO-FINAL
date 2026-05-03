'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

const SECTIONS = [
  { phrase: null, color: '#040013', label: 'Abertura — Deep Void' },
  {
    phrase: 'Um vídeo que respira',
    color: '#0048ff',
    label: 'Frase 1 — Um vídeo que respira',
  },
  {
    phrase: 'Uma marca que se reconhece',
    color: '#0031af',
    label: 'Frase 2 — Uma marca que se reconhece',
  },
  {
    phrase: 'Um detalhe que fica',
    color: '#001a5e',
    label: 'Frase 3 — Um detalhe que fica',
  },
  {
    phrase: 'Crio para gerar presença',
    color: '#0048ff',
    label: 'Frase 4 — Crio para gerar presença',
  },
  {
    phrase: 'Mesmo quando não estou ali',
    color: '#0031af',
    label: 'Frase 5 — Mesmo quando não estou ali',
  },
  {
    phrase: 'Mesmo quando ninguém percebe o esforço',
    color: '#001a5e',
    label: 'Frase 6 — Mesmo quando ninguém percebe o esforço',
  },
  { phrase: null, color: '#040013', label: 'Clímax e saída — Deep Void' },
] as const;

type ManifestoSection = (typeof SECTIONS)[number];

interface ScrollManifestoSectionProps {
  section: ManifestoSection;
  index: number;
  shouldReduceMotion: boolean;
}

export function ScrollManifesto() {
  const reducedMotionPreference = useReducedMotion() ?? false;
  const [hasMounted, setHasMounted] = useState(false);
  const shouldReduceMotion = hasMounted && reducedMotionPreference;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const colors = SECTIONS.map((s) => s.color);
  const step = 1 / (colors.length - 1);
  const points = colors.map((_, i) => i * step);

  const backgroundColor = useTransform(scrollYProgress, points, colors);

  return (
    <motion.div
      ref={containerRef}
      data-testid="beliefs-section"
      data-scroll-manifesto
      data-reduced-motion={shouldReduceMotion}
      className="relative w-full overflow-clip text-white"
      aria-label="O Que Me Move"
    >
      <motion.div
        data-testid="beliefs-background"
        className="fixed inset-0 -z-10 [will-change:background-color]"
        style={{
          backgroundColor: shouldReduceMotion ? colors[0] : backgroundColor,
          transition: shouldReduceMotion
            ? 'background-color 0.8s ease'
            : 'none',
        }}
        aria-hidden="true"
      />

      {SECTIONS.map((section, index) => (
        <ScrollManifestoSection
          key={section.label}
          section={section}
          index={index}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </motion.div>
  );
}

function ScrollManifestoSection({
  section,
  index,
  shouldReduceMotion,
}: ScrollManifestoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      data-scroll-manifesto-section={index}
      className="relative flex min-h-screen w-full items-center justify-center px-6 py-24 text-center"
      aria-label={section.label}
    >
      {section.phrase ? (
        shouldReduceMotion ? (
          <motion.h2
            data-testid="belief-phrase"
            data-animation-contract="viewport-x-opacity"
            className="max-w-[12ch] text-balance font-display text-4xl font-bold leading-[1.05] text-white [text-shadow:0_12px_34px_rgba(4,0,19,0.48)] md:max-w-[13ch] md:text-6xl lg:text-7xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }}
          >
            {section.phrase}
          </motion.h2>
        ) : (
          <motion.h2
            data-testid="belief-phrase"
            data-animation-contract="viewport-x-opacity"
            className="max-w-[12ch] text-balance font-display text-4xl font-bold leading-[1.05] text-white [text-shadow:0_12px_34px_rgba(4,0,19,0.48)] [will-change:transform,opacity] md:max-w-[13ch] md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.17, 0.55, 0.55, 1] }}
          >
            {section.phrase}
          </motion.h2>
        )
      ) : null}
    </section>
  );
}
