import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';
import { MOTION_TOKENS } from '@/config/motion';

export function useHeroAnimation(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const shouldReduceMotion = useMotionGate();

  // Monitora o scroll APENAS dentro da seção Hero (que tem 250vh de altura para dar tempo do scroll acontecer)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'], // Começa no topo, termina quando a seção acaba
  });

  // Suaviza o scroll para não ficar "duro"
  const smoothScroll = useSpring(scrollYProgress, {
    ...MOTION_TOKENS.spring.ghost,
  });

  // Transparência do Texto Editorial (some rápido ao scrollar)
  const copyOpacity = useTransform(
    smoothScroll,
    shouldReduceMotion ? [0, 1] : [0, 0.2],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );

  return {
    scrollYProgress,
    copyOpacity,
  };
}
