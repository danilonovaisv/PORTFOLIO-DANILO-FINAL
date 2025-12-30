// src/components/home/SpectralGhost.tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

interface SpectralGhostProps {
  onLoaded?: () => void;
}

const SpectralGhost: React.FC<SpectralGhostProps> = ({ onLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parâmetros de configuração (copiados da referência)
  const params = {
    // Ghost appearance
    bodyColor: 0x0f2027,
    glowColor: 'blue',
    eyeGlowColor: 'violet',
    ghostOpacity: 0.88,
    ghostScale: 2.4,
    // Glow effects
    emissiveIntensity: 5.8,
    pulseSpeed: 1.6,
    pulseIntensity: 0.6,
    // Eyes
    eyeGlowIntensity: 4.5,
    eyeGlowDecay: 0.95,
    eyeGlowResponse: 0.31,
    // Enhanced lighting
    rimLightIntensity: 1.8,
    // Behavior
    followSpeed: 0.05,
    wobbleAmount: 0.35,
    floatSpeed: 1.6,
    movementThreshold: 0.07,
    // Particles
    particleCount: 250,
    particleDecayRate: 0.005,
    particleColor: 'violet',
    createParticlesOnlyWhenMoving: true,
    particleCreationRate: 5,
    // Background reveal
    revealRadius: 30,
    fadeStrength: 1.5,
    baseOpacity: 0.8,
    revealOpacity: 0.2,
    // Fireflies
    fireflyCount: 50,
    fireflySpeed: 0.09,
    // Analog Decay settings
    analogIntensity: 0.9,
    analogGrain: 0.4,
    analogBleeding: 0.9,
    analogVSync: 1.7,
    analogScanlines: 1.0,
    analogVignette: 2.4,
    analogJitter: 0.5,
    limboMode: false,
  };

  // Paleta de cores fluorescentes
  const fluorescentColors = {
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
  } as const; // Adicionando 'as const' para inferir melhor os tipos

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Forçar aceleração por GPU
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    document.body.style.perspective = '1000px';

    // Criar cena
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    // Renderer com transparência
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Compositor de efeitos
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Passo de Bloom
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);

    // Shader para efeitos analógicos (VHS, Scanlines, etc.)
    const analogDecayShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uAnalogGrain: { value: params.analogGrain },
        uAnalogBleeding: { value: params.analogBleeding },
        uAnalogVSync: { value: params.analogVSync },
        uAnalogScanlines: { value: params.analogScanlines },
        uAnalogVignette: { value: params.analogVignette },
        uAnalogJitter: { value: params.analogJitter },
        uAnalogIntensity: { value: params.analogIntensity },
        uLimboMode: { value: params.limboMode ? 1.0 : 0.0 },
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

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        float random(float x) {
          return fract(sin(x) * 43758.5453123);
        }

        // Função de grão gaussiano
        float gaussian(float z, float u, float o) {
          return exp(-0.5 * pow((z - u) / o, 2)) / (o * sqrt(2.0 * 3.14159));
        }

        // Função de grão procedural
        vec3 grain(vec2 uv, float time, float intensity) {
          float noise = random(uv + time * 0.01) * 0.5 + random(uv.yx + time * 0.02) * 0.5;
          noise = mix(noise, random(uv * 100.0 + time), 0.5);
          return vec3(noise) * intensity;
        }

        void main() {
          vec2 uv = vUv;
          vec2 jitteredUV = uv;

          // Efeito de jitter
          if (uAnalogJitter > 0.01) {
            jitteredUV.x += (random(vec2(floor(time * 30.0))) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
            jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
          }

          // Rolagem VHS
          if (uAnalogVSync > 0.01) {
            float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
            float vsyncChance = step(0.95, random(vec2(floor(time * 4.0)));
            jitteredUV.y += vsyncRoll * vsyncChance;
          }

          vec4 color = texture2D(tDiffuse, jitteredUV);

          // Separação de canais (bleeding)
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

          // Grão
          if (uAnalogGrain > 0.01) {
            vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
            grainEffect *= (1.0 - color.rgb);
            color.rgb += grainEffect;
          }

          // Scanlines
          if (uAnalogScanlines > 0.01) {
            float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
            float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
            float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
            color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
            float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
            color.rgb *= (1.0 - horizontalLines);
          }

          // Vignetting
          if (uAnalogVignette > 0.01) {
            vec2 vignetteUV = (uv - 0.5) * 2.0;
            float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
            color.rgb *= vignette;
          }

          // Modo Limbo (Preto e Branco)
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

    // Grupo principal do fantasma
    const ghostGroup = new THREE.Group();
    scene.add(ghostGroup);

    // Geometria do corpo do fantasma
    const ghostGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const ghostMaterial = new THREE.MeshStandardMaterial({
      color: params.bodyColor,
      opacity: params.ghostOpacity,
      emissive:
        fluorescentColors[params.glowColor as keyof typeof fluorescentColors] ||
        0x000000, // Correção aqui
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02,
      metalness: 0.0,
      side: THREE.DoubleSide,
      alphaTest: 0.1,
    });

    const ghostBody = new THREE.Mesh(ghostGeometry, ghostMaterial);
    ghostGroup.add(ghostBody);

    // Olhos do fantasma
    function createEyes() {
      const eyeGroup = new THREE.Group();
      ghostGroup.add(eyeGroup);

      // Soquetes dos olhos (mais profundos)
      const socketGeometry = new THREE.SphereGeometry(0.45, 16, 16);
      const socketMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: false,
      });

      // Olho esquerdo
      const leftSocket = new THREE.Mesh(socketGeometry, socketMaterial);
      leftSocket.position.set(-0.7, 0.6, 1.9);
      leftSocket.scale.set(1.1, 1.0, 0.6);
      eyeGroup.add(leftSocket);

      // Olho direito
      const rightSocket = new THREE.Mesh(socketGeometry, socketMaterial);
      rightSocket.position.set(0.7, 0.6, 1.9);
      rightSocket.scale.set(1.1, 1.0, 0.6);
      eyeGroup.add(rightSocket);

      // Glowing eyes
      const eyeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const eyeMaterial = new THREE.MeshStandardMaterial({
        color:
          fluorescentColors[
            params.eyeGlowColor as keyof typeof fluorescentColors
          ] || 0x000000,
        emissive:
          fluorescentColors[
            params.eyeGlowColor as keyof typeof fluorescentColors
          ] || 0x000000,
        emissiveIntensity: params.eyeGlowIntensity,
        transparent: true,
        opacity: 0.8,
      });

      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.7, 0.6, 2.0);
      eyeGroup.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.7, 0.6, 2.0);
      eyeGroup.add(rightEye);

      return { leftEye, rightEye };
    }

    createEyes();

    // Luzes de contorno
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

    // Partículas
    const particles: THREE.Mesh<
      THREE.BufferGeometry,
      THREE.MeshBasicMaterial
    >[] = [];
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color:
        fluorescentColors[
          params.particleColor as keyof typeof fluorescentColors
        ] || 0x000000, // Correção aqui
      transparent: true,
      opacity: 0.8,
    });

    function createParticle() {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
      particle.userData.velocity = {
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.012 - 0.002,
        z: (Math.random() - 0.5) * 0.012 - 0.006,
      };
      (particle.material as THREE.MeshBasicMaterial).opacity =
        Math.random() * 0.9;
      particles.push(particle);
      scene.add(particle);
      return particle;
    }

    // Criar partículas iniciais
    for (let i = 0; i < params.particleCount; i++) {
      createParticle();
    }

    // Atualizar partículas
    function updateParticles(deltaTime: number) {
      particles.forEach((particle, index) => {
        if (particle.userData.velocity) {
          particle.position.x += particle.userData.velocity.x * deltaTime;
          particle.position.y += particle.userData.velocity.y * deltaTime;
          particle.position.z += particle.userData.velocity.z * deltaTime;

          // Reduzir opacidade
          (particle.material as THREE.MeshBasicMaterial).opacity -=
            params.particleDecayRate * deltaTime;
          if ((particle.material as THREE.MeshBasicMaterial).opacity <= 0) {
            scene.remove(particle);
            particles.splice(index, 1);
          }
        }
      });

      // Criar novas partículas se necessário
      if (params.createParticlesOnlyWhenMoving && isMouseMoving) {
        if (Math.random() < params.particleCreationRate * deltaTime) {
          createParticle();
        }
      }
    }

    // Gerenciador de pré-carregamento (Preloader)
    class PreloaderManager {
      private preloader: HTMLElement;
      private progressBar: HTMLElement;
      private mainContent: HTMLElement;
      private totalSteps = 5;
      private currentStep = 0;
      private isComplete = false;

      constructor() {
        this.preloader = document.getElementById('preloader')!;
        this.progressBar = document.getElementById('progress-bar')!;
        this.mainContent = document.getElementById('main-content')!;
      }

      updateProgress(percentage: number) {
        this.progressBar.style.width = `${percentage}%`;
      }

      complete(canvas: HTMLCanvasElement) {
        if (this.isComplete) return;
        this.isComplete = true;
        this.updateProgress(this.totalSteps);

        setTimeout(() => {
          this.preloader.classList.add('fade-out');
          this.mainContent.classList.add('fade-in');
          canvas.classList.add('fade-in');

          setTimeout(() => {
            this.preloader.style.display = 'none';
            if (onLoaded) onLoaded();
          }, 1000);
        }, 1500);
      }
    }

    const preloader = new PreloaderManager();
    preloader.updateProgress(1);

    // Rastreamento do mouse
    const mouse = new THREE.Vector2();
    const prevMouse = new THREE.Vector2();
    const mouseSpeed = new THREE.Vector2();
    let lastMouseUpdate = 0;
    let isMouseMoving = false;
    let mouseMovementTimer: ReturnType<typeof setTimeout> | null = null;

    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastMouseUpdate > 16) {
        prevMouse.x = mouse.x;
        prevMouse.y = mouse.y;
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseSpeed.x = mouse.x - prevMouse.x;
        mouseSpeed.y = mouse.y - prevMouse.y;
        isMouseMoving = true;

        if (mouseMovementTimer) {
          clearTimeout(mouseMovementTimer);
        }

        mouseMovementTimer = setTimeout(() => {
          isMouseMoving = false;
        }, 500);

        lastMouseUpdate = now;
      }
    });

    // Tratamento de redimensionamento da janela
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    window.addEventListener('resize', () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        bloomPass.setSize(window.innerWidth, window.innerHeight);
        analogDecayPass.uniforms.uResolution.value.set(
          window.innerWidth,
          window.innerHeight
        );
      }, 250);
    });

    // Variáveis de animação
    let time = 0;
    let lastFrameTime = 0;
    let frameCount = 0;
    let isInitializedLocal = false;

    // Função de animação
    function animate(timestamp: number) {
      requestAnimationFrame(animate);

      if (!isInitializedLocal) {
        if (timestamp - lastFrameTime > 100) {
          isInitializedLocal = true;
          preloader.updateProgress(2);
        }
      }

      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;

      if (deltaTime > 100) return;

      const timeIncrement = (deltaTime / 16.67) * 0.01;
      time += timeIncrement;
      frameCount++;

      // Atualizar shaders
      analogDecayPass.uniforms.uTime.value = time;
      analogDecayPass.uniforms.uLimboMode.value = params.limboMode ? 1.0 : 0.0;

      // Movimento do fantasma
      const targetX = mouse.x * 11;
      const targetY = mouse.y * 7;
      const targetZ = 0;

      ghostGroup.position.x +=
        (targetX - ghostGroup.position.x) * params.followSpeed;
      ghostGroup.position.y +=
        (targetY - ghostGroup.position.y) * params.followSpeed;
      ghostGroup.position.z +=
        (targetZ - ghostGroup.position.z) * params.followSpeed;

      // Wobble
      ghostGroup.rotation.y =
        Math.sin(time * params.floatSpeed) * params.wobbleAmount;
      ghostGroup.rotation.x =
        Math.cos(time * params.floatSpeed) * params.wobbleAmount * 0.5;

      // Atualizar partículas
      updateParticles(deltaTime);

      // Renderizar
      composer.render();

      // Verificar se o carregamento terminou
      if (frameCount > 60) {
        // Removida a verificação de isComplete
        preloader.complete(canvasRef.current!);
      }
    }

    // Iniciar animação
    animate(0);

    // Cleanup
    return () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (mouseMovementTimer) clearTimeout(mouseMovementTimer);
      renderer.dispose();
      scene.clear();
    };
  }, [onLoaded]);

  return (
    <div ref={containerRef} className="spectral-ghost-container">
      <div id="preloader" className="preloader">
        <div className="preloader-content">
          <div className="ghost-loader">
            {/* Logo do Ghost */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 10C30 10 10 30 10 50C10 70 30 90 50 90C70 90 90 70 90 50C90 30 70 10 50 10Z"
                fill="#00FFFF"
              />
              <circle cx="40" cy="40" r="5" fill="white" />
              <circle cx="60" cy="40" r="5" fill="white" />
            </svg>
            <div className="progress-bar" id="progress-bar"></div>
          </div>
        </div>
      </div>
      <div id="main-content" className="main-content">
        <canvas ref={canvasRef} className="ghost-canvas"></canvas>
      </div>
    </div>
  );
};

export default SpectralGhost;
