'use client';

import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Mask } from '@react-three/drei';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { m, useTransform } from 'framer-motion';
import { MathUtils, Mesh } from 'three';
import { useBeliefsScrollContext } from '@/components/sobre/beliefs/BeliefsScrollContext';
import {
  beliefLayers,
  BELIEF_SCROLL_THRESHOLDS,
} from '../beliefs/belief.constants';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';

/** Forces canvas re-render on each scroll tick when using frameloop="demand" */
function Invalidator({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) {
  const { invalidate } = useThree();
  const lastProgress = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  const checkAndInvalidate = useCallback(() => {
    const p = progressRef.current ?? 0;
    // Only invalidate when scroll progress actually changes
    if (Math.abs(p - lastProgress.current) > 0.0005) {
      lastProgress.current = p;
      invalidate();
    }
    if (isVisibleRef.current) {
      rafIdRef.current = requestAnimationFrame(checkAndInvalidate);
    }
  }, [invalidate, progressRef]);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        // Resume RAF polling when section comes back into view
        if (entry.isIntersecting && rafIdRef.current == null) {
          rafIdRef.current = requestAnimationFrame(checkAndInvalidate);
        }
      },
      { threshold: 0.05 }
    );

    const el = document.querySelector('[data-ghost-scene]');
    if (el) observer.observe(el);

    rafIdRef.current = requestAnimationFrame(checkAndInvalidate);

    return () => {
      observer.disconnect();
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [checkAndInvalidate]);

  return null;
}

/** Circular stencil mask that expands with scroll progress */
function GhostMask({
  maskScaleRef,
}: {
  maskScaleRef: React.RefObject<number>;
}) {
  const maskRef = useRef<Mesh>(null);
  const currentScale = useRef(0);

  useFrame(() => {
    if (!maskRef.current) return;
    const target = maskScaleRef.current ?? 0;
    // Smooth lerp to prevent popping — no new object allocations
    currentScale.current = MathUtils.lerp(currentScale.current, target, 0.12);
    const s = Math.max(0.001, currentScale.current);
    maskRef.current.scale.set(s, s, 1);
  });

  return (
    <Mask ref={maskRef} id={1} position={[0, 0, 0.1]}>
      <circleGeometry args={[0.3, 64]} />
    </Mask>
  );
}

export function GhostScene() {
  const { scrollYProgress, prefersReducedMotion } = useBeliefsScrollContext();
  const progressRef = useRef(0);
  const maskScaleRef = useRef(0);

  // Subscribe to scroll progress without triggering re-renders
  useLayoutEffect(() => {
    return scrollYProgress.on('change', (p) => {
      progressRef.current = p;
      // Map progress to mask scale using global thresholds
      const { phrasesStart, phrasesEnd } = BELIEF_SCROLL_THRESHOLDS;
      const duration = phrasesEnd - phrasesStart;

      if (p < phrasesStart) {
        maskScaleRef.current = 0;
      } else if (p < phrasesEnd) {
        maskScaleRef.current = ((p - phrasesStart) / duration) * 4.5;
      } else {
        maskScaleRef.current = 4.5;
      }
    });
  }, [scrollYProgress]);

  // Dynamic opacity based on global thresholds
  const opacity = useTransform(
    scrollYProgress,
    [
      0,
      BELIEF_SCROLL_THRESHOLDS.entryStart,
      BELIEF_SCROLL_THRESHOLDS.entryEnd,
      BELIEF_SCROLL_THRESHOLDS.climaxStart,
      BELIEF_SCROLL_THRESHOLDS.climaxEnd,
      1,
    ],
    [0, 0, 1, 1, 0, 0]
  );

  // Y shift: subtle lift in and out synchronized with opacity
  const y = useTransform(
    scrollYProgress,
    [
      0,
      BELIEF_SCROLL_THRESHOLDS.entryStart,
      BELIEF_SCROLL_THRESHOLDS.entryEnd,
      BELIEF_SCROLL_THRESHOLDS.climaxStart,
      BELIEF_SCROLL_THRESHOLDS.climaxEnd,
      1,
    ],
    [18, 18, 0, 0, -18, -18]
  );

  // DPR: cap at 1 for reduced motion to save GPU
  const dprRange: [number, number] = prefersReducedMotion ? [1, 1] : [1, 2];

  return (
    <m.div
      data-testid="beliefs-ghost-scene"
      data-ghost-scene
      className="pointer-events-none absolute inset-0"
      style={{
        zIndex: beliefLayers.ghost,
        opacity: prefersReducedMotion ? 0 : opacity,
        y: prefersReducedMotion ? 0 : y,
      }}
    >
      <Canvas
        frameloop="demand"
        dpr={dprRange}
        camera={{ position: [0, 0, 6], fov: 35 }}
        fallback={<GhostSceneFallback />}
      >
        <ambientLight intensity={0.4} color="#001a4d" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.8}
          color="#0048ff"
        />
        <pointLight position={[-5, -5, -2]} intensity={0.9} color="#4fe6ff" />

        {/* Invalidator ensures canvas re-renders only on scroll delta */}
        <Invalidator progressRef={progressRef} />

        {/* Stencil mask — circular reveal portal */}
        <GhostMask maskScaleRef={maskScaleRef} />

        {/* Ghost model — only visible through the mask */}
        <GhostModel
          progressRef={progressRef}
          reducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </m.div>
  );
}
