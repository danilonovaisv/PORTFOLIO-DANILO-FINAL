import { useMemo, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { BRAND } from '@/config/brand';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export const PHRASES: readonly string[] = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

const COLORS: readonly string[] = [
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
  BRAND.colors.purpleDetails,
  BRAND.colors.pinkDetails,
  BRAND.colors.bluePrimary,
];

interface UseBeliefAnimationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useBeliefAnimation({ containerRef }: UseBeliefAnimationProps) {
  const [baseColor, setBaseColor] = useState(COLORS[0]);
  const [overlayColor, setOverlayColor] = useState(COLORS[1]);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [phraseProgress, setPhraseProgress] = useState(0);
  const [finalProgress, setFinalProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const segment = useMemo(() => 1 / (PHRASES.length + 1), []);

  useMotionValueEvent(scrollYProgress, 'change', (rawValue) => {
    const value = clamp01(rawValue);

    if (value <= 0.001) {
      setBaseColor(COLORS[0]);
      setOverlayColor(COLORS[1]);
      setOverlayOpacity(0);
      setActivePhraseIndex(0);
      setPhraseProgress(0);
      setFinalProgress(0);
      return;
    }

    const finalStart = segment * PHRASES.length;
    if (value >= finalStart) {
      const local = (value - finalStart) / Math.max(1 - finalStart, 0.0001);
      setBaseColor(COLORS[COLORS.length - 1]);
      setOverlayColor(COLORS[COLORS.length - 1]);
      setOverlayOpacity(0);
      setFinalProgress(clamp01(local));
      setPhraseProgress(1);
      setActivePhraseIndex(PHRASES.length - 1);
      return;
    }

    const index = Math.min(PHRASES.length - 1, Math.floor(value / segment));
    const localProgress = (value - index * segment) / segment;

    // Ghost Easing logic for color transition
    // Easing: cubic-bezier(0.22, 1, 0.36, 1) approximated or manually calculated if needed
    // For now keeping the linear interpolation for opacity but timing it with text

    const overlayIn = clamp01(localProgress / 0.45);
    const overlayOut = clamp01((1 - localProgress) / 0.35);
    const overlayMix = Math.min(overlayIn, overlayOut);

    setBaseColor(COLORS[index]);
    setOverlayColor(COLORS[index + 1]);
    setOverlayOpacity(overlayMix);
    setActivePhraseIndex(index);
    setPhraseProgress(clamp01(localProgress));
    setFinalProgress(0);
  });

  return {
    scrollYProgress,
    baseColor,
    overlayColor,
    overlayOpacity,
    activePhraseIndex,
    phraseProgress,
    finalProgress,
  };
}
