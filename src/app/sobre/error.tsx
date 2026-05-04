'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#040013] px-6 text-white">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">
          Não foi possível carregar a página.
        </h1>
        <p className="text-white/60">{error.message}</p>
        <button
          onClick={reset}
          className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
