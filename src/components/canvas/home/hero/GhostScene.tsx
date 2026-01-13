'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { GHOST_CONFIG, FLUORESCENT_COLORS } from '@/config/ghostConfig';
import { ANALOG_DECAY_SHADER, ATMOSPHERE_SHADER } from './GhostShaders';
import { createGhostEyes, createFirefly } from './GhostHelpers';

// Post-processing imports
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// @ts-ignore
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
// @ts-ignore
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

export default function GhostScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const performanceConfig = usePerformanceAdaptive();

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // --- INITIAL CONFIGURATION ---
    const params = {
      ...GHOST_CONFIG,
      // Overrides based on performance
      particleCount: performanceConfig.particleCount * 5,
      particleCreationRate: performanceConfig.quality === 'low' ? 2 : 5,
    };

    const fluorescentColorsNum: Record<string, number> = Object.entries(
      FLUORESCENT_COLORS
    ).reduce(
      (acc, [name, hex]) => ({
        ...acc,
        [name]: parseInt(hex.replace('#', ''), 16),
      }),
      {}
    );

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
      premultipliedAlpha: false,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: false,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.setClearColor(0x000000, 0);

    Object.assign(renderer.domElement.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '0',
      pointerEvents: 'none',
      background: 'transparent',
    });

    mountElement.appendChild(renderer.domElement);

    // --- POST-PROCESSING ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3,
      1.25,
      0.0
    );
    composer.addPass(bloomPass);

    const analogDecayPass = new ShaderPass(ANALOG_DECAY_SHADER);
    analogDecayPass.uniforms.uResolution.value.set(
      window.innerWidth,
      window.innerHeight
    );
    composer.addPass(analogDecayPass);
    composer.addPass(new OutputPass());

    // --- OBJECTS ---
    // Atmosphere (Background reveal)
    const atmosphereGeometry = new THREE.PlaneGeometry(300, 300);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      ...ATMOSPHERE_SHADER,
      uniforms: {
        ...ATMOSPHERE_SHADER.uniforms,
        revealRadius: { value: params.revealRadius },
        fadeStrength: { value: params.fadeStrength },
        baseOpacity: { value: params.baseOpacity },
        revealOpacity: { value: params.revealOpacity },
      },
      transparent: true,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.position.z = -50;
    atmosphere.renderOrder = -100;
    scene.add(atmosphere);

    scene.add(new THREE.AmbientLight(0x0a0a2e, 0.08));

    // Ghost Body
    const ghostGroup = new THREE.Group();
    scene.add(ghostGroup);

    const ghostGeometry = new THREE.SphereGeometry(2, 40, 40);
    const positions = ghostGeometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.2) {
        const x = positions[i],
          z = positions[i + 2];
        positions[i + 1] =
          -2.0 +
          Math.sin(x * 5) * 0.35 +
          Math.cos(z * 4) * 0.25 +
          Math.sin((x + z) * 3) * 0.15;
      }
    }
    ghostGeometry.computeVertexNormals();

    const ghostMaterial = new THREE.MeshStandardMaterial({
      color: params.bodyColor === 'deepSpace' ? 0x0f2027 : 0x0f2027, // Fallback safe
      transparent: true,
      opacity: params.ghostOpacity,
      emissive: fluorescentColorsNum[params.glowColor] || 0x0080ff,
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02,
      metalness: 0.0,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
    });
    ghostGroup.add(new THREE.Mesh(ghostGeometry, ghostMaterial));

    // Lighting
    const rimLight1 = new THREE.DirectionalLight(
      0x4a90e2,
      params.rimLightIntensity
    );
    rimLight1.position.set(-8, 6, -4);
    scene.add(rimLight1);
    const rimLight2 = new THREE.DirectionalLight(
      0x50e3c2,
      params.rimLightIntensity * 0.7
    );
    rimLight2.position.set(8, -4, -6);
    scene.add(rimLight2);

    // Eyes, Fireflies, Particles
    const { eyeGroup, materials: eyes } = createGhostEyes(
      params,
      fluorescentColorsNum
    );
    ghostGroup.add(eyeGroup);

    const fireflies: THREE.Mesh[] = [];
    const fireflyGroup = new THREE.Group();
    scene.add(fireflyGroup);
    for (let i = 0; i < params.fireflyCount; i++) {
      const ff = createFirefly(params);
      ff.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      );
      fireflyGroup.add(ff);
      fireflies.push(ff);
    }

    const particles: THREE.Mesh[] = [];
    const particlePool: THREE.Mesh[] = [];
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);
    const particleGeoms = [
      new THREE.SphereGeometry(0.05, 6, 6),
      new THREE.TetrahedronGeometry(0.04, 0),
      new THREE.OctahedronGeometry(0.045, 0),
    ];
    const particleBaseMat = new THREE.MeshBasicMaterial({
      color: fluorescentColorsNum[params.particleColor],
      transparent: true,
      opacity: 0,
      alphaTest: 0.1,
    });

    const createParticle = () => {
      const p =
        particlePool.pop() ||
        new THREE.Mesh(
          particleGeoms[Math.floor(Math.random() * 3)],
          particleBaseMat.clone()
        );
      p.visible = true;
      if (!p.parent) particleGroup.add(p);
      const pColor = new THREE.Color(
        fluorescentColorsNum[params.particleColor]
      ).offsetHSL(Math.random() * 0.1 - 0.05, 0, 0);
      (p.material as THREE.MeshBasicMaterial).color = pColor;
      p.position
        .copy(ghostGroup.position)
        .add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 3.5,
            (Math.random() - 0.5) * 3.5 - 0.8,
            -0.8 - Math.random() * 0.6
          )
        );
      p.scale.setScalar(0.6 + Math.random() * 0.7);
      p.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
      p.userData = {
        life: 1,
        decay: Math.random() * 0.003 + params.particleDecayRate,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.012 - 0.002,
          (Math.random() - 0.5) * 0.012 - 0.006
        ),
      };
      particles.push(p);
    };

    // --- INTERACTION ---
    const mouse = new THREE.Vector2();
    let hasReceivedMouseInput = false,
      touchTimeout: NodeJS.Timeout,
      scrollY = 0;
    const updateMousePos = (x: number, y: number) => {
      hasReceivedMouseInput = true;
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = -(y / window.innerHeight) * 2 + 1;
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        hasReceivedMouseInput = false;
      }, 3000);
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onMouseMove = (e: MouseEvent) => updateMousePos(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) =>
      e.touches[0] &&
      updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.setSize(window.innerWidth, window.innerHeight);
      analogDecayPass.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', onResize);

    // --- ANIMATION LOOP ---
    let time = 0,
      lastFrameTime = 0,
      currentMovement = 0,
      animationId: number,
      lastParticleTime = 0;
    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);
      const deltaTime = Math.min(timestamp - lastFrameTime, 100);
      lastFrameTime = timestamp;
      time += (deltaTime / 16.67) * 0.01;

      atmosphereMaterial.uniforms.time.value = time;
      analogDecayPass.uniforms.uTime.value = time;
      analogDecayPass.uniforms.uLimboMode.value = params.limboMode ? 1.0 : 0.0;

      const autoX = Math.sin(time * 0.85) * 9 + Math.cos(time * 0.425) * 2;
      const autoY =
        Math.sin(time * 0.595 + Math.PI / 2) * 6 + Math.sin(time * 1.105) * 1.5;
      const targetX = hasReceivedMouseInput
        ? mouse.x * 12 + autoX * 0.1
        : autoX;
      const targetY =
        (hasReceivedMouseInput ? mouse.y * 8 + autoY * 0.1 : autoY) +
        (scrollY / window.innerHeight) * -15;

      const prevPos = ghostGroup.position.clone();
      ghostGroup.position.x +=
        (targetX - ghostGroup.position.x) * params.followSpeed;
      ghostGroup.position.y +=
        (targetY - ghostGroup.position.y) * params.followSpeed;
      ghostGroup.position.y += Math.sin(time * params.floatSpeed * 1.5) * 0.03;
      atmosphereMaterial.uniforms.ghostPosition.value.copy(ghostGroup.position);

      currentMovement =
        currentMovement * params.eyeGlowDecay +
        prevPos.distanceTo(ghostGroup.position) * (1 - params.eyeGlowDecay);
      ghostMaterial.emissiveIntensity =
        params.emissiveIntensity +
        Math.sin(time * params.pulseSpeed) * params.pulseIntensity;

      const isMoving = currentMovement > params.movementThreshold;
      const newOpacity =
        eyes.leftEyeMaterial.opacity +
        ((isMoving ? 1 : 0) - eyes.leftEyeMaterial.opacity) *
          (isMoving ? params.eyeGlowResponse * 2 : params.eyeGlowResponse);
      eyes.leftEyeMaterial.opacity = eyes.rightEyeMaterial.opacity = newOpacity;
      eyes.leftOuterGlowMaterial.opacity = eyes.rightOuterGlowMaterial.opacity =
        newOpacity * 0.3;

      if (currentMovement > 0.003 && timestamp - lastParticleTime > 100) {
        Array.from({ length: params.particleCreationRate }).forEach(
          createParticle
        );
        lastParticleTime = timestamp;
      }

      particles.forEach((p, i) => {
        p.userData.life -= p.userData.decay;
        (p.material as THREE.MeshBasicMaterial).opacity =
          p.userData.life * 0.85;
        p.position.add(p.userData.velocity).x +=
          Math.cos(time * 1.8 + p.position.y) * 0.0008;
        p.rotation.x += p.userData.rotationSpeed.x;
        p.rotation.y += p.userData.rotationSpeed.y;
        p.rotation.z += p.userData.rotationSpeed.z;
        if (p.userData.life <= 0) {
          p.visible = false;
          particlePool.push(p);
          particles.splice(i, 1);
        }
      });

      performanceConfig.enablePostProcessing
        ? composer.render()
        : renderer.render(scene, camera);
    };

    setTimeout(() => {
      for (let i = 0; i < 3; i++) composer.render();
      animate(0);
      renderer.domElement.classList.add('fade-in');
    }, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
      mountElement.removeChild(renderer.domElement);
      renderer.dispose();
      scene.clear();
    };
  }, [performanceConfig]);

  return <div ref={mountRef} className="w-full h-full absolute top-0 left-0" />;
}
