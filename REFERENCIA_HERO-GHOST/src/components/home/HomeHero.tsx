import { HeroCopy } from "./HeroCopy";
import { GhostStage } from "./GhostStage";
import { ManifestoThumb } from "./ManifestoThumb";

export function HomeHero() {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] w-full overflow-hidden md:min-h-screen"
      aria-label="Hero"
    >
      {/* WebGL background layer */}
      <div className="absolute inset-0 -z-10">
        <GhostStage />
      </div>

      {/* Content layer */}
      <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center gap-10 px-6 py-20 md:min-h-screen">
        <HeroCopy />

        {/* Manifesto thumb (keep its animation) */}
        <div className="w-full max-w-3xl">
          <ManifestoThumb />
        </div>
      </div>
    </section>
  );
}
