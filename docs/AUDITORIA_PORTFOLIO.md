**Contexto e Persona:**
Atue como um **Staff Frontend Architect** e **Creative Developer Senior**. Você possui autoridade técnica total sobre este repositório Next.js. Seu objetivo é orquestrar a implementação do sistema "Ghost v2.2", fundindo a engenharia de alta performance (Virtual Scroll/LERP) com a identidade visual consolidada (Design System, Hero Video, Seção de Clientes e Contato).

**Diretriz Primária:**
Elevar o nível de engenharia do projeto. Estabeleça um ecossistema "Agent-Ready" robusto, performático e visualmente fiel aos protótipos.

---

## 🔍 FASE 1: AUDITORIA E RECONHECIMENTO (Executar Imediatamente)

Utilize suas ferramentas de terminal para mapear o terreno:

1. **Mapeamento:** Execute `ls -R` (ignorando node_modules/.git) para entender a estrutura atual.
2. **Stack Check:** Leia `package.json`, `tsconfig.json` e `tailwind.config.ts`.
3. **Content Gap:** Verifique a existência de assets críticos (logos de clientes, vídeos) ou prepare placeholders.

---

## ⚙️ PROTOCOLO DE EXECUÇÃO (ALGORITMO)

### FASE 1: PARSING E INDEXAÇÃO (Chain of Thought)

1. Ler e entender completamente o DESCRITIVO DA SESSÃO ABAIXO
2. Identificar **todos os elementos, textos, animações, cores e interações** descritos nesse documento (um a um, na ordem em que aparecem).
3. **Executar cada fase sequencialmente**, aplicando as mudanças no código.
4. Para cada fase executado, rodar **testes de layout e animação** relacionados.
5. Registrar o resultado de cada etapa (sucesso, falhas, pendências).
6. Crie uma lista mental (ou JSON interno) contendo para cada item:
   - `ID`: Identificador sequencial.
   - `Contexto`: Arquivos alvo (ex: `src/components/Header.tsx`).
   - `Ação`: O que mudar (ex: "Aumentar padding", "Corrigir Z-Index").
   - `Validação`: Critério de sucesso (ex: "Compilar sem erros", "Igual à imagem X").




Aplicar os ajustes na sessão "About Beliefs". Abaixo estão os códigos ajustados para atender a todos os requisitos descritos, incluindo a sincronização precisa do texto final com o scroll e a resposta do modelo 3D Ghost ao mouse.

**1. `AboutBeliefs.txt` (Ajustado)**

Este arquivo agora passa o `scrollYProgress` para o `GhostModel` e remove a propriedade redundante `progress` do `BeliefFixedHeader` (embora o componente filho ainda a aceite para compatibilidade).

```tsx
'use client';
import React, { Suspense } from 'react';
import { cubicBezier, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { BeliefSection } from './BeliefSection';
import { BeliefFinalSection } from './BeliefFinalSection';
import { BeliefFixedHeader } from './BeliefFixedHeader';
import { GhostModel } from './GhostModel';

const PHRASES = [
  'Um\nvídeo\nque\nrespira.',
  'Uma\nmarca\nque se\nreconhece.',
  'Um\ndetalhe\nque\nfica.',
  'Crio\npara\ngerar\npresença.',
  'Mesmo\nquando\nninguém\npercebe\no esforço.',
];

const COLORS = [
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
  'bg-pinkDetails', // Rosa Choque
  'bg-bluePrimary', // Azul Real
  'bg-purpleDetails', // Roxo Vibrante
];

const FINAL_COLOR = 'bg-bluePrimary'; // Azul Real

export const AboutBeliefs: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'], // Ajuste para que o scroll termine quando a seção termina no final da viewport
  });

  // Easing Ghost Padrão
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  // Opacidade do Header Fixo
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.85, 0.95],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${COLORS[0]}`} // Mantém a cor da primeira seção como padrão
    >
      {/* LAYER 1: Conteúdo Textual (Background Relative) */}
      <div className="relative pointer-events-none z-10"> {/* Adicionado z-10 para garantir que o texto fique sob o canvas, mas acima de outros backgrounds */}
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />
        {PHRASES.map((phrase, index) => (
          <BeliefSection
            key={index}
            text={phrase}
            bgColor={COLORS[index]}
            isFirst={index === 0}
          />
        ))}
        {/* Passando o scrollYProgress para o BeliefFinalSection */}
        <BeliefFinalSection bgColor={FINAL_COLOR} scrollProgress={scrollYProgress} />
      </div>

      {/* LAYER 2: Canvas 3D (Overlay Top) */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-20"> {/* Mudei para pointer-events-auto para permitir interação com o mouse */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 8], fov: 35 }} // Camera mais longe para reduzir tamanho visual
            gl={{ alpha: true, antialias: true }}
            className="w-full h-full"
          >
            <Environment preset="city" />
            <ambientLight intensity={0.8} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
            />
            <Suspense fallback={null}>
              {/* Passando o scrollYProgress para o GhostModel */}
              <GhostModel
                scrollProgress={scrollYProgress}
                scale={0.6}
                position={[0, -1, 0]}
                rotation={[0, 0, 0]}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default AboutBeliefs;
```

**2. `BeliefFinalSection.txt` (Ajustado)**

Este arquivo agora usa `useTransform` para controlar a animação com base no `scrollYProgress`, ativando-a na mesma faixa de scroll que a entrada da última frase e a mudança de cor para azul primário.

```tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useTransform, cubicBezier } from 'framer-motion';

