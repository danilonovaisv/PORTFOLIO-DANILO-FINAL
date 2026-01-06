import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export function useHeroAnimation(
  containerRef: React.RefObject<HTMLElement | null>
) {
  // Monitora o scroll APENAS dentro da seção Hero (que tem 250vh de altura para dar tempo do scroll acontecer)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'], // Começa no topo, termina quando a seção acaba
  });

  // Suaviza o scroll para não ficar "duro"
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Mapeamento dos valores baseados no scroll (0% -> 100%)

  // 1. Largura: Começa pequena (300px) e vai para 100% da tela
  // Nota: Usamos strings com '%' e 'px' para flexibilidade
  const videoWidth = useTransform(smoothScroll, [0, 0.7], ['280px', '100%']);

  // 2. Altura: Começa pequena (160px) e vai para 100% da altura da tela
  const videoHeight = useTransform(smoothScroll, [0, 0.7], ['160px', '100%']);

  // 3. Posição X: Começa na direita (calc(100% - 320px)) e vai para 0
  // Assumindo container relativo, vamos posicionar via 'right' e 'bottom' ou translação.
  // Vamos usar 'right' e 'bottom' fixos no CSS e animar width/height é mais performático se usarmos layoutId,
  // mas aqui vamos transformar a escala e posição.

  // Abordagem Otimizada: O vídeo começa "Fixed" no canto e escala.
  const videoScale = useTransform(smoothScroll, [0, 0.6], [0.25, 1]); // Escala de 25% para 100%

  // Transparência do Texto Editorial (some rápido ao scrollar)
  const copyOpacity = useTransform(smoothScroll, [0, 0.2], [1, 0]);

  // Arredondamento das bordas: Redondo -> Quadrado
  const videoRadius = useTransform(smoothScroll, [0, 0.6], [12, 0]);

  return {
    scrollYProgress,
    videoWidth,
    videoHeight,
    videoScale,
    copyOpacity,
    videoRadius,
  };
}
