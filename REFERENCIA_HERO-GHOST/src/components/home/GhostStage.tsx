"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Avoid SSR for WebGL
const GhostCanvas = dynamic(() => import("./webgl/GhostCanvas").then(m => m.GhostCanvas), {
  ssr: false,
  loading: () => null
});

export function GhostStage() {
  return (
    <Suspense fallback={null}>
      <GhostCanvas />
    </Suspense>
  );
}
