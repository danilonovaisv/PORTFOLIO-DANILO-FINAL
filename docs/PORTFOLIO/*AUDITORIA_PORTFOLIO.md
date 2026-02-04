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

###REFERECIAS BIBLE DE NA PASTA:

- './docs/PORTFOLIO/port-ref/REF-ANIMA' - ANIMAÇÃO ESPERADA

- './docs/PORTFOLIO/port-ref/REF-CARDS` - LAYOUT E COMPORTAMENTO RESPONSIVO ESPERADA



### 1.2. Componentes Visuais (Visual & Motion)

**A. Hero Section Otimizada (`src/components/portfolio/HeroSection.tsx`):**

* **Vídeo:** Background loop (`autoPlay`, `muted`, `loop`, `playsInline`).
    - **video hero desktop:** https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort.mp4
    - **video hero mobile:** https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort-mobile.mp4
* **Overlay:** Gradiente `from-black/60 via-black/40 to-black/60`.
* **Texto:** Título "portfólio showcase" (com "portfólio" em azul `#4fe6ff` ou `#0048ff`). **font-h1**
* **CTA:** Botão arredondado azul "vamos trabalhar juntos" com ícone de seta e hover scale. **AntigravityCTA.tsx**
## **O texto "portfólio showcase" e o botão de chamada para ação (CTA) "vamos trabalhar juntos" estão alinhados horizontalmente em um mesmo nível, formando uma única linha visual. Eles são posicionados centralizados NO RODAPÉ DA HERO.



# **CÓDIGOS**

// app/portfolio/page.tsx
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Portfólio | Showcase',
    type: 'website',
  },
}

const PortfolioPageClient = dynamic(
  () => import('./components/PortfolioPageClient'),
  { ssr: false }
)

export default function PortfolioPage() {
  return <PortfolioPageClient />
}

// app/portfolio/components/PortfolioPageClient.tsx
'use client'

/**
 * Revisão técnica — problemas identificados no código original:
 *
 * 1. Parallax 3D do Hero3DScene não recebia o valor real de scroll:
 *    - O componente recebia sempre `progressRef={{ current: 0 }}`, então a câmera nunca reagia ao scroll.
 * 2. ScrollProgressBridge não fazia ligação real com o Canvas:
 *    - Mantinha apenas uma referência sem uso, gerando complexidade sem benefício.
 * 3. Parallax dos cards usava `scrollYProgress.get()` durante o render:
 *    - Isso captura um snapshot estático do scroll e não reage dinamicamente.
 *    - Correto é usar motion values (`useTransform`) diretamente no estilo do `motion.div`.
 * 4. Arquitetura de scroll:
 *    - Havia estado React (`useState`) apenas para propagar o scroll para o Canvas, causando renders desnecessários.
 *    - Agora o scroll é escrito diretamente em um `ref`, evitando re-render e melhorando performance.
 * 5. Pequenos ajustes de clareza e manutenção:
 *    - Simplificação de props do Hero e remoção de código morto.
 *    - Deixa o componente mais alinhado à referência de parallax (cards com wrapper mais alto que o card + offset vertical).
 */

import React, { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  Preload,
} from '@react-three/drei'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import * as THREE from 'three'

type Featured = {
  id: string
  title: string
  subtitle?: string
  imageSrc: string
  href?: string
}

type PortfolioItem = {
  id: string
  title: string
  subtitle: string
  tag?: string
  imageSrc?: string
  href?: string
  grid: {
    colSpan: number
    rowSpan: number
  }
}

