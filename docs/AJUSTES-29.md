
 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER - HEADER=["https://reactbits.dev/components/fluid-glass?p=%7B%2522mode%2522:%2522bar%2522%7D”]
2. /docs/REFERENCIA_HERO-GHOST - HERO=["https://codepen.io/danilonovaisv/pen/azZbdQo"] 



/* ======================================================================
✅ REVIEW / PROBLEMAS ENCONTRADOS NO CÓDIGO ATUAL (RESUMO)
======================================================================

1) HERO (NON-NEGOTIABLES)
   - O texto editorial estava com opacity animada via scroll (useTransform),
     o que conflita com “Hero editorial e silenciosa” / “sem texto animado”.
     Ajuste: HeroCopy fica 100% estático (sem fade) e o vídeo “cobre” o texto
     naturalmente ao crescer (z-index).

2) FEATURED PROJECTS
   - Havia lógica tratando .gif como <video>. GIF não é vídeo e não toca em <video>.
     Ajuste: GIF renderiza como <Image unoptimized> (ou <img>), mantendo animação.

3) PORTFOLIO SHOWCASE (REDUCED MOTION)
   - Em reduced motion, o hover reveal de thumbnail deveria ficar estático (sem animação).
     Ajuste: se prefers-reduced-motion, thumbnail aparece sem animação (scaleX=1).

4) NAVEGAÇÃO (NEXT.JS APP ROUTER)
   - Navegação para rotas estava usando window.location.href (full reload).
     Ajuste: usar useRouter().push para rotas internas (App Router), mantendo smooth scroll
     para âncoras e mantendo externo via <a>.

5) A11Y / UX
   - Ordem dos emails no Contact estava invertida em relação à spec (primário vs secundário).
     Ajuste: email primário primeiro (danilo@...).

6) PERFORMANCE (WEBGL)
   - Mantido: dynamic import (client-only), antialias false, DPR limitado.
   - Mantido: prefers-reduced-motion desativa follow do cursor / “parallax” e reduz animações.

====================================================================== */


/* ======================================================================
File: src/components/header/headerTokens.ts
====================================================================== */
export const HEADER_TOKENS = {
  zIndex: 40,
  desktop: {
    height: 64,
    maxTranslateX: 56,
    maxScaleX: 1.05,
    maxScaleY: 1.02,
    followDamping: 18,
  },
  mobile: {
    height: 56,
    staggerDelay: 0.08,
  },
  colors: {
    primary: "#0057FF",
    bgDark: "#06071f",
    text: "#0b0b0e",
    textInverse: "#ffffff",
  },
} as const;


/* ======================================================================
File: src/components/header/types.ts
====================================================================== */
export interface NavItem {
  label: string;
  href: string; // "#hero" | "/sobre" | "/portfolio" etc
  external?: boolean;
}

export interface SiteHeaderProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string]; // mobile overlay gradient
  accentColor: string;
  disableWebGL?: boolean;
}


/* ======================================================================
File: src/components/webgl/header/HeaderGlassCanvas.tsx
====================================================================== */
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import React, { memo, useMemo, useRef } from "react";
import * as THREE from "three";

