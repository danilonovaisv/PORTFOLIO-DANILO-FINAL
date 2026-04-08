'use client';
import { useTransform, MotionValue, cubicBezier } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ────────────────────────────────────────────────────────
CONSTANTS & CONFIG
──────────────────────────────────────────────────────── */
type HslColor = { h: number; s: number; l: number };

// Session opens on Ghost background, then runs the mandatory blue/purple/pink cycle.
const BASE_BACKGROUND: HslColor = { h: 253, s: 100, l: 4 };
const PHRASE_COLOR_SEQUENCE: HslColor[] = [
  { h: 230, s: 85, l: 30 }, // Blue
  { h: 270, s: 80, l: 40 }, // Purple
  { h: 330, s: 85, l: 50 }, // Pink
  { h: 230, s: 85, l: 30 }, // Blue
  { h: 270, s: 80, l: 40 }, // Purple
  { h: 330, s: 85, l: 50 }, // Pink
];
const FINAL_BACKGROUND: HslColor = { h: 230, s: 85, l: 30 };

// Ghost Easing for background interpolation — spec: cubic-bezier(0.4, 0, 0.2, 1)
const ghostEase = cubicBezier(0.4, 0, 0.2, 1);
export const BELIEF_INTRO_END = 0.1;
export const BELIEF_PHRASE_ZONE_END = 0.82;
export const BELIEF_FINAL_START = 0.86;

function interpolateHsl(
  startColor: HslColor,
  endColor: HslColor,
  progress: number
) {
  let deltaH = endColor.h - startColor.h;
  if (deltaH > 180) deltaH -= 360;
  else if (deltaH < -180) deltaH += 360;

  const h = (startColor.h + deltaH * progress + 360) % 360;
  const s = startColor.s + (endColor.s - startColor.s) * progress;
  const l = startColor.l + (endColor.l - startColor.l) * progress;

  return { h, s, l };
}

function toHslString(color: HslColor) {
  return `hsl(${color.h.toFixed(1)}, ${color.s.toFixed(1)}%, ${color.l.toFixed(1)}%)`;
}

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
  const prefersReducedMotion = useReducedMotion();
  const segment = (BELIEF_PHRASE_ZONE_END - BELIEF_INTRO_END) / totalPhrases;

  const backgroundColor = useTransform(scrollYProgress, (progress) => {
    if (prefersReducedMotion) {
      return toHslString(BASE_BACKGROUND);
    }

    if (progress <= BELIEF_INTRO_END) {
      return toHslString(BASE_BACKGROUND);
    }

    if (progress < BELIEF_PHRASE_ZONE_END) {
      const activeProgress = progress - BELIEF_INTRO_END;
      const sectionIndex = Math.min(
        totalPhrases - 1,
        Math.floor(activeProgress / segment)
      );
      const sectionProgress =
        (activeProgress - sectionIndex * segment) / segment;
      // Front-loaded: Math.pow(0.6, 0.7) ≈ 0.706 — satisfies spec "60% visibility → 70% interpolation"
      const easedProgress = Math.pow(sectionProgress, 0.7);
      const startColor =
        sectionIndex === 0
          ? BASE_BACKGROUND
          : PHRASE_COLOR_SEQUENCE[sectionIndex - 1];
      const endColor = PHRASE_COLOR_SEQUENCE[sectionIndex];

      return toHslString(interpolateHsl(startColor, endColor, easedProgress));
    }

    if (progress < BELIEF_FINAL_START) {
      return toHslString(
        PHRASE_COLOR_SEQUENCE[PHRASE_COLOR_SEQUENCE.length - 1]
      );
    }

    const finalProgress = Math.min(
      1,
      Math.max(0, (progress - BELIEF_FINAL_START) / (1 - BELIEF_FINAL_START))
    );
    const easedFinalProgress = ghostEase(finalProgress);

    return toHslString(
      interpolateHsl(
        PHRASE_COLOR_SEQUENCE[PHRASE_COLOR_SEQUENCE.length - 1],
        FINAL_BACKGROUND,
        easedFinalProgress
      )
    );
  });



  const currentSection = useTransform(scrollYProgress, (progress) => {
    if (progress <= BELIEF_INTRO_END || progress >= BELIEF_PHRASE_ZONE_END) {
      return -1;
    }

    return Math.min(
      totalPhrases - 1,
      Math.floor((progress - BELIEF_INTRO_END) / segment)
    );
  });

  const ghostIntensity = useTransform(scrollYProgress, (progress) => {
    if (progress <= 0.03 || prefersReducedMotion) return 0;
    if (progress >= BELIEF_FINAL_START) return 1;

    const normalized = Math.min(
      1,
      Math.max(0, progress - 0.03) / (BELIEF_FINAL_START - 0.03)
    );
    return Math.pow(normalized, 1.2);
  });

  const showFinalManifesto = useTransform(scrollYProgress, (progress) => {
    if (progress < BELIEF_FINAL_START) return 0;
    return Math.min(1, (progress - BELIEF_FINAL_START) / 0.14);
  });

  return {
    backgroundColor,
    currentSection,
    ghostIntensity,
    showFinalManifesto,
    prefersReducedMotion,
  };
}
