// src/layouts/Header.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

type HeaderProps = {
  title?: string;
  subtitle?: string;
};

function FloatingGem() {
  const meshRef = React.useRef<THREE.Mesh>(null);

  const material = React.useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#dbeafe'),
      metalness: 0.05,
      roughness: 0.12,
      transmission: 1,
      thickness: 1.1,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      attenuationColor: new THREE.Color('#60a5fa'),
      attenuationDistance: 0.55,
    });
    return m;
  }, []);

  useFrame((state, delta) => {
    const m = meshRef.current;
    if (!m) return;
    const t = state.clock.elapsedTime;

    m.rotation.y += delta * 0.45;
    m.rotation.x = Math.sin(t * 0.7) * 0.22;
    m.position.y = Math.sin(t * 0.9) * 0.22;
  });

  return (
    <mesh ref={meshRef} material={material} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.25, 2]} />
    </mesh>
  );
}

function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
      className="absolute inset-0 h-full w-full"
    >
      <color attach="background" args={['#000000']} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={1.35} color="#e0f2fe" />
      <directionalLight
        position={[-6, -2, 4]}
        intensity={0.6}
        color="#93c5fd"
      />

      <React.Suspense fallback={null}>
        <Environment preset="city" />
      </React.Suspense>

      <FloatingGem />

      <Sparkles
        count={90}
        size={1.35}
        speed={0.35}
        opacity={0.65}
        noise={0.6}
        color="#93c5fd"
        scale={[10, 6, 10]}
      />
    </Canvas>
  );
}

export default function Header({
  title = 'Experiências imersivas',
  subtitle = 'Next.js + R3F + Drei + Framer Motion',
}: HeaderProps) {
  const reduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollYSmoothed = useSpring(scrollY, { stiffness: 120, damping: 20 });
  const headerOpacity = useTransform(scrollYSmoothed, [0, 220], [1, 0.92]);
  const headerBlur = useTransform(scrollYSmoothed, [0, 220], [0, 10]);

  return (
    <header className="relative overflow-hidden bg-neutral-950 text-white">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-neutral-900"
      >
        Pular para o conteúdo
      </a>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(65%_55%_at_50%_45%,black,transparent)]">
          <HeroCanvas />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-950/60 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_40%,rgba(59,130,246,0.25),transparent_60%)]" />
      </div>

      <motion.div
        style={{
          opacity: headerOpacity,
          backdropFilter: reduceMotion
            ? undefined
            : (headerBlur as unknown as string),
          WebkitBackdropFilter: reduceMotion
            ? undefined
            : (headerBlur as unknown as string),
        }}
        className="relative z-10 border-b border-white/10 bg-neutral-950/40"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-semibold tracking-tight"
            aria-label="Ir para a página inicial"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_24px_rgba(125,211,252,0.55)]" />
            </span>
            <span className="text-white/90 group-hover:text-white">Danilo</span>
          </Link>

          <nav
            className="hidden items-center gap-6 text-sm text-white/75 md:flex"
            aria-label="Navegação principal"
          >
            <Link href="/#projetos" className="hover:text-white">
              Projetos
            </Link>
            <Link href="/#sobre" className="hover:text-white">
              Sobre
            </Link>
            <Link href="/#contato" className="hover:text-white">
              Contato
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#contato"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm shadow-black/30 transition hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-sky-300/80 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              Vamos conversar
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-14 md:px-6 md:pb-24 md:pt-18">
        <motion.div
          initial={reduceMotion ? false : { y: 10, opacity: 0 }}
          animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
            WebGL • R3F • UI Motion
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            {title}
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-white/75 md:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#projetos"
              className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-black/30 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300/80 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              Ver projetos
            </Link>
            <Link
              href="/#sobre"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-300/80 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              Sobre mim
            </Link>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '../layouts/Header';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh bg-neutral-950 text-white antialiased">
        <Header />
        <main id="conteudo">{children}</main>
      </body>
    </html>
  );
}