function GlassPlane({ accentColor }: { accentColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uAccent: { value: new THREE.Color(accentColor) },
        uOpacity: { value: 0.55 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uAccent;
        uniform float uOpacity;

        float hash(vec2 p){
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main(){
          vec2 uv = vUv;
          float n1 = noise(uv * 6.0 + vec2(uTime * 0.08, uTime * 0.06));
          float n2 = noise(uv * 10.0 - vec2(uTime * 0.10, uTime * 0.04));
          float n = mix(n1, n2, 0.55);

          float edge = smoothstep(0.0, 0.02, uv.x) + smoothstep(1.0, 0.98, uv.x)
                     + smoothstep(0.0, 0.02, uv.y) + smoothstep(1.0, 0.98, uv.y);
          edge = clamp(edge, 0.0, 1.0);

          vec3 base = vec3(0.05, 0.06, 0.12);
          vec3 tint = mix(base, uAccent, 0.55);

          float gloss = 0.35 + n * 0.35;
          vec3 col = mix(base, tint, gloss);
          col += edge * (uAccent * 0.45);

          float band = smoothstep(0.25, 0.0, abs(uv.y - (0.35 + 0.05*sin(uTime*0.25))));
          col += band * uAccent * 0.12;

          gl_FragColor = vec4(col, uOpacity);
        }
      `,
    });

    return mat;
  }, [accentColor]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

const HeaderGlassCanvas = memo(function HeaderGlassCanvas({ accentColor }: { accentColor: string }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, premultipliedAlpha: true }}
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
    >
      <GlassPlane accentColor={accentColor} />
    </Canvas>
  );
});

export default HeaderGlassCanvas;


/* ======================================================================
File: src/components/header/DesktopFluidHeader.tsx
====================================================================== */
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useCallback, useMemo, useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import type { NavItem } from "./types";
import { HEADER_TOKENS } from "./headerTokens";

const HeaderGlassCanvas = dynamic(() => import("@/components/webgl/header/HeaderGlassCanvas"), {
  ssr: false,
});

export interface DesktopFluidHeaderProps {
  navItems: NavItem[];
  logoUrl: string;
  accentColor: string;
  disableWebGL?: boolean;
  onNavigate: (href: string) => void;
  activeHref?: string;
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export default function DesktopFluidHeader({
  navItems,
  logoUrl,
  accentColor,
  disableWebGL,
  onNavigate,
  activeHref,
}: DesktopFluidHeaderProps) {
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 180, damping: 22, mass: 0.6 });
  const scaleX = useSpring(1, { stiffness: 140, damping: 20, mass: 0.6 });
  const scaleY = useSpring(1, { stiffness: 140, damping: 20, mass: 0.6 });

  const maxTranslateX = HEADER_TOKENS.desktop.maxTranslateX;

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reducedMotion) return;
      const el = wrapRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const centered = (px - 0.5) * 2; // -1..1

      x.set(centered * maxTranslateX);
      scaleX.set(HEADER_TOKENS.desktop.maxScaleX);
      scaleY.set(HEADER_TOKENS.desktop.maxScaleY);
    },
    [maxTranslateX, reducedMotion, scaleX, scaleY, x]
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    scaleX.set(1);
    scaleY.set(1);
  }, [scaleX, scaleY, x]);

  const nav = useMemo(() => navItems, [navItems]);

  return (
    <header className="hidden lg:block fixed top-6 left-0 right-0 z-[40] pointer-events-none">
      <motion.div
        ref={wrapRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ x, scaleX, scaleY }}
        className="pointer-events-auto mx-auto w-[min(1100px,calc(100vw-48px))]"
      >
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            height: HEADER_TOKENS.desktop.height,
            boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
          }}
        >
          {/* glass background */}
          <div className="absolute inset-0">
            {!disableWebGL && !reducedMotion ? (
              <HeaderGlassCanvas accentColor={accentColor} />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
              />
            )}
          </div>

          {/* subtle border */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          />

          {/* content */}
          <div className="relative z-10 h-full px-6 flex items-center justify-between gap-6">
            <Link
              href="/"
              aria-label="Ir para Home"
              className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt="Danilo" className="h-6 w-auto" />
            </Link>

            <nav aria-label="Navegação principal" className="flex items-center gap-7">
              {nav.map((item) => {
                const isActive = activeHref === item.href;

                const common =
                  "text-white/80 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md";
                const active = isActive ? "text-white" : "";
                const underline = isActive ? "after:w-full" : "after:w-0 group-hover:after:w-full";

                if (isExternalHref(item.href) || item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative ${common} ${active}`}
                    >
                      <span className="text-[15px] font-medium tracking-tight">{item.label}</span>
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-[#0057FF] transition-all duration-200 ${underline}`}
                      />
                    </a>
                  );
                }

                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => onNavigate(item.href)}
                    className={`group relative ${common} ${active}`}
                  >
                    <span className="text-[15px] font-medium tracking-tight">{item.label}</span>
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-[#0057FF] transition-all duration-200 ${underline}`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.div>
    </header>
  );
}


