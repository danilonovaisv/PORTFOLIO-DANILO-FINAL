'use client';

import * as React from 'react';
import { ASSETS } from '@/lib/constants';

export default function ManifestoVideo() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl bg-[#0e0f12]">
      <video
        src={ASSETS.videoManifesto}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        aria-label="Manifesto video presentation"
      />
    </div>
  );
}
