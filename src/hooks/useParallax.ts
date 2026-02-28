'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useMotionGate } from '@/hooks/useMotionGate';

/**
 * Linear Interpolation Function
 */
export function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

interface UseParallaxReturn {
  galleryRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  y: number; // Current Y position (interpolated)
}

/**
 * Hook de Parallax Engine (Lerp Loop)
 * Gerencia o scroll suave customizado com requestAnimationFrame.
 */
export function useParallax(): UseParallaxReturn {
  const galleryRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useMotionGate();

  // Refs for state to avoid re-renders in the loop
  const state = useRef({
    current: 0,
    target: 0,
    isResizing: false,
  });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const gallery = galleryRef.current;
    const track = trackRef.current;
    const isMobile = window.innerWidth < 1024; // Simple mobile check

    // Disable on mobile if desired, or keep generic
    if (isMobile) return;

    // Helper to update body height to match track height (since track is fixed)
    const updateHeight = () => {
      if (track && gallery) {
        document.body.style.height = `${track.getBoundingClientRect().height}px`;
      }
    };

    const onScroll = () => {
      state.current.target = window.scrollY;
    };

    const onResize = () => {
      state.current.isResizing = true;
      updateHeight();
      state.current.isResizing = false;
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    // Initial size set
    updateHeight();

    let animationFrameId: number;

    const loop = () => {
      const { current, target } = state.current;

      // Lerp logic: current moves towards target
      // Damping 0.05
      const newY = lerp(current, target, 0.05);

      // Update state
      state.current.current = newY;

      // Update transform directly for performance
      if (track) {
        // Using translate3d for GPU acceleration
        track.style.transform = `translate3d(0, -${newY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      document.body.style.height = ''; // Reset body height
      if (track) track.style.transform = '';
    };
  }, []);

  return {
    galleryRef,
    trackRef,
    y: state.current.current,
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
export function useParallaxElement<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxElementOptions = {}
) {
  const { speed = 0.2, direction = 'up', enabled = true } = options;
  const elementRef = useRef<T>(null);

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
    direction === 'up' ? [20 * speed, -20 * speed] : [-20 * speed, 20 * speed]
    // Note: Since we are using framer-motion values here, this returns a MotionValue
  );

  return {
    ref: elementRef,
    style: {
      y: enabled ? offset : 0,
    },
  };
}
