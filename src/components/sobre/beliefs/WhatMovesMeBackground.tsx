export function WhatMovesMeBackground() {
  return (
    <div
      aria-hidden="true"
      data-testid="what-moves-me-background"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Ghost Blue radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 50%, #0048ff22 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 20% 80%, #8705f218 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 30% at 80% 20%, #4fe6ff10 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(90deg, transparent 79px, #0048ff0a 80px), repeating-linear-gradient(0deg, transparent 79px, #0048ff06 80px)',
        }}
      />

      {/* Edge vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, #040013cc 100%)',
        }}
      />
    </div>
  );
}
