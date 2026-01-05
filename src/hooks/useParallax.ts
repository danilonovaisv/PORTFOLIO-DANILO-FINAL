// =============================================================================
// useParallax Hook - Ghost Era v2.0
// Motor de Parallax com Lerp (interpolação linear) suave
// =============================================================================

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Interpolação linear: transição suave entre dois valores
 * @param start - Valor inicial
 * @param end - Valor alvo
 * @param t - Fator de interpolação (0-1), menor = mais suave
 */
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

interface UseParallaxOptions {
  /** Fator de suavização (0.01-0.2). Menor = mais lento/suave. Padrão: 0.05 */
  smoothness?: number;
  /** Offset adicional no início */
  offset?: number;
  /** Direção do parallax */
  direction?: 'vertical' | 'horizontal';
  /** Ativar/desativar */
  enabled?: boolean;
}

interface UseParallaxReturn {
  /** Ref para o container da galeria (viewport) */
  galleryRef: React.RefObject<HTMLElement | null>;
  /** Ref para a track interna (que se move) */
  trackRef: React.RefObject<HTMLDivElement | null>;
  /** Posição atual do scroll (suavizada) */
  scrollPosition: number;
  /** Progresso do scroll (0-1) */
  scrollProgress: number;
  /** Se está em movimento */
  isScrolling: boolean;
}

/**
 * Hook de Parallax com Lerp
 * Gerencia animação suave de scroll usando requestAnimationFrame
 */
export function useParallax(
  options: UseParallaxOptions = {}
): UseParallaxReturn {
  const {
    smoothness = 0.05,
    offset = 0,
    direction = 'vertical',
    enabled = true,
  } = options;

  const galleryRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number>(0);

  // Posições de scroll
  const currentScroll = useRef<number>(0);
  const targetScroll = useRef<number>(0);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Timer para detectar fim do scroll
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Atualiza a posição target baseado no scroll real
   */
  const handleScroll = useCallback(() => {
    if (!galleryRef.current || !enabled) return;

    const gallery = galleryRef.current;
    const rect = gallery.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calcula a posição relativa da galeria na viewport
    const scrollTop = -rect.top;
    const maxScroll = gallery.scrollHeight - windowHeight;

    targetScroll.current = Math.max(0, Math.min(scrollTop, maxScroll)) + offset;

    // Marca como scrollando
    setIsScrolling(true);

    // Limpa timeout anterior e inicia novo
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, [enabled, offset]);

  /**
   * Loop de animação com requestAnimationFrame
   * Aplica a interpolação linear para suavizar o movimento
   */
  const updateScroll = useCallback(() => {
    if (!enabled) {
      animationFrameId.current = requestAnimationFrame(updateScroll);
      return;
    }

    // Interpola entre a posição atual e o alvo
    currentScroll.current = lerp(
      currentScroll.current,
      targetScroll.current,
      smoothness
    );

    // Atualiza o transform do track
    if (trackRef.current) {
      const value = currentScroll.current;

      if (direction === 'vertical') {
        trackRef.current.style.transform = `translateY(${-value}px)`;
      } else {
        trackRef.current.style.transform = `translateX(${-value}px)`;
      }
    }

    // Atualiza o estado para componentes que precisam
    setScrollPosition(currentScroll.current);

    // Calcula progresso
    if (galleryRef.current) {
      const maxScroll = galleryRef.current.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentScroll.current / maxScroll : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    }

    // Continua o loop
    animationFrameId.current = requestAnimationFrame(updateScroll);
  }, [direction, enabled, smoothness]);

  /**
   * Inicializa os event listeners e o loop de animação
   */
  useEffect(() => {
    if (!enabled) return;

    // Inicia o loop de animação
    animationFrameId.current = requestAnimationFrame(updateScroll);

    // Adiciona listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Dispara uma vez para inicializar
    handleScroll();

    return () => {
      // Limpa o animation frame
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      // Remove listener
      window.removeEventListener('scroll', handleScroll);

      // Limpa timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [enabled, handleScroll, updateScroll]);

  return {
    galleryRef,
    trackRef,
    scrollPosition,
    scrollProgress,
    isScrolling,
  };
}

// =============================================================================
// Hook adicional: useParallaxElement
// Para elementos individuais com parallax (imagens, textos)
// =============================================================================

interface UseParallaxElementOptions {
  /** Velocidade do parallax (1 = normal, 0.5 = metade, 2 = dobro) */
  speed?: number;
  /** Direção */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Se deve estar ativo */
  enabled?: boolean;
}

/**
 * Hook para parallax em elementos individuais
 * Aplica transform baseado na posição do elemento na viewport
 */
export function useParallaxElement(options: UseParallaxElementOptions = {}) {
  const { speed = 0.5, direction = 'up', enabled = true } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcula quanto do elemento está visível
      const elementMidpoint = rect.top + rect.height / 2;
      const viewportMidpoint = windowHeight / 2;
      const distance = viewportMidpoint - elementMidpoint;

      // Aplica o speed multiplier
      const parallaxOffset = distance * speed * 0.3;

      setOffset(parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled, speed]);

  const getTransform = useCallback(() => {
    switch (direction) {
      case 'up':
        return `translateY(${offset}px)`;
      case 'down':
        return `translateY(${-offset}px)`;
      case 'left':
        return `translateX(${offset}px)`;
      case 'right':
        return `translateX(${-offset}px)`;
      default:
        return 'none';
    }
  }, [direction, offset]);

  return {
    ref: elementRef,
    style: {
      transform: getTransform(),
      willChange: 'transform' as const,
    },
  };
}

export default useParallax;
