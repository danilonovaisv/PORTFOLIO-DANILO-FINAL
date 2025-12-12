'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import type { MotionValue } from 'framer-motion'
import GlassOrb from './GlassOrb'

type Props = {
  scrollYProgress: MotionValue<number>
  className?: string
}

function HeroLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 2]} intensity={1.35} />
      <directionalLight position={[-4, -1, -2]} intensity={0.6} />
    </>
  )
}

export default function HeroGlassCanvas({ scrollYProgress, className }: Props) {
  const dpr = useMemo(() => [1, 1.5] as [number, number], [])

  return (
    <div className={className}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 4.2], fov: 38, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['transparent']} />
        <Suspense fallback={null}>
          <HeroLights />
          <Environment preset="city" background={false} blur={1} />
          <GlassOrb scrollYProgress={scrollYProgress} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