type Brand = {
  id: string
  name: string
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function useHasMounted() {
  const [mounted, setMounted] = useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted
}

function PortfolioNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white"
            aria-label="Voltar para a home"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <span className="text-base">a</span>
            </span>
            <span className="hidden sm:inline">Danilo</span>
          </Link>

          <nav aria-label="Navegação principal">
            <ul className="flex items-center gap-1 text-sm text-white/80">
              <li>
                <Link
                  href="/"
                  className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  home
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  aria-current="page"
                  className="rounded-full bg-white/10 px-3 py-2 text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  portfólio
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  contato
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

function Hero3DScene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    // Progresso de scroll 0–1 vindo do Framer Motion
    const t = Math.min(1, Math.max(0, progressRef.current))

    // Parallax de câmera baseado no scroll
    const targetZ = 9.5 - t * 3.0
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      1 - Math.pow(0.0001, delta)
    )

    // Tilt com o mouse
    const mx = state.pointer.x
    const my = state.pointer.y
    g.rotation.y = THREE.MathUtils.lerp(
      g.rotation.y,
      mx * 0.28,
      1 - Math.pow(0.0001, delta)
    )
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      -my * 0.18,
      1 - Math.pow(0.0001, delta)
    )

    // Leve deslocamento vertical com scroll
    g.position.y = THREE.MathUtils.lerp(
      g.position.y,
      t * -0.6,
      1 - Math.pow(0.0001, delta)
    )
  })

  const commonMatProps = useMemo(
    () => ({
      thickness: 0.8,
      roughness: 0.1,
      transmission: 1,
      ior: 1.35,
      chromaticAberration: 0.02,
      anisotropy: 0.1,
      distortion: 0.1,
      distortionScale: 0.3,
      temporalDistortion: 0.2,
      samples: 6,
      resolution: 256,
      backside: true,
    }),
    []
  )

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.6}>
        <mesh position={[-3.2, 0.4, 0]} rotation={[0.3, 0.2, -0.1]}>
          <icosahedronGeometry args={[1.2, 2]} />
          <MeshTransmissionMaterial {...commonMatProps} color="#5dd6ff" />
        </mesh>
      </Float>

      <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.45}>
        <mesh position={[3.35, 0.1, 0]} rotation={[0.1, -0.25, 0.2]}>
          <sphereGeometry args={[1.05, 48, 48]} />
          <MeshTransmissionMaterial {...commonMatProps} color="#a78bfa" />
        </mesh>
      </Float>

      <Float speed={1.35} rotationIntensity={0.5} floatIntensity={0.65}>
        <mesh position={[0.0, -1.1, -0.8]} rotation={[0.25, 0.1, 0.2]}>
          <torusKnotGeometry args={[0.6, 0.18, 180, 16]} />
          <MeshTransmissionMaterial {...commonMatProps} color="#ffffff" />
        </mesh>
      </Float>

      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 4]} intensity={1.1} color="#ffffff" />
    </group>
  )
}

