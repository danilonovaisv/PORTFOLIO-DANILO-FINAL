// src/components/hero/HeroOrb.tsx
/**
 * A) Diagnóstico
 * - Sintoma observado:
 *   - A Hero (incluindo a orb 3D / glass) não aparece ou “some” após load/interação.
 *
 * - Causa raiz (root cause):
 *   1) Canvas/R3F sendo renderizado em contexto incompatível com SSR/hidratação (App Router),
 *      ou montando antes do DOM ter dimensões estáveis.
 *   2) GLB/GLTF não carregando (path errado/404), fazendo o Suspense “travar” a renderização do conteúdo 3D.
 *      No tutorial de referência, o asset é carregado via useGLTF("/medias/torrus.glb")  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6MH0"},
 *      mas no seu projeto os assets deveriam estar em public/media (ex.: "/media/..."), o que é uma divergência comum.
 *
 * - Evidências técnicas (padrões típicos que causam o sumiço):
 *   - Falta de `ssr:false` ao lazy-load da cena 3D (o tutorial recomenda dynamic import com ssr:false).
 *   - Container do Canvas sem altura (height: 0) ou com overflow/z-index que oculta o hero.
 *   - Suspense sem fallback “seguro” + erro de carregamento do GLB.
 *
 * - Riscos/efeitos colaterais se não corrigir:
 *   - Hero intermitente, CLS/instabilidade visual, erro de hidratação, e LCP pior por re-render pesado do WebGL.
 *
 * B) Correção (código final)
 * - Este componente isola a orb 3D em client-only via dynamic(ssr:false), garante dimensões,
 *   adiciona ErrorBoundary + fallback (para não “sumir” se o GLB falhar) e não altera o texto do Hero.
 *
 * C) Diff (antes x depois) — conceitual
 * - Antes:
 *   - <Canvas> importado diretamente no Hero/Server Component, ou sem altura definida, ou dependente de GLB sem fallback.
 * - Depois:
 *   - HeroOrb (client) -> dynamic import (ssr:false) -> Canvas com wrapper dimensionado + ErrorBoundary + fallback.
 *
 * D) Justificativa técnica (resumo)
 * - Resolve invisibilidade ao:
 *   - Forçar render client-side do Canvas (evita SSR/hidratação).
 *   - Garantir wrapper com width/height e z-index corretos.
 *   - Evitar que falha do GLB deixe a Hero “vazia” (fallback resiliente).
 * - Melhora performance:
 *   - pointer-events none no Canvas (não bloqueia UI)
 *   - dpr controlado e lights/environment moderados
 * - Acessibilidade:
 *   - Canvas decorativo com aria-hidden
 * - Responsividade:
 *   - wrapper responsivo e seguro para alturas mobile (svh)
 *
 * 7) Testes e Validação (resumo prático)
 * - Desktop (1280 / 1440+):
 *   - Hero visível ao load, orb animando, sem erros no console, CLS baixo.
 * - Mobile (320/375/414):
 *   - Hero visível sem corte, min-h com 100svh, DPR adaptativo.
 * - Como testar:
 *   1) DevTools > Network: validar GLB 200 (não 404).
 *   2) Console: checar erros de hidratação/three/WebGL.
 *   3) DevTools > Elements: checar se wrapper do Canvas tem altura > 0.
 */

"use client";

import dynamic from "next/dynamic";
import React from "react";

export type HeroOrbProps = {
  className?: string;
  /**
   * Caminho do GLB/GLTF dentro de /public.
   * Recomendado no seu projeto: /media/...
   */
  modelUrl?: string;
};

const HeroGlassCanvas = dynamic(() => import("./HeroGlassCanvas"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-[32px] bg-transparent"
    />
  ),
});

export default function HeroOrb({
  className,
  modelUrl = "/media/torus_dan.glb",
}: HeroOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        // IMPORTANTE: o pai precisa ter dimensão; este wrapper não deve colapsar.
        // Use este componente dentro de um container `relative`.
        "pointer-events-none absolute inset-0",
        "min-h-[240px] sm:min-h-[320px] lg:min-h-[520px]",
        className ?? "",
      ].join(" ")}
    >
      <HeroGlassCanvas modelUrl={modelUrl} />
    </div>
  );
}

// src/components/hero/HeroGlassCanvas.tsx
"use client";

import React, { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Preload } from "@react-three/drei";
import GlassOrb from "./orb/GlassOrb";

type HeroGlassCanvasProps = {
  modelUrl: string;
};

class OrbErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback: React.ReactNode }>,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Mantido propositalmente silencioso para não “derrubar” a Hero.
    // Se quiser, você pode logar para Sentry aqui.
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function OrbFallback() {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1.4} position={[2, 2, 3]} />
      <GlassOrb procedural />
      <Environment preset="city" />
    </group>
  );
}

export default function HeroGlassCanvas({ modelUrl }: HeroGlassCanvasProps) {
  // DPR adaptativo simples (boa relação qualidade/perf em mobile)
  const [dpr, setDpr] = useState<[number, number]>([1, 1.75]);

  const camera = useMemo(
    () => ({
      position: [0, 0, 3.2] as [number, number, number],
      fov: 35,
      near: 0.1,
      far: 100,
    }),
    []
  );

  return (
    <Canvas
      className="h-full w-full"
      camera={camera}
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      // Para a orb animar continuamente (rotações/distortion temporal)
      frameloop="always"
    >
      <color attach="background" args={["#00000000"]} />

      <AdaptiveDpr pixelated />

      <ambientLight intensity={0.35} />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <directionalLight intensity={1} position={[-2, -1, 2]} />

      <Environment preset="city" />

      <OrbErrorBoundary fallback={<OrbFallback />}>
        <Suspense fallback={<OrbFallback />}>
          <GlassOrb modelUrl={modelUrl} />
          <Preload all />
        </Suspense>
      </OrbErrorBoundary>
    </Canvas>
  );
}

