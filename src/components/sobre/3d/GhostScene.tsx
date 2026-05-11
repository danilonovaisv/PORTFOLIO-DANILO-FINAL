'use client';

import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Mask } from '@react-three/drei';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { MathUtils, Mesh } from 'three';
import gsap from 'gsap';
import { useBeliefsScrollContext } from '@/components/sobre/beliefs/BeliefsScrollProvider';
import { beliefLayers } from '../beliefs/belief.constants';
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

  const checkAndInvalidate = useCallback(() => {
    const p = progressRef.current ?? 0;
    if (Math.abs(p - lastProgress.current) > 0.001) {
      lastProgress.current = p;
      invalidate();
    }
    requestAnimationFrame(checkAndInvalidate);
  }, [invalidate, progressRef]);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(checkAndInvalidate);
    return () => cancelAnimationFrame(id);
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
    // Smooth lerp to prevent popping
    currentScale.current = MathUtils.lerp(currentScale.current, target, 0.12);
    const s = Math.max(0.001, currentScale.current); // Avoid zero-scale
    maskRef.current.scale.set(s, s, 1);
  });

  return (
    <Mask ref={maskRef} id={1} position={[0, 0, 0.1]}>
      <circleGeometry args={[0.3, 64]} />
    </Mask>
  );
}

export function GhostScene() {
  const { sectionRef, prefersReducedMotion } = useBeliefsScrollContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const maskScaleRef = useRef(0);

  useLayoutEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            // Map progress to mask scale: [0.15, 0.65] → [0, 4.5]
            const p = self.progress;
            if (p < 0.15) {
              maskScaleRef.current = 0;
            } else if (p < 0.65) {
              maskScaleRef.current = ((p - 0.15) / 0.5) * 4.5;
            } else {
              maskScaleRef.current = 4.5;
            }
          },
        },
      });

      // Container opacity: [0.12, 0.24, 0.9] → [0, 1, 1]
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: 'none',
        },
        0.12
      );

      // Hold visibility
      tl.to(
        containerRef.current,
        {
          opacity: 1,
          duration: 0.66,
          ease: 'none',
        },
        0.24
      );
    });

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div
      ref={containerRef}
      data-testid="beliefs-ghost-scene"
      data-ghost-scene
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: beliefLayers.ghost, opacity: 0 }}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 35 }}
        fallback={<GhostSceneFallback />}
      >
        <ambientLight intensity={0.25} color="#001a4d" />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.6}
          color="#0048ff"
        />
        <pointLight position={[-5, -5, -2]} intensity={0.7} color="#4fe6ff" />

        {/* Invalidator ensures canvas re-renders on scroll */}
        <Invalidator progressRef={progressRef} />

        {/* Stencil mask — circular reveal portal */}
        <GhostMask maskScaleRef={maskScaleRef} />

        {/* Ghost model — only visible through the mask */}
        <GhostModel
          progressRef={progressRef}
          reducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  );
}
