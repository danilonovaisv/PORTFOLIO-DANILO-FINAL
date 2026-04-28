import { AboutBeliefsSkeleton } from '@/components/sobre/sections/AboutBeliefsSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-text">
      <section
        className="relative min-h-[72vh] w-full overflow-hidden bg-background"
        aria-hidden="true"
      >
        <div className="std-grid py-24 md:py-32">
          <div className="space-y-4">
            <div className="h-3 w-28 rounded-full bg-white/15" />
            <div className="h-12 w-[min(28rem,80vw)] rounded-2xl bg-white/10 md:h-16" />
            <div className="h-12 w-[min(36rem,88vw)] rounded-2xl bg-white/10 md:h-16" />
          </div>
        </div>
      </section>

      <section
        className="relative min-h-[60vh] w-full bg-background"
        aria-hidden="true"
      >
        <div className="std-grid py-24">
          <div className="h-10 w-40 rounded-xl bg-bluePrimary/15" />
        </div>
      </section>

      <AboutBeliefsSkeleton />
    </div>
  );
}
