'use client';
import { useTransform, MotionValue, cubicBezier } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ────────────────────────────────────────────────────────
CONSTANTS & CONFIG
──────────────────────────────────────────────────────── */
// Target HSL values from specs
const COLOR_SEQUENCE = [
  { h: 230, s: 85, l: 30 }, // Blue
  { h: 270, s: 80, l: 40 }, // Purple
  { h: 330, s: 85, l: 50 }, // Pink
  { h: 230, s: 85, l: 30 }, // Blue
  { h: 270, s: 80, l: 40 }, // Purple
  { h: 330, s: 85, l: 50 }, // Pink
  { h: 230, s: 85, l: 30 }, // Blue
];

// Ghost Easing for background interpolation — spec: cubic-bezier(0.4, 0, 0.2, 1)
const ghostEase = cubicBezier(0.4, 0, 0.2, 1);
export const BELIEF_INTRO_END = 0.1;
export const BELIEF_PHRASE_ZONE_END = 0.82;
export const BELIEF_FINAL_START = 0.86;

export function getBeliefSegment(index: number, totalPhrases: number) {
  const span = (BELIEF_PHRASE_ZONE_END - BELIEF_INTRO_END) / totalPhrases;
  const start = BELIEF_INTRO_END + span * index;
  const end = start + span;
  return { start, end, span };
}

interface UseBeliefsAnimationProps {
  scrollYProgress: MotionValue;
  totalPhrases: number;
}

/**
 * useBeliefsAnimation - Hook principal para animações da sessão "O Que Me Move"
 *
 * Implementa a interpolação contínua de cores conforme especificação do Ghost Design System:
 * - A interpolação inicia no primeiro frame da entrada do texto
 * - Quando o texto atinge 60% de visibilidade, o BG está ~70% interpolado
 * - A interpolação termina exatamente quando o texto termina a animação
 *
 * Arquitetura:
 * 1. Background Color Interpolation (Camada 0)
 * 2. Overlay Transition (Camada 1)
 * 3. Text Animation State
 * 4. Ghost 3D Intensity
 * 5. Final Manifesto Trigger
 */
export function useBeliefsAnimation({
  scrollYProgress,
  totalPhrases,
}: UseBeliefsAnimationProps) {
  // Check for reduced motion preference
  const prefersReducedMotion = useReducedMotion();

  // Timeline configuration
  const segment = (BELIEF_PHRASE_ZONE_END - BELIEF_INTRO_END) / totalPhrases;

  // 1. Background Color Interpolation (Camada 0)
  // Map scroll progress to colors based on phrase index
  const backgroundColor = useTransform(scrollYProgress, (progress) => {
    if (
      progress <= BELIEF_INTRO_END ||
      progress >= BELIEF_PHRASE_ZONE_END ||
      prefersReducedMotion
    ) {
      const c = COLOR_SEQUENCE[0];
      return `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
    }

    const activeProgress = progress - BELIEF_INTRO_END;
    const sectionIndex = Math.min(
      totalPhrases - 1,
      Math.floor(activeProgress / segment)
    );
    const sectionProgress = (activeProgress - sectionIndex * segment) / segment;

    // Calculate which color transition we're in
    const colorIndex = Math.min(sectionIndex, COLOR_SEQUENCE.length - 2);
    const startColor = COLOR_SEQUENCE[colorIndex];
    const endColor = COLOR_SEQUENCE[colorIndex + 1];

    // Apply Ghost Easing [0.4, 0, 0.2, 1]
    const easedProgress = ghostEase(sectionProgress);

    // Interpolate HSL with circular hue handling
    let deltaH = endColor.h - startColor.h;
    if (deltaH > 180) deltaH -= 360;
    else if (deltaH < -180) deltaH += 360;

    const h = (startColor.h + deltaH * easedProgress + 360) % 360;
    const s = startColor.s + (endColor.s - startColor.s) * easedProgress;
    const l = startColor.l + (endColor.l - startColor.l) * easedProgress;

    return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
  });

  // 2. Overlay Transition (Camada 1)
  // Opacity animada (0 → 1 → 0) com duração de 0.9s
  const overlayOpacity = useTransform(scrollYProgress, (progress) => {
    if (
      progress <= BELIEF_INTRO_END ||
      progress >= BELIEF_PHRASE_ZONE_END ||
      prefersReducedMotion
    ) {
      return 0;
    }

    const activeProgress = progress - BELIEF_INTRO_END;
    const sectionIndex = Math.min(
      totalPhrases - 1,
      Math.floor(activeProgress / segment)
    );
    const sectionProgress = (activeProgress - sectionIndex * segment) / segment;

    // Easing personalizado para sincronia perfeita com texto [0.4, 0, 0.2, 1]
    const easedProgress = ghostEase(sectionProgress);

    // Overlay: 0 → 1 → 0
    if (easedProgress < 0.5) {
      return easedProgress * 2;
    } else {
      return 2 - easedProgress * 2;
    }
  });

  // 3. Active Section Index (para renderização do texto)
  const currentSection = useTransform(scrollYProgress, (progress) => {
    if (progress <= BELIEF_INTRO_END || progress >= BELIEF_PHRASE_ZONE_END) {
      return -1;
    }

    return Math.min(
      totalPhrases - 1,
      Math.floor((progress - BELIEF_INTRO_END) / segment)
    );
  });

  // 4. Ghost 3D Intensity
  // Aumenta gradualmente com cada frase, atinge pico na última frase
  const ghostIntensity = useTransform(scrollYProgress, (progress) => {
    if (progress <= 0.03 || prefersReducedMotion) return 0;
    if (progress >= BELIEF_PHRASE_ZONE_END) return 1;

    const normalized = Math.min(
      1,
      Math.max(0, progress - 0.03) / (BELIEF_PHRASE_ZONE_END - 0.03)
    );
    return Math.min(1, normalized * 1.1);
  });

  // 5. Final Manifesto Trigger
  // Ativa o manifesto final quando o scroll atinge 85%
  const showFinalManifesto = useTransform(scrollYProgress, (progress) => {
    if (progress < BELIEF_FINAL_START) return 0;
    return Math.min(1, (progress - BELIEF_FINAL_START) / 0.14);
  });

  return {
    backgroundColor,
    overlayOpacity,
    currentSection,
    ghostIntensity,
    showFinalManifesto,
    prefersReducedMotion,
  };
}
