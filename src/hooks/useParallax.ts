'use client';

import { useEffect, useRef, useState } from 'react';
import { useSpring, useTransform, useScroll } from 'framer-motion';

interface UseParallaxOptions {
  /** Configuração do spring para suavidade 'ghost' */
  springConfig?: { stiffness: number; damping: number; mass?: number };
  /** Ativar/desativar */
  enabled?: boolean;
}

interface UseParallaxReturn {
  /** Ref para o container da galeria (viewport) */
  galleryRef: React.RefObject<HTMLElement | null>;
  /** Ref para a track interna (que se move) */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** Estilo de transformação para aplicar na track */
  style: { y: any };
  /** Se o scroll está ativo (opcional) */
  isScrolling: boolean;
}

/**
 * Hook de Parallax com useSpring (Ghost Era)
 * Sincroniza o scroll nativo com uma track fixa/parallax.
 */
export function useParallax(
  options: UseParallaxOptions = {}
): UseParallaxReturn {
  const {
    springConfig = { stiffness: 45, damping: 25, mass: 1 },
    enabled = true,
  } = options;

  const galleryRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Detecta mobile para desativar parallax pesado
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = enabled && !isMobile;

  // Sincroniza o progresso do scroll do container
  const { scrollYProgress } = useScroll({
    target: galleryRef as React.RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });

  // Aplica física de mola ao progresso
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Monitora dimensões para cálculo de pixels
  useEffect(() => {
    if (!trackRef.current || !isActive) return;

    const updateDimensions = () => {
      if (trackRef.current) {
        setContentHeight(trackRef.current.offsetHeight);
      }
      setViewportHeight(window.innerHeight);
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(trackRef.current);
    updateDimensions();

    return () => resizeObserver.disconnect();
  }, [isActive]);

  // Transforma progresso (0-1) em translação pixel-perfect
  // Move de 0 até o limite negativo (altura total do conteúdo - altura da janela)
  const moveY = useTransform(
    smoothProgress,
    [0, 1],
    [0, -(contentHeight - viewportHeight)]
  );

  return {
    galleryRef,
    trackRef,
    style: {
      y: isActive ? moveY : 0,
    },
    isScrolling: false, // Pode ser implementado via Velocity se necessário
  };
}

// =============================================================================
// Hook adicional: useParallaxElement
// Para elementos individuais com parallax (imagens dentro de cards)
// =============================================================================

interface UseParallaxElementOptions {
  /** Velocidade do parallax (0.1 = sutil, 0.5 = forte) */
  speed?: number;
  /** Direção */
  direction?: 'up' | 'down';
  /** Se deve estar ativo */
  enabled?: boolean;
}

/**
 * Hook para parallax em elementos individuais baseado na posição na tela.
 */
export function useParallaxElement(options: UseParallaxElementOptions = {}) {
  const { speed = 0.2, direction = 'up', enabled = true } = options;
  const elementRef = useRef<HTMLElement>(null);

  // Usamos useScroll com a própria ref do elemento
  const { scrollYProgress } = useScroll({
    target: elementRef as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });

  // Suavização Ghost
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transforma o progresso em offset
  // Em 0 (entra na tela), offset é X. Em 1 (sai), offset é -X.
  const offset = useTransform(
    smoothProgress,
    [0, 1],
    direction === 'up' ? [20 * speed, -20 * speed] : [-20 * speed, 20 * speed],
    { ease: (v) => v } // Linear
  );

  return {
    ref: elementRef,
    style: {
      y: enabled ? offset : 0,
    },
  };
}

export default useParallax;
