export function HeroCopy() {
  return (
    <div className="flex flex-col items-center text-center space-y-12">
      {/* Tag */}
      <span className="font-mono text-[12px] uppercase tracking-[0.4em] text-cyan-400 opacity-80">
        [BRAND AWARENESS]
      </span>

      {/* Main Headlines */}
      <div className="flex flex-col items-center leading-none">
        <h1 className="text-[clamp(5rem,12vw,8rem)] font-black tracking-tight text-white">
          Você não vê <br /> o design.
        </h1>
        <h2 className="text-[clamp(4rem,10vw,6rem)] font-black tracking-tight text-white mt-4">
          Mas ele vê você.
        </h2>
      </div>

      {/* CTA Button: Double-Bubble / Liquid Design based on docs */}
      <div className="pt-8">
        <a
          href="/sobre"
          className="group relative flex items-center transition-transform duration-500 hover:scale-105"
          aria-label="Ir para a seção sobre"
        >
          {/* Global Backdrop Glow */}
          <div className="absolute inset-x-0 top-1/2 -z-10 h-1 w-full bg-[#0057FF] blur-3xl opacity-60 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Liquid Part 1: Pill for Text */}
          <div className="relative flex h-14 items-center justify-center rounded-full bg-[#0057FF] px-10 transition-shadow duration-500 group-hover:shadow-[0_0_40px_rgba(0,87,255,0.4)] md:h-16 md:px-14">
            <span className="text-lg font-medium lowercase tracking-tight text-white md:text-xl">
              step inside
            </span>
          </div>

          {/* Connector: Tight blend */}
          <div className="z-10 -ml-4 h-14 w-12 rounded-full md:h-16" />

          {/* Liquid Part 2: Circle for Arrow */}
          <div className="relative -ml-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#0057FF] shadow-lg transition-transform duration-500 group-hover:translate-x-1 group-hover:shadow-[0_0_40px_rgba(0,87,255,0.4)] md:h-16 md:w-16">
            <span className="text-xl text-white transition-transform duration-500 group-hover:rotate-45 md:text-2xl">
              ↗
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default HeroCopy;