/* ======================================================================
File: src/components/header/MobileStaggeredMenu.tsx
====================================================================== */
"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { NavItem } from "./types";
import { HEADER_TOKENS } from "./headerTokens";

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string];
  accentColor: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export default function MobileStaggeredMenu({
  navItems,
  logoUrl,
  gradient,
  isOpen,
  onOpen,
  onClose,
  onNavigate,
}: MobileStaggeredMenuProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const panelVariants = {
    closed: { x: "100%", transition: { duration: reducedMotion ? 0 : 0.18 } },
    open: { x: 0, transition: { type: "spring", stiffness: 260, damping: 30 } },
  };

  const overlayVariants = {
    closed: { opacity: 0, transition: { duration: reducedMotion ? 0 : 0.18 } },
    open: { opacity: 1, transition: { duration: reducedMotion ? 0 : 0.18 } },
  };

  const listVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: reducedMotion ? 0 : HEADER_TOKENS.mobile.staggerDelay,
        delayChildren: reducedMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 16 },
    open: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.22 } },
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-[40]">
      <div
        className="h-[56px] px-4 flex items-center justify-between"
        style={{
          background: "rgba(6, 7, 31, 0.72)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <Link
          href="/"
          aria-label="Ir para Home"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06071f] rounded-md"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="Danilo" className="h-6 w-auto" />
        </Link>

        <button
          type="button"
          onClick={isOpen ? onClose : onOpen}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          className="h-10 w-10 grid place-items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06071f]"
        >
          <div className="relative h-5 w-6">
            <span
              className={`absolute left-0 top-1 h-[2px] w-full bg-white transition-transform duration-200 ${
                isOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full bg-white transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 bottom-1 h-[2px] w-full bg-white transition-transform duration-200 ${
                isOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[45]" initial="closed" animate="open" exit="closed">
            <motion.button
              type="button"
              aria-label="Fechar menu (overlay)"
              className="absolute inset-0 w-full h-full"
              variants={overlayVariants}
              onClick={onClose}
              style={{
                background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
              }}
            />

            <motion.aside
              className="absolute top-0 right-0 h-full w-[min(420px,92vw)] px-6 pt-20 pb-10"
              variants={panelVariants}
              style={{
                background: "rgba(6, 7, 31, 0.92)",
                borderLeft: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <motion.nav aria-label="Menu mobile" variants={listVariants} className="space-y-6">
                {navItems.map((item) => {
                  const isExternal = isExternalHref(item.href) || item.external;

                  if (isExternal) {
                    return (
                      <motion.a
                        key={item.href}
                        variants={itemVariants}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-white text-3xl font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md"
                        onClick={onClose}
                      >
                        {item.label}
                      </motion.a>
                    );
                  }

                  return (
                    <motion.button
                      key={item.href}
                      type="button"
                      variants={itemVariants}
                      className="block text-left w-full text-white text-3xl font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md"
                      onClick={() => onNavigate(item.href)}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </motion.nav>

              <div className="mt-10 pt-8 border-t border-white/10 text-white/70 text-sm">
                <p className="mb-2">Atalhos</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    className="underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded"
                    href="mailto:danilo@portfoliodanilo.com"
                  >
                    Email
                  </a>
                  <a
                    className="underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded"
                    href="https://instagram.com/danilo_novais"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                  <a
                    className="underline underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded"
                    href="https://linkedin.com/in/danilonovais"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


/* ======================================================================
File: src/components/header/useActiveSection.ts
====================================================================== */
"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], rootMargin = "-45% 0px -45% 0px") {
  const [active, setActive] = useState<string>("#hero");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { root: null, threshold: [0.15, 0.25, 0.35], rootMargin }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [rootMargin, sectionIds]);

  return active;
}


/* ======================================================================
File: src/components/header/SiteHeader.tsx
====================================================================== */
"use client";

import React, { useCallback, useMemo, useState } from "react";
import type { NavItem, SiteHeaderProps } from "./types";
import DesktopFluidHeader from "./DesktopFluidHeader";
import MobileStaggeredMenu from "./MobileStaggeredMenu";
import { useActiveSection } from "./useActiveSection";
import { useRouter } from "next/navigation";

function isHashHref(href: string) {
  return href.startsWith("#");
}

function scrollToHash(hashHref: string) {
  const id = hashHref.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export default function SiteHeader({ navItems, logoUrl, gradient, accentColor, disableWebGL }: SiteHeaderProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const sectionIds = useMemo(
    () => navItems.filter((n) => isHashHref(n.href)).map((n) => n.href.replace("#", "")),
    [navItems]
  );

  const activeHref = useActiveSection(sectionIds);

  const onNavigate = useCallback(
    (href: string) => {
      if (isHashHref(href)) {
        scrollToHash(href);
        setIsOpen(false);
        return;
      }

      if (isExternalHref(href)) {
        window.open(href, "_blank", "noopener,noreferrer");
        setIsOpen(false);
        return;
      }

      router.push(href);
      setIsOpen(false);
    },
    [router]
  );

  const normalizedNavItems: NavItem[] = useMemo(() => navItems, [navItems]);

  return (
    <>
      <DesktopFluidHeader
        navItems={normalizedNavItems}
        logoUrl={logoUrl}
        accentColor={accentColor}
        disableWebGL={disableWebGL}
        onNavigate={onNavigate}
        activeHref={activeHref}
      />

      <MobileStaggeredMenu
        navItems={normalizedNavItems}
        logoUrl={logoUrl}
        gradient={gradient}
        accentColor={accentColor}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}


/* ======================================================================
File: src/components/home/webgl/GhostCanvas.tsx
====================================================================== */
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise, Vignette, Scanline } from "@react-three/postprocessing";
import React, { memo, useMemo, useRef } from "react";
import * as THREE from "three";

function Ghost({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ghostMesh = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Vector3(0, 0, 0));

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0b0d3a"),
      emissive: new THREE.Color("#0057FF"),
      emissiveIntensity: 2.0,
      roughness: 0.35,
      metalness: 0.0,
    });
  }, []);

  useFrame((state) => {
    if (!group.current || !ghostMesh.current) return;

    const t = state.clock.elapsedTime;

    if (!reducedMotion) {
      const mx = (state.pointer.x ?? 0) * 0.75;
      const my = (state.pointer.y ?? 0) * 0.35;
      target.current.set(mx, my, 0);

      group.current.position.lerp(target.current, 0.08);
      group.current.position.y += Math.sin(t * 0.8) * 0.06;
      group.current.rotation.z = Math.sin(t * 0.35) * 0.08;
    }

    material.emissiveIntensity = 2.0 + Math.sin(t * 1.2) * 0.25;

    const s = 1.0 + Math.sin(t * 0.9) * 0.035;
    ghostMesh.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <mesh ref={ghostMesh} material={material}>
        <sphereGeometry args={[0.7, 64, 64]} />
      </mesh>

      <mesh position={[-0.22, 0.08, 0.55]}>
        <sphereGeometry args={[0.10, 24, 24]} />
        <meshStandardMaterial emissive={"#ffffff"} emissiveIntensity={2.6} color={"#0b0d3a"} />
      </mesh>

      <mesh position={[0.22, 0.08, 0.55]}>
        <sphereGeometry args={[0.10, 24, 24]} />
        <meshStandardMaterial emissive={"#ffffff"} emissiveIntensity={2.6} color={"#0b0d3a"} />
      </mesh>
    </group>
  );
}

function Particles({ count = 800, reducedMotion }: { count?: number; reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(0.8, 3.0);
      const theta = Math.random() * Math.PI * 2;
      const y = THREE.MathUtils.randFloatSpread(1.8);
      pos[i * 3 + 0] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r - 0.5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!points.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.05;
    points.current.rotation.x = Math.sin(t * 0.12) * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={"#FFFFFF"}
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function Fireflies({ count = 28, reducedMotion }: { count?: number; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      key: i,
      x: THREE.MathUtils.randFloatSpread(3.2),
      y: THREE.MathUtils.randFloatSpread(1.6),
      z: THREE.MathUtils.randFloat(-1.2, 1.2),
      s: THREE.MathUtils.randFloat(0.02, 0.05),
      sp: THREE.MathUtils.randFloat(0.6, 1.4),
      ph: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, idx) => {
      const it = items[idx];
      child.position.y = it.y + Math.sin(t * it.sp + it.ph) * 0.18;
      child.position.x = it.x + Math.cos(t * (it.sp * 0.7) + it.ph) * 0.12;
    });
  });

  return (
    <group ref={group}>
      {items.map((it) => (
        <mesh key={it.key} position={[it.x, it.y, it.z]}>
          <sphereGeometry args={[it.s, 12, 12]} />
          <meshStandardMaterial emissive={"#5227FF"} emissiveIntensity={2.5} color={"#06071f"} />
        </mesh>
      ))}
    </group>
  );
}

const GhostCanvas = memo(function GhostCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: false, alpha: true }} camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 3, 5]} intensity={0.85} color={"#9fb8ff"} />
      <pointLight position={[-3, 0.5, 2]} intensity={1.2} color={"#0057FF"} />

      <Ghost reducedMotion={reducedMotion} />
      <Particles reducedMotion={reducedMotion} />
      <Fireflies reducedMotion={reducedMotion} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={2.8} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur />
        <Noise opacity={0.12} />
        <Scanline density={1.25} opacity={0.18} />
        <Vignette eskil={false} offset={0.25} darkness={0.55} />
      </EffectComposer>
    </Canvas>
  );
});

export default GhostCanvas;


/* ======================================================================
File: src/components/home/GhostStage.tsx
====================================================================== */
"use client";

import dynamic from "next/dynamic";
import React from "react";
import { useReducedMotion } from "framer-motion";

const GhostCanvas = dynamic(() => import("@/components/home/webgl/GhostCanvas"), { ssr: false });

export default function GhostStage() {
  const reducedMotion = useReducedMotion();
  return <GhostCanvas reducedMotion={!!reducedMotion} />;
}


/* ======================================================================
File: src/components/home/Preloader.tsx
====================================================================== */
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Preloader() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: reducedMotion ? 0.5 : 1.5, duration: reducedMotion ? 0.35 : 1 }}
      className="fixed inset-0 z-[50] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}
    >
      <svg className="mb-4" height="80" viewBox="0 0 512 512" width="80" aria-hidden="true">
        <path
          fill="white"
          d="M508.3 432.8s-46.6-39-79.5-275.8C420 69.3 346 0 256 0S92 69.3 83.2 157C50.3 393.7 3.7 432.8 3.7 432.8-11.4 458 24.4 461 42.4 460.7c35.3-.5 35.3 40.3 70.5 40.3s35.3-35.3 70.5-35.3 37.4 45.3 72.7 45.3 37.4-45.3 72.7-45.3 35.3 35.3 70.5 35.3 35.3-40.8 70.6-40.3c18 0.3 53.8-2.8 38.7-27.9z"
        />
      </svg>

      <p className="font-mono text-xs uppercase tracking-widest text-[#e0e0e0] mb-2">Summoning spirits</p>

      <div className="w-24 h-0.5 bg-[#06071f] rounded-full overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #0057FF 0%, #5227FF 100%)" }}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: reducedMotion ? 0.8 : 2 }}
        />
      </div>
    </motion.div>
  );
}


/* ======================================================================
File: src/components/home/HeroCopy.tsx
====================================================================== */
"use client";

import React from "react";

export default function HeroCopy() {
  return (
    <div className="text-[#d9dade] max-w-3xl mx-auto">
      <p className="font-mono text-sm uppercase tracking-widest mb-3">[BRAND AWARENESS]</p>

      <h1 className="font-bold text-5xl md:text-6xl leading-tight mb-6">
        Design, não
        <br />
        é só estética.
      </h1>

      <p className="text-lg mb-8">[É intenção, é estratégia, é experiência.]</p>

      <a
        href="/sobre"
        aria-label="Ir para a página Sobre"
        className="inline-flex items-center gap-2 text-[#d9dade] hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded"
      >
        get to know me better <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}


/* ======================================================================
File: src/components/home/ManifestoThumb.tsx
====================================================================== */
"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ManifestoThumb({ muted = true }: { muted?: boolean }) {
  const reducedMotion = useReducedMotion();

  const src = useMemo(
    () =>
      "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4",
    []
  );

  return (
    <motion.video
      src={src}
      autoPlay
      muted={muted}
      loop
      playsInline
      className="w-full h-full object-cover cursor-pointer"
      whileHover={reducedMotion ? undefined : { scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  );
}


/* ======================================================================
File: src/components/home/ManifestoSection.tsx
====================================================================== */
"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function ManifestoSection() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ duration: reducedMotion ? 0.25 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block md:hidden w-full bg-[#06071f] aspect-video overflow-hidden"
      aria-label="Manifesto (vídeo)"
    >
      <video
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.section>
  );
}


/* ======================================================================
File: src/components/home/HomeHero.tsx
====================================================================== */
"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Preloader from "./Preloader";
import HeroCopy from "./HeroCopy";
import ManifestoThumb from "./ManifestoThumb";
import GhostStage from "./GhostStage";
import ManifestoSection from "./ManifestoSection";

export default function HomeHero() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Desktop morph (thumb -> fullscreen)
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [0.32, 1]);
  const xVideo = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const rightVideo = useTransform(scrollYProgress, [0, 1], ["40px", "50%"]);
  const bottomVideo = useTransform(scrollYProgress, [0, 1], ["40px", "50%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["16px", "0px"]);

  return (
    <>
      <section
        id="hero"
        ref={ref}
        className="relative h-[200vh] overflow-hidden"
        style={{
          background: "radial-gradient(circle at 30% 30%, #0b0d3a 0%, #06071f 55%, #06071f 100%)",
        }}
        aria-label="Hero"
      >
        <Preloader />

        {/* sticky stage */}
        <div className="sticky top-0 h-screen">
          {/* WebGL Layer */}
          <div className="absolute inset-0 z-20">
            <GhostStage />
          </div>

          {/* Editorial Copy (SEM animação / SEM binding de scroll) */}
          <div className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center px-6">
            <HeroCopy />
          </div>

          {/* Manifesto Thumb - Desktop */}
          <motion.div
            aria-label="Vídeo manifesto"
            className="absolute z-30 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.55)] hidden md:block"
            style={{
              width: "min(520px, 34vw)",
              aspectRatio: "16/9",
              right: reducedMotion ? "40px" : (rightVideo as unknown as string),
              bottom: reducedMotion ? "40px" : (bottomVideo as unknown as string),
              x: reducedMotion ? "0%" : (xVideo as unknown as string),
              y: reducedMotion ? "0%" : (yVideo as unknown as string),
              scale: reducedMotion ? 1 : scaleVideo,
              borderRadius,
            }}
            onClick={() => {
              // Desktop click: "skip" -> scroll to end of hero
              if (typeof window === "undefined") return;
              if (window.innerWidth >= 768) {
                const top =
                  (ref.current?.offsetTop ?? 0) +
                  (ref.current?.clientHeight ?? 0) -
                  window.innerHeight;
                window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
              }
            }}
          >
            <ManifestoThumb muted />
            <div className="pointer-events-none absolute top-3 right-3">
              <div className="h-9 w-9 rounded-full bg-white/10 border border-white/15 grid place-items-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="-rotate-45">
                  <path d="M7 17L17 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 7H17V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile manifesto como seção independente */}
      <ManifestoSection />
    </>
  );
}


/* ======================================================================
File: src/components/ui/ArrowIcon.tsx
====================================================================== */
import React from "react";

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


/* ======================================================================
File: src/components/ui/PrimaryButton.tsx
====================================================================== */
import Link from "next/link";
import React from "react";

export function PrimaryButton({
  href,
  children,
  variant = "outline",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "outline" | "solid";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

  const styles =
    variant === "solid"
      ? "bg-[#0057FF] text-white hover:brightness-110"
      : "border border-[#0057FF] text-[#0057FF] hover:bg-[#0057FF] hover:text-white";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}


/* ======================================================================
File: src/components/home/PortfolioShowcaseSection.tsx
====================================================================== */
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

type Category = {
  id: string;
  title: string;
  align: "start" | "center" | "end";
  thumb: string;
  ariaLabel: string;
};

function AlignClass(align: Category["align"]) {
  switch (align) {
    case "start":
      return "md:justify-start";
    case "center":
      return "md:justify-center";
    case "end":
      return "md:justify-end";
  }
}

function AccordionRow({ category }: { category: Category }) {
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href={`/portfolio?category=${encodeURIComponent(category.id)}`}
      className={`group flex w-full border-t border-[#0057FF]/50 py-8 md:py-14 items-center transition-colors ${AlignClass(
        category.align
      )} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md`}
      aria-label={category.ariaLabel}
    >
      <div className="flex items-center gap-5 md:gap-7 group-hover:gap-10 transition-[gap] duration-300 w-full">
        {/* Thumbnail revealer (no layout shift): fixed width, animate scaleX */}
        <div className="hidden md:block w-72 h-40 shrink-0 overflow-hidden rounded-md relative">
          <motion.div className="absolute inset-0 origin-left" style={{ willChange: "transform,opacity" }}
            initial={false}
            animate={reducedMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            whileHover={reducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={category.thumb} alt="" fill unoptimized className="object-cover" aria-hidden="true" />
          </motion.div>
        </div>

        <h3 className="text-2xl md:text-5xl/none font-medium whitespace-nowrap text-[#111111]">{category.title}</h3>

        <div className="ml-auto md:ml-0 bg-[#0057FF] rounded-full p-2.5 md:p-3.5 shrink-0">
          <ArrowIcon className="text-white w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioShowcaseSection() {
  const reducedMotion = useReducedMotion();

  const categories: Category[] = [
    {
      id: "brand-campaigns",
      title: "Brand & Campaigns",
      align: "end",
      thumb: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp",
      ariaLabel: "Ver projetos de Brand & Campaigns",
    },
    {
      id: "videos-motions",
      title: "Videos & Motions",
      align: "center",
      thumb: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif",
      ariaLabel: "Ver projetos de Videos & Motions",
    },
    {
      id: "websites-webcampaigns-tech",
      title: "Web Campaigns, Websites & Tech",
      align: "start",
      thumb: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp",
      ariaLabel: "Ver projetos de Web Campaigns, Websites & Tech",
    },
  ];

  return (
    <section id="portfolio-showcase" aria-label="Portfolio Categories" className="bg-[#F4F5F7] py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] relative">
        <div className="hidden md:block absolute left-[clamp(24px,5vw,96px)] -translate-y-16">
          <span className="text-[#0057FF] uppercase tracking-widest font-mono mix-blend-difference">[what we love working on]</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-bold text-center mb-14 md:mb-20 text-[#111111]"
        >
          portfólio showcase
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.12 } } }}
          className="flex flex-col gap-10 md:gap-14"
        >
          {categories.map((c) => (
            <motion.div
              key={c.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.2 : 0.7 } },
              }}
            >
              <AccordionRow category={c} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 flex flex-col md:flex-row md:justify-center gap-6">
          <PrimaryButton href="/portfolio" variant="outline">
            Ver todos os projetos →
          </PrimaryButton>
          <PrimaryButton href="/#contact" variant="solid">
            let&apos;s build something great →
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}


/* ======================================================================
File: src/components/home/FeaturedProjectsSection.tsx
====================================================================== */
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

type FeaturedProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: number;
  tags: string[];
  image: string;
  layout: { h: string };
};

const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    slug: "magic-radio-branding",
    title: "Magic — devolvendo a magia ao rádio",
    category: "branding & campanha",
    client: "Magic",
    year: 2023,
    tags: ["Branding", "Strategy", "Campaign"],
    image: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp",
    layout: { h: "h-[500px]" },
  },
  {
    id: 2,
    slug: "branding-project-01",
    title: "Uma marca ousada e consistente",
    category: "branding",
    client: "Cliente confidencial",
    year: 2022,
    tags: ["Branding", "Identity"],
    image: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp",
    layout: { h: "h-[500px]" },
  },
  {
    id: 3,
    slug: "key-visual-campaign",
    title: "Key visual para campanha sazonal",
    category: "campanha",
    client: "Cliente confidencial",
    year: 2021,
    tags: ["Campaign", "Print", "Art Direction"],
    image: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp",
    layout: { h: "h-[600px]" },
  },
  {
    id: 4,
    slug: "webdesigner-motion",
    title: "Experiência web em movimento",
    category: "web & motion",
    client: "Cliente confidencial",
    year: 2023,
    tags: ["Web", "Motion", "UX"],
    image: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif",
    layout: { h: "h-[400px]" },
  },
];

function ProjectCard({ project }: { project: FeaturedProject }) {
  const reducedMotion = useReducedMotion();
  const isGif = project.image.toLowerCase().endsWith(".gif");

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md"
      aria-label={`Ver projeto: ${project.title}`}
    >
      <div className={`relative overflow-hidden rounded-md ${project.layout.h} w-full`}>
        <div className="absolute top-4 right-4 z-20 flex gap-1.5 flex-wrap justify-end">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-[#E6EFEF]/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#111111]">
              {tag}
            </span>
          ))}
        </div>

        {/* Media: GIF como imagem (não vídeo) */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-transform duration-500 ${
            reducedMotion ? "" : "group-hover:scale-[1.03] group-hover:-translate-y-1"
          }`}
        />
      </div>

      <div className="mt-4 flex justify-between items-start gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-medium leading-tight text-[#111111]">{project.title}</h3>
          <p className="text-[#6B7280] text-sm">
            {project.client} • {project.year}
          </p>
        </div>

        <div
          className={`bg-[#0057FF] p-2.5 rounded-full aspect-square flex items-center justify-center text-white shrink-0 transition-transform duration-700 ${
            reducedMotion ? "" : "group-hover:translate-x-5"
          }`}
        >
          <ArrowIcon className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

