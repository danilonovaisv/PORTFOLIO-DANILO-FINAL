// GhostHero.tsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

// Interfaces para tipagem
interface GhostParams {
  bodyColor: number;
  glowColor: string;
  eyeGlowColor: string;
  ghostOpacity: number;
  ghostScale: number;
  emissiveIntensity: number;
  pulseSpeed: number;
  pulseIntensity: number;
  eyeGlowIntensity: number;
  eyeGlowDecay: number;
  eyeGlowResponse: number;
  rimLightIntensity: number;
  followSpeed: number;
  wobbleAmount: number;
  floatSpeed: number;
  movementThreshold: number;
  revealRadius: number;
  fadeStrength: number;
  baseOpacity: number;
  revealOpacity: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface Eyes {
  leftEye: THREE.Mesh;
  rightEye: THREE.Mesh;
  leftGlow: THREE.Mesh;
  rightGlow: THREE.Mesh;
  leftEyeMaterial: THREE.MeshBasicMaterial;
  rightEyeMaterial: THREE.MeshBasicMaterial;
  leftGlowMaterial: THREE.MeshBasicMaterial;
  rightGlowMaterial: THREE.MeshBasicMaterial;
}

const GhostHero: React.FC = () => {
  // Refs para elementos DOM e Three.js
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const ghostGroupRef = useRef<THREE.Group | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number>(0);
  const eyesRef = useRef<Eyes | null>(null);
  
  // Estado para mouse e animação
  const [mouse, setMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const [prevMouse, setPrevMouse] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [time, setTime] = useState(0);
  const [currentMovement, setCurrentMovement] = useState(0);

  // Parâmetros do fantasma
  const params: GhostParams = {
    bodyColor: 0x0f2027,
    glowColor: "blue",
    eyeGlowColor: "blue",
    ghostOpacity: 0.88,
    ghostScale: 2.4,
    emissiveIntensity: 8.5,
    pulseSpeed: 1.6,
    pulseIntensity: 0.6,
    eyeGlowIntensity: 6.5,
    eyeGlowDecay: 0.95,
    eyeGlowResponse: 0.31,
    rimLightIntensity: 1.8,
    followSpeed: 0.03,
    wobbleAmount: 0.25,
    floatSpeed: 0.8,
    movementThreshold: 0.07,
    revealRadius: 15,
    fadeStrength: 2.5,
    baseOpacity: 0.3,
    revealOpacity: 0.01
  };

  // Criar os olhos do fantasma
  const createEyes = (group: THREE.Group): Eyes => {
    const eyeGroup = new THREE.Group();
    group.add(eyeGroup);
    
    // Geometria dos olhos
    const eyeGeometry = new THREE.SphereGeometry(0.3, 12, 12);
    
    // Material dos olhos
    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0080ff,
      transparent: true,
      opacity: 0
    });
    
    // Olho esquerdo
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.7, 0.6, 2.0);
    eyeGroup.add(leftEye);
    
