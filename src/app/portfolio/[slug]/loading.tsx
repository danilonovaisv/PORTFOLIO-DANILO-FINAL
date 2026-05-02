/**
 * Loading state para /portfolio/[slug]
 * TASK-046: Supabase async flows devem ter skeleton intermediário
 */
export default function ProjectLoading() {
  return (
    <div
      className="min-h-screen bg-background text-text"
      aria-busy="true"
      aria-label="Carregando projeto..."
    >
      {/* Nav skeleton */}
      <div className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8">
        <div className="h-4 w-28 rounded bg-text/10 animate-pulse" />
      </div>

      {/* Hero skeleton */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex flex-col gap-6 mb-12 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Title */}
            <div className="space-y-3">
              <div className="h-14 w-80 rounded-lg bg-text/10 animate-pulse" />
              <div className="h-14 w-56 rounded-lg bg-text/10 animate-pulse" />
            </div>
            {/* Client */}
            <div className="space-y-2">
              <div className="h-3 w-12 rounded bg-text/10 animate-pulse" />
              <div className="h-5 w-32 rounded bg-text/10 animate-pulse" />
            </div>
          </div>

          {/* Meta row */}
          <div className="flex gap-8 border-t border-white/10 pt-6 mt-2">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-text/10 animate-pulse" />
              <div className="h-4 w-24 rounded bg-text/10 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-8 rounded bg-text/10 animate-pulse" />
              <div className="h-4 w-12 rounded bg-text/10 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Hero media skeleton */}
        <div className="relative w-full aspect-video md:aspect-[2.4/1] rounded-2xl md:rounded-4xl overflow-hidden bg-text/5">
          <div className="absolute inset-0 bg-gradient-to-r from-text/5 via-text/10 to-text/5 animate-pulse" />
          {/* Ghost Blue accent */}
          <div className="absolute bottom-6 left-6 h-1 w-24 rounded-full bg-bluePrimary/30 animate-pulse" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="px-6 md:px-12 pb-32 max-w-5xl mx-auto">
        <div className="space-y-4 mt-8">
          <div className="h-8 w-48 rounded bg-text/10 animate-pulse" />
          <div className="h-4 w-full rounded bg-text/8 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-text/8 animate-pulse" />
          <div className="h-4 w-4/6 rounded bg-text/8 animate-pulse" />
          <div className="h-4 w-full rounded bg-text/8 animate-pulse mt-6" />
          <div className="h-4 w-3/4 rounded bg-text/8 animate-pulse" />
        </div>
      </section>
    </div>
  );
}
