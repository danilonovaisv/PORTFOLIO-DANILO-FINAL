// src/components/header/webgl/FluidGlass.tsx
import * as THREE from 'three';
import React, {
  memo,
  ReactNode,
  Suspense,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Canvas,
  createPortal,
  ThreeElements,
  useFrame,
  useThree,
} from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  RoundedBox,
  useFBO,
} from '@react-three/drei';
import { easing } from 'maath';

type Mode = 'bar'; // Apenas 'bar' é suportado agora
type ModeProps = Record<string, unknown>;

export interface FluidGlassProps {
  mode?: Mode; // Apenas 'bar'
  barProps?: ModeProps;

  /**
   * Quando informado, o Canvas do R3F escuta os eventos do elemento pai (ex: wrapper do header),
   * permitindo que o glass responda ao cursor mesmo com o HTML por cima.
   */
  eventSource?: HTMLElement | null;

  /**
   * Controla se o glass deve “seguir” o cursor. Útil para prefers-reduced-motion.
   */
  followPointer?: boolean;

  /**
   * className aplicado diretamente no <canvas>.
   * Dica: use `pointer-events-none` quando estiver usando `eventSource`.
   */
  className?: string;
}

export default function FluidGlass({
  mode = 'bar',
  barProps = {},
  eventSource = null,
  followPointer = true,
  className,
}: FluidGlassProps) {
  // Garantir que mode seja apenas 'bar'
  if (mode !== 'bar') {
    console.warn(`Modo '${mode}' não suportado. Usando 'bar'.`);
  }

  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.6]}
      {...(eventSource ? { eventSource } : {})}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>
        <Bar modeProps={barProps} followPointer={followPointer} />
      </Suspense>
    </Canvas>
  );
}

type MeshProps = ThreeElements['mesh'];

type TransmissionTuning = {
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;

  // drei MeshTransmissionMaterial extras
  samples?: number;
  resolution?: number;

  distortion?: number;
  distortionScale?: number;
  temporalDistortion?: number;

  attenuationColor?: string;
  attenuationDistance?: number;

  // Movimentação
  ampX?: number;
  ampY?: number;
  rotX?: number;
  rotY?: number;

  // BAR sizing
  barWidth?: number; // 0..1 do viewport width
  barHeight?: number; // 0..1 do viewport height
};

interface PortalWrapperProps {
  children?: ReactNode;
  followPointer?: boolean;
  modeProps?: ModeProps;
  renderGlass: (_ctx: {
    ref: React.RefObject<THREE.Mesh>;
    buffer: THREE.WebGLRenderTarget;
  }) => ReactNode;
}

