import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GhostProps {
  speedRef: React.MutableRefObject<number>;
}

const FLUORESCENT_COLORS = {
  cyan: '#00ffff',
  lime: '#00ff00',
  magenta: '#ff00ff',
  yellow: '#ffff00',
  orange: '#ff4500',
  pink: '#ff1493',
  purple: '#9400d3',
  blue: '#0080ff',
  green: '#00ff80',
  red: '#ff0040',
  teal: '#00ffaa',
  violet: '#8a2be2',
};

const GHOST_PARAMS = {
  bodyColor: '#0f2027',
  glowColor: FLUORESCENT_COLORS.blue,
  eyeGlowColor: FLUORESCENT_COLORS.violet,
  ghostOpacity: 0.88,
  emissiveIntensity: 5.8,
  eyeGlowResponse: 0.31,
};

function GhostEyes({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const leftEyeMat = useRef<THREE.MeshBasicMaterial>(null);
  const rightEyeMat = useRef<THREE.MeshBasicMaterial>(null);
  const leftGlowMat = useRef<THREE.MeshBasicMaterial>(null);
  const rightGlowMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    // Intensity based on speed
    const targetIntensity =
      0.5 + speedRef.current * GHOST_PARAMS.eyeGlowResponse;

    // Lerp current opacity
    if (leftEyeMat.current) {
      const current = leftEyeMat.current.opacity;
      const next = THREE.MathUtils.lerp(current, targetIntensity, 0.1);

      leftEyeMat.current.opacity = next;
      if (rightEyeMat.current) rightEyeMat.current.opacity = next;

      // Outer glow matches inner but slightly lower or Same?
      // Gist logic suggests they all sync.
      if (leftGlowMat.current) leftGlowMat.current.opacity = next;
      if (rightGlowMat.current) rightGlowMat.current.opacity = next;
    }
  });

  const eyeGeo = useMemo(() => new THREE.SphereGeometry(0.3, 12, 12), []);
  const glowGeo = useMemo(() => new THREE.SphereGeometry(0.525, 12, 12), []);
  const socketGeo = useMemo(() => new THREE.SphereGeometry(0.45, 16, 16), []);

  return (
    <group>
      {/* Sockets */}
      <mesh
        position={[-0.7, 0.6, 1.9]}
        scale={[1.1, 1.0, 0.6]}
        geometry={socketGeo}
      >
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh
        position={[0.7, 0.6, 1.9]}
        scale={[1.1, 1.0, 0.6]}
        geometry={socketGeo}
      >
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.7, 0.6, 2.0]} geometry={eyeGeo}>
        <meshBasicMaterial
          ref={leftEyeMat}
          color={GHOST_PARAMS.eyeGlowColor}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh position={[0.7, 0.6, 2.0]} geometry={eyeGeo}>
        <meshBasicMaterial
          ref={rightEyeMat}
          color={GHOST_PARAMS.eyeGlowColor}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Outer Glows */}
      <mesh position={[-0.7, 0.6, 1.95]} geometry={glowGeo}>
        <meshBasicMaterial
          ref={leftGlowMat}
          color={GHOST_PARAMS.eyeGlowColor}
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0.7, 0.6, 1.95]} geometry={glowGeo}>
        <meshBasicMaterial
          ref={rightGlowMat}
          color={GHOST_PARAMS.eyeGlowColor}
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function Ghost({ speedRef }: GhostProps) {
  const ghostMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Custom Geometry with Wavy Bottom
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 40, 40);
    const pos = geo.getAttribute('position');
    const pa = pos.array;

    for (let i = 0; i < pa.length; i += 3) {
      // y is at index i+1
      if (pa[i + 1] < -0.2) {
        const x = pa[i];
        const z = pa[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combined = noise1 + noise2 + noise3;
        // modify y
        pa[i + 1] = -2.0 + combined;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (ghostMatRef.current) {
      // Pulsing emissive
      const t = state.clock.elapsedTime;
      const pulse = Math.sin(t * 1.6) * 0.5 + 0.5; // 0 to 1
      // Base intensity + pulse
      // Gist: emissiveIntensity (5.8)
      // Logic might be static 5.8 or pulsing? Gist implies parameters but maybe not animated loop for intensity?
      // Wait, Gist "pulseSpeed: 1.6, pulseIntensity: 0.6"
      // Let's implement gentle pulse around 5.8
      ghostMatRef.current.emissiveIntensity = 5.8 + pulse * 0.6;
    }
  });

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          ref={ghostMatRef}
          color={GHOST_PARAMS.bodyColor}
          transparent
          opacity={GHOST_PARAMS.ghostOpacity}
          emissive={GHOST_PARAMS.glowColor}
          emissiveIntensity={GHOST_PARAMS.emissiveIntensity}
          roughness={0.02}
          metalness={0.0}
          side={THREE.DoubleSide}
          alphaTest={0.1}
        />
      </mesh>
      <GhostEyes speedRef={speedRef} />
    </group>
  );
}