interface BeliefFinalSectionProps {
  bgColor: string;
  scrollProgress: MotionValue<number>; // Recebe o scrollProgress
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  bgColor,
  scrollProgress, // Recebe como prop
}) => {
  const ref = useRef<HTMLElement>(null);

  // Defina os ranges para a animação baseada no scroll
  // Assumindo que a transição para azul primário (cor final) começa em ~0.8 do scroll
  // e a animação do texto final deve começar nesse ponto ou logo após.
  const introStart = 0.8; // Ajuste conforme necessário para sincronizar com a última frase
  const introEnd = 0.88; // Duração da animação

  // Transformações baseadas no scroll
  const opacity = useTransform(scrollProgress, [introStart, introEnd], [0, 1]);
  const scale = useTransform(scrollProgress, [introStart, introEnd], [0.9, 1]);
  const blur = useTransform(scrollProgress, [introStart, introEnd], ['blur(10px)', 'blur(0px)']);

  // Opcional: Se desejar que o texto saia após um certo ponto, adicione mais ranges
  // const exitStart = 0.95;
  // const exitEnd = 1.0;
  // const opacity = useTransform(scrollProgress, [introStart, introEnd, exitStart, exitEnd], [0, 1, 1, 0]);
  // const scale = useTransform(scrollProgress, [introStart, introEnd, exitStart, exitEnd], [0.9, 1, 1, 0.95]);

  return (
    <section
      ref={ref}
      className={`w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 ${bgColor}`}
    >
      <motion.div
        style={{
          opacity,
          scale,
          filter: blur,
        }}
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
        // Removido initial, whileInView, viewport e transition
      >
        <div className="text-[16vw] md:text-[14rem] tracking-tighter uppercase font-black">
          ISSO É
        </div>
        <div className="text-[30vw] md:text-[25rem] font-black tracking-tighter uppercase">
          GHOST
        </div>
        <div className="text-[24vw] md:text-[19rem] tracking-tighter uppercase font-black">
          DESIGN
        </div>
      </motion.div>
    </section>
  );
};
```

**3. `GhostModel.txt` (Ajustado)**

Este arquivo agora responde ao movimento do mouse e à rolagem com mais dinamismo. Adicionei estados para rastrear a posição do mouse e usei `useEffect` para adicionar listeners de evento.

```tsx
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Noby Grand (https://sketchfab.com/NobyGrand)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/ghost-w-tophat-6b1217e3462440519a2d0e3e75bf16d3
Title: Ghost w/ Tophat
*/
import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, Float } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';
import { MotionValue } from 'framer-motion';

type GLTFResult = GLTF & {
  nodes: {
    Body_Ghost_White_0: THREE.Mesh;
    Eyes_Eyes_0: THREE.Mesh;
    Hat_Hat_Black_0: THREE.Mesh;
    Rim_Rim_Red_0: THREE.Mesh;
  };
  materials: {
    Ghost_White: THREE.MeshStandardMaterial;
    Eyes: THREE.MeshStandardMaterial;
    Hat_Black: THREE.MeshStandardMaterial;
    Rim_Red: THREE.MeshStandardMaterial;
  };
};

// Definição da interface com scrollProgress
interface GhostModelProps extends React.ComponentProps<'group'> {
  scrollProgress?: MotionValue<number>;
}

