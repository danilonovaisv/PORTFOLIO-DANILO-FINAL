Como usar este componente:

O projeto/stack e objetivo de implementação (Next App Router + TS + Tailwind + R3F/Drei/Three + Framer Motion + Firebase Hosting + Supabase) está alinhado ao manifesto do agente 
‌
.

Tailwind está configurado para varrer app/ e components/ como padrão de App Router 
‌
 e o PostCSS está no formato esperado para Tailwind + Autoprefixer 
‌
.

Base de CSS (body black, canvas touch-action none, container .screen-max-width) segue o padrão esperado para experiências WebGL 
‌
.

A montagem do <Canvas> segue o padrão de alpha=true, antialias=true e estratégia de fallback/suporte WebGL conforme recomendação do guia de Canvas 
‌
.

Para trocar o “ghost procedural” por um GLB real, siga o padrão Drei useGLTF/materiais (como no exemplo de referência) 
‌
 e use Supabase Storage via NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.

// FILE: package.json
{
  "name": "danilo-portfolio-ghost",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "firebase:deploy": "firebase deploy"
  },
  "dependencies": {
    "@react-three/drei": "^9.122.0",
    "@react-three/fiber": "^8.18.0",
    "@supabase/supabase-js": "^2.49.1",
    "clsx": "^2.1.1",
    "framer-motion": "latest",
    "next": "latest",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.30",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "autoprefixer": "^10.4.19",
    "eslint": "^9.3.0",
    "eslint-config-next": "latest",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.5.2"
  }
}

// FILE: next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co"
      }
    ]
  }
};

export default nextConfig;

// FILE: tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/app/*": ["app/*"],
      "@/components/*": ["components/*"],
      "@/hooks/*": ["hooks/*"],
      "@/lib/*": ["lib/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}

// FILE: postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

// FILE: tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05060A",
        ink2: "#070914",
        line: "rgba(255,255,255,0.12)",
        electric: "#1D6CFF",
        electric2: "#6CB2FF"
      },
      boxShadow: {
        header: "0 18px 80px rgba(0,0,0,0.55)"
      }
    }
  },
  plugins: []
} satisfies Config;

// FILE: app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  color: white;
  background: #000;
  overflow-x: hidden;
}

/* Evita scroll/gestos interferindo no WebGL */
canvas {
  touch-action: none;
}

/* Container editorial */
.screen-max-width {
  margin-inline: auto;
  position: relative;
  max-width: 1120px;
}

@layer utilities {
  .focus-ring {
    @apply outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-electric;
  }
}

/* Grain (sem mix-blend/mask/blur) */
.grain {
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0.09;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
  background-size: 260px 260px;
}

.vignette {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: radial-gradient(
    80% 65% at 50% 45%,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.55) 60%,
    rgba(0, 0, 0, 0.85) 100%
  );
}

// FILE: app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danilo — Portfolio (Ghost)",
  description: "Portfolio com Hero Ghost (R3F) + Header Glass (WebGL)."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}

// FILE: app/page.tsx
import SiteHeader from "@/components/header/SiteHeader";
import Hero from "@/components/hero/Hero";

export default function Page() {
  return (
    <main className="min-h-dvh bg-black">
      <SiteHeader />
      <Hero />
    </main>
  );
}

// FILE: hooks/useIsWebGLAvailable.ts
"use client";

import { useEffect, useState } from "react";

function checkWebGL(): boolean {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl") ||
      canvas.getContext("webgl2");

    return !!gl;
  } catch {
    return false;
  }
}

export function useIsWebGLAvailable() {
  // Importante: começa false para evitar mismatch SSR/hydration.
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    setAvailable(checkWebGL());
  }, []);

  return available;
}

// FILE: hooks/useWindowPointer.ts
"use client";

import { useEffect, useRef } from "react";

/**
 * Retorna um ref mutável com pointer normalizado [-1..1].
 * Funciona mesmo com canvas `pointer-events: none`.
 */
export function useWindowPointer() {
  const ref = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      ref.current = { x, y };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return ref;
}

// FILE: lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false }
  });
}

// FILE: lib/supabasePublicUrl.ts
import { getSupabaseClient } from "@/lib/supabaseClient";

