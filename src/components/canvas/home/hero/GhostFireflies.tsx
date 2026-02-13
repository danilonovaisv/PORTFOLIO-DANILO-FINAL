import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

export function GhostFireflies() {
  const coreRef = useRef<THREE.InstancedMesh>(null!);
  const glowRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize firefly data
  const fireflies = useMemo(() => {
    return Array.from({ length: GHOST_CONFIG.fireflyCount }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * GHOST_CONFIG.fireflySpeed,
        (Math.random() - 0.5) * GHOST_CONFIG.fireflySpeed,
        (Math.random() - 0.5) * GHOST_CONFIG.fireflySpeed
      ),
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 2 + Math.random() * 3,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!coreRef.current || !glowRef.current) return;
    const t = clock.getElapsedTime();

    fireflies.forEach((data, i) => {
      // Update position
      data.position.add(data.velocity);

      // Bounds check (bounce)
      if (Math.abs(data.position.x) > 30) data.velocity.x *= -1;
      if (Math.abs(data.position.y) > 20) data.velocity.y *= -1;
      if (Math.abs(data.position.z) > 15) data.velocity.z *= -1;

      // Pulse effect
      const pulsePhase = t + data.phase;
      // Original pulse: 0.2 to 1.0
      // Math.sin is -1 to 1. * 0.4 -> -0.4 to 0.4. + 0.6 -> 0.2 to 1.0.
      const pulse = Math.sin(pulsePhase * data.pulseSpeed) * 0.4 + 0.6;

      // Update dummy
      dummy.position.copy(data.position);
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();

      // Apply to both meshes
      coreRef.current.setMatrixAt(i, dummy.matrix);
      glowRef.current.setMatrixAt(i, dummy.matrix);
    });

    coreRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Core Mesh */}
      <instancedMesh
        ref={coreRef}
        args={[undefined, undefined, GHOST_CONFIG.fireflyCount]}
      >
        <sphereGeometry args={[0.05, 2, 2]} />
        <meshBasicMaterial color={0xffff44} transparent opacity={0.9} />
      </instancedMesh>

      {/* Glow Mesh */}
      <instancedMesh
        ref={glowRef}
        args={[undefined, undefined, GHOST_CONFIG.fireflyCount]}
      >
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshBasicMaterial
          color={0xffff88}
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </instancedMesh>
    </group>
  );
}
