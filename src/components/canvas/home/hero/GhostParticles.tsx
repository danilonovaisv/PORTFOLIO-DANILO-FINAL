'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';

interface GhostParticlesProps {
  ghostGroup: React.RefObject<THREE.Group | null>;
  movementRef: React.MutableRefObject<number>;
  count: number;
}

// Particle data structure stored in userData
interface ParticleData {
  life: number;
  decay: number;
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  initialScale: number;
}

// Scratch objects to avoid allocation in loop
const _color = new THREE.Color();
const _position = new THREE.Vector3();

export function GhostParticles({
  ghostGroup,
  movementRef,
  count,
}: GhostParticlesProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const lastSpawnTime = useRef(0);

  // Initialize particles strictly with geometry and material
  // We use userData to store simulation state, initialized ONCE
  const particles = useMemo(() => {
    const geoms = [
      new THREE.SphereGeometry(0.05, 6, 6),
      new THREE.TetrahedronGeometry(0.04, 0),
      new THREE.OctahedronGeometry(0.045, 0),
    ];

    return Array.from({ length: count }).map((_, i) => {
      const geom = geoms[Math.floor(Math.random() * geoms.length)];
      return {
        key: i,
        geometry: geom,
        // Pre-allocate storage vectors
        userData: {
          life: 0,
          decay: 0,
          velocity: new THREE.Vector3(),
          rotationSpeed: new THREE.Vector3(),
          initialScale: 0,
        } as ParticleData,
      };
    });
  }, [count]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !ghostGroup.current) return;

    const now = clock.getElapsedTime() * 1000; // ms
    const moveAmt = movementRef.current;

    // SPAWN LOGIC
    // Only spawn if moving enough
    const shouldSpawn = GHOST_CONFIG.createParticlesOnlyWhenMoving
      ? moveAmt > 0.005
      : moveAmt > 0.005;

    // Limit spawn rate (e.g., every 200ms)
    if (shouldSpawn && now - lastSpawnTime.current > 200) {
      const spawnCount = GHOST_CONFIG.particleCreationRate;
      let spawned = 0;

      // Iterate through children to find inactive ones
      for (const child of groupRef.current.children) {
        if (spawned >= spawnCount) break;
        const mesh = child as THREE.Mesh;

        // If invisible, it's available for spawning
        if (!mesh.visible) {
          // 1. Activate
          mesh.visible = true;

          // 2. Position (relative to Ghost)
          // Copy ghost position without allocating
          mesh.position.copy(ghostGroup.current.position);
          mesh.position.z -= 0.8 + Math.random() * 0.6; // Behind

          // 3. Scatter
          const scatter = 3.5;
          mesh.position.x += (Math.random() - 0.5) * scatter;
          mesh.position.y += (Math.random() - 0.5) * scatter - 0.8;

          // 4. Scale
          const s = 0.6 + Math.random() * 0.7;
          mesh.scale.set(s, s, s);

          // 5. Rotation
          mesh.rotation.set(
            Math.random() * 6,
            Math.random() * 6,
            Math.random() * 6
          );

          // 6. Color (using scratch object)
          _color.set(getConfigColorHex(GHOST_CONFIG.particleColor));
          _color.offsetHSL(Math.random() * 0.1 - 0.05, 0, 0);

          // Safety check for material type
          if (mesh.material instanceof THREE.MeshBasicMaterial) {
            mesh.material.color.copy(_color);
            mesh.material.opacity = Math.random() * 0.9;
          }

          // 7. Reset UserData (No mutations of new objects)
          // We use the pre-allocated objects from useMemo/initialization
          // But wait, accessing mesh.userData might be tricky if it wasn't set on the mesh yet.
          // Note: In React Three Fiber, props passed to <mesh> are not automatically deep-merged into userData on standard meshes in the same way.
          // We need to ensure userData is consistent.
          // Actually, we can just mutate the existing userData object on the mesh.

          const data = mesh.userData as ParticleData;

          data.life = 1.0;
          data.decay = Math.random() * 0.003 + GHOST_CONFIG.particleDecayRate;
          data.initialScale = s;

          // Set Velocity
          data.velocity.set(
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * 0.012 - 0.002,
            (Math.random() - 0.5) * 0.012 - 0.006
          );

          // Set Rotation Speed
          data.rotationSpeed.set(
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * 0.015,
            (Math.random() - 0.5) * 0.015
          );

          spawned++;
        }
      }
      lastSpawnTime.current = now;
    }

    // UPDATE LOGIC
    const elapsedTime = clock.getElapsedTime();
    for (const child of groupRef.current.children) {
      const mesh = child as THREE.Mesh;
      if (!mesh.visible) continue;

      const data = mesh.userData as ParticleData;

      // Decay life
      data.life -= data.decay;

      if (mesh.material instanceof THREE.MeshBasicMaterial) {
        mesh.material.opacity = data.life * 0.85;
      }

      // Move
      mesh.position.add(data.velocity);

      // Swirl effect
      const swirl = Math.cos(elapsedTime * 1.8 + mesh.position.y) * 0.0008;
      mesh.position.x += swirl;

      // Rotate
      mesh.rotation.x += data.rotationSpeed.x;
      mesh.rotation.y += data.rotationSpeed.y;
      mesh.rotation.z += data.rotationSpeed.z;

      // Kill if dead
      if (data.life <= 0) {
        mesh.visible = false;
      }
    };
  });

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <mesh
          key={p.key}
          geometry={p.geometry}
          visible={false}
          userData={p.userData} // Pass the pre-allocated userData here
        >
          <meshBasicMaterial
            color={getConfigColorHex(GHOST_CONFIG.particleColor)}
            transparent
            opacity={0}
            alphaTest={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}
