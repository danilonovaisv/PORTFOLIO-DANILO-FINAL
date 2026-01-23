'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import '@/styles/about-origin.css';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';

gsap.registerPlugin(ScrollTrigger);

// cspell:ignore webp gsap
const FALLBACK_BLOCKS = [
  {
    id: '1',
    title: 'O que permanece',
    desc: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. Enquanto muitos olhavam para o brilho imediato, eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo. A essência das coisas sempre falou mais alto do que a superfície.',
    fallback: 'about/origin/about.origin_image.1.webp',
    alt: 'O que permanece - essência que sobrevive ao tempo',
  },
  {
    id: '2',
    title: 'Do traço à intenção',
    desc: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
    fallback: 'about/origin/about.origin_image.2.webp',
    alt: 'Do traço à intenção - processo criativo emergente',
  },
  {
    id: '3',
    title: 'A descoberta do invisível',
    desc: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
    fallback: 'about/origin/about.origin_image.3.webp',
    alt: 'Descoberta do invisível - design como transformação',
  },
  {
    id: '4',
    title: 'Expansão com propósito',
    desc: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
    fallback: 'about/origin/about.origin_image.4.webp',
    alt: 'Expansão com propósito - intuição + tecnologia',
  },
];

const AboutOrigin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const archRightRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number>(0);
  const [isClient, setIsClient] = useState(false);

  // Resolver URLs de imagem com fallback seguro
  const resolveFallback = (path: string) =>
    buildSupabaseStorageUrl('site-assets', path) ?? undefined;

  const originImage1 =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.about.originImages[0],
      resolveFallback(FALLBACK_BLOCKS[0].fallback)
    ) ?? resolveFallback(FALLBACK_BLOCKS[0].fallback);

  const originImage2 =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.about.originImages[1],
      resolveFallback(FALLBACK_BLOCKS[1].fallback)
    ) ?? resolveFallback(FALLBACK_BLOCKS[1].fallback);

  const originImage3 =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.about.originImages[2],
      resolveFallback(FALLBACK_BLOCKS[2].fallback)
    ) ?? resolveFallback(FALLBACK_BLOCKS[2].fallback);

  const originImage4 =
    useSiteAssetUrl(
      SITE_ASSET_KEYS.about.originImages[3],
      resolveFallback(FALLBACK_BLOCKS[3].fallback)
    ) ?? resolveFallback(FALLBACK_BLOCKS[3].fallback);

  const CONTENT_BLOCKS = [
    { ...FALLBACK_BLOCKS[0], img: originImage1 },
    { ...FALLBACK_BLOCKS[1], img: originImage2 },
    { ...FALLBACK_BLOCKS[2], img: originImage3 },
    { ...FALLBACK_BLOCKS[3], img: originImage4 },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!archRef.current || !archRightRef.current) return;

      const wrappers = gsap.utils.toArray<HTMLElement>('.img-wrapper');
      const images = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');
      const infoBlocks = gsap.utils.toArray<HTMLElement>('.arch__info');
      const bgColors = ['#040013', '#060018', '#08001e', '#0a001a'];

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

      gsap.to(images[0], {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: archRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Correção do erro de adição da timeline
      CONTENT_BLOCKS.forEach((_, index) => {
        const currentWrapper = wrappers[index];
        const currentImg = images[index];
        const nextImage = images[index + 1];

        if (index < CONTENT_BLOCKS.length - 1) {
          const sectionTimeline = gsap.timeline({ paused: true });

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

          mainTimeline.add(() => {
            sectionTimeline.play();
          });
        }
      });

      infoBlocks.forEach((block) => {
        const h2 = block.querySelector('h2') as HTMLElement;
        const p = block.querySelector('p') as HTMLElement;

        if (h2) {
          gsap.fromTo(
            h2,
            { y: 40, opacity: 0, filter: 'blur(12px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (p) {
          gsap.fromTo(
            p,
            { y: 30, opacity: 0, filter: 'blur(8px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              delay: 0.1,
              ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    });

    mm.add('(max-width: 1023px)', () => {
      const mobileImages = gsap.utils.toArray<HTMLElement>(
        '.mobile-img-container'
      );
      const mobileTexts = gsap.utils.toArray<HTMLElement>(
        '.mobile-text-container'
      );
      const bgColors = ['#040013', '#060018', '#08001e', '#0a001a'];

      mobileImages.forEach((container, index) => {
        const img = container.querySelector('img') as HTMLImageElement;
        if (!img) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
          .fromTo(
            img,
            { y: -40, scale: 1.1 },
            { y: 40, scale: 1, ease: 'none' }
          )
          .to(
            'body',
            {
              backgroundColor: bgColors[index],
              duration: 0.5,
              ease: 'power2.inOut',
            },
            0
          );
      });

      mobileTexts.forEach((text) => {
        gsap.fromTo(
          text,
          { y: 80, opacity: 0, filter: 'blur(10px)' },
          {
            y: -40,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: text,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    });

    const refreshST = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshST);
    setTimeout(refreshST, 500);

    return () => {
      window.removeEventListener('load', refreshST);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      mm.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <section className="relative w-full overflow-hidden transition-colors duration-1000">
        <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-24">
          <div className="mb-24 text-center select-none">
            <h1 className="text-[1.75rem] font-['CustomLight'] font-light leading-none text-[#4fe6ff] tracking-[0.2em] uppercase">
              LOADING...
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative w-full overflow-hidden transition-colors duration-1000"
      ref={containerRef}
    >
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-24">
        <div className="mb-24 text-center select-none">
          <h1 className="text-[1.75rem] font-['CustomLight'] font-light leading-none text-[#4fe6ff] tracking-[0.2em] uppercase">
            ORIGEM
          </h1>
        </div>

        <div
          className="arch relative grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 md:gap-12 max-w-[1440px] mx-auto"
          ref={archRef}
        >
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col">
            {CONTENT_BLOCKS.map((block) => (
              <div
                key={block.id}
                className="arch__info min-h-screen lg:h-[120vh] flex flex-col justify-center mb-24 lg:mb-0 items-center text-center lg:items-end lg:text-right"
              >
                <div className="content w-full lg:max-w-[520px] flex flex-col gap-8 lg:transform lg:-translate-y-[15%]">
                  <div className="mobile-text-container space-y-6">
                    <h2 className="text-h1 font-bold leading-[1.1] text-primary normal-case">
                      {block.title}
                    </h2>
                    <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal leading-[1.7] text-[#fcffff] opacity-75">
                      {block.desc}
                    </p>
                  </div>

                  <div className="mobile-img-container lg:hidden relative mt-8 w-full aspect-square min-h-[240px] rounded-[24px] overflow-hidden bg-[#060018] shadow-2xl">
                    <Image
                      src={block.img || '/placeholder-image.jpg'} // Correção do erro de tipo no src
                      alt={block.alt}
                      fill
                      className="w-full h-full object-cover will-change-transform"
                      sizes="(max-width: 1024px) 100vw, 560px"
                      priority={block.id === '1'}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                    src={block.img || '/placeholder-image.jpg'} // Correção do erro de tipo no src
                    alt={block.alt}
                    fill
                    className="w-full h-full object-cover will-change-transform"
                    sizes="(min-width: 1024px) 560px, 100vw"
                    priority={block.id === '1'}
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
