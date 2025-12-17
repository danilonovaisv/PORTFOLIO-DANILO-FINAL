/* ========================================================================
REVISÃO (PROBLEMAS ENCONTRADOS) + O QUE FOI CORRIGIDO/MELHORADO
===========================================================================
1) RESPONSIVIDADE / LAYOUT 3D
   - Problema: posição do orb fixa (position={[0.9, 0.05, 0]}) pode ficar “quebrada”
     em mobile e em telas muito largas, porque não escala com o viewport do R3F.
   - Correção: posição base agora é derivada do viewport (desktop desloca para a
     direita; mobile centraliza), com damping + parallax.

2) TRANSFORM DO GLB
   - Problema: ao extrair só a geometry do primeiro mesh, você perde transforms do
     nó (position/rotation/scale) que podem existir no GLB.
   - Correção: além da geometry clonada, capturamos e aplicamos transform do mesh
     encontrado (position/rotation/scale) para manter fidelidade ao Torus_dan.glb.

3) ROBUSTEZ DE GEOMETRIA
   - Problema: em alguns GLBs, normals/bounding podem estar inconsistentes para vidro.
   - Correção: computeVertexNormals + computeBoundingSphere na geometry clonada.

4) PERFORMANCE (CUBECAMERA)
   - Problema: frames={Infinity} no CubeCamera (refraction) é caro para hero.
   - Correção: frames agora é limitado (por padrão 60). Para hero, isso normalmente
     é suficiente; se quiser 100% “live”, você pode voltar para Infinity.

5) TIPAGEM E API
   - Mantida API pública (props e assinatura geral).
   - Tipos melhorados internamente (transform do GLB, refs, valores base).

6) MOTION / INTERAÇÃO
   - Mantido: Framer Motion (mouse + scroll) -> useFrame com damping.
   - Melhorado: variação de material por scroll + leve “idle” mais controlado.

OBS:
- Mantive o wrapper `GlassRefractionMaterial` com `variant="transmission" | "refraction"`,
  exatamente para cumprir o objetivo de integrar MeshTransmissionMaterial e MeshRefractionMaterial.
========================================================================== */


/* ======================================================================== */
/* components/hero/Hero.tsx */
/* ======================================================================== */
'use client'

import dynamic from 'next/dynamic'
import * as React from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import HeroOverlay from './HeroOverlay'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

export type HeroInputs = {
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
  scrollYProgress: ReturnType<typeof useMotionValue<number>>
  reducedMotion: boolean
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const sectionRef = React.useRef<HTMLElement | null>(null)

  // Cursor (normalized -1..1)
  const mouseXRaw = useMotionValue(0)
  const mouseYRaw = useMotionValue(0)

  // Smooth cursor
  const mouseX = useSpring(mouseXRaw, { stiffness: 120, damping: 26, mass: 0.8 })
  const mouseY = useSpring(mouseYRaw, { stiffness: 120, damping: 26, mass: 0.8 })

  // Scroll progress relative to hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseXRaw.set((x - 0.5) * 2)
      mouseYRaw.set((y - 0.5) * 2)
    },
    [mouseXRaw, mouseYRaw]
  )

  const onPointerLeave = React.useCallback(() => {
    mouseXRaw.set(0)
    mouseYRaw.set(0)
  }, [mouseXRaw, mouseYRaw])

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#f3f4f6] text-black"
      aria-label="Hero"
    >
      {/* 3D */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <HeroScene mouseX={mouseX} mouseY={mouseY} scrollYProgress={scrollYProgress} reducedMotion={!!reducedMotion} />
      </motion.div>

      {/* Overlay */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-16 pt-20 sm:px-10 sm:pt-24 lg:pb-24 lg:pt-28">
        <HeroOverlay />
      </div>
    </section>
  )
}


/* ======================================================================== */
/* components/hero/HeroOverlay.tsx */
/* ======================================================================== */
'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

