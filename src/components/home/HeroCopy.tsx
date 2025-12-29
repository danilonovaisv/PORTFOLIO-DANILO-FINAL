import { HOME_CONTENT } from '@/config/content';

export default function HeroCopy() {
  const { tag, title, subtitle, cta } = HOME_CONTENT.hero;

  return (
    <div className="text-[#d9dade] max-w-3xl mx-auto">
      <p className="font-mono text-sm uppercase tracking-widest mb-3">
        {tag}
      </p>
      <h1 className="font-bold text-5xl md:text-6xl leading-tight mb-6">
        {title[0]}
        <br />
        {title[1]}
      </h1>
      <p className="text-lg mb-8">{subtitle}</p>
      <a
        href="/sobre"
        className="text-[#d9dade] hover:text-white transition-colors duration-300"
      >
        {cta}
      </a>
    </div>
  );
}
