'use client';

export default function AtmosphereVeil() {
  return (
    <group>
      {/* Plano escuro de base */}
      <mesh position={[1, -1.3, -1.4]} scale={[7, 4, 1]}>
        <planeGeometry args={[5, 1]} />
        <meshBasicMaterial color="#050511" />
      </mesh>
      {/* Glow Ghost Blue */}
      <mesh position={[0, 0, -0.8]} scale={[4.6, 4.6, 1]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#0057ff" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}
