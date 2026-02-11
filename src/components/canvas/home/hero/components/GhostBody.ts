/**
 * Ghost Body Component
 * Creates the ghost body mesh and atmosphere background
 */

import * as THREE from 'three';
import { DEFAULT_GHOST_PARAMS, FLUORESCENT_COLORS } from '../utils/constants';

/**
 * Creates the atmospheric background with reveal shader
 */
export function createAtmosphere(params = DEFAULT_GHOST_PARAMS): THREE.Mesh {
  const atmosphereGeometry = new THREE.PlaneGeometry(300, 300);
  const atmosphereMaterial = new THREE.ShaderMaterial({
    uniforms: {
      ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
      revealRadius: { value: params.revealRadius },
      fadeStrength: { value: params.fadeStrength },
      baseOpacity: { value: params.baseOpacity },
      revealOpacity: { value: params.revealOpacity },
      time: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 ghostPosition;
      uniform float revealRadius;
      uniform float fadeStrength;
      uniform float baseOpacity;
      uniform float revealOpacity;
      uniform float time;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        float dist = distance(vWorldPosition.xy, ghostPosition.xy);
        float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
        float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
        reveal = pow(reveal, fadeStrength);
        float opacity = mix(revealOpacity, baseOpacity, reveal);
        gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
      }
    `,
    transparent: true,
    depthWrite: false,
  });

  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  atmosphere.position.z = -50;
  atmosphere.renderOrder = -100;

  return atmosphere;
}

/**
 * Creates the ghost body mesh with custom geometry
 */
export function createGhostBody(params = DEFAULT_GHOST_PARAMS): THREE.Mesh {
  const ghostGeometry = new THREE.SphereGeometry(2, 40, 40);
  const positionAttribute = ghostGeometry.getAttribute('position');
  const positions = positionAttribute.array as Float32Array;

  // Deform bottom vertices to create ghost shape
  for (let i = 0; i < positions.length; i += 3) {
    if (positions[i + 1] < -0.2) {
      const x = positions[i];
      const z = positions[i + 2];
      const noise1 = Math.sin(x * 5) * 0.35;
      const noise2 = Math.cos(z * 4) * 0.25;
      const noise3 = Math.sin((x + z) * 3) * 0.15;
      positions[i + 1] = -2.0 + noise1 + noise2 + noise3;
    }
  }
  ghostGeometry.computeVertexNormals();

  const ghostMaterial = new THREE.MeshStandardMaterial({
    color: params.bodyColor,
    transparent: true,
    opacity: params.ghostOpacity,
    emissive: FLUORESCENT_COLORS[params.glowColor],
    emissiveIntensity: params.emissiveIntensity,
    roughness: 0.02,
    metalness: 0.0,
    side: THREE.DoubleSide,
    alphaTest: 0.1,
  });

  return new THREE.Mesh(ghostGeometry, ghostMaterial);
}

/**
 * Updates ghost body animation (pulse effect)
 */
export function updateGhostBody(
  ghostMesh: THREE.Mesh,
  time: number,
  params = DEFAULT_GHOST_PARAMS
): void {
  const material = ghostMesh.material as THREE.MeshStandardMaterial;
  const pulse = Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
  material.emissiveIntensity = params.emissiveIntensity + pulse;
}

/**
 * Updates atmosphere shader uniforms
 */
export function updateAtmosphere(
  atmosphere: THREE.Mesh,
  ghostPosition: THREE.Vector3,
  time: number
): void {
  const material = atmosphere.material as THREE.ShaderMaterial;
  material.uniforms.ghostPosition.value.copy(ghostPosition);
  material.uniforms.time.value = time;
}
