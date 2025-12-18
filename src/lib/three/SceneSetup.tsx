import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

export default function SceneSetup() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Environment preset="studio" />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
