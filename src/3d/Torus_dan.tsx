"use client";

import React, { useRef } from 'react';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function TorusDan(props: any) {
    // Configuração correta do caminho. O useGLTF gerencia o Draco automaticamente na maioria dos casos.
    const { nodes } = useGLTF('/media/Torus_dan.glb');
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    // Rotação suave constante para dar vida ao objeto
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    // Encontra a geometria correta. 
    // Nota: Baseado no seu GLB, o nó pode se chamar 'Sphere002' ou 'Retopo_Cube001'.
    // Adicionei uma verificação de segurança.
    // @ts-ignore
    const geometry = nodes.Sphere002?.geometry || nodes.Retopo_Cube001?.geometry || nodes.Torus002?.geometry;

    if (!geometry) return null;

    return (
        <group {...props} dispose={null}>
            <mesh ref={meshRef} geometry={geometry} scale={viewport.width > 768 ? 3 : 2.2}>
                {/* CONFIGURAÇÃO DO VIDRO LÍQUIDO (Igual à HERO.jpg) */}
                <MeshTransmissionMaterial
                    backside={true}
                    samples={16} // Qualidade da refração
                    resolution={1024} // Resolução do vidro
                    transmission={1} // Totalmente transparente
                    roughness={0.0} // Totalmente liso (brilho máximo)
                    thickness={1.2} // Espessura para distorcer o fundo
                    ior={1.5} // Índice de refração (Vidro/Acrílico)
                    chromaticAberration={0.6} // O "arco-íris" nas bordas
                    anisotropy={0.5} // Ajuda no reflexo esticado
                    distortion={0.4} // A distorção líquida
                    distortionScale={0.5}
                    temporalDistortion={0.1} // Movimento interno suave
                    color="#ffffff" // Vidro claro
                    background={new THREE.Color('#F4F5F7')} // Cor de fundo para mesclar
                />
            </mesh>
        </group>
    );
}

// Pré-carregamento para evitar o piscar
useGLTF.preload('/media/Torus_dan.glb');