const PortalWrapper = memo(function PortalWrapper({
  children,
  followPointer = true,
  modeProps = {},
  renderGlass,
}: PortalWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const buffer = useFBO({ stencilBuffer: false, depthBuffer: true });
  const { viewport } = useThree();
  const [portalScene] = useState<THREE.Scene>(() => new THREE.Scene());

  const tuning = modeProps as TransmissionTuning;

  useFrame((state, delta) => {
    const { gl, pointer, camera } = state;
    const v = state.viewport.getCurrentViewport(camera, [0, 0, 15]);

    const ampX = followPointer ? (tuning.ampX ?? 0.12) : 0;
    const ampY = followPointer ? (tuning.ampY ?? 0.08) : 0;

    const destX = (pointer.x * v.width * ampX) / 2;
    const destY = (pointer.y * v.height * ampY) / 2;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.22, delta);

    // Micro-tilt (deixa mais “premium” e próximo do Reactbits)
    const rotX = followPointer ? (tuning.rotX ?? 0.06) : 0;
    const rotY = followPointer ? (tuning.rotY ?? 0.08) : 0;
    const targetRx = (-pointer.y * rotX * Math.PI) / 2;
    const targetRy = (pointer.x * rotY * Math.PI) / 2;
    easing.dampE(ref.current.rotation, [targetRx, targetRy, 0], 0.18, delta);

    // Aplicar scale do bar
    const bw = Math.max(0.1, Math.min(1, tuning.barWidth ?? 0.98));
    const bh = Math.max(0.1, Math.min(1, tuning.barHeight ?? 0.88));
    ref.current.scale.set(v.width * bw, v.height * bh, 0.9);

    gl.setRenderTarget(buffer);
    gl.setClearColor(0x000000, 0);
    gl.clear(true, true, true);
    gl.render(portalScene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  return (
    <>
      {createPortal(children, portalScene)}
      {/* Background do buffer (necessário para refração real) */}
      <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      {renderGlass({ ref, buffer })}
    </>
  );
});

function PortalBackground() {
  const stripes = useMemo(
    () => [
      {
        x: -0.45,
        y: 0.15,
        r: Math.PI / 10,
        s: [1.3, 0.12, 1] as [number, number, number],
        c: '#7dd3fc',
        o: 0.32,
      },
      {
        x: 0.35,
        y: -0.05,
        r: -Math.PI / 12,
        s: [1.1, 0.1, 1] as [number, number, number],
        c: '#a78bfa',
        o: 0.26,
      },
      {
        x: 0.0,
        y: -0.22,
        r: Math.PI / 20,
        s: [1.7, 0.08, 1] as [number, number, number],
        c: '#38bdf8',
        o: 0.22,
      },
    ],
    []
  );

  return (
    <group>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 5]} intensity={0.7} />
      <pointLight position={[-4, 2, 6]} intensity={0.9} color={'#7dd3fc'} />
      <pointLight position={[4, -2, 6]} intensity={0.7} color={'#a78bfa'} />

      {/* Base escura */}
      <mesh position={[0, 0, -2]} scale={[50, 50, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#05070f" />
      </mesh>

      {/* “Streaks” coloridos para dar leitura no vidro */}
      {stripes.map((st, i) => (
        <mesh
          key={i}
          position={[st.x, st.y, -1.5]}
          rotation={[0, 0, st.r]}
          scale={st.s}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={st.c}
            transparent
            opacity={st.o}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function Bar({
  modeProps = {},
  followPointer = true,
  ...p
}: { modeProps?: ModeProps; followPointer?: boolean } & MeshProps) {
  // Usando MeshProps corretamente
  const tuning = modeProps as TransmissionTuning;
  // Omit args from p to avoid conflict with RoundedBox args
  // eslint-disable-next-line
  const { args: _args, ...meshProps } = p;

  return (
    <PortalWrapper
      followPointer={followPointer}
      modeProps={modeProps}
      renderGlass={({ ref, buffer }) => (
        <RoundedBox // Usando RoundedBox como JSX element
          ref={ref as any} // Passando ref diretamente, o R3F lida com o tipo corretamente
          args={[1, 1, 0.18]} // Tipos corretos para args
          radius={0.32}
          smoothness={10}
          position={[0, 0, 15]}
          frustumCulled={false}
          {...meshProps}
        >
          <MeshTransmissionMaterial
            buffer={buffer.texture}
            transmission={1}
            roughness={0}
            metalness={0}
            reflectivity={0.25}
            clearcoat={1}
            clearcoatRoughness={0}
            ior={tuning.ior ?? 1.14}
            thickness={tuning.thickness ?? 9}
            chromaticAberration={tuning.chromaticAberration ?? 0.08}
            anisotropy={tuning.anisotropy ?? 0.06}
            distortion={tuning.distortion ?? 0.28}
            distortionScale={tuning.distortionScale ?? 0.28}
            temporalDistortion={tuning.temporalDistortion ?? 0.12}
            attenuationColor={tuning.attenuationColor ?? '#ffffff'}
            attenuationDistance={tuning.attenuationDistance ?? 0.35}
            samples={tuning.samples ?? 8}
            resolution={tuning.resolution ?? 512}
          />
        </RoundedBox>
      )}
    >
      <PortalBackground />
    </PortalWrapper>
  );
}
