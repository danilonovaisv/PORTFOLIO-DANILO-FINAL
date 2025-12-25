import Link from 'next/link';

export default function HeroCopy() {
  return (
    <div className="z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="text-[#d9dade] text-sm uppercase tracking-wide mb-4">
        [BRAND AWARENESS]
      </div>
      <h1 className="text-[#d9dade] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
        Design, não
        <br />
        é só estética.
      </h1>
      <div className="text-[#d9dade] text-base md:text-lg mb-8">
        [É intenção, é estratégia, é experiência.]
      </div>
      <Link
        href="/sobre"
        className="text-[#d9dade] hover:text-white transition-colors duration-300 font-normal text-sm md:text-base tracking-wide"
        aria-label="Conheça mais sobre Danilo Novais"
      >
        get to know me better →
      </Link>
    </div>
  );
}
