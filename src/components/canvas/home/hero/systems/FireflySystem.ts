/**
 * Firefly System
 * Instanced mesh system for animated fireflies
 */

import * as THREE from 'three';
import { DEFAULT_GHOST_PARAMS } from '../utils/constants';

export interface FireflyData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  phase: number;
  speed: number;
}

export interface FireflySystem {
  mesh: THREE.InstancedMesh;
  data: FireflyData[];
  light: THREE.PointLight;
  count: number;
}

/**
 * Creates the firefly instanced mesh system
 */
export function createFireflySystem(
  scene: THREE.Scene,
  particleCount: number,
  params = DEFAULT_GHOST_PARAMS
): FireflySystem {
  const fireflyGeometry = new THREE.SphereGeometry(0.035, 4, 4);
  const fireflyMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff88,
    transparent: true,
    opacity: 0.8,
  });

  const fireflyCount = Math.min(particleCount, 60);
  const fireflyMesh = new THREE.InstancedMesh(
    fireflyGeometry,
    fireflyMaterial,
    fireflyCount
  );
  fireflyMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(fireflyMesh);

  // Initialize firefly data
  const fireflyData: FireflyData[] = [];
  for (let i = 0; i < fireflyCount; i++) {
    fireflyData.push({
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

  // Shared light for firefly group
  const sharedFireflyLight = new THREE.PointLight(0xffff44, 1.5, 15, 2);
  scene.add(sharedFireflyLight);

  return {
    mesh: fireflyMesh,
    data: fireflyData,
    light: sharedFireflyLight,
    count: fireflyCount,
  };
}

/**
 * Updates firefly positions and animations
 */
export function updateFireflies(
  system: FireflySystem,
  time: number,
  dummy: THREE.Object3D
): void {
  for (let i = 0; i < system.count; i++) {
    const f = system.data[i];
    f.position.add(f.velocity);

    // Boundary check (bounce)
    if (Math.abs(f.position.x) > 25) f.velocity.x *= -1;
    if (Math.abs(f.position.y) > 20) f.velocity.y *= -1;
    if (Math.abs(f.position.z) > 15) f.velocity.z *= -1;

    dummy.position.copy(f.position);

    // Pulsating scale
    const pulsate = 1.0 + Math.sin(time * f.speed + f.phase) * 0.3;
    dummy.scale.set(pulsate, pulsate, pulsate);

    dummy.updateMatrix();
    system.mesh.setMatrixAt(i, dummy.matrix);
  }
  system.mesh.instanceMatrix.needsUpdate = true;

  // Animate shared light
  system.light.position.x = Math.sin(time * 0.5) * 10;
  system.light.position.y = Math.cos(time * 0.3) * 5;
}
