export default function Loading() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden bg-background text-white"
      aria-label="Carregando O Que Me Move"
      aria-busy="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(79,230,255,0.14),transparent_34%),linear-gradient(180deg,var(--color-background)_0%,var(--color-neutral)_100%)]" />
      <div className="relative flex h-screen items-center justify-center px-6">
        <div className="w-full max-w-4xl space-y-6 text-center">
          <div className="mx-auto h-5 w-48 bg-white/15" />
          <div className="mx-auto h-20 w-full max-w-2xl bg-white/10 md:h-28" />
          <div className="mx-auto h-20 w-3/4 max-w-xl bg-[#4fe6ff]/15 md:h-28" />
        </div>
      </div>
    </main>
  );
}
