import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[#040013] px-6 text-white text-center">
      <h1 className="font-display text-[clamp(4rem,10vw,8rem)] font-black uppercase leading-none tracking-tight">404</h1>
      <p className="mt-4 text-white/60 text-lg">Essa página foi engolida pelo void.</p>
      <Link
        href="/sobre"
        className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-widest transition hover:bg-white hover:text-black"
      >
        Retornar ao Sobre
      </Link>
    </main>
  );
}
