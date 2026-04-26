'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-[#040013] px-6 text-white">
      <div className="max-w-xl text-center">
        <p className="mb-3 font-display text-sm uppercase tracking-widest text-white/60">
          O Que Me Move
        </p>
        <h1 className="font-h1 text-4xl font-black leading-none md:text-6xl">
          Narrativa indisponível
        </h1>
        <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
          A experiência 3D não carregou agora, mas o manifesto continua vivo.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 bg-[#0048ff] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