// src/components/three/orb/GlassOrb.tsx
"use client";

import React, { memo, useMemo, useRef } from "react";
import * as THREE from "three";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

export type GlassOrbProps = {
  modelUrl?: string;
  /**
   * Se true, renderiza uma geometria procedural (fallback) sem GLB.
   * Útil caso o asset falhe — evita “sumir” a seção inteira.
   */
  procedural?: boolean;
  /**
   * Nome do mesh dentro do GLB (se você souber).
   * Se não souber, o componente tenta encontrar o primeiro mesh.
   */
  meshName?: string;
};

type GLTFLike = {
  nodes: Record<string, any>;
};

function getFirstMeshFromNodes(nodes: Record<string, any>) {
  for (const key of Object.keys(nodes)) {
    const n = nodes[key];
    if (n && (n as THREE.Object3D).type === "Mesh") return n as THREE.Mesh;
  }
  return null;
}

function GlassOrbImpl({ modelUrl, procedural, meshName }: GlassOrbProps) {
  const group = useRef<THREE.Group>(null);

  const { viewport } = useThree();

  // Responsivo similar ao tutorial (escala baseada no viewport)  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6MX0"}
  const scale = useMemo(() => {
    const base = viewport.width / 3.75;
    return Math.min(Math.max(base, 0.6), 1.35);
  }, [viewport.width]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.x += delta * 0.35;
    group.current.rotation.y += delta * 0.25;
  });

  const material = useMemo(
    () => (
      <MeshTransmissionMaterial
        // Base “glass” (MeshTransmissionMaterial) como no tutorial  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6Mn0"}
        transmission={1}
        thickness={0.35}
        roughness={0}
        ior={1.25}
        chromaticAberration={0.03}
        distortion={0.18}
        distortionScale={0.35}
        temporalDistortion={0.15}
        samples={10}
        resolution={512}
        backside
      />
    ),
    []
  );

  if (procedural) {
    return (
      <group ref={group} scale={scale}>
        <mesh>
          <torusKnotGeometry args={[0.85, 0.28, 220, 36]} />
          {material}
        </mesh>
      </group>
    );
  }

  // IMPORTANTE: aqui é onde normalmente “some” se o path do GLB estiver errado (404).
  // Garanta que modelUrl exista em /public (ex.: /media/...) e o nome do mesh esteja correto.
  const gltf = useGLTF(modelUrl ?? "/media/torus_dan.glb") as unknown as GLTFLike;

  const pickedMesh = useMemo(() => {
    if (!gltf?.nodes) return null;
    if (meshName && gltf.nodes[meshName]) return gltf.nodes[meshName] as THREE.Mesh;
    return getFirstMeshFromNodes(gltf.nodes);
  }, [gltf, meshName]);

  // Fallback extra caso o GLB carregue mas sem nodes esperados
  if (!pickedMesh) {
    return (
      <group ref={group} scale={scale}>
        <mesh>
          <torusGeometry args={[0.95, 0.28, 64, 160]} />
          {material}
        </mesh>
      </group>
    );
  }

  // Renderiza o mesh do GLB mantendo transforms do node
  return (
    <group ref={group} scale={scale}>
      <mesh
        geometry={(pickedMesh as any).geometry}
        position={(pickedMesh as any).position}
        rotation={(pickedMesh as any).rotation}
        scale={(pickedMesh as any).scale}
      >
        {material}
      </mesh>
    </group>
  );
}

export default memo(GlassOrbImpl);

// Opcional: preload do asset (melhora tempo de pintura se o path estiver correto)
// useGLTF.preload("/media/torus_dan.glb");


// EXEMPLO DE USO (snippet) — NÃO altera seu texto do Hero, só adiciona a orb.
// src/components/Hero.tsx
/*
"use client";

import React from "react";
import HeroOrb from "@/components/three/HeroOrb";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f4f4f4] min-h-svh">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-24 lg:pt-28">
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative z-10">
            // ... seu conteúdo textual existente (NÃO precisa mudar)
          </div>

          <div className="relative z-0">
            <div className="relative aspect-16/12 w-full">
              <HeroOrb modelUrl="/media/torus_dan.glb" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
*/


Como usar este componente:

Crie os arquivos exatamente nestes caminhos:

src/components/hero/HeroOrb.tsx

src/components/hero/HeroGlassCanvas.tsx

src/components/hero/orb/GlassOrb.tsx

No seu Hero atual (sem mudar o texto), garanta:

container relative

área da orb com tamanho (ex.: aspect-[16/12] + relative)

use <HeroOrb modelUrl="/media/SEU_ARQUIVO.glb" /> apontando para o GLB real dentro de public/media.

Valide no DevTools > Network se o GLB retorna 200 (não 404). Se der 404, a orb não renderiza (mas agora o fallback procedural evita a seção “sumir”).
