'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import '@/styles/about-origin.css';

gsap.registerPlugin(ScrollTrigger);

const CONTENT_BLOCKS = [
  {
    id: '1',
    title: 'O QUE PERMANECE',
    desc: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. Enquanto muitos olhavam para o brilho imediato, eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo. A essência das coisas sempre falou mais alto do que a superfície.',
    img: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.1.webp',
    alt: 'O que permanece - essência que sobrevive ao tempo',
  },
  {
    id: '2',
    title: 'DO TRAÇO À INTENÇÃO',
    desc: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
    img: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.2.webp',
    alt: 'Do traço à intenção - processo criativo emergente',
  },
  {
    id: '3',
    title: 'A DESCOBERTA DO INVISÍVEL',
    desc: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
    img: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.3.webp',
    alt: 'Descoberta do invisível - design como transformação',
  },
  {
    id: '4',
    title: 'EXPANSÃO COM PROPÓSITO',
    desc: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
    img: 'https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/about/origin/about.origin_image.4.webp',
    alt: 'Expansão com propósito - intuição + tecnologia',
  },
];

const AboutOrigin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const archRightRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with safe typed options
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Using any to bypass Lenis type mismatch if present in the event listener,
    // or just rely on ScrollTrigger.update binding
    // @ts-ignore - lenis types might mismatch with generic event emitter
    lenis.on('scroll', ScrollTrigger.update);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!archRef.current || !archRightRef.current) return;

      const wrappers = gsap.utils.toArray<HTMLElement>('.img-wrapper');
      const images = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');
      const infoBlocks = gsap.utils.toArray<HTMLElement>('.arch__info');
      const bgColors = ['#040013', '#060018', '#08001e', '#0a001a'];

      // Pinning & Transition Timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: archRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: archRightRef.current,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Initial Image States
      gsap.set(images, {
        clipPath: 'inset(0% 0% 0% 0%)',
        objectPosition: '0px 0%',
        scale: 1.15,
        filter: 'blur(12px)',
        opacity: 0,
        yPercent: 0,
      });

      wrappers.forEach((el, idx) => {
        el.style.zIndex = (CONTENT_BLOCKS.length - idx).toString();
      });

      // Initial reveal of the first image when pin starts
      gsap.to(images[0], {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: archRef.current,
          start: 'top 75%', // Changed to enter earlier
          toggleActions: 'play none none reverse',
        },
      });

      // Synchronized Image Transitions (Background and Layer Masking)
      CONTENT_BLOCKS.forEach((_, index) => {
        const currentWrapper = wrappers[index];
        const currentImg = images[index];
        const nextImage = images[index + 1];

        const sectionTimeline = gsap.timeline();

        if (index < CONTENT_BLOCKS.length - 1) {
          sectionTimeline
            .to(
              'body',
              {
                backgroundColor: bgColors[index + 1],
                duration: 1.5,
                ease: 'none',
              },
              0
            )
            .to(
              currentWrapper,
              {
                clipPath: 'inset(0px 0px 100% 0px)',
                duration: 1.5,
                ease: 'none',
              },
              0
            )
            .to(
              currentImg,
              {
                objectPosition: '0px 60%',
                yPercent: 15,
                duration: 1.5,
                ease: 'none',
              },
              0
            )
            .to(
              nextImage,
              {
                objectPosition: '0px 0%',
                yPercent: -15,
                filter: 'blur(0px)',
                opacity: 1,
                duration: 1.5,
                ease: 'none',
              },
              0
            );

          mainTimeline.add(sectionTimeline);
        }
      });

      // Uniform Text Entry Animation for all blocks
      infoBlocks.forEach((block) => {
        const h2 = block.querySelector('h2');
        const p = block.querySelector('p');

        gsap.fromTo(
          [h2, p],
          {
            y: 120, // Aumentado para garantir o efeito vindo "do rodapé"
            opacity: 0,
            filter: 'blur(6px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%', // Dispara quando o topo do bloco atinge 85% da tela (perto do rodapé)
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    mm.add('(max-width: 1023px)', () => {
      const mobileImages = gsap.utils.toArray<HTMLImageElement>('.mobile-img');
      const bgColors = ['#040013', '#060018', '#08001e', '#0a001a'];

      mobileImages.forEach((img, index) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: img,
              start: 'top 90%',
              end: 'bottom 10%',
              scrub: true,
            },
          })
          .to(img, {
            objectPosition: '0px 30%',
            ease: 'none',
          })
          .to(
            'body',
            {
              backgroundColor: bgColors[index],
              duration: 1,
              ease: 'power2.inOut',
            },
            0
          );
      });

      const mobileTexts = gsap.utils.toArray<HTMLElement>('.reveal-text');
      mobileTexts.forEach((text) => {
        gsap.fromTo(
          text,
          { y: 60, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      mm.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden transition-colors duration-1000"
      ref={containerRef}
    >
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-24">
        {/* Section Title "Origem" - CustomLight, 28px, Cyan */}
        <div className="mb-24 text-center select-none">
          <h1 className="text-[1.75rem] font-['CustomLight'] font-light leading-none text-[#4fe6ff] uppercase tracking-[0.2em]">
            Origem
          </h1>
        </div>

        <div
          className="arch relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12 max-w-[1440px] mx-auto"
          ref={archRef}
        >
          {/* Text Column: Centered on mobile, Right on Desktop */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col">
            {CONTENT_BLOCKS.map((block) => (
              <div
                key={block.id}
                className="arch__info min-h-screen lg:h-[120vh] flex flex-col justify-center mb-24 lg:mb-0 items-center text-center lg:items-end lg:text-right"
              >
                <div className="content w-full lg:max-w-[520px] flex flex-col gap-8 lg:transform lg:-translate-y-[15%]">
                  <div className="space-y-6">
                    {/* H2 using CustomLight font and #0048ff color */}
                    <h2 className="reveal-text text-[32px] md:text-[42px] lg:text-[48px] font-['CustomLight'] font-light leading-[1.1] text-[#0048ff] uppercase tracking-wide">
                      {block.title}
                    </h2>
                    {/* Responsive body text */}
                    <p className="reveal-text text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[1.7] text-[#fcffff] opacity-75">
                      {block.desc}
                    </p>
                  </div>

                  {/* Mobile Image (1:1 Aspect Ratio) */}
                  <div className="lg:hidden mt-8 w-full aspect-square rounded-[24px] overflow-hidden bg-[#060018] shadow-2xl">
                    <Image
                      src={block.img}
                      alt={block.alt}
                      fill
                      className="mobile-img w-full h-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Pinned Images (1:1 Aspect Ratio) */}
          <div
            className="arch__right hidden lg:flex col-span-6 h-screen sticky top-0 items-center justify-center"
            ref={archRightRef}
          >
            <div className="relative w-full aspect-square max-w-[560px]">
              {CONTENT_BLOCKS.map((block) => (
                <div
                  key={`desktop-img-${block.id}`}
                  className="img-wrapper absolute inset-0 rounded-[24px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] bg-[#040013]"
                >
                  <Image
                    src={block.img}
                    alt={block.alt}
                    fill
                    className="w-full h-full object-cover will-change-transform"
                    sizes="(min-width: 1024px) 560px, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOrigin;
