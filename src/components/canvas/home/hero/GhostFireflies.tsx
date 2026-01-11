import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

export function GhostFireflies() {
  const groupRef = useRef<THREE.Group>(null!);

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
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const data = fireflies[i];
      if (!data) return;

      const mesh = child as THREE.Mesh;

      // Update position
      mesh.position.add(data.velocity);

      // Bounds check (bounce)
      if (Math.abs(mesh.position.x) > 30) data.velocity.x *= -1;
      if (Math.abs(mesh.position.y) > 20) data.velocity.y *= -1;
      if (Math.abs(mesh.position.z) > 15) data.velocity.z *= -1;

      // Pulse effect
      const pulsePhase = t + data.phase;
      const pulse = Math.sin(pulsePhase * data.pulseSpeed) * 0.4 + 0.6;

      const material = mesh.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = GHOST_CONFIG.fireflyOpacity * pulse;
      }

      // Update glow/light if we had them attached, but here we just have simple mesh + light
      // The CodePen has child glow mesh + light.
      // For simplicity/performance in R3F, we can just pulse opacity and maybe scale?
      // CodePen pulses opacity of glowMaterial and fireflyMaterial and light intensity.

      // Let's assume the child structure: Mesh (Firefly) -> [Mesh (Glow), PointLight]
      const light = mesh.children.find(
        (c) => c instanceof THREE.PointLight
      ) as THREE.PointLight;
      const glow = mesh.children.find(
        (c) => c instanceof THREE.Mesh
      ) as THREE.Mesh; // The glow sphere

      if (light) {
        light.intensity = GHOST_CONFIG.fireflyGlowIntensity * 0.8 * pulse;
      }
      if (glow) {
        (glow.material as THREE.MeshBasicMaterial).opacity =
          GHOST_CONFIG.fireflyGlowIntensity * 0.5 * pulse;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {fireflies.map((data, i) => (
        <mesh key={i} position={data.position}>
          <sphereGeometry args={[0.05, 2, 2]} />
          <meshBasicMaterial color={0xffff44} transparent opacity={0.9} />

          {/* Glow Sphere */}
          <mesh>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshBasicMaterial
              color={0xffff88}
              transparent
              opacity={0.4}
              side={THREE.BackSide}
            />
          </mesh>

          <pointLight color={0xffff44} intensity={0.5} distance={4} decay={3} />
        </mesh>
      ))}
    </group>
  );
}
