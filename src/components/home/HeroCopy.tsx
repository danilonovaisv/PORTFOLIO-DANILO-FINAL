import { CTAButton } from '@/components/ui/CTAButton';

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

      {/* CTA Button */}
      <div className="pt-8">
        <CTAButton href="/sobre" variant="primary">
          step inside
        </CTAButton>
      </div>
    </div>
  );
}

export default HeroCopy;
