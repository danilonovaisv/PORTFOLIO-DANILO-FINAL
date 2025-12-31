// ============================================================================
// src/components/home/HeroCopy.tsx
// Texto editorial 100% ESTÁTICO da Hero (sem animações de scroll)
//
// Typography:
// - Tag: [BRAND AWARENESS] (12px, uppercase, mono)
// - H1/H2: 5-8rem, Black weight, tracking-tight
// - Color: #d9dade on #06071f background
// ============================================================================

export function HeroCopy() {
  return (
    <div className="text-[#d9dade] max-w-4xl mx-auto text-center px-4">
      {/* Tag */}
      <p className="font-mono text-[12px] uppercase tracking-[0.3em] mb-6 text-[#4fe6ff]">
        [BRAND AWARENESS]
      </p>

      {/* Headlines - 5-8rem, Black weight */}
      <h1 className="font-black text-[clamp(3rem,8vw,8rem)] leading-[1.05] tracking-tight mb-2 text-white">
        Você não vê o design.
      </h1>
      <h2 className="font-black text-[clamp(3rem,8vw,8rem)] leading-[1.05] tracking-tight mb-10 text-white">
        Mas ele vê você.
      </h2>

      {/* CTA Button */}
      <a
        href="/sobre"
        className="group inline-flex items-center gap-2 rounded-full border border-[#4fe6ff] 
                   px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] 
                   text-[#d9dade] transition-all duration-300
                   hover:bg-[#4fe6ff] hover:text-[#06071f] 
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-[#4fe6ff] focus-visible:ring-offset-2 
                   focus-visible:ring-offset-[#06071f]"
        aria-label="Step inside — conhecer mais sobre Danilo"
      >
        step inside
        <span
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </a>
    </div>
  );
}

export default HeroCopy;
