'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';

// Importações de pós-processamento via three-stdlib
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

// --- CONFIGURAÇÃO DE PARTICULAS ---
const MAX_PARTICLES = 500; // Limite máximo para InstancedMesh

export default function GhostScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const performanceConfig = usePerformanceAdaptive();

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // --- VARIÁVEIS DE CONTROLE (REFS PARA EVITAR ALOCAÇÕES) ---
    const _vector = new THREE.Vector3();
    const _dummy = new THREE.Object3D();

    // Arrays para gerenciar estado das partículas instanciadas
    interface ParticleData {
      velocity: THREE.Vector3;
      currentPos: THREE.Vector3;
      life: number;
      decay: number;
      rotationSpeed: { x: number; y: number; z: number };
      randomScale: number; // Pre-computed to avoid Math.random() in hot loop
    }
    const _particleData: ParticleData[] = [];

    // Gestão do Preloader (Adaptado para usar Refs)
    const preloaderManager = {
      isComplete: false,
      updateProgress: (step: number) => {
        const loadingSteps = Math.min(step, 5);
        const percentage = (loadingSteps / 5) * 100;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${percentage}%`;
        }
      },
      complete: (canvas: HTMLCanvasElement) => {
        if (preloaderManager.isComplete) return;
        preloaderManager.isComplete = true;
        preloaderManager.updateProgress(5);

        setTimeout(() => {
          if (preloaderRef.current)
            preloaderRef.current.classList.add('fade-out');

          canvas.classList.add('fade-in');

          setTimeout(() => {
            if (preloaderRef.current)
              preloaderRef.current.style.display = 'none';
          }, 1000);
        }, 1500);
      },
    };

    // --- THREE.JS SETUP ---

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    preloaderManager.updateProgress(1);

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

    // Estilos do Canvas
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.background = 'transparent';

    mountElement.appendChild(renderer.domElement);

    preloaderManager.updateProgress(2);

    // --- PÓS-PROCESSAMENTO ---

    const originalBloomSettings = {
      strength: 0.3,
      radius: 1.25,
      threshold: 0.0,
    };
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      originalBloomSettings.strength,
      originalBloomSettings.radius,
      originalBloomSettings.threshold
    );
    composer.addPass(bloomPass);

    preloaderManager.updateProgress(3);

    // Shader de Decaimento Analógico (Analog Decay)
    const analogDecayShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0.0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uAnalogGrain: { value: 0.4 },
        uAnalogBleeding: { value: 1.0 },
        uAnalogVSync: { value: 1.0 },
        uAnalogScanlines: { value: 1.0 },
        uAnalogVignette: { value: 1.0 },
        uAnalogJitter: { value: 0.4 },
        uAnalogIntensity: { value: 0.6 },
        uLimboMode: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uAnalogGrain;
        uniform float uAnalogBleeding;
        uniform float uAnalogVSync;
        uniform float uAnalogScanlines;
        uniform float uAnalogVignette;
        uniform float uAnalogJitter;
        uniform float uAnalogIntensity;
        uniform float uLimboMode;
        varying vec2 vUv;
        
        float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
        float random(float x) { return fract(sin(x) * 43758.5453123); }
        float gaussian(float z, float u, float o) { return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o)))); }
        
        vec3 grain(vec2 uv, float time, float intensity) {
          float seed = dot(uv, vec2(12.9898, 78.233));
          float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
          noise = gaussian(noise, 0.0, 0.5 * 0.5);
          return vec3(noise) * intensity;
        }
        
        void main() {
          vec2 uv = vUv;
          float time = uTime * 1.8;
          vec2 jitteredUV = uv;
          if (uAnalogJitter > 0.01) {
            float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
            jitteredUV.x += jitterAmount;
            jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
          }
          if (uAnalogVSync > 0.01) {
            float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
            float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
            jitteredUV.y += vsyncRoll * vsyncChance;
          }
          vec4 color = texture2D(tDiffuse, jitteredUV);
          if (uAnalogBleeding > 0.01) {
            float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
            float offsetPhase = time * 1.5 + uv.y * 20.0;
            vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
            vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
            float r = texture2D(tDiffuse, jitteredUV + redOffset).r;
            float g = texture2D(tDiffuse, jitteredUV).g;
            float b = texture2D(tDiffuse, jitteredUV + blueOffset).b;
            color = vec4(r, g, b, color.a);
          }
          if (uAnalogGrain > 0.01) {
            vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
            grainEffect *= (1.0 - color.rgb);
            color.rgb += grainEffect;
          }
          if (uAnalogScanlines > 0.01) {
            float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
            float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
            float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
            color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
            float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
            color.rgb *= (1.0 - horizontalLines);
          }
          if (uAnalogVignette > 0.01) {
            vec2 vignetteUV = (uv - 0.5) * 2.0;
            float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
            color.rgb *= vignette;
          }
          if (uLimboMode > 0.5) {
            float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            color.rgb = vec3(gray);
          }
          gl_FragColor = color;
        }
      `,
    };

    const analogDecayPass = new ShaderPass(analogDecayShader);
    composer.addPass(analogDecayPass);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // --- PARÂMETROS E OBJETOS ---

    const params = {
      bodyColor: 0x0f2027,
      glowColor: 'blue',
      eyeGlowColor: 'violet',
      ghostOpacity: 0.88,
      ghostScale: 2.4,
      emissiveIntensity: 5.8,
      pulseSpeed: 1.6,
      pulseIntensity: 0.6,
      eyeGlowIntensity: 4.5,
      eyeGlowDecay: 0.95,
      eyeGlowResponse: 0.31,
      rimLightIntensity: 1.8,
      followSpeed: 0.05,
      wobbleAmount: 0.35,
      floatSpeed: 1.6,
      movementThreshold: 0.07,
      particleCount: Math.min(
        performanceConfig.particleCount * 5,
        MAX_PARTICLES
      ),
      particleDecayRate: 0.005,
      particleColor: 'violet',
      createParticlesOnlyWhenMoving: true,
      particleCreationRate: performanceConfig.quality === 'low' ? 2 : 5,
      revealRadius: 37,
      fadeStrength: 1.7,
      baseOpacity: 0.9,
      revealOpacity: 0.05,
      fireflyGlowIntensity: 4.3,
      fireflySpeed: 0.09,
      analogIntensity: 0.9,
      analogGrain: 0.4,
      analogBleeding: 0.9,
      analogVSync: 1.7,
      analogScanlines: 1.0,
      analogVignette: 2.4,
      analogJitter: 0.5,
      limboMode: false,
    };

    const fluorescentColors: { [key: string]: number } = {
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

    // Atmosfera (Fundo)
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
    scene.add(atmosphere);

    const ambientLight = new THREE.AmbientLight(0x0a0a2e, 0.08);
    scene.add(ambientLight);

    // Grupo do Fantasma
    const ghostGroup = new THREE.Group();
    scene.add(ghostGroup);

    const ghostGeometry = new THREE.SphereGeometry(2, 40, 40);
    const positionAttribute = ghostGeometry.getAttribute('position');
    const positions = positionAttribute.array as Float32Array;
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
      emissive: fluorescentColors[params.glowColor],
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02,
      metalness: 0.0,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
    });
    const ghostBody = new THREE.Mesh(ghostGeometry, ghostMaterial);
    ghostGroup.add(ghostBody);

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

    preloaderManager.updateProgress(4);

    // Olhos
    function createEyes() {
      const eyeGroup = new THREE.Group();
      ghostGroup.add(eyeGroup);
      const socketGeometry = new THREE.SphereGeometry(0.45, 16, 16);
      const socketMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

      const leftSocket = new THREE.Mesh(socketGeometry, socketMaterial);
      leftSocket.position.set(-0.7, 0.6, 1.9);
      leftSocket.scale.set(1.1, 1.0, 0.6);
      eyeGroup.add(leftSocket);

      const rightSocket = new THREE.Mesh(socketGeometry, socketMaterial);
      rightSocket.position.set(0.7, 0.6, 1.9);
      rightSocket.scale.set(1.1, 1.0, 0.6);
      eyeGroup.add(rightSocket);

      const eyeGeometry = new THREE.SphereGeometry(0.3, 12, 12);
      const leftEyeMaterial = new THREE.MeshBasicMaterial({
        color: fluorescentColors[params.eyeGlowColor],
        transparent: true,
        opacity: 0,
      });
      const leftEye = new THREE.Mesh(eyeGeometry, leftEyeMaterial);
      leftEye.position.set(-0.7, 0.6, 2.0);
      eyeGroup.add(leftEye);

      const rightEyeMaterial = new THREE.MeshBasicMaterial({
        color: fluorescentColors[params.eyeGlowColor],
        transparent: true,
        opacity: 0,
      });
      const rightEye = new THREE.Mesh(eyeGeometry, rightEyeMaterial);
      rightEye.position.set(0.7, 0.6, 2.0);
      eyeGroup.add(rightEye);

      const outerGlowGeometry = new THREE.SphereGeometry(0.525, 12, 12);
      const leftOuterGlowMaterial = new THREE.MeshBasicMaterial({
        color: fluorescentColors[params.eyeGlowColor],
        transparent: true,
        opacity: 0,
        side: THREE.BackSide,
      });
      const leftOuterGlow = new THREE.Mesh(
        outerGlowGeometry,
        leftOuterGlowMaterial
      );
      leftOuterGlow.position.set(-0.7, 0.6, 1.95);
      eyeGroup.add(leftOuterGlow);

      const rightOuterGlowMaterial = new THREE.MeshBasicMaterial({
        color: fluorescentColors[params.eyeGlowColor],
        transparent: true,
        opacity: 0,
        side: THREE.BackSide,
      });
      const rightOuterGlow = new THREE.Mesh(
        outerGlowGeometry,
        rightOuterGlowMaterial
      );
      rightOuterGlow.position.set(0.7, 0.6, 1.95);
      eyeGroup.add(rightOuterGlow);

      return {
        leftEyeMaterial,
        rightEyeMaterial,
        leftOuterGlowMaterial,
        rightOuterGlowMaterial,
      };
    }
    const eyes = createEyes();

    // --- PIRILAMPOS (FIREFLIES) OTIMIZADOS ---
    // Substituindo 40 PointLights/Meshes por 1 InstancedMesh e simulando brilho via Shader ou Glow compartilhado
    // Para manter a performance alta, removemos PointLights individuais.
    // O brilho será visual, via material emissivo e Post-Processing (Bloom).

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

    // Dados dos pirilampos (reutilizando estrutura _particleData ou criando nova se precisar lógica diferente)
    interface FireflyData {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      phase: number;
      speed: number;
    }
    const _fireflyData: FireflyData[] = [];

    const fireflyCount = Math.min(params.particleCount, 60); // Limite razoável para visual

    for (let i = 0; i < fireflyCount; i++) {
      _fireflyData.push({
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

    // Adiciona UMA luz móvel suave para simular o grupo (opcional, ou remove totalmente para performance máxima)
    const sharedFireflyLight = new THREE.PointLight(0xffff44, 1.5, 15, 2);
    scene.add(sharedFireflyLight);

    // --- INSTANCED PARTICLE SYSTEM ---
    const particleGeometry = new THREE.SphereGeometry(0.05, 6, 6);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1, // Controlado via scale no loop
    });

    const particleMesh = new THREE.InstancedMesh(
      particleGeometry,
      particleMaterial,
      MAX_PARTICLES
    );
    particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(particleMesh);

    // Inicializar pool de partículas
    for (let i = 0; i < MAX_PARTICLES; i++) {
      _dummy.position.set(0, -1000, 0);
      _dummy.scale.set(0, 0, 0);
      _dummy.updateMatrix();
      particleMesh.setMatrixAt(i, _dummy.matrix);
      // Inicializar estado data
      _particleData[i] = {
        velocity: new THREE.Vector3(),
        currentPos: new THREE.Vector3(),
        life: 0,
        decay: 0,
        rotationSpeed: { x: 0, y: 0, z: 0 },
        randomScale: 0,
      };
    }

    function spawnInstancedParticle(index: number) {
      const data = _particleData[index];
      data.life = 1.0;
      data.decay = Math.random() * 0.003 + params.particleDecayRate;
      data.randomScale = 0.6 + Math.random() * 0.7; // Pre-compute scale (was in hot loop)

      // Posição Inicial baseada no Ghost
      _vector.copy(ghostGroup.position);
      _vector.z -= 0.8 + Math.random() * 0.6;
      _vector.x += (Math.random() - 0.5) * 3.5;
      _vector.y += (Math.random() - 0.5) * 3.5 - 0.8;

      data.currentPos.copy(_vector);

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

    // --- DETECÇÃO DE DISPOSITIVO TOUCH/MOBILE ---
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileWidth = window.innerWidth <= 768;
    const isMobile = isTouchDevice || isMobileWidth;

    // Event Listeners
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const mouse = new THREE.Vector2();
    let hasReceivedMouseInput = false;
    let touchTimeout: NodeJS.Timeout;

    const updateMousePos = (x: number, y: number) => {
      hasReceivedMouseInput = true;
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = -(y / window.innerHeight) * 2 + 1;

      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        hasReceivedMouseInput = false;
      }, 3000);
    };

    const onMouseMove = (e: MouseEvent) => {
      updateMousePos(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

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
    window.addEventListener('resize', onResize);

    // Loop de Animação
    let time = 0;
    let lastFrameTime = 0;
    let currentMovement = 0;
    let isInitialized = false;
    let animationId: number;
    let lastParticleTime = 0;

    // Ref para posição anterior pra calcular delta sem alocar
    const _prevGhostPos = new THREE.Vector3();

    const forceInitialRender = () => {
      // Pré-render para compilar shaders
      for (let i = 0; i < 3; i++) composer.render();
      isInitialized = true;
      preloaderManager.complete(renderer.domElement);
    };

    preloaderManager.updateProgress(5);
    setTimeout(forceInitialRender, 100);

    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);
      if (!isInitialized) return;

      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      if (deltaTime > 100) return;

      const timeIncrement = (deltaTime / 16.67) * 0.01;
      time += timeIncrement;

      // Atualizações de Uniforms
      atmosphereMaterial.uniforms.time.value = time;
      analogDecayPass.uniforms.uTime.value = time;
      analogDecayPass.uniforms.uLimboMode.value = params.limboMode ? 1.0 : 0.0;

      // Movimento do Fantasma
      let targetX: number;
      let targetY: number;

      const autoSpeed = 0.85;
      const amplitudeX = 9;
      const amplitudeY = 6;

      const autoX =
        Math.sin(time * autoSpeed) * amplitudeX +
        Math.cos(time * autoSpeed * 0.5) * 2;
      const autoY =
        Math.sin(time * autoSpeed * 0.7 + Math.PI / 2) * amplitudeY +
        Math.sin(time * autoSpeed * 1.3) * 1.5;

      if (!hasReceivedMouseInput) {
        targetX = autoX;
        const scrollOffset = (scrollY / window.innerHeight) * -15;
        targetY = autoY + scrollOffset;
      } else {
        targetX = mouse.x * 12 + autoX * 0.1;
        targetY =
          mouse.y * 8 + autoY * 0.1 + (scrollY / window.innerHeight) * -15;
      }

      // Copiar posição atual antes de mover
      _prevGhostPos.copy(ghostGroup.position);

      ghostGroup.position.x +=
        (targetX - ghostGroup.position.x) * params.followSpeed;
      ghostGroup.position.y +=
        (targetY - ghostGroup.position.y) * params.followSpeed;
      atmosphereMaterial.uniforms.ghostPosition.value.copy(ghostGroup.position);

      const moveAmt = _prevGhostPos.distanceTo(ghostGroup.position);
      currentMovement =
        currentMovement * params.eyeGlowDecay +
        moveAmt * (1 - params.eyeGlowDecay);

      // Flutuação
      ghostGroup.position.y += Math.sin(time * params.floatSpeed * 1.5) * 0.03;

      // Pulso
      const pulse1 = Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
      ghostMaterial.emissiveIntensity = params.emissiveIntensity + pulse1;

      // Atualizar Olhos
      const isMoving = currentMovement > params.movementThreshold;
      const targetGlow = isMoving ? 1.0 : 0.0;
      const glowChangeSpeed = isMoving
        ? params.eyeGlowResponse * 2
        : params.eyeGlowResponse;
      const newOpacity =
        eyes.leftEyeMaterial.opacity +
        (targetGlow - eyes.leftEyeMaterial.opacity) * glowChangeSpeed;

      eyes.leftEyeMaterial.opacity = newOpacity;
      eyes.rightEyeMaterial.opacity = newOpacity;
      eyes.leftOuterGlowMaterial.opacity = newOpacity * 0.3;
      eyes.rightOuterGlowMaterial.opacity = newOpacity * 0.3;

      // --- LOGICA DE PARTICULAS (Instanced) ---

      // Criar novas
      const shouldCreate = isMobile
        ? currentMovement > 0.003
        : params.createParticlesOnlyWhenMoving
          ? currentMovement > 0.005 && hasReceivedMouseInput
          : currentMovement > 0.005;

      if (shouldCreate && timestamp - lastParticleTime > 100) {
        const count = Math.min(
          params.particleCreationRate,
          Math.max(1, Math.floor(moveAmt * 100))
        );

        let spawned = 0;
        // Encontrar slots vazios
        for (let i = 0; i < MAX_PARTICLES && spawned < count; i++) {
          if (_particleData[i].life <= 0) {
            spawnInstancedParticle(i);
            spawned++;
          }
        }
        lastParticleTime = timestamp;
      }

      // Atualizar Partículas de Rastro (Dust)
      let activeParticles = 0;
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = _particleData[i];
        if (p.life > 0) {
          activeParticles++;
          p.life -= p.decay;

          const pos = p.currentPos;
          pos.add(p.velocity);
          pos.x += Math.cos(time * 1.8 + pos.y) * 0.0008;

          _dummy.position.copy(pos);

          const s = p.randomScale * (Math.max(0, p.life) * 0.85);
          _dummy.scale.set(s, s, s);

          _dummy.rotation.x += p.rotationSpeed.x;
          _dummy.rotation.y += p.rotationSpeed.y;
          _dummy.rotation.z += p.rotationSpeed.z;

          _dummy.updateMatrix();
          particleMesh.setMatrixAt(i, _dummy.matrix);
        } else {
          // Hide
          _dummy.position.set(0, -9999, 0);
          _dummy.scale.set(0, 0, 0);
          _dummy.updateMatrix();
          particleMesh.setMatrixAt(i, _dummy.matrix);
        }
      }

      if (activeParticles > 0 || shouldCreate) {
        particleMesh.instanceMatrix.needsUpdate = true;
      }

      // --- ATUALIZAR PIRILAMPOS (Instanced) ---
      // Movimento suave baseado em noise/sin
      for (let i = 0; i < fireflyCount; i++) {
        const f = _fireflyData[i];
        f.position.add(f.velocity);

        // Boundaries check (simples bounce ou wrap)
        if (Math.abs(f.position.x) > 25) f.velocity.x *= -1;
        if (Math.abs(f.position.y) > 20) f.velocity.y *= -1;
        if (Math.abs(f.position.z) > 15) f.velocity.z *= -1;

        _dummy.position.copy(f.position);

        // Pulsação de tamanho
        const pulsate = 1.0 + Math.sin(time * f.speed + f.phase) * 0.3;
        _dummy.scale.set(pulsate, pulsate, pulsate);

        _dummy.updateMatrix();
        fireflyMesh.setMatrixAt(i, _dummy.matrix);
      }
      fireflyMesh.instanceMatrix.needsUpdate = true;

      // Animar Luz Compartilhada dos Pirilampos
      sharedFireflyLight.position.x = Math.sin(time * 0.5) * 10;
      sharedFireflyLight.position.y = Math.cos(time * 0.3) * 5;

      // --- RENDER ---
      if (performanceConfig.enablePostProcessing) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate(0);

    // --- FUNÇÃO DE LIMPEZA (MEMORY LEAK FIX) ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);

      if (mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement);
      }

      // Descartar Geometrias e Materiais
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          }
        }
      });

      // Descartar recursos específicos
      renderer.dispose();
      composer.dispose();
    };
  }, []); // Fim do useEffect

  return (
    <>
      <div
        ref={preloaderRef}
        className="preloader-overlay absolute inset-0 z-50 flex items-center justify-center bg-[#070b15] transition-opacity duration-1000"
      >
        <div className="w-64">
          <div className="h-0.5 w-full overflow-hidden bg-white/10">
            <div
              ref={progressBarRef}
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
      <div ref={mountRef} className="absolute inset-0 z-0 h-full w-full" />
    </>
  );
}
