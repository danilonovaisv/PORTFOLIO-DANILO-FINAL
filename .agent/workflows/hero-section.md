---
description: hero
---

# Workflow: Implementação da Hero Section (Ghost Atmosphere) - Google Antigravity Adaptation

**Conceito Visual (Atualizado - Master Sync):**
A Hero segue o conceito **"Ghost Atmosphere"** com influência do comportamento de "antigravidade" do Google. O elemento WebGL ("Ghost") atua como uma camada atmosférica de fundo (`z-0`), criando profundidade e movimento orgânico que responde sutilmente ao mouse, sem interferir na legibilidade do conteúdo.

- **Atmosfera:** O WebGL é uma manifestação de energia azul (`#0057FF HDR`) com efeito de levitação orgânica e ruído analógico inspirado no CodePen de referência.
- **Comportamento "Antigravity":** O Ghost flutua com movimento senoidal suave (não mecânico), com leve follow do mouse que simula campo magnético/antigravidade.
- **Conteúdo:** Texto 100% estático, cor `#d9dade`, funcionando como âncora editorial imune às animações de fundo.
- **Vídeo:** Thumb do Manifesto com micro-interações de hover (scale) mas sem morph visual durante scroll.

---

**Passo a Passo de Implementação:**

1. **Orquestração de Camadas (`HomeHero.tsx`):**

   ```tsx
   // src/components/home/HomeHero.tsx
   import HeroCopy from './HeroCopy';
   import ManifestoThumb from './ManifestoThumb';
   import GhostStage from './GhostStage';
   
   export default function HomeHero() {
     return (
       <section className="relative w-full h-[100vh] md:h-[85vh] bg-[#06071f] overflow-hidden">
         {/* WebGL Atmosfera (z-0) */}
         <GhostStage />
         
         {/* Overlay Radial (z-10) - integração visual */}
         <div 
           className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_#0b0d3a_0%,_#06071f_60%)] pointer-events-none"
           aria-hidden="true"
         />
         
         {/* Conteúdo Editorial (z-20) */}
         <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4">
           <HeroCopy />
           <ManifestoThumb />
         </div>
       </section>
     );
   }
   ```

2. **Configuração do WebGL (Blue Ghost - Google Antigravity Style):**
   - **Animação Principal:** Movimento de flutuação orgânico com 3 senoides sobrepostas:

     ```tsx
     // src/components/home/webgl/Ghost.tsx
     useFrame((state) => {
       const t = state.clock.elapsedTime;
       
       // Floating animation (Google Antigravity Style)
       const float1 = Math.sin(t * 1.6) * 0.03;    // Movimento principal
       const float2 = Math.cos(t * 0.7) * 0.018;   // Movimento secundário
       const float3 = Math.sin(t * 2.3) * 0.008;   // Micro-movimento
       
       ghostGroup.position.y = float1 + float2 + float3;
       
       // Pulsing emissive
       ghostMaterial.emissiveIntensity = 5.8 + Math.sin(t * 1.6) * 0.6;
     });
     ```

   - **Follow Mouse (Desktop Only):**

     ```tsx
     // src/components/home/webgl/GhostCanvas.tsx
     function MouseFollower({ children }: { children: React.ReactNode }) {
       const { size } = useThree();
       const mouseRef = useRef({ x: 0, y: 0 });
       
       useEffect(() => {
         const handleMove = (e: MouseEvent) => {
           mouseRef.current.x = (e.clientX / size.width) * 2 - 1;
           mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
         };
         window.addEventListener('mousemove', handleMove);
         return () => window.removeEventListener('mousemove', handleMove);
       }, [size]);
       
       useFrame((state) => {
         if (!ghostRef.current) return;
         const targetX = mouseRef.current.x * 8;
         const targetY = mouseRef.current.y * 5;
         
         // Google Antigravity follow (suave e orgânico)
         ghostRef.current.position.x += (targetX - ghostRef.current.position.x) * 0.05;
         ghostRef.current.position.y += (targetY - ghostRef.current.position.y) * 0.05;
       });
       
       return <group ref={ghostRef}>{children}</group>;
     }
     ```