export function supabasePublicUrl(bucket: string, path: string) {
  const supabase = getSupabaseClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// FILE: components/header/SiteHeader.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HeaderGlass from "@/components/header/HeaderGlass";
import MobileMenu from "@/components/header/MobileMenu";

const NAV = [
  { label: "home", href: "#home" },
  { label: "sobre", href: "#sobre" },
  { label: "portfolio showcase", href: "#portfolio" },
  { label: "contato", href: "#contato" }
] as const;

export default function SiteHeader() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  // trava scroll quando menu mobile aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const underlineTransition = useMemo(
    () => ({
      type: "tween",
      ease: [0.22, 1, 0.36, 1],
      duration: reduced ? 0 : 0.35
    }),
    [reduced]
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative">
        {/* Glass (somente desktop) */}
        <div className="hidden md:block">
          <HeaderGlass animate={!reduced} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1120px] px-5">
          <div className="relative flex h-[72px] items-center justify-between">
            <Link href="#home" className="focus-ring inline-flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-white/5">
                <span className="text-[10px] font-semibold tracking-[0.25em]">DN</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">danilo</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10 text-sm tracking-wide text-white/85">
              {NAV.map((item) => (
                <motion.div key={item.href} className="relative">
                  <Link href={item.href} className="focus-ring relative inline-flex py-1">
                    {item.label}
                  </Link>

                  <motion.span
                    className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-electric"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={underlineTransition}
                  />
                </motion.div>
              ))}
            </nav>

            {/* Mobile button */}
            <div className="md:hidden">
              <button
                type="button"
                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
                <div className="flex w-5 flex-col gap-1.5">
                  <span className="h-[2px] w-full bg-white/90" />
                  <span className="h-[2px] w-full bg-white/90" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Line divider */}
        <div className="h-px w-full bg-white/15" />
      </div>

      <AnimatePresence>
        {open ? <MobileMenu nav={NAV} onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </header>
  );
}

