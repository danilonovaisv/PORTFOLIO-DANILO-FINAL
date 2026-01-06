'use client';

import React, { useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// 1. Definição das Props que o componente aceita (vindas do GhostCanvas/Leva)
export type GhostProps = {
  children?: React.ReactNode; // Para os olhos
  color?: string; // Cor base do corpo
  emissive?: string; // Cor do brilho
  emissiveIntensity?: number; // Força do brilho (afeta o Bloom)
  followSpeed?: number; // Velocidade de perseguição ao mouse
  wobbleSpeed?: number; // Velocidade da ondulação da "saia"
  wobbleAmount?: number; // Intensidade da ondulação
  breathSpeed?: number; // Velocidade da respiração/pulsação (pulseSpeed)
  ghostOpacity?: number;
  ghostScale?: number;
  pulseIntensity?: number;
};

const Ghost = forwardRef<THREE.Group, GhostProps>(
  (
    {
      children,
      // Valores padrão (caso não sejam passados pelo pai)
      color = '#e9f0ff',
      emissive = '#0057ff',
      emissiveIntensity = 12,
      followSpeed = 2.5,
      wobbleSpeed = 2.0,
      wobbleAmount = 0.2,
      breathSpeed = 1.5,
      ghostOpacity = 0.9,
      ghostScale = 1.0,
      pulseIntensity = 0.5,
    },
    ref
  ) => {
    const groupRef = useRef<THREE.Group>(null);
    const bodyMeshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);

    // Permite que o componente pai acesse o grupo do fantasma
    useImperativeHandle(ref, () => groupRef.current!);

    // 2. Geometria Procedural (Memoizada para performance)
    // Cria a forma de "lençol" deformando a metade inferior de uma esfera
    const geometry = useMemo(() => {
      const geo = new THREE.SphereGeometry(1, 64, 64); // Alta contagem de polígonos para suavidade
      const posAttribute = geo.getAttribute('position');
      const vertex = new THREE.Vector3();

      for (let i = 1; i < posAttribute.count; i++) {
        vertex.fromBufferAttribute(posAttribute, i);

        // Aplica deformação apenas na parte de baixo (a "saia")
        if (vertex.y < -0.3) {
          // Combinação de ondas senoidais para um look orgânico
          const wave1 = Math.sin(vertex.x * 9) * 0.35;
          const wave2 = Math.cos(vertex.z * 9) * 0.25;
          const wave3 = Math.sin((vertex.x + vertex.z) * 3) * 0.15;

          // Aplica a onda na altura (Y)
          vertex.y += (wave1 + wave2 + wave3) * 0.5;

          posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
      }
      // Crucial: Recalcular normais para a iluminação funcionar nas novas curvas
      geo.computeVertexNormals();
      return geo;
    }, []);

    // 3. Loop de Animação Principal
    useFrame((state, delta) => {
      if (!groupRef.current || !bodyMeshRef.current || !materialRef.current)
        return;

      const time = state.clock.getElapsedTime();

      // --- A. Input do Mouse & Posição Alvo ---
      // state.pointer dá coordenadas normalizadas (-1 a 1)
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;

      // Define o alvo com um offset para posicionar o fantasma mais à esquerda na tela
      const targetX = mouseX * 5 - 1.5;
      const targetY = mouseY * 3;

      // --- B. Movimento Suave (Lerp com Delta Time) ---
      // Fator de suavização independente da taxa de quadros (FPS)
      // Ajuste o '0.05' se quiser mais ou menos inércia
      const smoothFactor = 1 - Math.pow(0.05, delta);
      const currentFollowSpeed = smoothFactor * followSpeed;

      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        currentFollowSpeed
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        currentFollowSpeed
      );

      // Adiciona uma flutuação vertical constante (hover)
      const hoverY = Math.sin(time * 1.5) * 0.1 + Math.cos(time * 0.8) * 0.05;
      groupRef.current.position.y += hoverY * 0.1;

      // --- C. Física de Inclinação (Tilt) ---
      // Calcula a diferença entre onde ele está e onde quer ir
      const diffX = targetX - groupRef.current.position.x;
      const diffY = targetY - groupRef.current.position.y;
      const tiltStrength = 0.5;

      // Inclina o corpo na direção do movimento usando amortecimento (damp)
      bodyMeshRef.current.rotation.z = THREE.MathUtils.damp(
        bodyMeshRef.current.rotation.z,
        -diffX * tiltStrength,
        4,
        delta
      );
      bodyMeshRef.current.rotation.x = THREE.MathUtils.damp(
        bodyMeshRef.current.rotation.x,
        diffY * tiltStrength,
        4,
        delta
      );

      // --- D. Animações Dinâmicas (Wobble & Respiração) ---
      // Usa as props dinâmicas para controlar a velocidade e intensidade
      bodyMeshRef.current.rotation.y =
        Math.sin(time * wobbleSpeed) * wobbleAmount;

      const breath = Math.sin(time * breathSpeed);

      // Pulsação de escala (respiração física)
      const scalePulse = 1 + breath * 0.02;
      bodyMeshRef.current.scale.set(scalePulse, scalePulse, scalePulse);

      // --- E. Atualização do Material em Tempo Real ---
      // Atualiza cores baseadas nas props do Leva
      materialRef.current.color.set(color);
      materialRef.current.emissive.set(emissive);

      // Pulsação de luz (respiração energética)
      // Usa a 'emissiveIntensity' base e adiciona uma oscilação forte para o Bloom
      materialRef.current.emissiveIntensity =
        emissiveIntensity + (breath * 0.5 + 0.5) * (pulseIntensity * 10);

      materialRef.current.opacity = ghostOpacity;

      // Scale dynamic
      groupRef.current.scale.set(ghostScale, ghostScale, ghostScale);
    });

    return (
      <group ref={groupRef} position={[-2.5, 0, 0]}>
        <mesh ref={bodyMeshRef} geometry={geometry}>
          <meshStandardMaterial
            ref={materialRef}
            // As cores iniciais são definidas aqui, mas o useFrame as atualiza
            color={color}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
            roughness={0.1}
            metalness={0.1}
            transparent
            opacity={ghostOpacity}
            side={THREE.DoubleSide} // Renderiza o interior da "saia"
          />
          {/* Renderiza os olhos como filhos, para que se movam junto com o corpo */}
          {children}
        </mesh>
      </group>
    );
  }
);

Ghost.displayName = 'Ghost';
export default Ghost;
