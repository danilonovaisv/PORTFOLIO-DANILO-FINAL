import {
  motion,
  useTransform,
  type MotionValue,
  cubicBezier,
} from 'motion/react';
import { GHOST_EASE } from '@/config/motion'; // Importando o easing correto para UI

interface BeliefManifestoProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

export function BeliefManifesto({
  scrollProgress,
  prefersReducedMotion,
}: BeliefManifestoProps) {
  const ghostEase = cubicBezier(...GHOST_EASE); // Usa o easing obrigatório para UI

  // Climax fade e translateY — Ghost System: apenas opacity, blur, translateY
  const opacity = useTransform(
    scrollProgress,
    [0.56, 0.68, 0.95, 1],
    [0, 1, 1, 1],
    { ease: ghostEase }
  );

  // translateY ativa entre 0.56 e 0.72
  const translateY = useTransform(
    scrollProgress,
    [0.56, 0.72],
    [100, 0], // Começa fora da tela (abaixo) e entra
    { ease: ghostEase }
  );

  // Definição de tempos para cada linha do manifesto
  const lineStart = 0.56;
  const lineDuration = 0.03; // Duração aproximada de cada reveal do manifesto

  // Função auxiliar para gerar os arrays de progresso e valores para useTransform das linhas
  const generateLineTransformValues = (index: number, property: 'y' | 'opacity') => {
    const startProgress = lineStart + (index * lineDuration * 0.5); // Espaçamento entre linhas do manifesto
    const endProgress = startProgress + lineDuration;

    if (prefersReducedMotion) {
      // Para preferências reduzidas, apenas fade
      if (property === 'opacity') {
        return { range: [startProgress, endProgress], values: [0, 1] };
      } else { // y
        return { range: [startProgress, endProgress], values: [0, 0] }; // y permanece 0
      }
    }

    if (property === 'y') {
      // Mapeia scroll progress para translateY das linhas individuais
      // Começa de baixo (100%) e sobe (0%)
      return { range: [startProgress, endProgress], values: [100, 0] };
    } else { // opacity
      return { range: [startProgress, endProgress], values: [0, 1] };
    }
  };

  return (
    <motion.div
      className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
      data-testid="beliefs-manifesto"
      role="presentation"
      style={{
        opacity,
        y: prefersReducedMotion ? 0 : translateY, // Aplica translateY geral condicionalmente
        willChange: 'opacity, transform',
      }}
    >
      <blockquote
        className="relative text-center select-none"
        aria-label="Manifesto Ghost Design — Isso é Ghost Design"
      >
        {/* Linha 0: ISSO É */}
        <motion.p
          className="font-display font-black text-white leading-[0.75] tracking-[-0.05em] uppercase mix-blend-difference"
          style={{ fontSize: 'clamp(4rem, 17vw, 13rem)' }}
          aria-hidden="true"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block opacity-40"
              style={{
                opacity: useTransform(
                  scrollProgress,
                  generateLineTransformValues(0, 'opacity').range,
                  generateLineTransformValues(0, 'opacity').values,
                  { ease: ghostEase }
                ),
                y: useTransform(
                  scrollProgress,
                  generateLineTransformValues(0, 'y').range,
                  generateLineTransformValues(0, 'y').values,
                  { ease: ghostEase }
                )
              }}
            >
              ISSO É
            </motion.span>
          </span>
        </motion.p>

        {/* Linha 1: GHOST */}
        <motion.p
          className="font-display font-black text-white leading-[0.75] tracking-[-0.05em] uppercase mix-blend-difference"
          style={{ fontSize: 'clamp(4rem, 17vw, 13rem)' }}
          aria-hidden="true"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[#0048ff] mix-blend-overlay drop-shadow-[0_0_30px_rgba(0,72,255,0.4)]"
              style={{
                opacity: useTransform(
                  scrollProgress,
                  generateLineTransformValues(1, 'opacity').range,
                  generateLineTransformValues(1, 'opacity').values,
                  { ease: ghostEase }
                ),
                y: useTransform(
                  scrollProgress,
                  generateLineTransformValues(1, 'y').range,
                  generateLineTransformValues(1, 'y').values,
                  { ease: ghostEase }
                )
              }}
            >
              GHOST
            </motion.span>
          </span>
        </motion.p>

        {/* Linha 2: DESIGN */}
        <motion.p
          className="font-display font-black text-white leading-[0.75] tracking-[-0.05em] uppercase mix-blend-difference"
          style={{ fontSize: 'clamp(4rem, 17vw, 13rem)' }}
          aria-hidden="true"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              style={{
                opacity: useTransform(
                  scrollProgress,
                  generateLineTransformValues(2, 'opacity').range,
                  generateLineTransformValues(2, 'opacity').values,
                  { ease: ghostEase }
                ),
                y: useTransform(
                  scrollProgress,
                  generateLineTransformValues(2, 'y').range,
                  generateLineTransformValues(2, 'y').values,
                  { ease: ghostEase }
                )
              }}
            >
              DESIGN
            </motion.span>
          </span>
        </motion.p>
      </blockquote>

      {/* Decorative elements to add "Ghost" vibe */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#0048ff]/30 to-transparent rotate-12"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#4fe6ff]/20 to-transparent -rotate-12"
        aria-hidden="true"
      />
    </motion.div>
  );
}
