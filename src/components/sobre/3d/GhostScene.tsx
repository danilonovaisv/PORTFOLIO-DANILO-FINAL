'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePointerParallax } from '../../../hooks/usePointerParallax';
import { useWebGLSupport } from '../../../hooks/useWebGLSupport';
import { useBeliefsScrollContext } from '../beliefs/BeliefsScrollContext';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';
import { beliefZIndex } from '../../../config/beliefTokens';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';

gsap.registerPlugin(ScrollTrigger);

function SceneInvalidator() {
  const { invalidate, gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    if (!canvas) return;

    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const handleUpdate = () => {
      if (!isVisible) return;
      invalidate();
    };

    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('mousemove', handleUpdate, { passive: true });

    invalidate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('mousemove', handleUpdate);
    };
  }, [invalidate, gl]);

  return null;
}

export function GhostScene() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { containerRef, scrollYProgress, isMobile, shouldReduceMotion } =
    useBeliefsScrollContext();
  const supportsWebGL = useWebGLSupport();
  const pointer = usePointerParallax();

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return;

    const el = wrapperRef.current;

    // Set initial hidden state — y max 18px per GDS constraint
    gsap.set(el, { autoAlpha: 0, y: shouldReduceMotion ? 0 : 18 });

    const ctx = gsap.context(() => {
      // Entrance — triggered once at top 5%
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: 'top 5%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            autoAlpha: 1,
            y: 0,
            duration: shouldReduceMotion ? 0.2 : 0.6,
            ease: shouldReduceMotion ? 'none' : GSAP_GHOST_EASE,
          });
        },
      });

      // Exit — scrub out at 90% → 98% of section
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: '90% top',
        end: '98% top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(el, {
            autoAlpha: 1 - self.progress,
            y: shouldReduceMotion ? 0 : -18 * self.progress,
          });
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef, shouldReduceMotion]);

  if (!supportsWebGL) {
    return <GhostSceneFallback />;
  }

  return (
    <div
      ref={wrapperRef}
      data-testid="beliefs-ghost-scene"
      data-ghost-scene
      style={{ zIndex: beliefZIndex.ghost }}
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        aria-hidden="true"
        frameloop="demand"
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        camera={{ position: isMobile ? [0, 0, 7.4] : [0, 0, 6.9], fov: 35 }}
      >
        <ambientLight intensity={0.9} color="#ffffff" />
        <directionalLight
          position={[2.4, 3.2, 5]}
          intensity={1.35}
          color="#ffffff"
        />
        <pointLight position={[-3, 1.8, 4]} intensity={0.55} color="#bfe8ff" />
        <pointLight
          position={[2.2, -1.5, 3.8]}
          intensity={0.3}
          color="#ffd8f8"
        />
        <SceneInvalidator />
        <Suspense fallback={null}>
          <GhostModel
            isMobile={isMobile}
            shouldReduceMotion={shouldReduceMotion}
            scrollYProgress={scrollYProgress}
            pointerX={isMobile ? { get: () => 0 } : pointer.x}
            pointerY={isMobile ? { get: () => 0 } : pointer.y}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