export default function HeroOverlay() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
      {/* Left */}
      <div className="lg:col-span-6">
        <motion.h1
          className="leading-[0.92] tracking-tight"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="block text-[clamp(56px,7vw,96px)] font-semibold text-[#1457ff]">Design,</span>
          <span className="mt-2 block text-[clamp(56px,7vw,96px)] font-semibold text-black">não é só</span>
          <span className="mt-2 block text-[clamp(56px,7vw,96px)] font-semibold text-black">estética.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-[clamp(16px,1.3vw,18px)] font-medium text-[#1457ff]"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
        >
          [É intenção, é estratégia, é experiência.]
        </motion.p>

        <motion.div
          className="mt-10 flex items-center gap-4"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Link
            href="#sobre"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#1457ff] px-7 py-4 text-base font-semibold text-white shadow-[0_16px_40px_rgba(20,87,255,0.25)] transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#1457ff]/40"
          >
            get to know me better
            <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              ↗
            </span>
          </Link>

          <div className="hidden h-10 w-px bg-black/10 sm:block" />

          <p className="hidden max-w-[220px] text-sm font-medium text-black/60 sm:block">
            WebGL • UI • Motion • Brand systems
          </p>
        </motion.div>
      </div>

      {/* Right label / card (layout hint) */}
      <div className="lg:col-span-6 lg:justify-self-end">
        <motion.div
          className="ml-auto w-full max-w-md"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="flex items-center justify-end">
            <span className="select-none rounded-md bg-black/[0.035] px-6 py-4 text-lg font-semibold tracking-wide text-[#1457ff]">
              [ BRAND AWARENESS ]
            </span>
          </div>

          <div className="mt-10 flex items-center justify-end">
            <div className="relative h-[92px] w-[170px] overflow-hidden rounded-md bg-[#c8f7ff]/80 ring-1 ring-black/10">
              <div className="absolute inset-2 rounded bg-white/60" />
              <div className="absolute right-2 top-2 text-[#1457ff]">↙</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


/* ======================================================================== */
/* components/hero/HeroScene.tsx */
/* ======================================================================== */
'use client'

import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import type { MotionValue } from 'framer-motion'
import GlassOrb from './GlassOrb'

type Props = {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  scrollYProgress: MotionValue<number>
  reducedMotion: boolean
}

export default function HeroScene({ mouseX, mouseY, scrollYProgress, reducedMotion }: Props) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.25], fov: 40, near: 0.1, far: 60 }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
        gl.setClearColor(0x000000, 0)
      }}
    >
      <React.Suspense fallback={null}>
        {/* Minimal lighting (HDRI does most of the work) */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 3, 2]} intensity={1.2} />

        {/* HDRI */}
        <Environment files="/media/royal_esplanade_1k.hdr" />

        {/* Orb */}
        <GlassOrb
          modelUrl="/media/Torus_dan.glb"
          materialVariant="transmission"
          mouseX={mouseX}
          mouseY={mouseY}
          scrollYProgress={scrollYProgress}
          reducedMotion={reducedMotion}
        />

        <Preload all />
      </React.Suspense>
    </Canvas>
  )
}


/* ======================================================================== */
/* components/hero/GlassOrb.tsx */
/* ======================================================================== */
'use client'

import * as React from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { CubeCamera, useGLTF } from '@react-three/drei'
import type { MotionValue } from 'framer-motion'
import { useOrbInteraction } from './hooks/useOrbInteraction'
import GlassRefractionMaterial from './materials/GlassRefractionMaterial'

type Props = {
  modelUrl: string
  materialVariant?: 'transmission' | 'refraction'
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  scrollYProgress: MotionValue<number>
  reducedMotion: boolean
}

type ExtractedMesh = {
  geometry: THREE.BufferGeometry
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: THREE.Vector3
}

