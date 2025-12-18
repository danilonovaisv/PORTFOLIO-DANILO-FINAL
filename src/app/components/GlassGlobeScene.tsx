'use client'

import React, { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { motion } from 'framer-motion'

function GlassGlobe() {
    const meshRef = useRef<THREE.Mesh>(null!)
    const { viewport } = useThree()

    // Configuração do globo (posição + tamanho + rotação)
    const {
        globePosX,
        globePosY,
        globePosZ,
        globeScale,
        globeRotX,
        globeRotY,
        globeRotZ,
        autoRotate,
        rotateSpeed,
        responsiveScale,
    } = useControls('Globo de Vidro', {
        globePosX: { value: 0, min: -5, max: 5, step: 0.01 },
        globePosY: { value: 0, min: -5, max: 5, step: 0.01 },
        globePosZ: { value: 0, min: -10, max: 5, step: 0.01 },

        globeScale: { value: 1, min: 0.1, max: 4, step: 0.01 },

        globeRotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        globeRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        globeRotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },

        responsiveScale: { value: true },
        autoRotate: { value: true },
        rotateSpeed: { value: 0.6, min: 0, max: 5, step: 0.01 },
    })

    // Configuração do material (mantendo o padrão do projeto com MeshTransmissionMaterial + Leva)
    const materialProps = useControls('Material (Vidro)', {
        thickness: { value: 0.2, min: 0, max: 3, step: 0.01 },
        roughness: { value: 0, min: 0, max: 1, step: 0.01 },
        transmission: { value: 1, min: 0, max: 1, step: 0.01 },
        ior: { value: 1.2, min: 1, max: 3, step: 0.01 },
        chromaticAberration: { value: 0.02, min: 0, max: 1, step: 0.001 },
        backside: { value: true },
        samples: { value: 10, min: 1, max: 16, step: 1 },
        resolution: { value: 1024, min: 256, max: 2048, step: 256 },
    })

    useFrame((_, delta) => {
        if (!meshRef.current) return
        if (autoRotate) meshRef.current.rotation.y += rotateSpeed * delta
    })

    // Scale responsivo baseado no viewport, mantendo o padrão do projeto
    const viewportBasedScale = viewport.width / 3.75
    const finalScale = (responsiveScale ? viewportBasedScale : 1) * globeScale

    return (
        <group
            position={[globePosX, globePosY, globePosZ]}
            rotation={[globeRotX, globeRotY, globeRotZ]}
            scale={finalScale}
        >
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 128, 128]} />
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
        </group>
    )
}

function SceneLights() {
    // Configuração da iluminação (opções novas solicitadas)
    const {
        ambientIntensity,
        ambientColor,
        keyIntensity,
        keyColor,
        keyPosX,
        keyPosY,
        keyPosZ,
        fillIntensity,
        fillColor,
        fillPosX,
        fillPosY,
        fillPosZ,
        rimIntensity,
        rimColor,
        rimPosX,
        rimPosY,
        rimPosZ,
    } = useControls('Iluminação', {
        ambientIntensity: { value: 0.35, min: 0, max: 3, step: 0.01 },
        ambientColor: { value: '#bdf8de' },

        keyIntensity: { value: 3, min: 0, max: 20, step: 0.01 },
        keyColor: { value: '#ffffff' },
        keyPosX: { value: 4, min: -20, max: 20, step: 0.01 },
        keyPosY: { value: 6, min: -20, max: 20, step: 0.01 },
        keyPosZ: { value: 6, min: -20, max: 20, step: 0.01 },

        fillIntensity: { value: 1.2, min: 0, max: 20, step: 0.01 },
        fillColor: { value: '#9bbcff' },
        fillPosX: { value: -6, min: -20, max: 20, step: 0.01 },
        fillPosY: { value: 2, min: -20, max: 20, step: 0.01 },
        fillPosZ: { value: 2, min: -20, max: 20, step: 0.01 },

        rimIntensity: { value: 2.5, min: 0, max: 20, step: 0.01 },
        rimColor: { value: '#ff9bf7' },
        rimPosX: { value: 0, min: -20, max: 20, step: 0.01 },
        rimPosY: { value: 6, min: -20, max: 20, step: 0.01 },
        rimPosZ: { value: -8, min: -20, max: 20, step: 0.01 },
    })

    return (
        <>
            <ambientLight intensity={ambientIntensity} color={ambientColor} />
            <directionalLight
                intensity={keyIntensity}
                color={keyColor}
                position={[keyPosX, keyPosY, keyPosZ]}
            />
            <pointLight
                intensity={fillIntensity}
                color={fillColor}
                position={[fillPosX, fillPosY, fillPosZ]}
                decay={2}
            />
            <pointLight
                intensity={rimIntensity}
                color={rimColor}
                position={[rimPosX, rimPosY, rimPosZ]}
                decay={2}
            />
        </>
    )
}

export default function GlassGlobeScene() {
    const { showLeva } = useControls('UI', {
        showLeva: { value: true },
    })

    return (
        <motion.section
            className="relative h-[70vh] w-full overflow-hidden bg-[#05060a]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
        >
            {showLeva && <Leva collapsed />}

            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />

            <div className="absolute left-6 top-6 z-20 max-w-[22rem] text-white">
                <motion.h2
                    className="text-pretty text-2xl font-semibold tracking-tight"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05, duration: 0.45, ease: 'easeOut' }}
                >
                    Globo de vidro
                </motion.h2>
                <motion.p
                    className="mt-2 text-sm text-white/75"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.45, ease: 'easeOut' }}
                >
                    Ajuste iluminação, tamanho e posição via configuração (Leva).
                </motion.p>
            </div>

            <Canvas
                className="absolute inset-0"
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 100 }}
            >
                <Suspense fallback={null}>
                    <color attach="background" args={['#ffffff']} />

                    <SceneLights />
                    <Environment preset="studio" />
                    <GlassGlobe />

                    <OrbitControls enablePan={false} enableZoom={false} />
                </Suspense>
            </Canvas>
        </motion.section>
    )
}

