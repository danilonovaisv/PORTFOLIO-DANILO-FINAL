/**
 * Loading state para /portfolio (galeria)
 * TASK-046: Loading skeleton para a galeria de projetos (Supabase async)
 */
export default function PortfolioLoading() {
  return (
    <div
      className="min-h-screen bg-background text-text"
      aria-busy="true"
      aria-label="Carregando portfólio..."
    >
      {/* Hero skeleton */}
      <section className="std-grid pt-32 pb-16">
        <div className="col-span-full space-y-4">
          <div className="h-3 w-24 rounded bg-bluePrimary/30 animate-pulse" />
          <div className="h-16 w-3/4 rounded-lg bg-text/10 animate-pulse" />
          <div className="h-16 w-1/2 rounded-lg bg-text/10 animate-pulse" />
        </div>
      </section>

      {/* Filter bar skeleton */}
      <div className="std-grid py-6 border-y border-white/5">
        <div className="col-span-full flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 rounded-full bg-text/8 animate-pulse"
              style={{ width: `${60 + i * 12}px`, animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <section className="std-grid py-12 gap-y-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="col-span-full md:col-span-6 lg:col-span-4 relative overflow-hidden rounded-2xl bg-text/5 aspect-video"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-text/5 via-text/10 to-text/5 animate-pulse" />
            {/* Card content skeleton */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
              <div className="h-4 w-3/4 rounded bg-text/15 animate-pulse" />
              <div className="h-3 w-1/3 rounded bg-text/10 animate-pulse" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
