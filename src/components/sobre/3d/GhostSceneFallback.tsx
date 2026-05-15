'use client';

export function GhostSceneFallback() {
  return (
    <div
      aria-hidden="true"
      data-testid="ghost-fallback"
      data-ghost-scene
      className="pointer-events-none fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 70 }}
    >
      <div className="h-40 w-40 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}
