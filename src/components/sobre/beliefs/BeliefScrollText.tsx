import { motion, useTransform } from 'motion/react';
import { useBeliefStore } from '@/store/beliefStore';

const PHRASES = [
  'Um vídeo que respira',
  'Uma marca que se reconhece',
  'Um detalhe que fica',
  'Crio para gerar presença',
  'Mesmo quando não estou ali',
  'Mesmo quando ninguém percebe o esforço',
] as const;

// Curva editorial extraída das referências (Motion.dev)
const EDITORIAL_EASE = [0.17, 0.55, 0.55, 1];

interface BeliefScrollTextProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

export function BeliefScrollText({
  isMobile,
  prefersReducedMotion,
}: BeliefScrollTextProps) {
  const scrollProgress = useBeliefStore((s) => s.scrollProgress);

  // Determinamos o range de cada frase no scroll total (0 a 1)
  const phraseStep = 1 / PHRASES.length;

  return (
    <div
      className={`absolute inset-0 z-40 flex flex-col pointer-events-none ${
        isMobile
          ? 'items-center justify-start px-6'
          : 'justify-start left-6 md:left-16 lg:left-24 max-w-[38vw] lg:max-w-[34vw]'
      }`}
      data-testid="beliefs-scroll-text"
      aria-label={PHRASES.join(' ')}
      style={{ textAlign: isMobile ? 'center' : 'left' }}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {PHRASES.join(' ')}
      </p>

      <div
        className="sticky top-0 h-[100vh] w-full flex relative pointer-events-none"
        style={{
          alignItems: isMobile ? 'flex-end' : 'center',
          paddingBottom: isMobile ? '20vh' : undefined,
        }}
      >
        {PHRASES.map((phrase, i) => {
          // Cada frase tem seu próprio "sweet spot" no scroll
          const start = i * phraseStep;
          const end = (i + 1) * phraseStep;
          const mid = (start + end) / 2;

          return (
            <PhraseItem
              key={phrase}
              phrase={phrase}
              index={i}
              isMobile={isMobile}
              progress={scrollProgress}
              range={[start, mid, end]}
              prefersReducedMotion={prefersReducedMotion}
            />
          );
        })}
      </div>
    </div>
  );
}

function PhraseItem({
  phrase,
  isMobile,
  progress,
  range,
  prefersReducedMotion,
}: {
  phrase: string;
  index: number;
  isMobile: boolean;
  progress: number;
  range: [number, number, number];
  prefersReducedMotion: boolean;
}) {
  // Mapeamento de Opacidade e Y baseado no range da frase
  // Usamos o easing editorial para suavizar a entrada e saída
  const opacity = prefersReducedMotion
    ? 1
    : progress >= range[0] && progress < range[2]
      ? 1
      : 0;

  // Para uma animação mais fluida com Motion, idealmente usaríamos MotionValue
  // Mas como estamos pegando do Store (number), vamos simular o fade via CSS
  // ou converter para MotionValue se o performance exigir.
  // Ajustando para ser condicional ao activeIndex para manter compatibilidade com o store atual.

  const isActive = progress >= range[0] && progress < range[2];

  return (
    <span
      className="belief-phrase absolute italic font-h1 font-bold text-[#4fe6ff] pointer-events-none"
      style={{
        fontSize: isMobile
          ? 'clamp(2rem, 8vw, 3rem)'
          : 'clamp(2.8rem, 5.8vw, 6.3rem)',
        textAlign: isMobile ? 'center' : 'left',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : 'translateY(20px)',
        transition: prefersReducedMotion
          ? 'none'
          : `opacity 800ms cubic-bezier(0.17, 0.55, 0.55, 1), transform 800ms cubic-bezier(0.17, 0.55, 0.55, 1)`,
      }}
    >
      {phrase}
    </span>
  );
}
