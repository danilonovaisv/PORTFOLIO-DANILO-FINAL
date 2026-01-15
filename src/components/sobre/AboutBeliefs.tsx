'use client';

import { useMemo, useRef, useState } from 'react'; // ✅ useState incluído
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import './AboutBeliefs.css';

const PHRASES = [
  <>
    Um vídeo que <strong>respira</strong>.
  </>,
  <>
    Uma marca que se <strong>reconhece</strong>.
  </>,
  <>
    Um detalhe que <strong>fica</strong>.
  </>,
  <>
    <strong>Crio</strong> para gerar presença.
  </>,
  <>
    <strong>Mesmo</strong> quando não estou ali.
  </>,
  <>
    <strong>Mesmo</strong> quando ninguém percebe o esforço.
  </>,
];

const BACKGROUNDS = [
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
  '#8705f2',
  '#f501d3',
  '#0048ff',
];

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function AboutBeliefs() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const steps = useMemo(() => PHRASES.length + 1, []);
  const [stepIndex, setStepIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.round(latest * (steps - 1));
    setStepIndex(clamp(idx, 0, steps - 1));
  });

  // ✅ Cria um array fixo de refs e hooks
  const phraseRefs = useRef<(HTMLElement | null)[]>([]);
  const isInViewArray = useRef<boolean[]>([]);

  // Inicializa os refs e estados de view se ainda não existirem
  if (phraseRefs.current.length !== PHRASES.length) {
    phraseRefs.current = Array(PHRASES.length).fill(null);
    isInViewArray.current = Array(PHRASES.length).fill(false);
  }

  // Atualiza manualmente o estado de visibilidade (sem usar useInView dentro do render)
  // Alternativa mais segura: use um único observer ou dependa apenas do scrollYProgress

  // 👉 Vamos simplificar: vamos usar APENAS scrollYProgress para sincronizar
  // Isso evita o bug de ref e é mais performático

  const isFinal = stepIndex === steps - 1;
  const phraseIndex = clamp(stepIndex, 0, PHRASES.length - 1);

  // Renderiza overlays de fundo (sem fade)
  const backgroundOverlays = BACKGROUNDS.map((color, i) => (
    <motion.div
      key={i}
      className="absolute inset-0"
      style={{
        backgroundColor: color,
        zIndex: i,
        height: '100vh',
        top: '100%',
      }}
      animate={{
        top: `${100 - scrollYProgress.get() * 100 * (steps / (i + 1))}%`,
      }}
      transition={{ duration: 0, ease: 'linear' }}
    />
  ));

  return (
    <section ref={sectionRef} className="moveSection relative overflow-hidden">
      {backgroundOverlays}

      <div className="moveSticky">
        <div className="grid">
          <div className="titleArea" ref={titleRef}>
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={
                prefersReduced
                  ? { opacity: 1 }
                  : { opacity: 1, filter: 'blur(0px)' }
              }
              transition={{
                duration: prefersReduced ? 0 : 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="font-display titleLine">
                Acredito no design que muda o dia de alguém.
              </div>
              <div className="font-h2 titleLine">
                Não pelo choque, mas pela conexão.
              </div>
            </motion.div>
          </div>

          <div className="phraseArea" aria-live="polite">
            <AnimatePresence mode="wait">
              {!isFinal ? (
                <motion.div
                  key={`phrase-${phraseIndex}`}
                  className="font-h2 phrase"
                  // Removemos o ref dinâmico problemático
                  initial={
                    prefersReduced
                      ? { opacity: 1 }
                      : { opacity: 0, x: -100, filter: 'blur(8px)' }
                  }
                  animate={
                    prefersReduced
                      ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                      : { opacity: 1, x: 0, filter: 'blur(0px)' }
                  }
                  exit={
                    prefersReduced
                      ? { opacity: 0 }
                      : { opacity: 0, x: 100, filter: 'blur(8px)' }
                  }
                  transition={{
                    duration: prefersReduced ? 0 : 0.6,
                    ease: [0.17, 0.55, 0.55, 1],
                  }}
                  style={{
                    textShadow: '0 4px 16px rgba(0,0,0,0.5)',
                  }}
                >
                  {PHRASES[phraseIndex]}
                </motion.div>
              ) : (
                <motion.div
                  key="final-manifesto"
                  className="finalWrap"
                  initial={
                    prefersReduced
                      ? { opacity: 1 }
                      : { opacity: 0, x: -80, filter: 'blur(10px)' }
                  }
                  animate={
                    prefersReduced
                      ? { opacity: 1 }
                      : { opacity: 1, x: 0, filter: 'blur(0px)' }
                  }
                  transition={{
                    duration: prefersReduced ? 0 : 0.9,
                    ease: [0.17, 0.55, 0.55, 1],
                  }}
                  style={{
                    textShadow: '0 6px 24px rgba(0,0,0,0.6)',
                  }}
                >
                  <div className="font-display finalText">
                    <div>ISSO É</div>
                    <div>GHOST</div>
                    <div>DESIGN</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="handoffSpacer" aria-hidden="true" />
    </section>
  );
}

export default AboutBeliefs;
