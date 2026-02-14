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
  active: boolean;
}

export function GhostParticles({
  ghostGroup,
  movementRef,
  count,
}: GhostParticlesProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const lastSpawnTime = useRef(2);

  // Initialize particles strictly with geometry and material
  // We use userData to store simulation state
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
      };
    });
  }, [count]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !ghostGroup.current) return;

    const now = clock.getElapsedTime() * 1000; // ms
    const moveAmt = movementRef.current;

    // SPAWN LOGIC
    const shouldSpawn = GHOST_CONFIG.createParticlesOnlyWhenMoving
      ? moveAmt > 0.005
      : moveAmt > 0.005;

    if (shouldSpawn && now - lastSpawnTime.current > 200) {
      // Find inactive particles to spawn
      // CodePen rate: Math.min(params.particleCreationRate, Math.max(1, speedRate))
      // Simpler rate here:
      const spawnCount = GHOST_CONFIG.particleCreationRate;

      let spawned = 0;
      for (const child of groupRef.current.children) {
        if (spawned >= spawnCount) break;
        const mesh = child as THREE.Mesh;
        if (!mesh.visible) {
          // Activate particle
          mesh.visible = true;
          mesh.position.copy(ghostGroup.current.position);
          mesh.position.z -= 0.8 + Math.random() * 0.6; // Behind ghost

          // Scatter
          const scatter = 3.5;
          mesh.position.x += (Math.random() - 0.5) * scatter;
          mesh.position.y += (Math.random() - 0.5) * scatter - 0.8;

          // Scale
          const s = 0.6 + Math.random() * 0.7;
          mesh.scale.set(s, s, s);

          // Rotation
          mesh.rotation.set(
            Math.random() * 6,
            Math.random() * 6,
            Math.random() * 6
          );

          // Color variation
          const color = new THREE.Color(
            getConfigColorHex(GHOST_CONFIG.particleColor)
          );
          color.offsetHSL(Math.random() * 0.1 - 0.05, 0, 0);
          (mesh.material as THREE.MeshBasicMaterial).color = color;
          (mesh.material as THREE.MeshBasicMaterial).opacity =
            Math.random() * 0.9;

          // Init Data
          mesh.userData = {
            life: 1.0,
            decay: Math.random() * 0.003 + GHOST_CONFIG.particleDecayRate,
            velocity: new THREE.Vector3(
              (Math.random() - 0.5) * 0.015,
              (Math.random() - 0.5) * 0.012 - 0.002, // slight down
              (Math.random() - 0.5) * 0.012 - 0.006
            ),
            rotationSpeed: new THREE.Vector3(
              (Math.random() - 0.5) * 0.015,
              (Math.random() - 0.5) * 0.015,
              (Math.random() - 0.5) * 0.015
            ),
          } as ParticleData;

          spawned++;
        }
      }
      lastSpawnTime.current = now;
    }

    // UPDATE LOGIC
    groupRef.current.children.forEach((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.visible) return;

      const data = mesh.userData as ParticleData;
      data.life -= data.decay;
      (mesh.material as THREE.MeshBasicMaterial).opacity = data.life * 0.85;

      mesh.position.add(data.velocity);

      const swirl =
        Math.cos(clock.getElapsedTime() * 1.8 + mesh.position.y) * 0.0008;
      mesh.position.x += swirl;

      mesh.rotation.x += data.rotationSpeed.x;
      mesh.rotation.y += data.rotationSpeed.y;
      mesh.rotation.z += data.rotationSpeed.z;

      if (data.life <= 0) {
        mesh.visible = false;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <mesh key={p.key} geometry={p.geometry} visible={false}>
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
