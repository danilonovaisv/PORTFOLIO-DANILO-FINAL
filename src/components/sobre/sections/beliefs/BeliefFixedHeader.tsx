import {
  motion,
  useTransform,
  type MotionValue,
  cubicBezier,
} from 'motion/react';
import { GHOST_EASE } from '@/config/motion'; // Importando o easing correto para UI

interface BeliefFixedHeaderProps {
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}

export function BeliefFixedHeader({
  scrollProgress,
  prefersReducedMotion,
}: BeliefFixedHeaderProps) {
  // Opacidade do container principal (header aparece/desaparece com o scroll)
  const containerOpacity = useTransform(
    scrollProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0],
    { ease: cubicBezier(...GHOST_EASE) } // Usa o easing obrigatório para UI
  );

  // Definição de tempos para cada linha de texto
  const lineStart = 0.05;
  const lineDuration = 0.03; // Duração aproximada de cada reveal
  const totalLines = 4; // 2 linhas de título + 2 linhas de subtítulo

  // Função auxiliar para gerar os arrays de progresso e valores para useTransform
  const generateTransformValues = (
    index: number,
    property: 'y' | 'opacity'
  ) => {
    const startProgress = lineStart + index * lineDuration * 0.5; // Espaçamento menor entre linhas
    const endProgress = startProgress + lineDuration;

    if (prefersReducedMotion) {
      // Para preferências reduzidas, apenas fade
      if (property === 'opacity') {
        return { range: [startProgress, endProgress], values: [0, 1] };
      } else {
        // y
        return { range: [startProgress, endProgress], values: [0, 0] }; // y permanece 0
      }
    }

    if (property === 'y') {
      // Mapeia scroll progress para translateY
      // 100% -> 0% (entra de baixo, para cima)
      return { range: [startProgress, endProgress], values: [100, 0] };
    } else {
      // opacity
      return { range: [startProgress, endProgress], values: [0, 1] };
    }
  };

  const ghostEase = cubicBezier(...GHOST_EASE); // Garantindo consistência

  return (
    <motion.div
      style={{ opacity: containerOpacity }} // Conectado ao scroll progress
      className="fixed inset-0 z-[var(--z-layer-header)] pointer-events-none" // Use o token adequado e position fixed para sticky
      data-testid="beliefs-header"
      role="presentation"
    >
      <div className="std-grid w-full h-full">
        {/* Alinhamento: Topo-direita em mobile, centro-direita em desktop */}
        <div className="flex h-full items-start md:items-center justify-end pt-[14vh] md:pt-0">
          <div
            className="flex flex-col items-end text-right w-full max-w-[280px] md:max-w-[500px] lg:max-w-[750px] pr-4 md:pr-0"
            data-testid="beliefs-header-content"
          >
            {/* Linha 0: "Acredito no design que" */}
            <motion.h2
              id="beliefs-section-heading"
              aria-label="Acredito no design que muda o dia de alguém. Não pelo choque, mas pela conexão."
              className="text-white text-xs md:text-sm font-mono tracking-widest mb-2 md:mb-4 uppercase mix-blend-difference whitespace-nowrap opacity-70"
              style={{
                opacity: useTransform(
                  scrollProgress,
                  generateTransformValues(0, 'opacity').range,
                  generateTransformValues(0, 'opacity').values,
                  { ease: ghostEase }
                ),
                y: useTransform(
                  scrollProgress,
                  generateTransformValues(0, 'y').range,
                  generateTransformValues(0, 'y').values,
                  { ease: ghostEase }
                ),
              }}
            >
              <span>
                Acredito no{' '}
                <span className="text-[#0048ff] font-bold">design</span> que
              </span>
            </motion.h2>

            {/* Linha 1: "muda o dia de alguém." */}
            <motion.h2
              className="text-white text-xs md:text-sm font-mono tracking-widest mb-2 md:mb-4 uppercase mix-blend-difference whitespace-nowrap opacity-70"
              style={{
                opacity: useTransform(
                  scrollProgress,
                  generateTransformValues(1, 'opacity').range,
                  generateTransformValues(1, 'opacity').values,
                  { ease: ghostEase }
                ),
                y: useTransform(
                  scrollProgress,
                  generateTransformValues(1, 'y').range,
                  generateTransformValues(1, 'y').values,
                  { ease: ghostEase }
                ),
              }}
            >
              <span>muda o dia de alguém.</span>
            </motion.h2>

            {/* Subtexto: "Não pelo choque..." */}
            {/* Linha 2: "Não pelo choque," */}
            <motion.div
              aria-hidden="true"
              className="flex flex-col items-end gap-1 text-white/50 text-[10px] md:text-xs font-mono tracking-wider uppercase whitespace-nowrap"
            >
              <motion.span
                className="block"
                style={{
                  opacity: useTransform(
                    scrollProgress,
                    generateTransformValues(2, 'opacity').range,
                    generateTransformValues(2, 'opacity').values,
                    { ease: ghostEase }
                  ),
                  y: useTransform(
                    scrollProgress,
                    generateTransformValues(2, 'y').range,
                    generateTransformValues(2, 'y').values,
                    { ease: ghostEase }
                  ),
                }}
              >
                Não pelo choque,
              </motion.span>

              {/* Linha 3: "mas pela conexão." */}
              <motion.span
                className="block"
                style={{
                  opacity: useTransform(
                    scrollProgress,
                    generateTransformValues(3, 'opacity').range,
                    generateTransformValues(3, 'opacity').values,
                    { ease: ghostEase }
                  ),
                  y: useTransform(
                    scrollProgress,
                    generateTransformValues(3, 'y').range,
                    generateTransformValues(3, 'y').values,
                    { ease: ghostEase }
                  ),
                }}
              >
                mas pela conexão.
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
