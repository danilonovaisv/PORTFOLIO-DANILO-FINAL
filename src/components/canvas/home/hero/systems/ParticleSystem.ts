/**
 * Particle System
 * Instanced mesh system for ghost trail particles
 */

import * as THREE from 'three';
import { MAX_PARTICLES, DEFAULT_GHOST_PARAMS } from '../utils/constants';

export interface ParticleData {
    velocity: THREE.Vector3;
    currentPos: THREE.Vector3;
    life: number;
    decay: number;
    rotationSpeed: { x: number; y: number; z: number };
}

export interface ParticleSystem {
    mesh: THREE.InstancedMesh;
    data: ParticleData[];
    lastSpawnTime: number;
}

/**
 * Creates the particle instanced mesh system
 */
export function createParticleSystem(scene: THREE.Scene): ParticleSystem {
    const particleGeometry = new THREE.SphereGeometry(0.05, 6, 6);
    const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
    });

    const particleMesh = new THREE.InstancedMesh(
        particleGeometry,
        particleMaterial,
        MAX_PARTICLES
    );
    particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(particleMesh);

    // Initialize particle pool
    const particleData: ParticleData[] = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < MAX_PARTICLES; i++) {
        dummy.position.set(0, -1000, 0);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        particleMesh.setMatrixAt(i, dummy.matrix);

        particleData[i] = {
            velocity: new THREE.Vector3(),
            currentPos: new THREE.Vector3(),
            life: 0,
            decay: 0,
            rotationSpeed: { x: 0, y: 0, z: 0 },
        };
    }

    return {
        mesh: particleMesh,
        data: particleData,
        lastSpawnTime: 0,
    };
}

/**
 * Spawns a new particle at the given index
 */
export function spawnParticle(
    system: ParticleSystem,
    index: number,
    ghostPosition: THREE.Vector3,
    params = DEFAULT_GHOST_PARAMS
): void {
    const data = system.data[index];
    data.life = 1.0;
    data.decay = Math.random() * 0.003 + params.particleDecayRate;

    // Position based on ghost
    const offset = new THREE.Vector3();
    offset.copy(ghostPosition);
    offset.z -= 0.8 + Math.random() * 0.6;
    offset.x += (Math.random() - 0.5) * 3.5;
    offset.y += (Math.random() - 0.5) * 3.5 - 0.8;

    data.currentPos.copy(offset);

    data.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015,
    };

    data.velocity.set(
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012 - 0.002,
        (Math.random() - 0.5) * 0.012 - 0.006
    );
}

/**
 * Updates all particles in the system
 */
export function updateParticles(
    system: ParticleSystem,
    ghostPosition: THREE.Vector3,
    currentMovement: number,
    timestamp: number,
    time: number,
    isMobile: boolean,
    hasReceivedInput: boolean,
    dummy: THREE.Object3D,
    params = DEFAULT_GHOST_PARAMS
): number {
    // Spawn new particles if moving
    const shouldCreate = isMobile
        ? currentMovement > 0.003
        : params.createParticlesOnlyWhenMoving
            ? currentMovement > 0.005 && hasReceivedInput
            : currentMovement > 0.005;

    if (shouldCreate && timestamp - system.lastSpawnTime > 100) {
        const count = Math.min(
            params.particleCreationRate || 5,
            Math.max(1, Math.floor(currentMovement * 100))
        );

        let spawned = 0;
        for (let i = 0; i < MAX_PARTICLES && spawned < count; i++) {
            if (system.data[i].life <= 0) {
                spawnParticle(system, i, ghostPosition, params);
                spawned++;
            }
        }
        system.lastSpawnTime = timestamp;
    }

    // Update existing particles
    let activeParticles = 0;
    for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = system.data[i];
        if (p.life > 0) {
            activeParticles++;
            p.life -= p.decay;

            const pos = p.currentPos;
            pos.add(p.velocity);
            pos.x += Math.cos(time * 1.8 + pos.y) * 0.0008;

            dummy.position.copy(pos);

            const s = (0.6 + Math.random() * 0.7) * (Math.max(0, p.life) * 0.85);
            dummy.scale.set(s, s, s);

            dummy.rotation.x += p.rotationSpeed.x;
            dummy.rotation.y += p.rotationSpeed.y;
            dummy.rotation.z += p.rotationSpeed.z;

            dummy.updateMatrix();
            system.mesh.setMatrixAt(i, dummy.matrix);
        } else {
            // Hide dead particles
            dummy.position.set(0, -9999, 0);
            dummy.scale.set(0, 0, 0);
            dummy.updateMatrix();
            system.mesh.setMatrixAt(i, dummy.matrix);
        }
    }

    if (activeParticles > 0 || shouldCreate) {
        system.mesh.instanceMatrix.needsUpdate = true;
    }

    return activeParticles;
}
