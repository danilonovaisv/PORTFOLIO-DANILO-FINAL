import Link from 'next/link';
import { HOME_CONTENT } from '@/config/content';

export default function HeroCopy() {
  const { hero } = HOME_CONTENT;

  return (
    <div className="z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="text-[#d9dade] text-sm uppercase tracking-wide mb-4">
        {hero.tag}
      </div>
      <h1 className="text-[#d9dade] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
        {hero.title[0]}
        <br />
        {hero.title[1]}
      </h1>
      <div className="text-[#d9dade] text-base md:text-lg mb-8">
        {hero.subtitle}
      </div>
      <Link
        href="#contact"
        className="text-[#d9dade] hover:text-white transition-colors duration-300 font-normal text-sm md:text-base tracking-wide"
        aria-label="Entre em contato com Danilo Novais"
      >
        {hero.cta}
      </Link>
    </div>
  );
}
