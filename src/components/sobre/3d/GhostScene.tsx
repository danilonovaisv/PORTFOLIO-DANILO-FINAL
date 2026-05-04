"use client";

import { Canvas } from "@react-three/fiber";
import { motion, useTransform } from "motion/react";
import { GhostModel } from "./GhostModel";
import { useBeliefsScrollContext } from "../beliefs/BeliefsScrollContext";

export function GhostScene() {
  const { scrollYProgress, isMobile, shouldReduceMotion } = useBeliefsScrollContext();

  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.85, 0.95],
    [0.95, 1, 1.1, 1]
  );

  return (
    <motion.div
      aria-hidden="true"
      style={shouldReduceMotion ? { opacity: 1 } : { opacity, scale }}
      className="pointer-events-none fixed inset-0 z-[70]"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, isMobile ? 1 : 2]}
        camera={{
          position: [0, 0, isMobile ? 7 : 6],
          fov: 35,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <GhostModel />
      </Canvas>
    </motion.div>
  );
}