function PortfolioHero({
  featured,
  scrollProgressRef,
}: {
  featured: Featured[]
  scrollProgressRef: React.MutableRefObject<number>
}) {
  const reduceMotion = useReducedMotion()
  const mounted = useHasMounted()
  const { scrollYProgress } = useScroll()

  // Atualiza o ref usado pela cena 3D sem causar re-render
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollProgressRef.current = v
  })

  return (
    <section aria-label="Destaques do portfólio" className="relative overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_50%_10%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(900px_420px_at_10%_20%,rgba(167,139,250,0.14),transparent_55%),radial-gradient(900px_420px_at_90%_15%,rgba(34,211,238,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,1),rgba(2,6,23,0.95),rgba(2,6,23,0.95),rgba(2,6,23,1))]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="relative">
          {mounted && !reduceMotion && (
            <div className="pointer-events-none absolute inset-x-0 -top-8 h-[520px] sm:h-[560px]">
              <Canvas
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                camera={{ position: [0, 0.2, 9.5], fov: 38, near: 0.1, far: 50 }}
              >
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#020617', 10, 22]} />
                <PerformanceMonitor
                  onDecline={() => {
                    // Canvas continuará, mas o DPR já está conservador.
                  }}
                />
                <group position={[0, 0.2, 0]}>
                  <Environment resolution={256}>
                    <Lightformer intensity={1.2} position={[0, 2, 6]} scale={[10, 10, 1]} color="#ffffff" />
                    <Lightformer intensity={0.9} position={[-6, 1, 2]} scale={[6, 6, 1]} color="#38bdf8" />
                    <Lightformer intensity={0.9} position={[6, 1, 2]} scale={[6, 6, 1]} color="#a78bfa" />
                  </Environment>
                </group>
                <Hero3DScene progressRef={scrollProgressRef} />
                <Preload all />
              </Canvas>
            </div>
          )}

          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            {featured.map((f, idx) => {
              const colSpan = idx === 1 ? 'col-span-12 md:col-span-6' : 'col-span-12 md:col-span-3'
              return (
                <Link
                  key={f.id}
                  href={f.href ?? '#grid'}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5',
                    'min-h-[160px] sm:min-h-[180px]',
                    colSpan,
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400'
                  )}
                  aria-label={f.title}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={f.imageSrc}
                      alt={f.title}
                      fill
                      unoptimized
                      priority={idx === 1}
                      sizes={
                        idx === 1
                          ? '(min-width: 768px) 50vw, 100vw'
                          : '(min-width: 768px) 25vw, 100vw'
                      }
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />
                  </div>

                  <div className="relative flex h-full items-end p-4">
                    <div className="max-w-[80%]">
                      <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                        destaque
                      </p>
                      <h2 className="mt-1 text-base font-semibold leading-tight text-white sm:text-lg">
                        {f.title}
                      </h2>
                      {f.subtitle && (
                        <p className="mt-1 text-sm text-white/70">{f.subtitle}</p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            <span className="text-sky-400">portfólio</span> showcase
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base"
          >
            Curadoria de projetos com foco em impacto visual, clareza e performance. Explore os trabalhos
            abaixo — com hover suave, parallax sutil e navegação mobile-first.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_rgba(56,189,248,0.25)] transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              vamos trabalhar juntos
              <span aria-hidden className="inline-block rounded-full bg-slate-950/10 px-2 py-0.5">
                ↗
              </span>
            </Link>

            <Link
              href="#grid"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              ver projetos
              <span aria-hidden className="text-white/70">
                ↓
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}

function ProjectCard({
  item,
  index,
}: {
  item: PortfolioItem
  index: number
}) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLAnchorElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Mapeia o progresso de scroll do card para um offset vertical suave
  // - aproximação do comportamento do script parallax original (wrapper mais alto que o card)
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <motion.a
      ref={ref}
      href={item.href ?? '#'}
      aria-label={`${item.title} — ${item.subtitle}`}
      className={cn(
        'group relative col-span-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
        item.grid.colSpan === 12 ? 'md:col-span-12' : `md:col-span-${item.grid.colSpan}`,
        item.grid.rowSpan >= 2 ? 'min-h-[320px] md:min-h-[420px]' : 'min-h-[220px] md:min-h-[280px]'
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.6, delay: Math.min(0.18, index * 0.03), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <motion.div
            className="absolute inset-0"
            style={reduceMotion ? undefined : { y }}
          >
            {/* Wrapper mais alto para permitir o efeito parallax vertical, inspirado no CSS da gallery-track */}
            <div className="absolute inset-x-0 top-0 h-[135%]">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-white/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/0" />
      </div>

      <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            {item.tag && (
              <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                {item.tag}
              </span>
            )}
            <h3 className="mt-2 text-lg font-semibold leading-tight text-white sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-white/70">{item.subtitle}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/90 transition group-hover:bg-white/10">
            <span aria-hidden>↗</span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  return (
    <section id="grid" aria-label="Grid de projetos" className="py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          {items.map((item, idx) => (
            <ProjectCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,132,199,0.25)] transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Ver mais projetos (placeholder)"
          >
            <span aria-hidden>←</span> veja mais <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

function BrandsSection({ brands }: { brands: Brand[] }) {
  return (
    <section aria-label="Marcas com as quais já trabalhei" className="bg-sky-700/90 py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <h2 className="text-center text-lg font-semibold text-white">
          marcas com as quais já trabalhei.
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
          {brands.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-4 text-sm font-semibold text-white/90"
              aria-label={b.name}
            >
              {b.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'ok'>('idle')

  return (
    <section id="contato" aria-label="Contato" className="bg-white py-12 text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-semibold tracking-tight">contato</h2>
            <p className="mt-2 text-slate-600">
              Tem uma pergunta ou quer trabalhar junto?
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                  ☎
                </span>
                <a
                  className="font-semibold text-slate-800 underline-offset-4 hover:underline"
                  href="tel:+5511983966838"
                >
                  +55 11 98396 6838
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                  ✉
                </span>
                <a
                  className="font-semibold text-slate-800 underline-offset-4 hover:underline"
                  href="mailto:danilonovais@gmail.com"
                >
                  danilonovais@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                  ⛶
                </span>
                <a
                  className="font-semibold text-slate-800 underline-offset-4 hover:underline"
                  href="https://portfolio.example.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  portfoliodanilo.com
                </a>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-slate-500">
              <a className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50" href="#">
                instagram
              </a>
              <a className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50" href="#">
                behance
              </a>
              <a className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50" href="#">
                linkedin
              </a>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setStatus('ok')
                  window.setTimeout(() => setStatus('idle'), 3500)
                }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Seu nome</label>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    placeholder="João da Silva"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Seu email</label>
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    placeholder="joao@empresa.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Telefone</label>
                  <input
                    name="phone"
                    autoComplete="tel"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700">Sua mensagem</label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                    placeholder="Conte-me sobre seu projeto..."
                  />
                </div>

                <div className="sm:col-span-2 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    {status === 'ok'
                      ? 'Mensagem enviada (placeholder). Integre um endpoint quando quiser.'
                      : 'Resposta em até 1–2 dias úteis.'}
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    Enviar Mensagem <span aria-hidden>↗</span>
                  </button>
                </div>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              © {new Date().getFullYear()} — Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PortfolioPageClient() {
  // Ref global de progresso de scroll (0–1) usado pela cena 3D no hero
  const scrollProgressRef = useRef(0)

  const featured: Featured[] = useMemo(
    () => [
      {
        id: 'feat-1',
        title: 'Campanha — Zé e o Zé',
        subtitle: 'comunicação • key visual',
        imageSrc:
          'https://images.unsplash.com/photo-1520975693411-b4c0a4e2b3bb?auto=format&fit=crop&w=1600&q=80',
        href: '#grid',
      },
      {
        id: 'feat-2',
        title: 'Ganhe um ano — Nestlé',
        subtitle: 'layout • social',
        imageSrc:
          'https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=2000&q=80',
        href: '#grid',
      },
      {
        id: 'feat-3',
        title: 'Swift — Vizinhança',
        subtitle: 'motion • KV',
        imageSrc:
          'https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=1600&q=80',
        href: '#grid',
      },
    ],
    []
  )

  const items: PortfolioItem[] = useMemo(
    () => [
      {
        id: 'p1',
        title: 'Vitrine — Retail Experience',
        subtitle: 'Direção de arte e composição',
        tag: '3D / KV',
        imageSrc:
          'https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=2200&q=80',
        href: '#',
        grid: { colSpan: 8, rowSpan: 2 },
      },
      {
        id: 'p2',
        title: 'Projeto reservado',
        subtitle: 'Em breve',
        tag: 'WIP',
        imageSrc: undefined,
        href: '#',
        grid: { colSpan: 4, rowSpan: 2 },
      },
      {
        id: 'p3',
        title: 'Garoto — Nestlé',
        subtitle: 'Planejamento • KV',
        tag: 'campanha',
        imageSrc:
          'https://images.unsplash.com/photo-1541591681685-0246308f076b?auto=format&fit=crop&w=2200&q=80',
        href: '#',
        grid: { colSpan: 4, rowSpan: 2 },
      },
      {
        id: 'p4',
        title: 'MPDV — Shelf Impact',
        subtitle: 'Design de varejo',
        tag: 'retail',
        imageSrc:
          'https://images.unsplash.com/photo-1514439827219-9137a0b99245?auto=format&fit=crop&w=2200&q=80',
        href: '#',
        grid: { colSpan: 4, rowSpan: 2 },
      },
      {
        id: 'p5',
        title: 'Nescafé — Faça seu mundo',
        subtitle: 'KV • composição',
        tag: 'key visual',
        imageSrc:
          'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=2200&q=80',
        href: '#',
        grid: { colSpan: 4, rowSpan: 2 },
      },
      {
        id: 'p6',
        title: 'Projeto reservado',
        subtitle: 'Em breve',
        tag: 'WIP',
        imageSrc: undefined,
        href: '#',
        grid: { colSpan: 6, rowSpan: 2 },
      },
      {
        id: 'p7',
        title: 'Projeto reservado',
        subtitle: 'Em breve',
        tag: 'WIP',
        imageSrc: undefined,
        href: '#',
        grid: { colSpan: 6, rowSpan: 2 },
      },
      {
        id: 'p8',
        title: 'Produto — Packaging / UI',
        subtitle: 'Direção de arte',
        tag: 'produto',
        imageSrc:
          'https://images.unsplash.com/photo-1560583306-bd304a162229?auto=format&fit=crop&w=2200&q=80',
        href: '#',
        grid: { colSpan: 6, rowSpan: 2 },
      },
    ],
    []
  )

  const brands: Brand[] = useMemo(
    () => [
      { id: 'b1', name: 'Algar' },
      { id: 'b2', name: 'AON' },
      { id: 'b3', name: 'Nestlé' },
      { id: 'b4', name: 'Iguatemi' },
      { id: 'b5', name: 'Ambev' },
      { id: 'b6', name: 'Swift' },
    ],
    []
  )

  return (
    <main className="min-h-dvh bg-slate-950 text-white">
      <PortfolioNav />

      <PortfolioHero featured={featured} scrollProgressRef={scrollProgressRef} />

      <PortfolioGrid items={items} />

      <BrandsSection brands={brands} />

      <ContactSection />
    </main>
  )
}

Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

