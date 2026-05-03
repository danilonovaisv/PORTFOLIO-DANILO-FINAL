'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

const SECTIONS = [
  { phrase: null, color: '#040013', label: 'Abertura — Deep Void' },
  {
    phrase: 'Um vídeo que respira',
    color: '#0048ff',
    label: 'Frase 1 — Um vídeo que respira',
  },
  {
    phrase: 'Uma marca que se reconhece',
    color: '#8705f2',
    label: 'Frase 2 — Uma marca que se reconhece',
  },
  {
    phrase: 'Um detalhe que fica',
    color: '#f501d3',
    label: 'Frase 3 — Um detalhe que fica',
  },
  {
    phrase: 'Crio para gerar presença',
    color: '#0048ff',
    label: 'Frase 4 — Crio para gerar presença',
  },
  {
    phrase: 'Mesmo quando não estou ali',
    color: '#8705f2',
    label: 'Frase 5 — Mesmo quando não estou ali',
  },
  {
    phrase: 'Mesmo quando ninguém percebe o esforço',
    color: '#f501d3',
    label: 'Frase 6 — Mesmo quando ninguém percebe o esforço',
  },
  { phrase: null, color: '#040013', label: 'Clímax e saída — Deep Void' },
] as const;

type ManifestoSection = (typeof SECTIONS)[number];

interface ScrollManifestoSectionProps {
  section: ManifestoSection;
  index: number;
  shouldReduceMotion: boolean;
  onActiveColorChange: (_color: string) => void;
}

export function ScrollManifesto() {
  const reducedMotionPreference = useReducedMotion() ?? false;
  const [hasMounted, setHasMounted] = useState(false);
  const [activeColor, setActiveColor] = useState<string>(SECTIONS[0].color);
  const shouldReduceMotion = hasMounted && reducedMotionPreference;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      data-testid="beliefs-section"
      data-scroll-manifesto
      data-reduced-motion={shouldReduceMotion}
      className="relative w-full overflow-clip text-white [will-change:background-color]"
      animate={{ backgroundColor: activeColor }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        ease: 'easeInOut',
      }}
      aria-label="O Que Me Move"
    >
      <motion.div
        data-testid="beliefs-background"
        className="absolute inset-0 -z-10 [will-change:background-color]"
        animate={{ backgroundColor: activeColor }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.8,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />

      {SECTIONS.map((section, index) => (
        <ScrollManifestoSection
          key={section.label}
          section={section}
          index={index}
          shouldReduceMotion={shouldReduceMotion}
          onActiveColorChange={setActiveColor}
        />
      ))}
    </motion.div>
  );
}

function ScrollManifestoSection({
  section,
  index,
  shouldReduceMotion,
  onActiveColorChange,
}: ScrollManifestoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      onActiveColorChange(section.color);
    }
  }, [isInView, onActiveColorChange, section.color]);

  return (
    <section
      ref={sectionRef}
      data-scroll-manifesto-section={index}
      className="relative flex min-h-screen w-full items-center justify-center px-6 py-24 text-center"
      aria-label={section.label}
    >
      {section.phrase ? (
        <motion.h2
          data-testid="belief-phrase"
          data-animation-contract="x-opacity"
          className="max-w-[12ch] text-balance font-display text-4xl font-bold leading-[1.05] text-white [text-shadow:0_12px_34px_rgba(4,0,19,0.48)] [will-change:transform,opacity] md:max-w-[13ch] md:text-6xl lg:text-7xl"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -100 }}
          animate={shouldReduceMotion ? { opacity: 1, x: 0 } : undefined}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{
            x: {
              type: 'spring',
              stiffness: 100,
              damping: 20,
              mass: 1,
            },
            opacity: { duration: 0.5, ease: 'easeOut' },
          }}
        >
          {section.phrase}
        </motion.h2>
      ) : null}
    </section>
  );
}