export default function GlassOrb({
  modelUrl,
  materialVariant = 'transmission',
  mouseX,
  mouseY,
  scrollYProgress,
  reducedMotion,
}: Props) {
  const group = React.useRef<THREE.Group>(null!)
  const meshRef = React.useRef<THREE.Mesh>(null!)
  const materialRef = React.useRef<any>(null)

  const gltf = useGLTF(modelUrl)
  const { viewport } = useThree()

  const extracted = React.useMemo<ExtractedMesh>(() => {
    let found: THREE.Mesh | null = null
    gltf.scene.traverse((o) => {
      if (!found && (o as any).isMesh) found = o as THREE.Mesh
    })

    if (!found?.geometry) {
      const fallback = new THREE.TorusGeometry(1, 0.35, 64, 128)
      fallback.computeVertexNormals()
      fallback.computeBoundingSphere()
      return {
        geometry: fallback,
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
      }
    }

    const geometry = found.geometry.clone()
    geometry.computeVertexNormals()
    geometry.computeBoundingSphere()

    // Preserve node transform from GLB (important for fidelity)
    const position = found.position?.clone?.() ?? new THREE.Vector3()
    const rotation = found.rotation?.clone?.() ?? new THREE.Euler()
    const scale = found.scale?.clone?.() ?? new THREE.Vector3(1, 1, 1)

    return { geometry, position, rotation, scale }
  }, [gltf.scene])

  const baseScale = React.useMemo(() => {
    // Responsive scale similar ao tutorial do Olivier (viewport-based)
    const s = viewport.width / 3.6
    return THREE.MathUtils.clamp(s, 0.72, 1.25)
  }, [viewport.width])

  const basePosition = React.useMemo(() => {
    // viewport.width (em units) muda conforme camera e tela.
    // Heurística: em mobile, centraliza; em desktop, desloca para a direita.
    const isMobileish = viewport.width < 6
    return {
      x: isMobileish ? 0 : viewport.width * 0.16,
      y: 0.05,
      z: 0,
    }
  }, [viewport.width])

  const interaction = useOrbInteraction({ mouseX, mouseY, scrollYProgress })

  useFrame((state, delta) => {
    if (!group.current) return

    const t = state.clock.elapsedTime

    const rotX = reducedMotion ? 0 : interaction.rotX.get()
    const rotY = reducedMotion ? 0 : interaction.rotY.get()
    const scrollRot = interaction.scrollRot.get()
    const parX = reducedMotion ? 0 : interaction.parallaxX.get()
    const parY = reducedMotion ? 0 : interaction.parallaxY.get()

    // Smooth, "Lo and Behold"-ish motion
    const idleX = reducedMotion ? 0 : Math.sin(t * 0.6) * 0.06
    const idleY = reducedMotion ? 0 : Math.cos(t * 0.45) * 0.08
    const spin = reducedMotion ? 0 : t * 0.18

    const targetRotX = rotX + idleX
    const targetRotY = rotY + idleY + spin + scrollRot * 0.55
    const targetRotZ = reducedMotion ? 0 : Math.sin(t * 0.4) * 0.04

    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotX, 7.5, delta)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotY, 7.5, delta)
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetRotZ, 7.5, delta)

    const targetX = basePosition.x + parX * 0.55
    const targetY = basePosition.y + parY * 0.4

    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 7.5, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 7.5, delta)
    group.current.position.z = basePosition.z

    const scrollScale = interaction.scrollScale.get()
    const targetScale = baseScale * scrollScale
    const currentScale = group.current.scale.x
    const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 8, delta)
    group.current.scale.setScalar(nextScale)

    // Subtle scroll-driven material modulation (distortion / chroma)
    if (materialRef.current && materialVariant === 'transmission') {
      const sprog = interaction.scrollYProgress.get()
      const chromaBase = 0.045
      const distBase = 0.28

      materialRef.current.chromaticAberration = chromaBase + sprog * 0.03
      materialRef.current.distortion = distBase + sprog * 0.08
      materialRef.current.temporalDistortion = reducedMotion ? 0 : 0.12
    }
  })

  // Render path: Transmission = simple mesh + MeshTransmissionMaterial
  if (materialVariant === 'transmission') {
    return (
      <group ref={group} renderOrder={2}>
        <mesh
          ref={meshRef}
          geometry={extracted.geometry}
          position={extracted.position}
          rotation={extracted.rotation}
          scale={extracted.scale}
        >
          <GlassRefractionMaterial
            ref={materialRef}
            variant="transmission"
            transmission={1}
            thickness={0.42}
            roughness={0.06}
            ior={1.18}
            chromaticAberration={0.045}
            anisotropy={0.15}
            anisotropicBlur={0.12}
            distortion={0.28}
            distortionScale={0.7}
            temporalDistortion={0.12}
            samples={10}
            backside
            transparent
            envMapIntensity={1.1}
            color="#ffffff"
          />
        </mesh>
      </group>
    )
  }

  // Render path: Refraction = CubeCamera + MeshRefractionMaterial
  // (mais caro, mas refração "diamond-like" + aberração)
  return (
    <group ref={group} renderOrder={2}>
      <CubeCamera resolution={256} frames={reducedMotion ? 1 : 60}>
        {(envMap) => (
          <mesh
            ref={meshRef}
            geometry={extracted.geometry}
            position={extracted.position}
            rotation={extracted.rotation}
            scale={extracted.scale}
          >
            <GlassRefractionMaterial
              variant="refraction"
              envMap={envMap}
              ior={2.05}
              fresnel={0.12}
              aberrationStrength={0.012}
              bounces={2}
              color="#ffffff"
              toneMapped
            />
          </mesh>
        )}
      </CubeCamera>
    </group>
  )
}

