import { Suspense } from 'react';
import type { Metadata } from 'next';
import { AboutBeliefs } from '@/components/sobre/sections';

export const metadata: Metadata = {
  title: 'O Que Me Move | Beliefed Design',
  description:
    'Experiência scroll-driven sobre presença, conexão e design editorial.',
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center bg-background text-white/50">
            Carregando narrativa...
          </div>
        }
      >
        <AboutBeliefs />
      </Suspense>
    </main>
  );
}
