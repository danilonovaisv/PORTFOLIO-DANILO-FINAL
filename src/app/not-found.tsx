import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: '404 - Página não encontrada',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-[8rem] font-bold leading-none tracking-tighter text-[#E0E0E0] md:text-[12rem]">
        404
      </h1>
      <div className="relative -mt-8 flex flex-col gap-6 md:-mt-12">
        <h2 className="text-2xl font-bold md:text-3xl">
          Página não encontrada
        </h2>
        <p className="max-w-md text-gray-500">
          O conteúdo que você está procurando não existe ou foi movido.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-[#0057FF] px-8 py-4 font-semibold text-white transition-all hover:bg-[#0047D4]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Voltar para home
          </Link>
        </div>
      </div>
    </div>
  );
}