// FILE: components/header/MobileMenu.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function MobileMenu({
  nav,
  onClose
}: {
  nav: readonly { label: string; href: string }[];
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduced
        ? { duration: 0 }
        : {
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
            when: "beforeChildren",
            staggerChildren: 0.06
          }
    },
    exit: {
      opacity: 0,
      transition: reduced ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }
    }
  };

  const item = {
    hidden: { y: 14, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: reduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      className="md:hidden fixed inset-0 z-50 bg-black/96"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="absolute inset-x-0 top-0 h-[72px] border-b border-white/15" />
      <div className="pt-[92px] px-6">
        <motion.nav className="flex flex-col gap-6" variants={container}>
          {nav.map((n) => (
            <motion.div key={n.href} variants={item}>
              <Link
                href={n.href}
                className="focus-ring inline-flex text-2xl tracking-tight text-white/90"
                onClick={onClose}
              >
                {n.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div variants={item} className="mt-10">
          <button
            type="button"
            className="focus-ring inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/80"
            onClick={onClose}
          >
            fechar
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// FILE: components/header/HeaderGlass.tsx
"use client";

import { Canvas, extend, type ThreeElements, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useIsWebGLAvailable } from "@/hooks/useIsWebGLAvailable";

const HeaderGlassMaterial = shaderMaterial(
  {
    uTime: 0,
    uOpacity: 0.25,
    uTint: new THREE.Color("#0A0F22")
  },
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uTint;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.08;

    float n = fbm(uv * vec2(6.0, 2.0) + vec2(t, -t * 0.6));
    float m = fbm(uv * vec2(14.0, 4.0) + vec2(-t * 1.2, t));

    float band = smoothstep(0.15, 0.85, uv.x) * smoothstep(0.95, 0.45, uv.y);
    float spec = pow(smoothstep(0.35, 1.0, n), 2.2) * 0.35;

    vec3 col = uTint;
    col += vec3(0.08, 0.18, 0.35) * spec;
    col += vec3(0.02, 0.06, 0.14) * m * band;

    float alpha = uOpacity + (n * 0.06) + spec * 0.12;
    gl_FragColor = vec4(col, alpha);
  }
  `
);

extend({ HeaderGlassMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    headerGlassMaterial: ThreeElements["shaderMaterial"] & {
      uTime?: number;
      uOpacity?: number;
      uTint?: THREE.Color;
    };
  }
}

function GlassPlane({ animate }: { animate: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, dt) => {
    if (!animate) return;
    if (!mat.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mat.current as any).uniforms.uTime.value += dt;
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2, 1]} />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <headerGlassMaterial ref={mat as any} transparent depthWrite={false} />
    </mesh>
  );
}

export default function HeaderGlass({ animate }: { animate: boolean }) {
  const webgl = useIsWebGLAvailable();
  const dpr = useMemo(
    () => (typeof window === "undefined" ? 1 : Math.min(1.5, window.devicePixelRatio)),
    []
  );

  if (!webgl) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        dpr={dpr}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1], fov: 50 }}
      >
        <GlassPlane animate={animate} />
      </Canvas>
    </div>
  );
}

// FILE: components/hero/Hero.tsx
"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import GhostCanvas from "@/components/hero/GhostCanvas";
import ManifestoThumb from "@/components/manifesto/ManifestoThumb";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="home" className="relative pt-[92px]">
      <div className="relative min-h-[calc(100dvh-92px)]">
        {/* Background atmosférico */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_35%,rgba(20,40,90,0.26)_0%,rgba(0,0,0,0.9)_62%,rgba(0,0,0,1)_100%)]" />
          <div className="grain" />
          <div className="vignette" />
        </div>

        {/* Texto editorial (estático) */}
        <div className="screen-max-width relative z-10 px-5">
          <div className="relative grid min-h-[calc(100dvh-92px)] grid-cols-12 items-center gap-y-10 py-16 md:py-24">
            <div className="col-span-12 md:col-span-9">
              <div className="mb-6 text-xs tracking-[0.3em] text-white/30">
                [BRAND AWARENESS]
              </div>

              <h1 className="text-balance text-5xl font-semibold leading-[0.98] tracking-tight text-white/85 md:text-7xl">
                Design, <span className="text-white/25">não é</span>
                <br />
                <span className="text-white/85">só estética.</span>
              </h1>

              <div className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/35 md:text-lg">
                [É intenção, é estratégia, é experiência.]
              </div>

              <div className="mt-10 flex items-center gap-4">
                <Link
                  href="#sobre"
                  className="focus-ring inline-flex items-center gap-3 rounded-full bg-electric px-6 py-3 text-sm font-medium text-white shadow-[0_18px_80px_rgba(29,108,255,0.28)]"
                >
                  get to know me better
                  <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
                    ↗
                  </span>
                </Link>
              </div>
            </div>

            {/* Thumb Manifesto */}
            <div className="col-span-12 md:col-span-3 md:justify-self-end">
              <div className="md:mt-28 flex justify-start md:justify-end">
                <ManifestoThumb reducedMotion={!!reduced} />
              </div>
            </div>
          </div>
        </div>

        {/* GHOST CANVAS — acima do texto */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <GhostCanvas />
        </div>
      </div>
    </section>
  );
}

// FILE: components/hero/GhostCanvas.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { useIsWebGLAvailable } from "@/hooks/useIsWebGLAvailable";
import GhostScene from "@/components/hero/GhostScene";

export default function GhostCanvas() {
  const webgl = useIsWebGLAvailable();
  const reduced = useReducedMotion();

  const dpr = useMemo(
    () => (typeof window === "undefined" ? 1 : Math.min(1.75, window.devicePixelRatio)),
    []
  );

  if (!webgl) return null;

  return (
    <Canvas
      dpr={dpr}
      frameloop={reduced ? "demand" : "always"}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <Suspense fallback={null}>
        <GhostScene animate={!reduced} />
      </Suspense>
    </Canvas>
  );
}

// FILE: components/hero/GhostScene.tsx
"use client";

import { Billboard } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useWindowPointer } from "@/hooks/useWindowPointer";

function makeRadialTexture() {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return null;

  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(120,190,255,0.90)");
  g.addColorStop(0.35, "rgba(40,130,255,0.45)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export default function GhostScene({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const glowTex = useMemo(() => (typeof window === "undefined" ? null : makeRadialTexture()), []);
  const pointer = useWindowPointer();

  const { viewport } = useThree();

  // Posição do ghost: esquerda do título, como na referência
  const baseX = useMemo(() => -Math.min(2.1, viewport.width * 0.18), [viewport.width]);
  const baseY = 0.25;

  useFrame((state) => {
    if (!animate) return;

    const t = state.clock.getElapsedTime();
    const mx = (pointer.current.x || 0) * 0.25;
    const my = (pointer.current.y || 0) * 0.18;

    if (group.current) {
      group.current.position.x = baseX + mx;
      group.current.position.y = baseY + Math.sin(t * 0.9) * 0.06 + my;
      group.current.rotation.z = Math.sin(t * 0.6) * 0.06;
    }

    if (eyes.current) {
      eyes.current.position.x = Math.sin(t * 1.1) * 0.02;
      eyes.current.position.y = Math.cos(t * 1.2) * 0.02;
    }
  });

  return (
    <>
      {/* Luz baixa: mantém o ghost “self-lit” com emissive */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 6]} intensity={0.25} />

      <group ref={group} position={[baseX, baseY, 0]}>
        {/* Glow grande (invade letras) */}
        {glowTex ? (
          <Billboard>
            <sprite
              scale={[2.4, 2.4, 1]}
              renderOrder={10}
            >
              <spriteMaterial
                map={glowTex}
                transparent
                opacity={0.95}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                depthTest={false}
              />
            </sprite>
          </Billboard>
        ) : null}

        {/* Corpo do ghost (semi-transparente pra “atravessar” texto sem mask/blend CSS) */}
        <group renderOrder={20}>
          <mesh renderOrder={20}>
            <sphereGeometry args={[0.55, 48, 48]} />
            <meshStandardMaterial
              color="#EAF3FF"
              transparent
              opacity={0.8}
              roughness={0.35}
              metalness={0}
              emissive="#1D6CFF"
              emissiveIntensity={0.55}
              depthWrite={false}
            />
          </mesh>

          <mesh position={[0, -0.62, 0]} renderOrder={21}>
            <cylinderGeometry args={[0.55, 0.45, 0.85, 64, 1, true]} />
            <meshStandardMaterial
              color="#EAF3FF"
              transparent
              opacity={0.78}
              roughness={0.35}
              emissive="#1D6CFF"
              emissiveIntensity={0.45}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>

          {/* Base “ondas” */}
          <mesh position={[0, -1.08, 0]} renderOrder={22}>
            <circleGeometry args={[0.52, 64]} />
            <meshStandardMaterial
              color="#EAF3FF"
              transparent
              opacity={0.42}
              roughness={0.2}
              emissive="#1D6CFF"
              emissiveIntensity={0.65}
              depthWrite={false}
            />
          </mesh>

          {/* Olhos atravessando tipografia */}
          <group ref={eyes} position={[0, 0.05, 0.56]} renderOrder={30}>
            <mesh position={[-0.18, 0.05, 0]} renderOrder={31}>
              <circleGeometry args={[0.06, 32]} />
              <meshBasicMaterial
                color="#0B1020"
                transparent
                opacity={0.88}
                depthWrite={false}
                depthTest={false}
              />
            </mesh>
            <mesh position={[0.18, 0.05, 0]} renderOrder={31}>
              <circleGeometry args={[0.06, 32]} />
              <meshBasicMaterial
                color="#0B1020"
                transparent
                opacity={0.88}
                depthWrite={false}
                depthTest={false}
              />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

// FILE: components/manifesto/ManifestoThumb.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ManifestoThumb({ reducedMotion }: { reducedMotion: boolean }) {
  // placeholder: substitua pelo seu asset real via Supabase Storage /public
  const poster =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop offset='0' stop-color='%23101a3a'/%3E%3Cstop offset='1' stop-color='%23070a14'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='640' height='360' fill='url(%23g)'/%3E%3Ctext x='48' y='190' fill='white' fill-opacity='.8' font-size='40' font-family='system-ui'%3EManifesto%3C/text%3E%3C/svg%3E";

  return (
    <div className="relative">
      {/* seta indicativa */}
      <div className="pointer-events-none absolute -top-10 right-3 hidden md:block">
        <div className="text-white/80 text-2xl leading-none">↘</div>
      </div>

      <motion.a
        href="#manifesto"
        className="focus-ring relative block w-[240px] overflow-hidden rounded-xl border border-white/15 bg-white/5 shadow-header"
        initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }
        }
        whileHover={reducedMotion ? undefined : { y: -2 }}
      >
        <div className="relative aspect-video">
          <Image
            src={poster}
            alt="Manifesto — vídeo"
            fill
            sizes="240px"
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.45)_100%)]" />
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm font-medium text-white/85">assistir manifesto</div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-electric/90 text-white">
            ▶
          </div>
        </div>
      </motion.a>
    </div>
  );
}

// FILE: docs/PROMPT_AGENT_IMPLEMENTACAO.md
/**
PROMPT PARA AGENT (Copilot/Cursor) — IMPLEMENTAÇÃO FIEL (HERO + HEADER + THUMB)

OBJETIVO
- Hero Ghost WebGL acima do texto (camada superior), invadindo letras com glow, sem animar o texto.
- Header com glass WebGL sutil (desktop) e menu fullscreen staggered (mobile) sem WebGL pesado.
- Thumb manifesto com entrada editorial inspirada em loandbehold (movimento sutil, sem competir com o Ghost).

CAMADAS (Z-INDEX)
- Background atmosférico: z-0 (CSS)
- Texto editorial: z-10 (DOM)
- Ghost Canvas (Hero): z-20 (WebGL acima do texto)
- Header: z-50 (fixo no topo)
- Header Glass Canvas: dentro do header, atrás do conteúdo (z-0 local)

NÚMERO DE CANVASES
1) HeaderGlass Canvas (desktop only) — efeito “fluid glass” via shader em plano
2) GhostCanvas (Hero) — ghost/glow acima do texto

REGRAS
- NÃO animar texto
- NÃO usar blur/mask/mix-blend-mode via CSS
- Preferir ajustes por: z-index + transparência/material + depthWrite/depthTest + renderOrder

CHECKLIST VISUAL
- Ghost aparece sobre o título (olhos atravessam o texto)
- Glow azul invade a tipografia
- Header não “corta” visualmente o ghost
- Mobile: menu abre em fullscreen com stagger
- prefers-reduced-motion: desliga animações (ghost fica estático, thumb sem entrance)
**/

// FILE: docs/ANALISE_ANIMACOES_E_INTERACOES.md
/**
ANÁLISE (para Agents)
====================

Observação:
- Este repositório não contém o HTML/CSS/JS do CodePen https://codepen.io/filipz/pen/GgpMOEq dentro dos arquivos disponíveis localmente,
  então esta análise descreve O QUE INSPECIONAR e COMO REPRODUZIR no stack (Next+R3F+Framer) sem "inventar" layout.
  Se você colar aqui o JS/CSS do CodePen, o agent deve atualizar este doc com timings e easing exatos.

1) HERO (animação/vida)
- Texto: 100% estático (zero motion).
- Ghost: micro-movimento contínuo (float) + micro-parallax no mouse.
  - Float: sin(t) com amplitude ~0.06 no Y e rotação Z ~0.06 (sutil).
  - Parallax: pointer [-1..1] com ganho baixo (0.18~0.25).
  - Easing: contínuo (seno), sem "snaps".
- Glow: sprite additive (não CSS) para invadir letras sem mix-blend.

2) HEADER
- Desktop: “fluid glass” via shader (uTime animado), opacidade baixa.
- Mobile: sem WebGL pesado (HeaderGlass desativado via breakpoint e Menu em fullscreen).

3) THUMB MANIFESTO (entrada)
- Entrada editorial (Framer Motion):
  - initial: opacity 0, y 14, scale 0.985
  - animate: opacity 1, y 0, scale 1
  - duration ~0.55, delay ~0.25, ease [0.22, 1, 0.36, 1]
- Hover: y -2 (muito sutil), sem competir com a hero.

4) Preferências do usuário
- prefers-reduced-motion: desliga floats, desliga entrada do manifesto e anima do glass.

5) Organização e camadas
- z-0: background (radial + grain + vignette)
- z-10: conteúdo editorial
- z-20: ghost webgl
- z-50: header
**/

// FILE: docs/REVIEW_PROBLEMAS_E_DECISOES.md
/**
PROBLEMAS COMUNS QUE ESTE PATCH EVITA
=====================================
1) Ghost "atrás" do texto:
- Solução: Canvas do Ghost em layer DOM acima (z-20) com material semi-transparente e depthWrite false.

2) Pointer parallax não funciona com pointer-events none:
- Solução: hook useWindowPointer escuta window.pointermove e alimenta o useFrame.

3) Hidratação (SSR mismatch) em detecção de WebGL:
- Solução: useIsWebGLAvailable inicia em false e define no useEffect.

4) HeaderGlass competindo com a Hero:
- Solução: shader muito sutil, atrás do conteúdo do header e apenas desktop.

5) Next/Image com data URL gerando warning:
- Solução: unoptimized + sizes fixo.
**/

// FILE: firebase.json
{
  "hosting": {
    "source": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "frameworksBackend": {}
  }
}

// FILE: .firebaserc
{
  "projects": {
    "default": "SEU_PROJECT_ID_AQUI"
  }
}

// FILE: README_FIREBASE_DEPLOY.md
/**
1) Instale Firebase CLI:
   npm i -g firebase-tools

2) Login:
   firebase login

3) Set project:
   firebase use --add

4) Deploy:
   npm run build
   firebase deploy

Obs: este setup usa frameworksBackend do Firebase Hosting (SSR/Next).
**/
