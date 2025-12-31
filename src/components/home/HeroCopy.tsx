// ============================================================================
// src/components/home/HeroCopy.tsx
// Texto editorial estático da Hero (sem motion próprio)
// ============================================================================

export function HeroCopy() {
  return (
    <div className="text-[#d9dade] max-w-3xl mx-auto text-center px-4">
      <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] mb-4 text-[#4fe6ff]">
        [BRAND AWARENESS]
      </p>
      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight mb-4 text-white">
        Você não vê o design.
        <br />
        Mas ele vê você.
      </h1>
      <p className="text-sm md:text-base text-[#9ca3af] mb-8">
        Estratégia, identidade e experiências digitais que se escondem aos
        olhos, mas não à percepção.
      </p>

      <a
        href="/sobre"
        className="inline-flex items-center gap-2 rounded-full border border-[#4fe6ff] px-5 py-2.5 text-[11px]
                   font-semibold uppercase tracking-[0.22em] text-[#d9dade] transition-colors duration-300
                   hover:bg-[#4fe6ff] hover:text-[#06071f] focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-[#4fe6ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06071f]"
        aria-label="Step inside — conhecer mais sobre Danilo"
      >
        step inside
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

export default HeroCopy;
