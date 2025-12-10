'use client';

import React from 'react';
import { ASSETS } from '@/lib/constants';

interface ManifestoVideoProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onError: () => void;
}

const ManifestoVideo: React.FC<ManifestoVideoProps> = ({
  videoRef,
  onError,
}) => {
  return (
    <>
      <video
        ref={videoRef}
        src={ASSETS.videoManifesto}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        controls={false}
        preload="metadata"
        onError={onError}
        aria-label="Vídeo Manifesto do portfólio"
        title="Vídeo manifesto do portfólio de Danilo Novais"
      />
    </>
  );
};

export default ManifestoVideo;
