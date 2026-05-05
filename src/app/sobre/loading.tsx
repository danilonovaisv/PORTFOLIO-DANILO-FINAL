export default function Loading() {
  return (
    <main className="min-h-dvh bg-[#040013] text-white">
      <div className="mx-auto flex min-h-dvh max-w-7xl items-center px-6">
        <div className="space-y-4" aria-busy="true" aria-label="Carregando">
          <div className="h-3 w-48 rounded-full bg-white/20 motion-safe:animate-pulse" />
          <div className="h-12 w-[70vw] max-w-2xl rounded-xl bg-white/10 motion-safe:animate-pulse" />
        </div>
      </div>
    </main>
  );
}
