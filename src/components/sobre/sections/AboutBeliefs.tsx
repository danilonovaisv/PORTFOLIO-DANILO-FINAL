'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { BeliefsScrollProvider, useBeliefsScrollContext } from '../beliefs/BeliefsScrollProvider'
import { BeliefBackground } from '../beliefs/BeliefBackground'
import { BeliefOverlay } from '../beliefs/BeliefOverlay'
import { BeliefFixedHeader } from '../beliefs/BeliefFixedHeader'
import { BeliefScrollText } from '../beliefs/BeliefScrollText'
import { BeliefManifesto } from '../beliefs/BeliefManifesto'
import { GhostErrorBoundary } from '../3d/GhostErrorBoundary'
import { GhostSceneFallback } from '../3d/GhostSceneFallback'

const GhostScene = dynamic(
  () => import('../3d/GhostScene').then((m) => m.GhostScene),
  {
    ssr: false,
  }
)

function AboutBeliefsContent() {
  const { sectionRef } = useBeliefsScrollContext()

  return (
    <section
      ref={sectionRef}
      id="o-que-me-move"
      data-testid="beliefs-section"
      aria-labelledby="o-que-me-move-title"
      className="relative overflow-clip scroll-section bg-[#040013] text-white"
      style={{ height: '720vh' }}
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
  )
}

export function AboutBeliefs() {
  return (
    <BeliefsScrollProvider>
      <AboutBeliefsContent />
    </BeliefsScrollProvider>
  )
}