    // Olho direito
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.7, 0.6, 2.0);
    eyeGroup.add(rightEye);
    
    // Efeito de brilho externo
    const glowGeometry = new THREE.SphereGeometry(0.525, 12, 12);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x0080ff,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide
    });
    
    const leftGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    leftGlow.position.set(-0.7, 0.6, 1.95);
    eyeGroup.add(leftGlow);
    
    const rightGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    rightGlow.position.set(0.7, 0.6, 1.95);
    eyeGroup.add(rightGlow);
    
    return {
      leftEye,
      rightEye,
      leftGlow,
      rightGlow,
      leftEyeMaterial: eyeMaterial,
      rightEyeMaterial: eyeMaterial,
      leftGlowMaterial: glowMaterial,
      rightGlowMaterial: glowMaterial
    };
  };

  // Inicializar Three.js
  useEffect(() => {
    if (!mountRef.current) return;

    // Forçar aceleração por GPU
    document.body.style.transform = "translateZ(0)";
    document.body.style.backfaceVisibility = "hidden";
    document.body.style.perspective = "1000px";

    // Criar cena
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    // Renderer com transparência
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
      premultipliedAlpha: false,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    mountRef.current.appendChild(renderer.domElement);

    // Configurar pós-processamento
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3,
      1.25,
      0.0
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Shader para efeito de revelação do texto
    const atmosphereShader = {
      uniforms: {
        ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
        revealRadius: { value: params.revealRadius },
        fadeStrength: { value: params.fadeStrength },
        baseOpacity: { value: params.baseOpacity },
        revealOpacity: { value: params.revealOpacity },
        time: { value: 0 }
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
          float dynamicRadius = revealRadius * 0.3 + sin(time * 2.0) * 1.0;
          float reveal = smoothstep(dynamicRadius * 0.4, dynamicRadius, dist);
          reveal = pow(reveal, fadeStrength * 2.5);
          float opacity = mix(revealOpacity * 0.5, baseOpacity * 0.3, reveal);
          gl_FragColor = vec4(0.0, 0.2, 1.0, opacity * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false
    };

    // Criar atmosfera
    const atmosphereGeometry = new THREE.PlaneGeometry(300, 300);
    const atmosphereMaterial = new THREE.ShaderMaterial(atmosphereShader);
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphere.position.z = -50;
    atmosphere.renderOrder = -100;
    scene.add(atmosphere);
    atmosphereRef.current = atmosphere;

    // Grupo do fantasma
    const ghostGroup = new THREE.Group();
    scene.add(ghostGroup);
    ghostGroupRef.current = ghostGroup;

    // Geometria do fantasma
    const ghostGeometry = new THREE.SphereGeometry(2, 40, 40);
    const positionAttribute = ghostGeometry.getAttribute("position");
    const positions = positionAttribute.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }
    ghostGeometry.computeVertexNormals();

    // Material do fantasma
    const ghostMaterial = new THREE.MeshStandardMaterial({
      color: params.bodyColor,
      transparent: true,
      opacity: params.ghostOpacity,
      emissive: 0x0080ff,
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02,
      metalness: 0.0,
      side: THREE.DoubleSide,
      alphaTest: 0.1
    });

    const ghostBody = new THREE.Mesh(ghostGeometry, ghostMaterial);
    ghostGroup.add(ghostBody);

    // Criar olhos
    eyesRef.current = createEyes(ghostGroup);

    // Event listener para mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      setPrevMouse({ ...mouse });
      setMouse({ x, y });
      
      // Detectar movimento
      const speed = Math.sqrt(
        Math.pow(x - mouse.x, 2) + 
        Math.pow(y - mouse.y, 2)
      );
      
      if (speed > 0.01) {
        setIsMouseMoving(true);
        setTimeout(() => setIsMouseMoving(false), 80);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fake mouse event para inicialização
    const fakeEvent = new MouseEvent('mousemove', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2
    });
    window.dispatchEvent(fakeEvent);

    // Limpeza
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (composerRef.current) {
        composerRef.current.dispose();
      }
      
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  // Hook para redimensionamento
  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !composerRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      composerRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Loop de animação
  useEffect(() => {
    let lastTime = 0;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!sceneRef.current || !cameraRef.current || !composerRef.current || 
          !ghostGroupRef.current || !atmosphereRef.current || !eyesRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Calcular delta time
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      if (deltaTime > 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Atualizar tempo
      setTime(prev => prev + (deltaTime / 16.67) * 0.01);
      
      // Atualizar shader
      const atmosphereMaterial = atmosphereRef.current.material as THREE.ShaderMaterial;
      atmosphereMaterial.uniforms.time.value = time;
      
      // Movimento do fantasma
      const targetX = mouse.x * 8;
      const targetY = mouse.y * 5;
      
      ghostGroupRef.current.position.x += (targetX - ghostGroupRef.current.position.x) * params.followSpeed;
      ghostGroupRef.current.position.y += (targetY - ghostGroupRef.current.position.y) * params.followSpeed;
      
      // Atualizar posição de revelação
      atmosphereMaterial.uniforms.ghostPosition.value.copy(ghostGroupRef.current.position);
      
      const prevGhostPosition = ghostGroupRef.current.position.clone();
      const movementAmount = prevGhostPosition.distanceTo(ghostGroupRef.current.position);
      
      setCurrentMovement(prev => 
        prev * params.eyeGlowDecay + movementAmount * (1 - params.eyeGlowDecay)
      );
      
      // Animação de flutuação
      const float1 = Math.sin(time * params.floatSpeed * 1.5) * 0.03;
      const float2 = Math.cos(time * params.floatSpeed * 0.7) * 0.018;
      const float3 = Math.sin(time * params.floatSpeed * 2.3) * 0.008;
      ghostGroupRef.current.position.y += float1 + float2 + float3;
      
      // Pulsos
      const pulse1 = Math.sin(time * params.pulseSpeed * 0.8) * params.pulseIntensity * 0.7;
      
      // Atualizar materiais
      const ghostBody = ghostGroupRef.current.children[0] as THREE.Mesh;
      const ghostMaterial = ghostBody.material as THREE.MeshStandardMaterial;
      ghostMaterial.emissiveIntensity = params.emissiveIntensity + pulse1;
      
      // Animação do corpo
      const mouseDirection = new THREE.Vector2(
        targetX - ghostGroupRef.current.position.x,
        targetY - ghostGroupRef.current.position.y
      ).normalize();
      
      const tiltStrength = 0.1 * params.wobbleAmount;
      const tiltDecay = 0.95;
      
      ghostBody.rotation.z = ghostBody.rotation.z * tiltDecay + 
                           -mouseDirection.x * tiltStrength * (1 - tiltDecay);
      ghostBody.rotation.x = ghostBody.rotation.x * tiltDecay + 
                           mouseDirection.y * tiltStrength * (1 - tiltDecay);
      ghostBody.rotation.y = Math.sin(time * 1.4) * 0.05 * params.wobbleAmount;
      
      // Variações de escala
      const scaleVariation = 1 + Math.sin(time * 2.1) * 0.025 * params.wobbleAmount + pulse1 * 0.015;
      const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
      const finalScale = scaleVariation * scaleBreath;
      ghostBody.scale.set(finalScale, finalScale, finalScale);
      
      // Animação dos olhos
      const normalizedMouseSpeed = Math.sqrt(
        Math.pow(mouse.x - prevMouse.x, 2) + 
        Math.pow(mouse.y - prevMouse.y, 2)
      ) * 8;
      
      const isMoving = currentMovement > params.movementThreshold;
      const targetGlow = isMoving ? 1.0 : 0.0;
      
      const glowChangeSpeed = isMoving ? params.eyeGlowResponse * 2 : params.eyeGlowResponse;
      const newOpacity = eyesRef.current.leftEyeMaterial.opacity + 
                        (targetGlow - eyesRef.current.leftEyeMaterial.opacity) * glowChangeSpeed;
      
      eyesRef.current.leftEyeMaterial.opacity = newOpacity;
      eyesRef.current.rightEyeMaterial.opacity = newOpacity;
      eyesRef.current.leftGlowMaterial.opacity = newOpacity * 0.3;
      eyesRef.current.rightGlowMaterial.opacity = newOpacity * 0.3;
      
      // Renderizar
      composerRef.current.render();
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mouse, prevMouse, time, currentMovement, params, isMouseMoving]);

  return (
    <div className="ghost-hero-container">
      <div className="content" id="main-content">
        <div className="quote-container">
          <div className="tag">[BRAND AWARENESS]</div>
          <h1 className="quote-main">Você não vê o design.</h1>
          <h2 className="quote-sub">Mas ele vê você.</h2>
          <a href="/sobre" className="cta-button">step inside →</a>
        </div>
        <div className="bottom-cta">
          <a href="/sobre" className="cta-button">step inside →</a>
        </div>
      </div>
      <div ref={mountRef} className="canvas-container"></div>
      
      <style jsx>{`
        @font-face {
          font-family: 'TT Norms Pro';
          src: url('/fonts/tt-norms-pro-regular.woff2') format('woff2'),
               url('/fonts/tt-norms-pro-regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'TT Norms Pro';
          src: url('/fonts/tt-norms-pro-black.woff2') format('woff2'),
               url('/fonts/tt-norms-pro-black.woff') format('woff');
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }
        
        .ghost-hero-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: #000;
        }
        
        .canvas-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 5;
        }
        
        .content {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          text-align: center;
          color: #e0e0e0;
          opacity: 1;
          transition: opacity 1.5s ease-in;
          z-index: 10;
          letter-spacing: -0.03em;
          font-family: 'TT Norms Pro', ui-sans-serif, system-ui;
        }
        
        .quote-container {
          max-width: 90%;
          overflow: hidden;
        }
        
        .tag {
          font-family: 'TT Norms Pro', monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.7;
          margin-bottom: 1.5vh;
          color: #e0e0e0;
        }
        
        .quote-main {
          font-family: 'TT Norms Pro', system-ui;
          font-size: 6vw;
          line-height: 1.3;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 2vh;
          color: #444444;
          mix-blend-mode: screen;
          text-shadow: 0 0 20px rgba(0, 100, 255, 0);
        }
        
        .quote-sub {
          font-family: 'TT Norms Pro', system-ui;
          font-size: 4.5vw;
          line-height: 1.3;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 5vh;
          color: #444444;
          mix-blend-mode: screen;
          text-shadow: 0 0 20px rgba(0, 100, 255, 0);
        }
        
        .cta-button {
          display: inline-block;
          color: #e0e0e0;
          text-decoration: none;
          font-size: 1rem;
          font-family: 'TT Norms Pro', system-ui;
          text-transform: lowercase;
          transition: all 0.3s ease;
          position: relative;
          letter-spacing: 0;
          padding: 10px 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          margin-top: 20px;
        }
        
        .cta-button:hover {
          color: #00ffff;
          border-color: #00ffff;
        }
        
        .cta-button:hover::after {
          content: "→";
          position: absolute;
          left: 100%;
          margin-left: 8px;
          opacity: 0;
          transform: translateX(-5px);
          transition: all 0.3s ease;
        }
        
        .cta-button:hover::after {
          opacity: 1;
          transform: translateX(0);
        }
        
        .bottom-cta {
          position: fixed;
          bottom: 40px;
          width: 100%;
          text-align: center;
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
          .quote-main {
            font-size: 8vh;
            max-height: 3rem;
          }
          
          .quote-sub {
            font-size: 6vh;
            max-height: 2.5rem;
          }
          
          .cta-button {
            padding: 8px 12px;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 480px) {
          .quote-main {
            font-size: 6vh;
          }
          
          .quote-sub {
            font-size: 4.5vh;
          }
          
          .tag {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default GhostHero;