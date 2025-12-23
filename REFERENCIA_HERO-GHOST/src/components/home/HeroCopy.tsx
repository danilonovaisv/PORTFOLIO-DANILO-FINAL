export function HeroCopy() {
  return (
    <div className="text-center text-hero-text">
      <div className="mb-4 text-xs font-medium tracking-[0.28em] text-hero-text/70">
        [BRAND AWARENESS]
      </div>

      {/* Text centered, no animations */}
      <h1 className="text-balance font-semibold leading-[1.05] tracking-[-0.03em] text-4xl sm:text-5xl md:text-6xl">
        <span className="block">Design, não</span>
        <span className="block">é só estética.</span>
      </h1>

      <p className="mt-5 text-pretty text-base text-hero-text/80 sm:text-lg">
        [É intenção, é estratégia, é experiência.]
      </p>
    </div>
  );
}