export function GhostModel({ scrollProgress, ...props }: GhostModelProps) {
  const { nodes, materials } = useGLTF(
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb'
  ) as unknown as GLTFResult;

  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree(); // Obtém a referência ao canvas WebGL

  // Estados para armazenar a posição do mouse normalizada (-1 a 1)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Efeitos para adicionar e remover listeners de mouse
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (gl.domElement) { // Verifica se o domElement existe
        // Normaliza a posição do mouse de -1 a 1
        const rect = gl.domElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        setMousePosition({ x, y });
      }
    };

    // Adiciona listeners ao canvas WebGL
    const canvas = gl.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Remove listeners ao desmontar
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl]); // Dependência em gl para garantir que o listener seja reconfigurado se gl mudar

  useFrame((state) => {
    if (!groupRef.current || !scrollProgress) return;

    const progress = scrollProgress.get();

    // --- Animação Base ---
    // Flutuação contínua
    // (As props do Float já lidam com isso, mas você pode manipular diretamente se quiser mais controle)
    // Rotação baseada no scroll (já existente)
    groupRef.current.rotation.y = -progress * Math.PI * 2;

    // --- Resposta ao Mouse ---
    // Influencia levemente a posição e rotação com base na posição do mouse
    // A intensidade pode ser ajustada com um fator
    const mouseInfluence = 0.1; // Ajuste este valor para aumentar ou diminuir a resposta ao mouse
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      mousePosition.x * mouseInfluence,
      0.05 // Velocidade de suavização
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mousePosition.y * mouseInfluence,
      0.05 // Velocidade de suavização
    );

    // Rotação leve baseada no mouse
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mousePosition.y * mouseInfluence * 0.5, // Menor influência para rotação X
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      mousePosition.x * mouseInfluence * 0.5, // Menor influência para rotação Z
      0.05
    );

    // --- Animação Final ---
    // Lógica para "movimentar mais" na última seção (progress > 0.8)
    // "ISSO É GHOST DESIGN"
    if (progress > 0.8) {
      // Intensifica a flutuação ou aproxima o modelo
      const intensity = Math.min(1, (progress - 0.8) * 5); // 0 a 1 no final, limitado a 1

      // Exemplo: Aproximação (Z) e leve wobble extra
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        1, // Valor de destino para Z (levemente mais perto)
        0.05
      );

      // Oscilação adicional baseada no tempo e na intensidade
      const timeBasedWobble = Math.sin(state.clock.elapsedTime * 6) * 0.1 * intensity;
      const scrollBasedWobble = (progress - 0.8) * 0.2; // Oscilação baseada no progresso
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        timeBasedWobble + scrollBasedWobble,
        0.1 // Velocidade de suavização para a oscilação final
      );

      // Opcional: Aumentar escala levemente
      const scaleIncrease = 1 + 0.1 * intensity; // Cresce até 10%
      groupRef.current.scale.setScalar(scaleIncrease);

    } else {
      // Reset suave para valores base
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        0,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        0,
        0.05
      );
      // Reset da escala
      groupRef.current.scale.setScalar(0.6); // Volta para a escala base definida em props
    }
  });

  return (
    <Float
      speed={2} // Velocidade da flutuação base
      rotationIntensity={0.5} // Intensidade da rotação da flutuação base
      floatIntensity={0.5} // Intensidade da altura da flutuação base
      floatingRange={[-0.1, 0.1]} // Alcance da flutuação base no eixo Y
    >
      <group ref={groupRef} {...props} dispose={null}>
        <mesh
          name="Body_Ghost_White_0"
          castShadow
          receiveShadow
          geometry={nodes.Body_Ghost_White_0.geometry}
          material={materials.Ghost_White}
          position={[0, 1.5578, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Eyes_Eyes_0"
          castShadow
          receiveShadow
          geometry={nodes.Eyes_Eyes_0.geometry}
          material={materials.Eyes}
          position={[0, 1.5578, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Hat_Hat_Black_0"
          castShadow
          receiveShadow
          geometry={nodes.Hat_Hat_Black_0.geometry}
          material={materials.Hat_Black}
          position={[0, 2.9913, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Rim_Rim_Red_0"
          castShadow
          receiveShadow
          geometry={nodes.Rim_Rim_Red_0.geometry}
          material={materials.Rim_Red}
          position={[0, 2.3541, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </Float>
  );
}

// Preload only in the browser to avoid Node/SSG environments where
// Web Workers (used by meshopt decoding) are unavailable.
if (typeof window !== 'undefined') {
  useGLTF.preload(
    'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/beliefs/ghost-transformed.glb'
  );
}
```

**Explicações Adicionais:**

*   **`AboutBeliefs`:** A principal mudança foi passar o `scrollYProgress` para os componentes `BeliefFinalSection` e `GhostModel`. Também foi ajustado o `offset` do `useScroll` para `'end end'` para que o progresso vá até 1 quando a seção inteira sai da parte inferior da viewport, o que pode ajudar na precisão da sincronização final. O `pointer-events` no canvas foi alterado para `auto` para permitir a detecção de movimento do mouse.
*   **`BeliefFinalSection`:** Substituímos `whileInView` por transformações baseadas em `scrollProgress`. Os ranges `[introStart, introEnd]` determinam quando a animação de entrada (opacidade, escala, desfoque) ocorre com base no progresso do scroll. Você pode ajustar `introStart` e `introEnd` para sincronizar perfeitamente com a aparência da última frase e a cor de fundo.
*   **`GhostModel`:** Adicionei um `useEffect` para adicionar um listener `mousemove` ao elemento canvas do WebGL (`gl.domElement`). A posição do mouse é normalizada de -1 a 1 e armazenada em `mousePosition`. No `useFrame`, essa posição é usada para influenciar levemente a posição e rotação do modelo, criando a sensação de que ele responde ao toque. A lógica final para `progress > 0.8` foi mantida e aprimorada para incluir aumento de escala. A escala é resetada no `else` para manter o estado base.  Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

