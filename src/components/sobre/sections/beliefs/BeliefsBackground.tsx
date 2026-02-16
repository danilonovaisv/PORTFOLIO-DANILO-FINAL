import React from 'react';

interface BeliefsBackgroundProps {
  baseColor: string;
  overlayColor: string;
  overlayOpacity: number;
}

export function BeliefsBackground({
  baseColor,
  overlayColor,
  overlayOpacity,
}: BeliefsBackgroundProps) {
  return (
    <>
      {/* Layer 0: base background */}
      <div
        className="absolute inset-0 z-0 transition-colors duration-500 will-change-[background-color]"
        style={
          {
            '--bg-color': baseColor,
            backgroundColor: 'var(--bg-color)',
          } as React.CSSProperties
        }
        aria-hidden="true"
      />
      {/* Layer 1: overlay crossfade */}
      <div
        className="absolute inset-0 z-1 transition-opacity duration-300 will-change-opacity"
        style={
          {
            '--overlay-bg': overlayColor,
            '--overlay-opacity': overlayOpacity,
            backgroundColor: 'var(--overlay-bg)',
            opacity: 'var(--overlay-opacity)',
          } as React.CSSProperties
        }
        aria-hidden="true"
      />
    </>
  );
}