3. **Preloader Adaptado (Google Antigravity Integration):**

   ```tsx
   // src/components/home/HeroPreloader.tsx
   export default function HeroPreloader() {
     return (
       <motion.div 
         initial={{ opacity: 1 }}
         animate={{ opacity: 0 }}
         transition={{ delay: 1.5, duration: 1 }}
         className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
       >
         <div className="ghost-loader mb-8">
           <svg className="ghost-svg" height="80" viewBox="0 0 512 512" width="80" xmlns="http://www.w3.org/2000/svg">
             <path className="ghost-body" d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z" fill="white" />
             <circle className="ghost-eye left-eye" cx="208" cy="225" r="22" fill="black" />
             <circle className="ghost-eye right-eye" cx="297" cy="225" r="22" fill="black" />
           </svg>
         </div>
         <div className="loading-text font-mono text-xs uppercase tracking-widest text-[#e0e0e0] mb-4">
           Summoning spirits
         </div>
         <div className="loading-progress w-24 h-0.5 bg-[#06071f] rounded-full overflow-hidden">
           <motion.div 
             className="progress-bar h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
             initial={{ width: 0 }}
             animate={{ width: "100%" }}
             transition={{ duration: 2, ease: "easeInOut" }}
           />
         </div>
       </motion.div>
     );
   }
   ```

4. **Pós-processamento Google Antigravity Style:**

   ```tsx
   // src/components/home/webgl/postprocessing/AnalogDecayPass.ts
   const AnalogDecayShader = shaderMaterial(
     {
       tDiffuse: new THREE.Texture(),
       uTime: 0,
       uIntensity: 0.7,
       uGrain: 0.4,
       uScanlines: 1.0,
       uJitter: 0.5,
     },
     /* glsl */ `
       varying vec2 vUv;
       void main() {
         vUv = uv;
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
       }
     `,
     /* glsl */ `
       uniform sampler2D tDiffuse;
       uniform float uTime;
       uniform float uIntensity;
       uniform float uGrain;
       uniform float uScanlines;
       uniform float uJitter;
       varying vec2 vUv;
       
       // Google Antigravity: Ruído analógico suave com scanlines
       float rand(vec2 co) {
         return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
       }
       
       void main() {
         vec2 uv = vUv;
         
         // Jitter sutil (Google Antigravity temporal instability)
         if (uJitter > 0.01) {
           uv += (rand(vec2(uTime)) - 0.5) * uJitter * 0.002;
         }
         
         vec4 color = texture2D(tDiffuse, uv);
         
         // Grain analógico
         if (uGrain > 0.01) {
           float grain = rand(uv + uTime) * 2.0 - 1.0;
           color.rgb += grain * uGrain * 0.08 * uIntensity;
         }
         
         // Scanlines (Google CRT aesthetic)
         if (uScanlines > 0.01) {
           float scan = sin(uv.y * 1200.0 + uTime * 2.0) * 0.5 + 0.5;
           color.rgb *= mix(1.0, 0.97, scan * uScanlines * uIntensity);
         }
         
         gl_FragColor = color;
       }
     `
   );
   ```

---

**Non-Negotiables (Google Antigravity Rules):**

✅ **Layering Imutável:**

- `z-0`: WebGL Canvas (Ghost Atmosphere)
- `z-10`: Overlay radial (opcional)
- `z-20`: Conteúdo (Texto + Thumb)

✅ **Google Antigravity Physics:**

- Movimento senoidal sobreposto (3 frequências diferentes)
- Follow do mouse limitado a velocidade de 0.05 (suavidade Google)
- Nenhuma animação mecânica ou linear - tudo orgânico

✅ **Performance Google Grade:**

- Canvas isolado com `next/dynamic` + `ssr: false`
- Limite de 250 partículas com pooling
- `prefers-reduced-motion` desativa follow e bloom intenso
- DPR máximo: 2

✅ **Legibilidade Google Priority:**

- Contraste AA garantido (#d9dade sobre #06071f = ~7.2:1)
- Texto 100% estático desde o primeiro frame
- Nenhuma sobreposição visual que comprometa a leitura
- `aria-hidden="true"` no overlay e WebGL

✅ **Initial Load Google Speed:**

- Preloader com progresso visual
- Forçar renderização inicial antes da transição
- Canvas entra em fade-in simultâneo com conteúdo
- Texto visível imediatamente após preloader

---

**Resultado Esperado (Google Antigravity Spec):**

- **0-100ms:** Preloader aparece com ghost flutuando
- **1500ms:** Progresso completa, fade-out do preloader inicia
- **2500ms:** Conteúdo + WebGL fade-in simultâneos
- **3000ms+:** Ghost flutua com movimento orgânico, follow sutil do mouse
- **Hover no vídeo:** Scale 1.02 com timing 0.2s ease
- **Reduced Motion:** Ghost estático no centro, sem follow, bloom reduzido 70%
