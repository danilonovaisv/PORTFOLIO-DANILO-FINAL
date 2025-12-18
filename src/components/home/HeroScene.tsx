"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { MotionValue } from "framer-motion";

interface HeroSceneProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}

const HeroScene: React.FC<HeroSceneProps> = ({ reducedMotion }) => {
  if (reducedMotion) return null;

  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#1f71ff" wireframe />
        </mesh>
      </Canvas>
    </div>
  );
};

export default HeroScene;