function CTAProjectCard() {
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href="/portfolio"
      className="group flex flex-col h-full justify-center p-6 md:p-8 bg-[#0057FF] text-white rounded-md hover:bg-[#E6F0FF] hover:text-[#0057FF] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded-md"
      aria-label="Ver todos os projetos"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-4">Like what you see?</h3>

      <div className="flex items-center gap-2">
        <span className="font-medium">view projects</span>
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-black/90 group-hover:bg-[#0057FF] transition-colors">
          <ArrowIcon className={`w-4 h-4 text-white transition-transform ${reducedMotion ? "" : "group-hover:translate-x-1"}`} />
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProjectsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section aria-label="Projetos em Destaque" className="bg-[#F4F5F7] py-16 md:py-24">
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-3xl font-bold text-[#0057FF] text-center mb-12 md:mb-16"
        >
          Projetos em Destaque
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-16 gap-x-6"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }} className="md:col-span-5">
            <ProjectCard project={featuredProjects[0]} />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }} className="md:col-span-7">
            <ProjectCard project={featuredProjects[1]} />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }} className="md:col-span-12">
            <ProjectCard project={featuredProjects[2]} />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }} className="md:col-span-8">
            <ProjectCard project={featuredProjects[3]} />
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }} className="md:col-span-4">
            <CTAProjectCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


