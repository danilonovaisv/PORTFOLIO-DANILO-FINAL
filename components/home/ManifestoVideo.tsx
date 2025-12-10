'use client';

import React from 'react';
import { ASSETS } from '@/lib/constants';

interface ManifestoVideoProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onError: () => void;
}

const ManifestoVideo: React.FC<ManifestoVideoProps> = ({ videoRef, onError }) => {
  return (
    <>
      <video
        ref={videoRef}
        src={ASSETS.videoManifesto}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        controls
        preload="metadata"
        onError={onError}
        aria-label="Vídeo Manifesto do portfólio"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/5">
        <div className="h-14 w-14 rounded-full border border-white/20 bg-white/10" />
      </div>
    </>
  );
};

export default ManifestoVideo;
