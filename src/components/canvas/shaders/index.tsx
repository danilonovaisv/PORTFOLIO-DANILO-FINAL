'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

interface HeroParticlesProps {
    count?: number;
    baseColor?: string;
    hoverColor?: string;
}

export function HeroParticles({
    count = 200,
    baseColor = '#0048ff',
    hoverColor = '#E50914',
}: HeroParticlesProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Generate initial random positions
    const { positions, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Spread particles across a wide area used in the Ghost Scene
            positions[i * 3] = (Math.random() - 0.5) * 40;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z

            sizes[i] = Math.random() * 0.2 + 0.1; // Random size 0.1 - 0.3
        }
        return { positions, sizes };
    }, [count]);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uHover: { value: 0 },
            uBaseColor: { value: new THREE.Color(baseColor) },
            uHoverColor: { value: new THREE.Color(hoverColor) },
        }),
        [baseColor, hoverColor]
    );

    useFrame((state) => {
        if (!materialRef.current) return;

        // Update Time
        materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

        // Update Mouse (Smooth Lerp)
        // Convert normalized mouse (-1 to 1) to rough world units if needed, 
        // but shader expects plain 2D vector. Let's pass normalized and scale in shader.
        // Or scale here. 
        // Shader uses uMouse * 10.0, so let's just pass raw mouse.
        // Ideally we project mouse to world Z=0 plane, but raw mouse.x (aspect corrected) is fine for "feeling".

        const targetX = state.mouse.x;
        const targetY = state.mouse.y;

        materialRef.current.uniforms.uMouse.value.lerp(
            new THREE.Vector2(targetX, targetY),
            0.1
        );

        // Hover Intensity (Simple logic: always 1 if mouse is active, or based on velocity)
        // For now, let's keep it 1.0 to always show effect near mouse
        materialRef.current.uniforms.uHover.value = 1.0;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <planeGeometry args={[1, 1]}>
                <instancedBufferAttribute
                    attach="attributes-aPosition"
                    args={[positions, 3]}
                />
                <instancedBufferAttribute
                    attach="attributes-aSize"
                    args={[sizes, 1]}
                />
            </planeGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    );
}
