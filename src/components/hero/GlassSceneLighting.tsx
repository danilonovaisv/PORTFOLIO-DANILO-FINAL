'use client';

import { Environment } from '@react-three/drei';

export default function GlassSceneLighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 2]} intensity={2.2} color="#4f7dff" />
      <pointLight position={[-4, -1, -2]} intensity={1.6} color="#ff6bd6" />
      <Environment preset="city" />
    </>
  );
}
