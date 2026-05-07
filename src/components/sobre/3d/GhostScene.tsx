'use client';

import { Canvas } from '@react-three/fiber';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useBeliefsScrollContext } from '@/components/sobre/beliefs/BeliefsScrollProvider';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';

export function GhostScene() {
  const { sectionRef, prefersReducedMotion } = useBeliefsScrollContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

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
          },
        },
      });

      // Opacity: [0.12, 0.24, 0.9] -> [0, 1, 1]
      // Y: [0.12, 0.72] -> [18, 0]
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.12, // From 0.12 to 0.24
          ease: 'none',
        },
        0.12
      );

      // Final fade out if needed, but here it stays till 0.9
      tl.to(
        containerRef.current,
        {
          opacity: 1,
          duration: 0.66, // From 0.24 to 0.9
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
      className="pointer-events-none fixed inset-0 z-[var(--z-layer-lightbox)]"
      style={{ opacity: 0 }} // Initial state
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 35 }}
        fallback={<GhostSceneFallback />}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 4]} intensity={1.4} />
        <GhostModel
          progressRef={progressRef}
          reducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  );
}
