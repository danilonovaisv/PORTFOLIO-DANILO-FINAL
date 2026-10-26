'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import type {
  ParticleStageConfig,
  MorphTarget,
} from '@/components/sobre/origin/data';
import { useMotionGate } from '@/hooks/useMotionGate';
import { cn } from '@/lib/utils';
import { createNoise3D } from 'simplex-noise';

interface OriginParticleSceneProps {
  config: ParticleStageConfig;
  isActive: boolean;
  fallbackImage: string;
  priority?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  baseSize: number;
  color: string;
  phase: number;
  morphProgress: number;
}

const MORPH_SHAPES: Record<
  MorphTarget,
  (_t: number, _i: number, _count: number) => { x: number; y: number }
> = {
  // 01 - SENSIBILIDADE: Silhueta orgânica de rosto/perfil humano
  organic: (_t, i, count) => {
    const angle = (i / count) * Math.PI * 2;
    const progress = i / count;

    // Create face-like silhouette using polar coordinates with modulation
    const isUpperFace = progress < 0.5;
    const faceProgress = isUpperFace ? progress * 2 : (1 - progress) * 2;

    // Base radius modulated by face shape
    let radius;
    if (isUpperFace) {
      // Forehead and crown area
      radius = 0.28 + 0.12 * Math.pow(Math.sin(faceProgress * Math.PI), 1.5);
      // Add subtle brow ridge
      radius += 0.02 * Math.sin(faceProgress * Math.PI * 3);
    } else {
      // Chin and jaw area
      radius = 0.22 + 0.1 * Math.pow(Math.sin(faceProgress * Math.PI), 0.8);
      // Jaw definition
      radius += 0.03 * Math.pow(Math.sin(faceProgress * Math.PI * 2), 2);
    }

    // Subtle breathing animation
    const breath = 0.015 * Math.sin(i * 0.01);

    return {
      x: 0.5 + (radius + breath) * Math.cos(angle),
      y: 0.48 + (radius + breath) * Math.sin(angle) * 1.15,
    };
  },

  // 02 - CRIAÇÃO: Formas geométricas - lápis, triângulos, quadrados, linhas
  geometric: (_t, i, count) => {
    const progress = i / count;
    const shapeType = Math.floor(progress * 5) % 5; // 5 different geometric primitives
    const localProgress = (progress * 5) % 1;
    const angle = progress * Math.PI * 2;

    let radius = 0.3;
    let shapeAngle = angle;

    switch (shapeType) {
      case 0: // Pencil-like: elongated triangle
        radius = 0.15 + 0.2 * localProgress;
        shapeAngle = angle + 0.3 * Math.sin(_t * 0.8 + i * 0.02);
        break;
      case 1: // Square/rectangle (paper sheets)
        const sq = Math.max(
          Math.abs(Math.cos(angle)),
          Math.abs(Math.sin(angle))
        );
        radius = 0.25 / sq;
        shapeAngle = angle + 0.1 * Math.sin(_t + i * 0.03);
        break;
      case 2: // Triangle (design tools)
        const tri = Math.max(
          Math.abs(Math.cos(angle * 3)),
          Math.abs(Math.sin(angle * 3))
        );
        radius = 0.28 / tri;
        shapeAngle = angle + 0.15 * Math.cos(_t * 0.6 + i * 0.02);
        break;
      case 3: // Hexagon (structure)
        const hex = Math.max(
          Math.abs(Math.cos(angle)),
          Math.abs(Math.cos(angle - Math.PI / 3)),
          Math.abs(Math.cos(angle + Math.PI / 3))
        );
        radius = 0.22 / hex;
        shapeAngle = angle;
        break;
      case 4: // Lines/crosshatch
        radius = 0.35;
        shapeAngle = angle + 0.05 * Math.sin(_t * 1.2 + i * 0.01);
        break;
    }

    // Subtle rotation of entire geometric field
    const globalRotation = _t * 0.05;

    return {
      x: 0.5 + radius * Math.cos(shapeAngle + globalRotation),
      y: 0.5 + radius * Math.sin(shapeAngle + globalRotation),
    };
  },

  // 03 - DESIGN: Grids e padrões estruturados invisíveis
  structured: (t, i, count) => {
    const _progress = i / count;
    const gridSize = 8; // 8x8 grid = 64 cells
    const particlesPerCell = count / (gridSize * gridSize);
    const cellIndex = Math.floor(i / particlesPerCell);
    const cellX = cellIndex % gridSize;
    const cellY = Math.floor(cellIndex / gridSize);
    const localIndex = i % particlesPerCell;
    const localProgress = localIndex / particlesPerCell;

    // Cell center in normalized coordinates
    const cellCenterX = (cellX + 0.5) / gridSize;
    const cellCenterY = (cellY + 0.5) / gridSize;

    // Pattern type per cell (creates invisible grid structure)
    const patternType = (cellX + cellY * 3) % 4;
    const patternAngle = localProgress * Math.PI * 2;
    const patternRadius = 0.035 + 0.025 * Math.sin(patternAngle * 3 + t * 0.7);

    let offsetX = 0,
      offsetY = 0;

    switch (patternType) {
      case 0: // Circular orbit (harmony)
        offsetX = patternRadius * Math.cos(patternAngle + t * 0.3);
        offsetY = patternRadius * Math.sin(patternAngle + t * 0.3);
        break;
      case 1: // Cross/plus (structure)
        const crossArm = Math.floor(localProgress * 4);
        const armLen = 0.04;
        if (crossArm === 0) {
          offsetX = armLen * (localProgress * 4);
          offsetY = 0;
        } else if (crossArm === 1) {
          offsetX = 0;
          offsetY = armLen * (localProgress * 4 - 1);
        } else if (crossArm === 2) {
          offsetX = -armLen * (localProgress * 4 - 2);
          offsetY = 0;
        } else {
          offsetX = 0;
          offsetY = -armLen * (localProgress * 4 - 3);
        }
        break;
      case 2: // Spiral (flow)
        const spiralR = 0.02 + localProgress * 0.04;
        const spiralA = localProgress * Math.PI * 6 + t * 0.4;
        offsetX = spiralR * Math.cos(spiralA);
        offsetY = spiralR * Math.sin(spiralA);
        break;
      case 3: // Wave (rhythm)
        offsetX = (localProgress - 0.5) * 0.07;
        offsetY = 0.03 * Math.sin(localProgress * Math.PI * 4 + t * 1.5);
        break;
    }

    // Grid breathing
    const breathe = 1 + 0.02 * Math.sin(t * 0.4 + cellX * 0.5 + cellY * 0.5);

    return {
      x: cellCenterX + offsetX * breathe,
      y: cellCenterY + offsetY * breathe,
    };
  },

  // 04 - EXPANSÃO: Forma Ghost AI - radial expansiva com pulso
  expansive: (t, i, count) => {
    const progress = i / count;
    const angle = progress * Math.PI * 2;

    // Multiple concentric rings representing AI layers
    const ringCount = 5;
    const ring = Math.floor(progress * ringCount);
    const _ringProgress = (progress * ringCount) % 1;

    // Base radius per ring (expanding outward)
    const baseRadius = 0.15 + (ring / ringCount) * 0.35;

    // Pulsing expansion
    const pulse = 0.08 * Math.sin(t * 1.2 + ring * 0.8);
    const radius = baseRadius + pulse;

    // Phase offset per ring
    const phaseOffset = ring * ((Math.PI * 2) / ringCount) * 0.3;
    const modulatedAngle =
      angle + phaseOffset + 0.1 * Math.sin(t * 0.6 + i * 0.01);

    // Particle distribution within ring (some scatter) - using deterministic pseudo-random
    const scatter = 0.015 * Math.sin(i * 17.3 + t * 0.1);

    return {
      x: 0.5 + (radius + scatter) * Math.cos(modulatedAngle),
      y: 0.5 + (radius + scatter) * Math.sin(modulatedAngle) * 1.1,
    };
  },
};

