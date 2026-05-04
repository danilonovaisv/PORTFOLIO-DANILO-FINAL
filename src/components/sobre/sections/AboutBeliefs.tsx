"use client";

import { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { BeliefsScrollProvider } from "../beliefs/BeliefsScrollContext";
import { BeliefBackground } from "../beliefs/BeliefBackground";
import { BeliefOverlay } from "../beliefs/BeliefOverlay";
import { BeliefFixedHeader } from "../beliefs/BeliefFixedHeader";
import { BeliefScrollText } from "../beliefs/BeliefScrollText";
import { BeliefManifesto } from "../beliefs/BeliefManifesto";
import { GhostErrorBoundary } from "../3d/GhostErrorBoundary";
import { GhostSceneFallback } from "../3d/GhostSceneFallback";
import { useBeliefsScroll } from "@/hooks/useBeliefsScroll";

const GhostScene = dynamic(() => import("../3d/GhostScene").then((m) => m.GhostScene), {
  ssr: false,
});

export function AboutBeliefs() {
  const containerRef = useRef<HTMLElement | null>(null);
  const scroll = useBeliefsScroll(containerRef);

  return (
    <BeliefsScrollProvider value={{ containerRef, ...scroll }}>
      <section
        ref={containerRef}
        id="o-que-me-move"
        aria-labelledby="o-que-me-move-title"
        className="relative min-h-[620vh] overflow-clip bg-[#040013] text-white"
      >
        <h2 id="o-que-me-move-title" className="sr-only">
          O que me move
        </h2>

        <BeliefBackground />
        <BeliefOverlay />

        <div className="sticky top-0 h-dvh">
          <BeliefFixedHeader />

          <GhostErrorBoundary fallback={<GhostSceneFallback />}>
            <Suspense fallback={<GhostSceneFallback />}>
              <GhostScene />
            </Suspense>
          </GhostErrorBoundary>

          <BeliefManifesto />
        </div>

        <BeliefScrollText />
      </section>
    </BeliefsScrollProvider>
  );
}
