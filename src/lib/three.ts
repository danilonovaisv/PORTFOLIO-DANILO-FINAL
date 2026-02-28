import * as THREE from 'three';

// Configurações padrão para o Three.js
export const setupThreeEnvironment = (root: THREE.Object3D) => {
  if ((root as THREE.Scene).isScene) {
    const scene = root as THREE.Scene;
    scene.background = null;
    scene.fog = null;
  }

  // Configuração de iluminação suave
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  root.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  root.add(directionalLight);

  return {
    ambientLight,
    directionalLight,
  };
};

// Animação do Ghost
export const animateGhost = (
  model: THREE.Object3D,
  progress: number,
  isMobile: boolean
) => {
  // Movimento suave de flutuação
  const floatAmount = 0.05 * Math.sin(progress * Math.PI * 2);
  model.position.y = floatAmount;

  // Movimento lateral leve
  const swayAmount = 0.03 * Math.sin(progress * Math.PI * 3);
  model.position.x = isMobile ? 0 : swayAmount;

  // Rotação sutil
  model.rotation.y = 0.05 * Math.sin(progress * Math.PI);
};
