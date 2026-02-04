import FloatingCards from '@/components/ui/FloatingCards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Floating Cards Prototype | Danilo Novais',
  description: 'Interactive 3D floating cards grid using GSAP and Next.js.',
};

export default function FloatingCardsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f23]">
      {/* Header Spacer */}
      <div className="h-32 w-full" />

      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-display-hero mb-4 text-white">
          Visual Experiments
        </h1>
        <p className="text-h3 text-gray-400">
          GSAP + ScrollTrigger + 3D Physics
        </p>
      </div>

      <FloatingCards />

      {/* Footer Spacer */}
      <div className="h-64 w-full bg-linear-to-t from-black to-transparent" />
    </div>
  );
}
