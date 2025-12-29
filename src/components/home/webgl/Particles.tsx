import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ParticlesProps {
  count?: number;
  speedRef: React.MutableRefObject<number>;
  ghostPosRef: React.MutableRefObject<THREE.Vector3>;
}

const FLUORESCENT_COLORS = {
  cyan: 0x00ffff,
  lime: 0x00ff00,
  magenta: 0xff00ff,
  yellow: 0xffff00,
  orange: 0xff4500,
  pink: 0xff1493,
  purple: 0x9400d3,
  blue: 0x0080ff,
  green: 0x00ff80,
  red: 0xff0040,
  teal: 0x00ffaa,
  violet: 0x8a2be2,
};

// Internal class to manage particle data without React overhead
class ParticleSystem {
  particles: THREE.Mesh[] = [];
  pool: THREE.Mesh[] = [];
  group: THREE.Group;
  geometries: THREE.BufferGeometry[];
  material: THREE.MeshBasicMaterial;

  constructor(group: THREE.Group) {
    this.group = group;
    this.geometries = [
      new THREE.SphereGeometry(0.05, 6, 6),
      new THREE.TetrahedronGeometry(0.04, 0),
      new THREE.OctahedronGeometry(0.045, 0),
    ];
    this.material = new THREE.MeshBasicMaterial({
      color: FLUORESCENT_COLORS.violet,
      transparent: true,
      opacity: 0,
      alphaTest: 0.1, // Helps with sorting issues
    });
  }

  initPool(count: number) {
    // localized pool init
    for (let i = 0; i < count; i++) {
      const geom =
        this.geometries[Math.floor(Math.random() * this.geometries.length)];
      const mesh = new THREE.Mesh(geom, this.material.clone()); // Clone material to control opacity individually
      mesh.visible = false;
      mesh.userData = {
        life: 0,
        decay: 0,
        velocity: new THREE.Vector3(),
        rotationSpeed: new THREE.Euler(),
      };
      this.group.add(mesh);
      this.pool.push(mesh);
    }
  }

  spawn(ghostPos: THREE.Vector3) {
    if (this.pool.length === 0) return;
    const particle = this.pool.pop();
    if (!particle) return;

    particle.visible = true;

    // Position at ghost
    particle.position.copy(ghostPos);
    particle.position.z -= 0.8 + Math.random() * 0.6; // Slightly behind

    // Scatter
    const scatterRange = 3.5;
    particle.position.x += (Math.random() - 0.5) * scatterRange;
    particle.position.y += (Math.random() - 0.5) * scatterRange - 0.8;

    // Reset Scale
    const size = 0.6 + Math.random() * 0.7;
    particle.scale.set(size, size, size);

    // Color variation
    const color = new THREE.Color(FLUORESCENT_COLORS.violet);
    color.offsetHSL(Math.random() * 0.1 - 0.05, 0, 0);
    (particle.material as THREE.MeshBasicMaterial).color.copy(color);
    (particle.material as THREE.MeshBasicMaterial).opacity =
      Math.random() * 0.9;

    // Dynamics
    particle.userData.life = 1.0;
    particle.userData.decay = Math.random() * 0.003 + 0.005; // Decay rate

    particle.userData.velocity = {
      x: (Math.random() - 0.5) * 0.012,
      y: (Math.random() - 0.5) * 0.012 - 0.002, // slight gravity
      z: (Math.random() - 0.5) * 0.012 - 0.006,
    };

    particle.userData.rotationSpeed = {
      x: (Math.random() - 0.5) * 0.015,
      y: (Math.random() - 0.5) * 0.015,
      z: (Math.random() - 0.5) * 0.015,
    };

    this.particles.push(particle);
  }

  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.userData.life -= p.userData.decay;

      if (p.userData.life <= 0) {
        // Die
        p.visible = false;
        this.pool.push(p);
        this.particles.splice(i, 1);
        continue;
      }

      // Move
      p.position.x += p.userData.velocity.x;
      p.position.y += p.userData.velocity.y;
      p.position.z += p.userData.velocity.z;

      // Rotate
      p.rotation.x += p.userData.rotationSpeed.x;
      p.rotation.y += p.userData.rotationSpeed.y;
      p.rotation.z += p.userData.rotationSpeed.z;

      // Fade
      (p.material as THREE.MeshBasicMaterial).opacity = p.userData.life;

      // Scale down at end
      if (p.userData.life < 0.2) {
        p.scale.multiplyScalar(0.95);
      }
    }
  }
}

export default function Particles({
  count = 250,
  speedRef,
  ghostPosRef,
}: ParticlesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const systemRef = useRef<ParticleSystem | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (groupRef.current) {
      systemRef.current = new ParticleSystem(groupRef.current);
      systemRef.current.initPool(count);
    }
  }, [count]);

  useFrame(() => {
    if (!systemRef.current) return;

    systemRef.current.update();

    // Spawn logic
    if (reducedMotion) return; // No particles in reduced motion mode? Or minimal? Gist has check.

    // Gist: if createParticlesOnlyWhenMoving is true, check speed.
    // Let's spawn if speed > threshold OR random low chance
    const speed = speedRef.current;
    const shouldSpawn = speed > 0.05 || Math.random() < 0.05; // Base trickle

    if (shouldSpawn) {
      // Rate depends on speed
      const spawnCount = Math.floor(1 + speed * 2);
      for (let i = 0; i < spawnCount; i++) {
        if (ghostPosRef && ghostPosRef.current) {
          systemRef.current.spawn(ghostPosRef.current);
        }
      }
    }
  });

  return <group ref={groupRef} />;
}
