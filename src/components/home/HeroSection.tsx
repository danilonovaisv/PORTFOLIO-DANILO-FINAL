import { BRAND } from '@/config/brand';
import HeroMachine from './HeroMachine.client';

/**
 * HeroSection (Server Component)
 * Responsável pelo SEO e estrutura inicial.
 * Passa o vídeo para o Client Component que orquestra a máquina de estados.
 */
export default function HeroSection() {
  return (
    <section
      id="hero-cinematic"
      aria-label="Hero Cinema"
      className="relative w-full bg-[#050505]"
    >
      <HeroMachine videoSrc={BRAND.video.manifesto} />
    </section>
  );
}
