import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { ParticleData, FireflyData, GhostSceneParams } from '../types';

export function useParticleSystem(params: GhostSceneParams) {
  const particleMeshRef = useRef<THREE.InstancedMesh>(null);
  const fireflyMeshRef = useRef<THREE.InstancedMesh>(null);
  const particleDataRef = useRef<ParticleData[]>([]);
  const fireflyDataRef = useRef<FireflyData[]>([]);
  const dummyRef = useRef(new THREE.Object3D());
  const vectorRef = useRef(new THREE.Vector3());

  const init = useCallback(
    (scene: THREE.Scene) => {
      // Fireflies
      const fireflyGeometry = new THREE.SphereGeometry(0.035, 4, 4);
      const fireflyMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff88,
        transparent: true,
        opacity: 0.8,
      });
      const fireflyMesh = new THREE.InstancedMesh(
        fireflyGeometry,
        fireflyMaterial,
        params.particleCount
      );
      fireflyMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(fireflyMesh);
      (fireflyMeshRef as any).current = fireflyMesh;

      fireflyDataRef.current = [];
      const fireflyCount = Math.min(params.particleCount, 40);
      for (let i = 0; i < fireflyCount; i++) {
        fireflyDataRef.current.push({
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 45,
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 25
          ),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * params.fireflySpeed * 0.8,
            (Math.random() - 0.5) * params.fireflySpeed * 0.8,
            (Math.random() - 0.5) * params.fireflySpeed * 0.8
          ),
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.5,
        });
      }

      // Dust Particles
      const particleGeometry = new THREE.SphereGeometry(0.05, 6, 6);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
      });
      const particleMesh = new THREE.InstancedMesh(
        particleGeometry,
        particleMaterial,
        params.particleCount
      );
      particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      scene.add(particleMesh);
      (particleMeshRef as any).current = particleMesh;

      particleDataRef.current = [];
      for (let i = 0; i < params.particleCount; i++) {
        dummyRef.current.position.set(0, -1000, 0);
        dummyRef.current.scale.set(0, 0, 0);
        dummyRef.current.updateMatrix();
        particleMesh.setMatrixAt(i, dummyRef.current.matrix);
        particleDataRef.current[i] = {
          velocity: new THREE.Vector3(),
          currentPos: new THREE.Vector3(),
          life: 0,
          decay: 0,
          rotationSpeed: { x: 0, y: 0, z: 0 },
          randomScale: 0,
        };
      }
    },
    [params.particleCount, params.fireflySpeed]
  );

  const spawnParticle = useCallback(
    (ghostPos: THREE.Vector3) => {
      let spawned = 0;
      const count = params.particleCreationRate;

      for (let i = 0; i < params.particleCount && spawned < count; i++) {
        const data = particleDataRef.current[i];
        if (!data || data.life <= 0) {
          const pData = data || {
            velocity: new THREE.Vector3(),
            currentPos: new THREE.Vector3(),
            life: 0,
            decay: 0,
            rotationSpeed: { x: 0, y: 0, z: 0 },
            randomScale: 0,
          };

          pData.life = 1.0;
          pData.decay = Math.random() * 0.003 + params.particleDecayRate;
          pData.randomScale = 0.6 + Math.random() * 0.7;

          vectorRef.current.copy(ghostPos);
          vectorRef.current.z -= 0.8 + Math.random() * 0.6;
          vectorRef.current.x += (Math.random() - 0.5) * 3.5;
          vectorRef.current.y += (Math.random() - 0.5) * 3.5 - 0.8;

          pData.currentPos.copy(vectorRef.current);
          pData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.015,
            y: (Math.random() - 0.5) * 0.015,
            z: (Math.random() - 0.5) * 0.015,
          };
          pData.velocity.set(
            (Math.random() - 0.5) * 0.012,
            (Math.random() - 0.5) * 0.012 - 0.002,
            (Math.random() - 0.5) * 0.012 - 0.006
          );

          particleDataRef.current[i] = pData;
          spawned++;
        }
      }
    },
    [
      params.particleCount,
      params.particleCreationRate,
      params.particleDecayRate,
    ]
  );

  const update = useCallback(
    (time: number, deltaTime: number) => {
      if (!particleMeshRef.current || !fireflyMeshRef.current) return;

      // Update Dust
      for (let i = 0; i < params.particleCount; i++) {
        const p = particleDataRef.current[i];
        if (p && p.life > 0) {
          p.life -= p.decay;
          p.currentPos.add(p.velocity);
          p.currentPos.x += Math.cos(time * 1.8 + p.currentPos.y) * 0.0008;

          dummyRef.current.position.copy(p.currentPos);
          const s = p.randomScale * (Math.max(0, p.life) * 0.85);
          dummyRef.current.scale.set(s, s, s);
          dummyRef.current.rotation.x += p.rotationSpeed.x;
          dummyRef.current.rotation.y += p.rotationSpeed.y;
          dummyRef.current.rotation.z += p.rotationSpeed.z;
          dummyRef.current.updateMatrix();
          particleMeshRef.current.setMatrixAt(i, dummyRef.current.matrix);
        } else {
          dummyRef.current.position.set(0, -9999, 0);
          dummyRef.current.scale.set(0, 0, 0);
          dummyRef.current.updateMatrix();
          particleMeshRef.current.setMatrixAt(i, dummyRef.current.matrix);
        }
      }
      particleMeshRef.current.instanceMatrix.needsUpdate = true;

      // Update Fireflies
      const fireflyCount = fireflyDataRef.current.length;
      for (let i = 0; i < fireflyCount; i++) {
        const f = fireflyDataRef.current[i];
        f.position.add(f.velocity);

        // Floating motion
        f.position.x += Math.sin(time * f.speed + f.phase) * 0.02;
        f.position.y += Math.cos(time * f.speed * 0.8 + f.phase) * 0.02;

        // Boundaries
        if (Math.abs(f.position.x) > 30) f.velocity.x *= -1;
        if (Math.abs(f.position.y) > 25) f.velocity.y *= -1;
        if (Math.abs(f.position.z) > 20) f.velocity.z *= -1;

        dummyRef.current.position.copy(f.position);
        const s = 1.0 + Math.sin(time * 2.0 + f.phase) * 0.3;
        dummyRef.current.scale.set(s, s, s);
        dummyRef.current.updateMatrix();
        fireflyMeshRef.current.setMatrixAt(i, dummyRef.current.matrix);
      }
      fireflyMeshRef.current.instanceMatrix.needsUpdate = true;
    },
    [params.particleCount]
  );

  return { init, update, spawnParticle, particleMeshRef, fireflyMeshRef };
}
