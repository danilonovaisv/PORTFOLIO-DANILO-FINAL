// src/components/home/HeroCopy.tsx
import Link from 'next/link';

export default function HeroCopy() {
  return (
    <div className="z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl mx-auto mb-12">
      <div className="text-[#d9dade] text-sm md:text-xs uppercase tracking-[0.4em] mb-6 font-medium">
        [BRAND AWARENESS]
      </div>
      <h1 className="text-[#d9dade] font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-8">
        Design, não
        <br />é só estética.
      </h1>
      <div className="text-[#d9dade]/60 text-base md:text-lg mb-10 font-medium tracking-tight">
        [É intenção, é estratégia, é experiência.]
      </div>
      <Link
        href="/sobre"
        className="text-[#F0F0F0] hover:text-[#0057FF] transition-all duration-300 font-normal text-sm md:text-base tracking-[0.2em] uppercase"
        aria-label="Conheça mais sobre Danilo Novais"
      >
        get to know me better →
      </Link>
    </div>
  );
}
