'use client';

export const OverlayLayer = () => {
  return (
    <div
      className="absolute inset-0 bg-black z-10 pointer-events-none opacity-0"
      aria-hidden="true"
    />
  );
};
