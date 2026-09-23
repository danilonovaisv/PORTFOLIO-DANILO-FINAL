'use client';

import React, { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { m } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { isWebGLAvailable } from '@/hooks/useWebGLSupport';
import { useMotionGate } from '@/hooks/useMotionGate';
import { WhatMovesMeBackground } from '@/components/sobre/beliefs/WhatMovesMeBackground';

interface ShaderAnimationProps {
  /** Controle de opacidade opcional (suporta MotionValue ou number simples) */
  opacity?: MotionValue<number> | number;
  /** Classe CSS customizada para o container */
  className?: string;
}

interface ShaderErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ShaderErrorBoundaryState {
  hasError: boolean;
}

/**
 * Boundary isolado para impedir que falhas do Three.js/WebGL
 * propaguem até o error boundary da rota (/sobre/error.tsx).
 */
export class ShaderErrorBoundary extends Component<
  ShaderErrorBoundaryProps,
  ShaderErrorBoundaryState
> {
  constructor(props: ShaderErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ShaderErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('ShaderErrorBoundary: WebGL capturado silenciosamente', error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <WhatMovesMeBackground />;
    }
    return this.props.children;
  }
}

function ShaderAnimationInternal({ opacity, className }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionGate();
  const [hasError, setHasError] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  // Pre-check capability synchronously on mount
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setIsSupported(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let cleanupFn: (() => void) | null = null;

    if (!containerRef.current || !isSupported || hasError) return;

    const init = async () => {
      // Dynamic import of Three.js to keep it out of the initial route bundle
      let THREE: typeof import('three');
      try {
        THREE = await import('three');
      } catch {
        if (!isCancelled) setHasError(true);
        return;
      }

      if (isCancelled || !containerRef.current) return;
      const container = containerRef.current;

      const vertexShader = `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
   
        float random(in float x) {
          return fract(sin(x) * 1e4);
        }
   
        void main(void) {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
   
          vec2 fMosaicScal = vec2(4.0, 2.0);
          vec2 vScreenSize = vec2(256.0, 256.0);
          uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
          uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);
   
          float t = time * 0.06 + random(uv.x) * 0.4;
          float lineWidth = 0.0008;
   
          float lineIntensity = 0.0;
          for (int j = 0; j < 3; j++) {
            for (int i = 0; i < 5; i++) {
              lineIntensity += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 1.0 - length(uv));
            }
          }
   
          // Blue -> Purple -> Blue gradient mapping (Awwwards design signature)
          vec3 blue1 = vec3(0.15, 0.40, 1.00);
          vec3 purple = vec3(0.70, 0.15, 1.00);
          vec3 blue2 = vec3(0.10, 0.30, 0.95);
   
          float xNorm = (uv.x + 1.0) * 0.5;
          vec3 gradColor = mix(blue1, purple, smoothstep(0.0, 0.5, xNorm));
          gradColor = mix(gradColor, blue2, smoothstep(0.5, 1.0, xNorm));
          gradColor = mix(gradColor, vec3(0.45, 0.20, 0.90), sin(time * 0.25) * 0.15 + 0.1);
   
          gl_FragColor = vec4(clamp(gradColor * lineIntensity, 0.0, 1.0), 1.0);
        }
      `;

      const camera = new THREE.Camera();
      camera.position.z = 1;

      const scene = new THREE.Scene();
      const geometry = new THREE.PlaneGeometry(2, 2);
      const uniforms = {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
      });
      scene.add(new THREE.Mesh(geometry, material));

      // Protected WebGLRenderer instantiation with try/catch
      let renderer: import('three').WebGLRenderer | null = null;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('ShaderAnimation: WebGLRenderer falhou na inicialização, usando fallback', err);
        }
        if (!isCancelled) setHasError(true);
        geometry.dispose();
        material.dispose();
        return;
      }

      if (isCancelled || !containerRef.current) {
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        return;
      }

      const canvas = renderer.domElement;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.setAttribute('aria-hidden', 'true');
      container.appendChild(canvas);

      const onResize = () => {
        if (!renderer || !container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        renderer.setSize(w, h, false);
        uniforms.resolution.value.set(canvas.width, canvas.height);
      };

      onResize();
      window.addEventListener('resize', onResize, { passive: true });

      let animationId = 0;
      let isVisible = true;
      let isContextLost = false;

      // WebGL Context Loss Handlers
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        isContextLost = true;
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = 0;
        }
      };

      const handleContextRestored = () => {
        isContextLost = false;
        startAnimation();
      };

      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

      // Animation Loop Control
      const stopAnimation = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = 0;
        }
      };

      const startAnimation = () => {
        if (
          animationId ||
          !isVisible ||
          isContextLost ||
          prefersReducedMotion ||
          document.hidden ||
          !renderer
        ) {
          return;
        }

        const animate = () => {
          if (
            !isVisible ||
            isContextLost ||
            prefersReducedMotion ||
            document.hidden ||
            !renderer
          ) {
            animationId = 0;
            return;
          }
          animationId = requestAnimationFrame(animate);
          uniforms.time.value += 0.05;
          renderer.render(scene, camera);
        };
        animationId = requestAnimationFrame(animate);
      };

      // IntersectionObserver to pause when offscreen
      let observer: IntersectionObserver | null = null;
      if (typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
              startAnimation();
            } else {
              stopAnimation();
            }
          },
          { threshold: 0.02 }
        );
        observer.observe(container);
      }

      // Visibility change handler (tab backgrounded)
      const handleVisibilityChange = () => {
        if (document.hidden) {
          stopAnimation();
        } else if (isVisible) {
          startAnimation();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

      // If reduced motion: render static frame without RAF loop
      if (prefersReducedMotion) {
        uniforms.time.value = 1.0;
        renderer.render(scene, camera);
      } else {
        startAnimation();
      }

      cleanupFn = () => {
        stopAnimation();
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        observer?.disconnect();
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
        if (container.contains(canvas)) {
          container.removeChild(canvas);
        }
        renderer?.dispose();
        renderer?.forceContextLoss();
        geometry.dispose();
        material.dispose();
      };
    };

    init();

    return () => {
      isCancelled = true;
      if (cleanupFn) cleanupFn();
    };
  }, [hasError, isSupported, prefersReducedMotion]);

  if (!isSupported || hasError) {
    return (
      <div
        aria-hidden="true"
        data-testid="shader-lines-fallback"
        className={
          className ||
          'fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#040013]'
        }
      >
        <WhatMovesMeBackground />
      </div>
    );
  }

  return (
    <m.div
      ref={containerRef}
      aria-hidden="true"
      data-testid="shader-lines-canvas"
      style={{ opacity }}
      className={
        className ||
        'fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#040013]'
      }
    />
  );
}

export function ShaderAnimation(props: ShaderAnimationProps) {
  return (
    <ShaderErrorBoundary fallback={<WhatMovesMeBackground />}>
      <ShaderAnimationInternal {...props} />
    </ShaderErrorBoundary>
  );
}
