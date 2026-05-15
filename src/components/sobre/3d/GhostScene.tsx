'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { beliefMotion } from '../../../config/beliefTokens';
import { usePointerParallax } from '../../../hooks/usePointerParallax';
import { useWebGLSupport } from '../../../hooks/useWebGLSupport';
import { useBeliefsScrollContext } from '../beliefs/BeliefsScrollContext';
import { Suspense } from 'react';
import { GhostModel } from './GhostModel';
import { GhostSceneFallback } from './GhostSceneFallback';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function SceneInvalidator() {
  const { invalidate, gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    if (!canvas) return;

    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
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
  const {
    scrollYProgress,
    isMobile,
    shouldReduceMotion,
    containerRef: sectionRef,
  } = useBeliefsScrollContext();
  const supportsWebGL = useWebGLSupport();
  const pointer = usePointerParallax();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const ctx = gsap.context(() => {
      // Ensure starting state is invisible via GSAP
      gsap.set(wrapper, { autoAlpha: 0, scale: 0.95 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          gsap.to(wrapper, {
            autoAlpha: 1,
            scale: 1,
            duration: shouldReduceMotion ? 0.3 : beliefMotion.ghostIntroDuration,
            ease: 'power2.out',
            delay: shouldReduceMotion ? 0 : 0.15,
            overwrite: 'auto',
          });
        },
        onLeave: () => {
          gsap.to(wrapper, {
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.in',
            overwrite: 'auto',
          });
        },
        onEnterBack: () => {
          gsap.to(wrapper, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          gsap.to(wrapper, {
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.in',
            overwrite: 'auto',
          });
        },
      });
    });
    return () => ctx.revert();
  }, [sectionRef, shouldReduceMotion, supportsWebGL]);

  if (!supportsWebGL) {
    return <GhostSceneFallback />;
  }

  return (
    <div
      ref={wrapperRef}
      data-testid="beliefs-ghost-scene"
      data-ghost-scene
      className="pointer-events-none absolute inset-0 z-[var(--z-layer-3d)]"
    >
      <Canvas
        aria-hidden="true"
        frameloop="demand"
        dpr={[1, isMobile ? 1 : 2]}
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
            pointerX={pointer.x}
            pointerY={pointer.y}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
