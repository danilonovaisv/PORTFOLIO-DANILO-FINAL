import { useScroll, useTransform, useSpring } from 'framer-motion';

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

  // Transparência do Texto Editorial (some rápido ao scrollar)
  const copyOpacity = useTransform(smoothScroll, [0, 0.2], [1, 0]);

  return {
    scrollYProgress,
    copyOpacity,
  };
}