function getColorFromPalette(
  palette: ParticleStageConfig['colorPalette'],
  phase: number
): string {
  // Vibrant cyan/teal palette matching jiro.build reference
  // Primary particles: bright cyan/teal
  // Secondary: slightly darker teal
  // Accent: bright white/blue highlights
  const colors = [
    palette.primary, // Main cyan/teal
    palette.accent, // Brighter cyan
    palette.detail1, // White/blue highlight
    palette.detail2, // Darker teal
    palette.secondary, // Void black (background)
  ];
  const idx = Math.floor(phase * colors.length) % colors.length;
  return colors[idx];
}

export function OriginParticleScene({
  config,
  isActive,
  fallbackImage,
  priority = false,
  className = '',
}: OriginParticleSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const prefersReducedMotion = useMotionGate();

  const [isInViewport, setIsInViewport] = useState(true);
  const [showFallback, setShowFallback] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particlesReady, setParticlesReady] = useState(false);
  const [currentMorphTarget, setCurrentMorphTarget] = useState<MorphTarget>(
    config.morphTarget
  );
  const [morphProgress, setMorphProgress] = useState(1);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );
  const noise3DRef = useRef(createNoise3D());

  // Initialize particles
  const initializeParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < config.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.5;
      newParticles.push({
        x: 0.5 + radius * Math.cos(angle),
        y: 0.5 + radius * Math.sin(angle),
        vx: 0,
        vy: 0,
        targetX: 0.5,
        targetY: 0.5,
        baseSize: 1 + Math.random() * 2,
        color: config.colorPalette.primary,
        phase: Math.random(),
        morphProgress: 1,
      });
    }
    setParticles(newParticles);
    setShowFallback(false);
    setParticlesReady(true);
  }, [config.particleCount, config.colorPalette.primary]);

  // Update morph targets when config changes
  useEffect(() => {
    setCurrentMorphTarget(config.morphTarget);
    setMorphProgress(0);
    // Trigger morph animation
    const morphInterval = setInterval(() => {
      setMorphProgress((prev) => {
        const next = Math.min(1, prev + 16 / config.animation.morphDuration);
        if (next >= 1) clearInterval(morphInterval);
        return next;
      });
    }, 16);
    return () => clearInterval(morphInterval);
  }, [config.morphTarget, config.animation.morphDuration]);

  // Viewport observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mouse tracking for cursor repulsion
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    const handleMouseLeave = () => {
      setMousePos(null);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // RAF Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const shouldAnimate =
      isActive && isInViewport && !prefersReducedMotion && particlesReady;

    if (!shouldAnimate) {
      return;
    }

    let rafId: number | null = null;
    let isTabVisible = !document.hidden;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(containerRef.current!);

    const tick = (now: number) => {
      if (!isTabVisible) return;
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }

      const elapsed =
        (now - startTimeRef.current) * 0.001 * config.animation.speed;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const container = containerRef.current;
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const size = Math.min(width, height);

      // Get morph shape function
      const morphShape = MORPH_SHAPES[currentMorphTarget];

      // Update and draw particles
      const updatedParticles = particles.map((p, i) => {
        // Calculate target position from morph shape
        const target = morphShape(elapsed, i, particles.length);
        const targetX = target.x;
        const targetY = target.y;

        // Morph interpolation
        const currentMorph = morphProgress;
        const interpX = p.x + (targetX - p.x) * currentMorph;
        const interpY = p.y + (targetY - p.y) * currentMorph;

        // Noise-based organic motion
        const noiseVal = noise3DRef.current(
          interpX * config.animation.noiseScale * 100,
          interpY * config.animation.noiseScale * 100,
          elapsed * 0.5
        );
        const noiseX = noiseVal * 0.01;
        const noiseY =
          noise3DRef.current(
            interpY * config.animation.noiseScale * 100,
            interpX * config.animation.noiseScale * 100,
            elapsed * 0.5 + 1000
          ) * 0.01;

        // Cursor repulsion
        let repulsionX = 0;
        let repulsionY = 0;
        if (config.cursorRepulsion.enabled && mousePos) {
          const dx = interpX - mousePos.x;
          const dy = interpY - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = config.cursorRepulsion.radius / size;
          if (dist < radius && dist > 0) {
            const force =
              ((radius - dist) / radius) * config.cursorRepulsion.strength;
            repulsionX = (dx / dist) * force * 0.02;
            repulsionY = (dy / dist) * force * 0.02;
          }
        }

        // Spring back to target
        const springK = 0.05;
        const springX = (targetX - interpX) * springK;
        const springY = (targetY - interpY) * springK;

        // Update velocity and position
        const newVx = p.vx * 0.92 + springX + noiseX + repulsionX;
        const newVy = p.vy * 0.92 + springY + noiseY + repulsionY;
        const newX = interpX + newVx;
        const newY = interpY + newVy;

        // Color based on phase
        const newPhase = (p.phase + 0.001) % 1;
        const color = getColorFromPalette(config.colorPalette, newPhase);

        return {
          ...p,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
          targetX,
          targetY,
          phase: newPhase,
          color,
          morphProgress: currentMorph,
        };
      });

      setParticles(updatedParticles);

      // Draw wireframe connections between nearby particles
      const connectionDistance = size * 0.08;
      for (let a = 0; a < updatedParticles.length; a++) {
        const pa = updatedParticles[a];
        const pax = pa.x * size;
        const pay = pa.y * size;
        for (let b = a + 1; b < updatedParticles.length; b++) {
          const pb = updatedParticles[b];
          const dx = pax - pb.x * size;
          const dy = pay - pb.y * size;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.4;
            ctx.beginPath();
            ctx.moveTo(pax, pay);
            ctx.lineTo(pb.x * size, pb.y * size);
            ctx.strokeStyle = `rgba(79, 230, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of updatedParticles) {
        const px = p.x * size;
        const py = p.y * size;
        const psize = p.baseSize * (0.5 + 0.5 * p.morphProgress);

        ctx.beginPath();
        ctx.arc(px, py, psize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Add glow effect
        ctx.beginPath();
        ctx.arc(px, py, psize * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', ', 0.15)').replace('rgb', 'rgba');
        ctx.fill();
      }

      // Draw particle field background (smaller dots scattered)
      const fieldCount = 400;
      const fieldTime = elapsed * 0.3;
      for (let i = 0; i < fieldCount; i++) {
        const fx = (Math.sin(i * 12.9898 + fieldTime) * 43758.5453) % 1;
        const fy = (Math.sin(i * 78.233 + fieldTime) * 43758.5453) % 1;
        const fpx = Math.abs(fx) * width;
        const fpy = Math.abs(fy) * height;
        const fsize = 0.5 + Math.abs(Math.sin(i * 4.14159 + fieldTime)) * 1.5;
        const falpha =
          0.2 + Math.abs(Math.sin(i * 2.71828 + fieldTime * 0.5)) * 0.4;

        ctx.beginPath();
        ctx.arc(fpx, fpy, fsize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 230, 255, ${falpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (!isTabVisible && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (isTabVisible && rafId === null) {
        startTimeRef.current = null;
        rafId = requestAnimationFrame(tick);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObserver.disconnect();
    };
  }, [
    isActive,
    isInViewport,
    prefersReducedMotion,
    particles.length,
    config.animation.speed,
    config.animation.noiseScale,
    currentMorphTarget,
    morphProgress,
    config.cursorRepulsion,
    config.colorPalette,
    mousePos,
  ]);

  // Reduced motion fallback: show static particles
  useEffect(() => {
    if (prefersReducedMotion && particles.length === 0) {
      initializeParticles();
    }
  }, [prefersReducedMotion, particles.length]);

  // Initialize on mount (runs once after hydration)
  useEffect(() => {
    if (!prefersReducedMotion) {
      initializeParticles();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={config.description || `Composição visual ${config.name}`}
      className={cn(
        'relative w-full h-full overflow-hidden select-none pointer-events-none rounded-[1.5rem]',
        className
      )}
      style={{ backgroundColor: config.bgColor }}
    >
      {/* Consolidated Fallback Image */}
      <div
        className={cn(
          'absolute inset-0 w-full h-full transition-opacity duration-500 ease-out z-[1] rounded-[1.5rem]',
          showFallback ? 'opacity-100' : 'opacity-0'
        )}
      >
        <Image
          src={fallbackImage}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 1024px) 92vw, 40vw"
          preload={priority}
          loading={priority ? 'eager' : 'lazy'}
          className="object-cover rounded-[1.5rem]"
        />
      </div>

      {/* Canvas Particle Field */}
      <canvas
        ref={canvasRef}
        className={cn(
          'absolute inset-0 w-full h-full z-[2] transition-opacity duration-500 ease-out',
          !showFallback ? 'opacity-100' : 'opacity-0'
        )}
        style={{ touchAction: 'none' }}
      />

      {/* Reduced motion static fallback */}
      {prefersReducedMotion && (
        <div className="absolute inset-0 w-full h-full z-[2] flex items-center justify-center">
          <Image
            src={fallbackImage}
            alt={config.description || ''}
            fill
            sizes="(max-width: 1024px) 92vw, 40vw"
            className="object-cover rounded-[1.5rem] opacity-60"
          />
        </div>
      )}
    </div>
  );
}