/* ======================================================================
File: src/components/home/ClientsBrandsSection.tsx
====================================================================== */
"use client";

import Image from "next/image";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const logos = Array.from({ length: 12 }).map((_, i) => ({
  src: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client${i + 1}.svg`,
  alt: `Logo cliente ${i + 1}`,
}));

export default function ClientsBrandsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="clients" className="bg-[#0057FF] py-12" aria-label="Marcas">
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.55 }}
          className="text-white text-xl md:text-2xl font-bold text-center mb-8"
        >
          marcas com as quais já trabalhei
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.03 } } }}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center"
        >
          {logos.map((l) => (
            <motion.div
              key={l.src}
              variants={{
                hidden: { opacity: 0, y: 12, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: reducedMotion ? 0.2 : 0.35 } },
              }}
              whileHover={reducedMotion ? undefined : { scale: 1.04 }}
              className="w-full max-w-[140px] h-12 relative outline-none"
              tabIndex={0}
              aria-label={l.alt}
            >
              <Image
                src={l.src}
                alt={l.alt}
                fill
                unoptimized
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.92 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ======================================================================
File: src/components/home/ContactSection.tsx
====================================================================== */
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ContactSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="contact" aria-label="Contato" className="bg-white py-12">
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold text-[#0057FF]">contato</h2>
          <p className="text-[#111111]/80 mt-2">Tem uma pergunta ou quer trabalhar junto?</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
          <div className="space-y-4 text-[#111111]">
            <a className="block hover:underline underline-offset-4" href="tel:+5511983966838">
              +55 11 98396 6838
            </a>

            {/* Email primário primeiro (spec) */}
            <a className="block hover:underline underline-offset-4" href="mailto:danilo@portfoliodanilo.com">
              danilo@portfoliodanilo.com
            </a>

            <a className="block hover:underline underline-offset-4" href="mailto:dannovaisv@gmail.com">
              dannovaisv@gmail.com
            </a>

            <a className="block hover:underline underline-offset-4" href="https://portfoliodanilo.com" target="_blank" rel="noopener noreferrer">
              portfoliodanilo.com
            </a>

            <div className="pt-4 flex flex-wrap gap-4">
              <a href="https://instagram.com/danilo_novais" target="_blank" rel="noopener noreferrer" className="text-[#111111]/70 hover:text-[#111111]">
                Instagram
              </a>
              <a href="https://facebook.com/danilonovaisvilela" target="_blank" rel="noopener noreferrer" className="text-[#111111]/70 hover:text-[#111111]">
                Facebook
              </a>
              <a href="https://linkedin.com/in/danilonovais" target="_blank" rel="noopener noreferrer" className="text-[#111111]/70 hover:text-[#111111]">
                LinkedIn
              </a>
              <a href="https://twitter.com/danilo_novais" target="_blank" rel="noopener noreferrer" className="text-[#111111]/70 hover:text-[#111111]">
                Twitter
              </a>
            </div>
          </div>

          <motion.form
            action="https://formsubmit.co/danilo@portfoliodanilo.com"
            method="POST"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } } }}
            className="bg-[#f5f5f7] rounded-xl p-6 md:p-8 border border-black/5"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            {[
              { label: "Seu nome", name: "name", type: "text" },
              { label: "Seu email", name: "email", type: "email" },
              { label: "Telefone", name: "phone", type: "text" },
            ].map((f) => (
              <motion.label
                key={f.name}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.2 : 0.35 } },
                }}
                className="block mb-4"
              >
                <span className="block text-sm text-[#111111]/70 mb-1">{f.label}</span>
                <input
                  name={f.name}
                  type={f.type}
                  required={f.name !== "phone"}
                  className="w-full rounded-lg px-4 py-3 bg-white border border-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7]"
                />
              </motion.label>
            ))}

            <motion.label
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.2 : 0.35 } },
              }}
              className="block mb-5"
            >
              <span className="block text-sm text-[#111111]/70 mb-1">Sua mensagem</span>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-lg px-4 py-3 bg-white border border-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7]"
              />
            </motion.label>

            <motion.button
              type="submit"
              whileHover={reducedMotion ? undefined : { scale: 1.02, y: -1 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className="w-full rounded-lg bg-[#0057FF] text-white py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f7]"
            >
              Enviar Mensagem →
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}


/* ======================================================================
File: src/components/layout/SiteFooter.tsx
====================================================================== */
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const footerLinks = [
  { label: "home", href: "#hero" },
  { label: "portfólio showcase", href: "#portfolio-showcase" },
  { label: "sobre", href: "/sobre" },
  { label: "contato", href: "#contact" },
];

const social = [
  { label: "Instagram", href: "https://instagram.com/danilo_novais" },
  { label: "LinkedIn", href: "https://linkedin.com/in/danilonovais" },
  { label: "Facebook", href: "https://facebook.com/danilonovaisvilela" },
  { label: "Twitter", href: "https://twitter.com/danilo_novais" },
];

function isHashHref(href: string) {
  return href.startsWith("#");
}

function scrollToHash(hashHref: string) {
  const id = hashHref.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SiteFooter() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.4 }}
        className="hidden lg:block fixed bottom-0 left-0 right-0 z-[30]"
        style={{ background: "#0057FF" }}
        aria-label="Footer"
      >
        <div className="max-w-[1680px] mx-auto px-6 py-4 flex items-center justify-between text-white text-sm">
          <p>© 2025 Danilo Novais Vilela — todos os direitos reservados.</p>

          <nav aria-label="Links do footer" className="flex items-center gap-5">
            {footerLinks.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => {
                  if (isHashHref(l.href)) scrollToHash(l.href);
                  else window.location.href = l.href;
                }}
                className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
              >
                {l.label}
              </button>
            ))}

            <div className="w-px h-4 bg-white/30 mx-1" />

            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                aria-label={`Abrir ${s.label}`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </motion.footer>

      <footer className="lg:hidden bg-[#0057FF] text-white py-10" aria-label="Footer">
        <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] space-y-6">
          <p className="text-sm">© 2025 Danilo Novais Vilela — todos os direitos reservados.</p>

          <nav aria-label="Links do footer">
            <ul className="space-y-3">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  {isHashHref(l.href) ? (
                    <button
                      type="button"
                      onClick={() => scrollToHash(l.href)}
                      className="hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                    >
                      {l.label}
                    </button>
                  ) : (
                    <a href={l.href} className="hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap gap-4">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}


/* ======================================================================
File: src/app/page.tsx
====================================================================== */
import SiteHeader from "@/components/header/SiteHeader";
import HomeHero from "@/components/home/HomeHero";
import PortfolioShowcaseSection from "@/components/home/PortfolioShowcaseSection";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import ClientsBrandsSection from "@/components/home/ClientsBrandsSection";
import ContactSection from "@/components/home/ContactSection";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Page() {
  return (
    <main>
      <SiteHeader
        navItems={[
          { label: "home", href: "#hero" },
          { label: "sobre", href: "/sobre" },
          { label: "portfolio showcase", href: "#portfolio-showcase" },
          { label: "contato", href: "#contact" },
        ]}
        logoUrl="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg"
        gradient={["rgba(0,87,255,0.55)", "rgba(82,39,255,0.45)"]}
        accentColor="#0057FF"
      />

      <HomeHero />
      <PortfolioShowcaseSection />
      <FeaturedProjectsSection />
      <ClientsBrandsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}


/* ======================================================================
INSTRUÇÕES (cole como checklist do projeto)
======================================================================

1) Crie/cole os arquivos exatamente nos paths indicados dentro de `src/`.
2) Dependências necessárias:
   - framer-motion
   - @react-three/fiber
   - @react-three/drei
   - three
   - @react-three/postprocessing
3) Confirme imports em `src/app/page.tsx` e rode `npm run dev`.

Antes de finalizar, deseja revisar ou ajustar algo?
====================================================================== */
