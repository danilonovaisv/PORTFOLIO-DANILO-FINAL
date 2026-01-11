'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { PlaceHolderImages } from '@/lib/placeholder-images';

gsap.registerPlugin(ScrollTrigger);

const contentBlocks = [
  {
    title: 'O QUE PERMANECE',
    text: 'Desde cedo, sempre prestei atenção no que ficava —\nnão só no que aparecia.\nEnquanto muitos olhavam para o brilho imediato,\neu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.\nA essência das coisas sempre falou mais alto do que a superfície.',
    align: 'end',
  },
  {
    title: 'DO TRAÇO À INTENÇÃO',
    text: 'Rabiscos viraram ideias.\nIdeias viraram projetos.\nE os projetos começaram a deixar rastros.\nMeu processo criativo nasceu do improviso, do lápis na margem do caderno.\nAos poucos, aquilo que era instinto virou direção.\nCom cada tentativa, aprendi a dar forma ao invisível —\naté que os conceitos começaram a falar por si.',
    align: 'start',
  },
  {
    title: 'A DESCOBERTA DO INVISÍVEL',
    text: 'Foi ali que entendi:\ndesign não é enfeite.\nÉ ferramenta invisível de transformação.\nPor trás de cada escolha visual, existe intenção.\nDescobri que o design verdadeiro não grita — ele conduz.\nEle está presente nos detalhes que ninguém percebe,\nmas que todos sentem.\nTransformar sem que se perceba a transformação: isso é potência.',
    align: 'end',
  },
  {
    title: 'EXPANSÃO COM PROPÓSITO',
    text: 'Estudei Comunicação, mergulhei no design, no branding\ne hoje uso inteligência artificial para expandir o alcance\nsem perder a essência humana da criação.\nMinha trajetória uniu intuição com método, arte com estratégia.\nO futuro pede novas ferramentas — e eu as abracei.\nMas nunca deixei que a tecnologia apagasse o que me move:\na sensibilidade, o olhar atento, a busca pelo significado.',
    align: 'start',
  },
];

export default function OrigemCriativa() {
  const componentRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: Lenis | null = null;
    const ctx = gsap.context(() => {
      lenis = new Lenis();

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      const imageWrappers = gsap.utils.toArray<HTMLElement>('.img-wrapper');
      imageWrappers.forEach((wrapper, i) => {
        gsap.set(wrapper, { zIndex: imageWrappers.length - i });
      });

      const mm = gsap.matchMedia(componentRef.current as any);

      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });

        const contentElements = gsap.utils.toArray<HTMLElement>('.arch__info');
        const imageElements =
          gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');

        gsap.set(imageElements, {
          clipPath: 'inset(0% 0% 0% 0%)',
          filter: 'blur(4px)',
          opacity: 0.85,
        });

        tl.to('body', { backgroundColor: '#0a001a' });

        // Make first image visible immediately
        gsap.set(imageElements[0], {
          filter: 'blur(0px)',
          opacity: 1,
        });

        // Make first text appear on scroll
        gsap.from(contentElements[0], {
          autoAlpha: 0,
          scrollTrigger: {
            trigger: contentElements[0],
            start: 'top center',
            end: 'center center',
            scrub: true,
          },
        });

        contentElements.forEach((content, index) => {
          if (index === 0) return; // Skip first one as it's handled separately

          const currentImg = imageElements[index];
          const prevImg = imageElements[index - 1];

          ScrollTrigger.create({
            trigger: content,
            start: 'center center',
            end: 'bottom top',
            onEnter: () => {
              gsap.to(currentImg, {
                filter: 'blur(0px)',
                opacity: 1,
                ease: 'power1.inOut',
              });
              if (prevImg) {
                gsap.to(prevImg, {
                  clipPath: 'inset(0% 0% 100% 0%)',
                  ease: 'power1.inOut',
                });
              }
            },
            onLeaveBack: () => {
              if (prevImg) {
                gsap.to(currentImg, {
                  filter: 'blur(4px)',
                  opacity: 0.85,
                  ease: 'power1.inOut',
                });
                gsap.to(prevImg, {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  ease: 'power1.inOut',
                });
              }
            },
          });
        });

        const rightSection = rightRef.current;
        if (rightSection) {
          ScrollTrigger.create({
            trigger: triggerRef.current,
            start: 'top top',
            end: `bottom bottom`,
            pin: rightSection,
            pinSpacing: false,
          });
        }
      });

      mm.add('(max-width: 768px)', () => {
        const imageElements =
          gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');
        imageElements.forEach((img) => {
          gsap.fromTo(
            img,
            {
              objectPosition: `50% 60%`,
              filter: `blur(4px)`,
              opacity: 0.85,
            },
            {
              scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'center center',
                scrub: true,
              },
              objectPosition: `50% 50%`,
              filter: `blur(0px)`,
              opacity: 1,
            }
          );
        });
      });
    }, componentRef);

    return () => {
      ctx.revert();
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return (
    <section className="origem-criativa" ref={componentRef}>
      <div className="container">
        <h1 className="text-center text-5xl md:text-6xl font-extrabold pt-16 pb-8 text-foreground">
          Origem
        </h1>

        <div className="arch" ref={triggerRef}>
          <div className="arch__left">
            {contentBlocks.map((block, index) => (
              <div key={index} className={`arch__info justify-${block.align}`}>
                <div className="content">
                  <h2 className="text-primary font-extrabold text-[clamp(32px,5vw,48px)] leading-tight mb-4 tracking-tighter">
                    {block.title}
                  </h2>
                  <h3 className="text-foreground/90 font-normal text-[clamp(16px,2.5vw,20px)] leading-relaxed whitespace-pre-line max-w-[28ch]">
                    {block.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="arch__right" ref={rightRef}>
            {PlaceHolderImages.map((image) => (
              <div key={image.id} className="img-wrapper">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={image.imageHint}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="spacer" />
      </div>
    </section>
  );
}
