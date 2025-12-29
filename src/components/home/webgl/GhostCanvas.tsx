// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { useRef, useEffect, useState, type ReactElement } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import Ghost from './Ghost';
import AtmosphereVeil from './AtmosphereVeil';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AnalogDecayPass from './postprocessing/AnalogDecayPass';

// Ghost Scene Orchestrator
function GhostScene() {
  const ghostGroupRef = useRef<THREE.Group>(null);

  // Refs para física
  const ghostPosRef = useRef(new THREE.Vector3(0, 0, 0));
  const ghostSpeedRef = useRef(0);
  const lastGhostPosRef = useRef(new THREE.Vector3(0, 0, 0));

  const { camera, pointer } = useThree(); // Use pointer from R3F
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Set initial position at (-7, 0) to place ghost on the LEFT
  useEffect(() => {
    if (ghostGroupRef.current) {
      ghostGroupRef.current.position.set(-7, 0, 0);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state, delta) => {
    if (!ghostGroupRef.current) return;
    const t = state.clock.elapsedTime;

    let targetX = 0;
    let targetY = 0;

    if (reducedMotion) {
      // Reduced Motion: Fixed position, barely moving
      targetX = 0;
      targetY = Math.sin(t * 0.5) * 0.2; // Very subtle vertically
    } else if (isMobile) {
      // Mobile: Gentle organic movement, no mouse tracking
      // Slower and smaller amplitude than before
      targetX = Math.sin(t * 0.2) * 2.0;
      targetY = Math.cos(t * 0.15) * 1.5;
    } else {
      // Desktop: Mouse tracking active
      targetX = pointer.x * 5;
      targetY = pointer.y * 3.5;
    }

    // Ghost anchor at LEFT (fixed position)
    const anchorX = -7;
    const anchorY = 0;

    // Smooth dampening
    // Slower damping for reduced motion to avoid jerkiness if logic changes
    const damping = reducedMotion ? 0.02 : 0.05;

    ghostGroupRef.current.position.x +=
      (anchorX + targetX - ghostGroupRef.current.position.x) * damping;
    ghostGroupRef.current.position.y +=
      (anchorY + targetY - ghostGroupRef.current.position.y) * damping;

    // Scale adjustment logic
    let targetScale = 1.4; // Desktop default
    if (reducedMotion) targetScale = 1.25;
    else if (isMobile) targetScale = 0.9;

    // Smooth scale transition
    ghostGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Sync Ref for Veil
    ghostPosRef.current.copy(ghostGroupRef.current.position);

    // Track ghost velocity for reactive eyes/particles
    if (lastGhostPosRef.current.lengthSq() === 0) {
      lastGhostPosRef.current.copy(ghostGroupRef.current.position);
    }

    const distanceMoved = ghostGroupRef.current.position
      .clone()
      .sub(lastGhostPosRef.current)
      .length();
    const velocity = delta > 0 ? distanceMoved / delta : 0;
    const clampedVelocity = Math.min(velocity, 40);
    ghostSpeedRef.current = THREE.MathUtils.lerp(
      ghostSpeedRef.current,
      clampedVelocity,
      0.08
    );
    lastGhostPosRef.current.copy(ghostGroupRef.current.position);

    // PROJECT POSITION TO SCREEN FOR MASKING
    // Convert 3D position to Screen Coordinates (0-100%)
    const vector = ghostGroupRef.current.position.clone();
    vector.project(camera);

    // Convert (-1 to 1) to (0% to 100%)
    const screenX = (vector.x * 0.5 + 0.5) * 100;
    const screenY = (1 - (vector.y * 0.5 + 0.5)) * 100;

    // Update CSS variables for DOM text masking
    document.documentElement.style.setProperty('--gx', `${screenX}%`);
    document.documentElement.style.setProperty('--gy', `${screenY}%`);

    // Emit Ghost Energy for Header synchronization
    let energy = 0;
    if (reducedMotion) {
      energy = 0.5; // Constant low energy
    } else {
      // Energy based on proximity to center (0,0) -> normalized 0 to 1
      energy = 1 - Math.min(1, Math.sqrt(pointer.x ** 2 + pointer.y ** 2));
    }

    // Clamp to avoid zero (minimum baseline glow)
    const clampedEnergy = Math.max(0.15, energy);
    document.documentElement.style.setProperty(
      '--ghost-energy',
      clampedEnergy.toFixed(3)
    );
  });

  return (
    <>
      <AtmosphereVeil ghostPosRef={ghostPosRef} />
      <group ref={ghostGroupRef}>
        <Ghost speedRef={ghostSpeedRef} />
        {/* Reduce particles for mobile/reduced motion */}
        <Particles
          count={reducedMotion ? 40 : isMobile ? 60 : 160}
          speedRef={ghostSpeedRef}
        />
      </group>
    </>
  );
}

function Effects(): ReactElement {
  const reducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const effects: ReactElement[] = [
    <Bloom
      key="bloom"
      intensity={reducedMotion ? 1.0 : isMobile ? 2.0 : 3.2}
      luminanceThreshold={0.08}
      luminanceSmoothing={0.85}
      mipmapBlur={!isMobile} // Disable mipmap blur on mobile for perf if needed, or keep for aesthetics
    />,
    <Vignette key="vignette" offset={0.12} darkness={0.78} />,
  ];

  if (!reducedMotion) {
    effects.splice(1, 0, <AnalogDecayPass key="analog-decay" />);
  }

  return <EffectComposer enableNormalPass={false}>{effects}</EffectComposer>;
}

interface GhostCanvasProps {
  eventSource?: React.RefObject<HTMLElement>;
}

export default function GhostCanvas({ eventSource }: GhostCanvasProps) {
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine DPR based on device and reduced motion preferences
  const dpr = reducedMotion
    ? 1
    : isMobile
      ? ([1, 1.5] as [number, number]) // Cap mobile DPR slightly higher if perf allows, or keep 1.25
      : ([1, 2] as [number, number]);

  return (
    <Canvas
      frameloop={reducedMotion ? 'demand' : 'always'} // Use 'demand' for reduced motion to save resources
      camera={{ position: [0, 0, 20], fov: 75 }}
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        premultipliedAlpha: false,
        powerPreference: 'high-performance',
      }}
      eventSource={eventSource?.current ?? undefined}
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.02} color="#020214" />
      <directionalLight
        position={[-8, 6, -4]}
        intensity={1.5}
        color="#4a90e2"
      />
      <directionalLight position={[8, -4, -6]} intensity={2} color="#0057ff" />

      <GhostScene />
      <Fireflies count={reducedMotion ? 20 : 48} />

      <Effects />
    </Canvas>
  );
}
