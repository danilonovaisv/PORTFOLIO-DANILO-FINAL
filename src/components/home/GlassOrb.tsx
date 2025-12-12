'use client'

import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import { useMotionValueEvent, useReducedMotion } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

type Props = {
  scrollYProgress: MotionValue<number>
}

function pickFirstMeshGeometry(scene: THREE.Object3D) {
  let geometry: THREE.BufferGeometry | null = null
  scene.traverse((obj) => {
    if (geometry) return
    const mesh = obj as unknown as THREE.Mesh
    if ((mesh as any).isMesh && mesh.geometry) geometry = mesh.geometry
  })
  return geometry
}

export default function GlassOrb({ scrollYProgress }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<any>(null)

  const scrollRef = useRef(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v
  })

  // GLB (não altera o conteúdo textual do site; é apenas o asset 3D)
  const gltf = useGLTF('/models/torus_dan.glb') as any

  const geometry = useMemo(() => {
    const scene: THREE.Object3D | undefined = gltf?.scene
    if (!scene) return null
    return pickFirstMeshGeometry(scene)
  }, [gltf])

  const { viewport } = useThree()

  // escala responsiva semelhante ao padrão de "escala por viewport"
  const baseScale = useMemo(() => {
    const s = Math.min(1.65, Math.max(1.1, viewport.width / 3.6))
    return s
  }, [viewport.width])

  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.set(0, 0, 0)
  }, [])

  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return

    const progress = scrollRef.current
    const pointer = state.pointer

    // rotação base + parallax (motion-reduced: reduz / desativa)
    const rotSpeed = prefersReducedMotion ? 0 : 0.25
    const parallax = prefersReducedMotion ? 0 : 0.35

    const targetRotX = pointer.y * parallax
    const targetRotY = pointer.x * parallax + state.clock.elapsedTime * rotSpeed

    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRotX, 1 - Math.pow(0.001, delta))
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY, 1 - Math.pow(0.001, delta))

    // distorção / cromática por scroll
    const mat = materialRef.current
    if (mat) {
      const t = prefersReducedMotion ? 0 : progress
      const chroma = THREE.MathUtils.lerp(0.02, 0.085, t)
      const distortion = THREE.MathUtils.lerp(0.08, 0.35, t)
      const temporal = THREE.MathUtils.lerp(0.0, 0.18, t)

      mat.chromaticAberration = chroma
      mat.distortion = distortion
      mat.temporalDistortion = temporal
    }
  })

  if (!geometry) {
    // fallback seguro caso o GLB não esteja disponível
    return (
      <group ref={groupRef} scale={baseScale} position={[0.3, 0.15, 0]}>
        <mesh>
          <torusKnotGeometry args={[1, 0.36, 220, 24]} />
          <MeshTransmissionMaterial
            ref={materialRef}
            thickness={0.22}
            roughness={0.02}
            transmission={1}
            ior={1.25}
            chromaticAberration={0.05}
            distortion={0.18}
            distortionScale={0.45}
            temporalDistortion={0.12}
            anisotropicBlur={0.1}
            backside
          />
        </mesh>
      </group>
    )
  }

  return (
    <group ref={groupRef} scale={baseScale} position={[0.45, 0.15, 0]}>
      <mesh geometry={geometry}>
        <MeshTransmissionMaterial
          ref={materialRef}
          thickness={0.22}
          roughness={0.02}
          transmission={1}
          ior={1.25}
          chromaticAberration={0.05}
          distortion={0.18}
          distortionScale={0.45}
          temporalDistortion={0.12}
          anisotropicBlur={0.1}
          backside
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/torus_dan.glb')