useGLTF.preload('/media/Torus_dan.glb')


/* ======================================================================== */
/* components/hero/materials/GlassRefractionMaterial.tsx */
/* ======================================================================== */
'use client'

import * as React from 'react'
import * as THREE from 'three'
import { MeshRefractionMaterial, MeshTransmissionMaterial } from '@react-three/drei'

type TransmissionProps = React.ComponentProps<typeof MeshTransmissionMaterial> & {
  variant: 'transmission'
}

type RefractionProps = React.ComponentProps<typeof MeshRefractionMaterial> & {
  variant: 'refraction'
  envMap: THREE.Texture | THREE.CubeTexture
}

export type GlassRefractionMaterialProps = TransmissionProps | RefractionProps

const GlassRefractionMaterial = React.forwardRef<any, GlassRefractionMaterialProps>(function GlassRefractionMaterial(
  props,
  ref
) {
  if (props.variant === 'refraction') {
    const { variant, ...rest } = props
    return <MeshRefractionMaterial ref={ref as any} {...rest} />
  }

  const { variant, ...rest } = props
  return <MeshTransmissionMaterial ref={ref as any} {...rest} />
})

export default GlassRefractionMaterial


/* ======================================================================== */
/* components/hero/hooks/useOrbInteraction.ts */
/* ======================================================================== */
'use client'

import * as React from 'react'
import type { MotionValue } from 'framer-motion'
import { useTransform } from 'framer-motion'

type Args = {
  mouseX: MotionValue<number> // -1..1
  mouseY: MotionValue<number> // -1..1
  scrollYProgress: MotionValue<number> // 0..1
}

export function useOrbInteraction({ mouseX, mouseY, scrollYProgress }: Args) {
  // Cursor -> rotation
  const rotY = useTransform(mouseX, [-1, 1], [-0.32, 0.32])
  const rotX = useTransform(mouseY, [-1, 1], [0.22, -0.22])

  // Cursor -> parallax offset
  const parallaxX = useTransform(mouseX, [-1, 1], [-0.22, 0.22])
  const parallaxY = useTransform(mouseY, [-1, 1], [0.18, -0.18])

  // Scroll -> subtle spin + scale down
  const scrollRot = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 0.55])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  // Expose original too (useful to modulate material)
  const api = React.useMemo(
    () => ({
      mouseX,
      mouseY,
      scrollYProgress,
      rotX,
      rotY,
      parallaxX,
      parallaxY,
      scrollRot,
      scrollScale,
    }),
    [mouseX, mouseY, scrollYProgress, rotX, rotY, parallaxX, parallaxY, scrollRot, scrollScale]
  )

  return api
}
