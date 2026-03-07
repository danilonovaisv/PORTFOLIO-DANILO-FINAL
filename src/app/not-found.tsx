import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Página não encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background text-white overflow-hidden">
      {/* Ghost glow effect */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-bluePrimary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl text-center space-y-6 px-6">
        <p className="font-mono text-sm tracking-widest uppercase text-textSecondary">
          Error 404
        </p>
        <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter leading-none">
          <span className="text-bluePrimary">ghost</span>
          <br />
          <span className="text-white">not found</span>
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-textSecondary max-w-md mx-auto">
          A página que você procura desapareceu no éter digital. Talvez ela
          nunca tenha existido — ou foi movida para outro lugar.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/"
            className="rounded-full bg-bluePrimary px-7 py-3 text-sm font-semibold text-white transition hover:bg-blueAccent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Voltar ao início
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Ver Portfólio
          </Link>
        </div>
      </div>
    </div>
  );
}
