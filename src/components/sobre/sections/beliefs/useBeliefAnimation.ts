'use client';
import { useState, useEffect, useRef } from 'react';
import { useMotionValue, useMotionValueEvent, useScroll, animate } from 'framer-motion';

/* ────────────────────────────────────────────────────────
CONSTANTS & CONFIG
──────────────────────────────────────────────────────── */
export const PHRASES: readonly string[] = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nnão\nestou\nali.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

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

// Ghost Easing for background interpolation [0.4, 0, 0.2, 1]
function ghostEase(t: number): number {
  return 0.4 * t * t + 0.2 * t;
}

interface UseBeliefAnimationProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function useBeliefAnimation({ containerRef }: UseBeliefAnimationProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Background color (continuously interpolated)
  const baseColor = useMotionValue(`hsl(${COLOR_SEQUENCE[0].h}, ${COLOR_SEQUENCE[0].s}%, ${COLOR_SEQUENCE[0].l}%)`);
  // Overlay for smooth transitions
  const overlayColor = useMotionValue('#000000');
  const overlayOpacity = useMotionValue(0);

  // State for rendering logic
  const [finalProgress, setFinalProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  // Animation Refs
  const currentAnimRaf = useRef<number | null>(null);
  const currentOverlayAnim = useRef<any>(null);
  const lastSection = useRef(0);

  // Track continuous state to avoid jumps
  const currentHSL = useRef({ ...COLOR_SEQUENCE[0] });

  // Constants
  const phraseCount = PHRASES.length;
  const finalStart = 0.82; // Start of final manifesto section
  const segment = finalStart / phraseCount; // Size of each phrase segment

  // Initialize with the first color
  useEffect(() => {
    const c = COLOR_SEQUENCE[0];
    baseColor.set(`hsl(${c.h}, ${c.s}%, ${c.l}%)`);
    currentHSL.current = { ...c };
  }, [baseColor]);

  // Main scroll progress handler
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // 1. Handle final section progress
    if (latest >= finalStart) {
      const local = (latest - finalStart) / Math.max(1 - finalStart, 0.0001);
      if (Math.abs(local - finalProgress) > 0.05) {
        setFinalProgress(local);
      }
    } else if (finalProgress !== 0) {
      setFinalProgress(0);
    }

    // 2. Skip if outside phrase area or at final section
    if (latest <= 0.001 || latest >= finalStart) return;

    // 3. Calculate current section index
    const sectionIndex = Math.min(phraseCount - 1, Math.floor(latest / segment));

    // 4. Determine progress within current section (0 to 1) - purely for logic if needed
    // const sectionProgress = (latest - (sectionIndex * segment)) / segment;

    // 5. Trigger transition when entering a new section
    if (sectionIndex !== lastSection.current) {
      const isForward = sectionIndex > lastSection.current;
      lastSection.current = sectionIndex;

      // Cancel any ongoing animations
      if (currentAnimRaf.current) {
        cancelAnimationFrame(currentAnimRaf.current);
        currentAnimRaf.current = null;
      }

      if (currentOverlayAnim.current) {
        currentOverlayAnim.current.stop();
        currentOverlayAnim.current = null;
      }

      // Only transition forward (ignore backward scrolling for smoothness)
      if (isForward && sectionIndex < COLOR_SEQUENCE.length - 1) {
        const startColor = { ...currentHSL.current };
        const endColor = COLOR_SEQUENCE[sectionIndex + 1];

        const startTime = performance.now();
        const duration = 900; // Must match text animation duration

        const animateFrame = (time: number) => {
          const elapsed = time - startTime;
          const rawT = Math.min(elapsed / duration, 1);

          // Apply Ghost Easing [0.4, 0, 0.2, 1]
          const easedT = ghostEase(rawT);

          // Interpolate HSL with circular hue handling
          let deltaH = endColor.h - startColor.h;
          if (deltaH > 180) deltaH -= 360;
          else if (deltaH < -180) deltaH += 360;

          const h = (startColor.h + deltaH * easedT + 360) % 360;
          const s = startColor.s + (endColor.s - startColor.s) * easedT;
          const l = startColor.l + (endColor.l - startColor.l) * easedT;

          // Update current state
          currentHSL.current = { h, s, l };
          baseColor.set(`hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`);

          // Update section for rendering
          setCurrentSection(sectionIndex);

          if (rawT < 1) {
            currentAnimRaf.current = requestAnimationFrame(animateFrame);
          }
        };

        currentAnimRaf.current = requestAnimationFrame(animateFrame);

        // Animate overlay for smooth transition
        overlayOpacity.set(0);
        currentOverlayAnim.current = animate(overlayOpacity, [0, 1, 0], {
          duration: 0.9,
          ease: 'linear',
        });
      }
    } else {
      // Update current section for rendering
      setCurrentSection(sectionIndex);

      // For backward scrolling, snap to current section's color
      // but don't trigger animation
      const targetColor = COLOR_SEQUENCE[sectionIndex];
      currentHSL.current = { ...targetColor };
      baseColor.set(`hsl(${targetColor.h}, ${targetColor.s}%, ${targetColor.l}%)`);
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentAnimRaf.current) {
        cancelAnimationFrame(currentAnimRaf.current);
      }
    };
  }, []);

  return {
    scrollYProgress,
    baseColor,
    overlayColor,
    overlayOpacity,
    finalProgress,
    currentSection,
  };
}