'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const contentBlocks = [
  {
    title: 'O QUE PERMANECE',
    text: 'Desde cedo, sempre prestei atenção no que ficava —\nnão só no que aparecia.\n\nEnquanto muitos olhavam para o brilho imediato,\neu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.\nA essência das coisas sempre falou mais alto do que a superfície.',
    align: 'end',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp',
  },
  {
    title: 'DO TRAÇO À INTENÇÃO',
    text: 'Rabiscos viraram ideias.\nIdeias viraram projetos.\nE os projetos começaram a deixar rastros.\n\nMeu processo criativo nasceu do improviso, do lápis na margem do caderno.\nAos poucos, aquilo que era instinto virou direção.\nCom cada tentativa, aprendi a dar forma ao invisível —\naté que os conceitos começaram a falar por si.',
    align: 'start',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp',
  },
  {
    title: 'A DESCOBERTA DO INVISÍVEL',
    text: 'Foi ali que entendi:\ndesign não é enfeite.\nÉ ferramenta invisível de transformação.\n\nPor trás de cada escolha visual, existe intenção.\nDescobri que o design verdadeiro não grita — ele conduz.\nEle está presente nos detalhes que ninguém percebe,\nmas que todos sentem.\nTransformar sem que se perceba a transformação: isso é potência.',
    align: 'end',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp',
  },
  {
    title: 'EXPANSÃO COM PROPÓSITO',
    text: 'Estudei Comunicação, mergulhei no design, no branding\ne hoje uso inteligência artificial para expandir o alcance\nsem perder a essência humana da criação.\n\nMinha trajetória uniu intuição com método, arte com estratégia.\nO futuro pede novas ferramentas — e eu as abracei.\nMas nunca deixei que a tecnologia apagasse o que me move:\na sensibilidade, o olhar atento, a busca pelo significado.',
    align: 'start',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp',
  },
];

export default function OrigemCriativa() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Setup Z-Index for desktop stacking (reverse order so first is on top)
      const imageWrappers = gsap.utils.toArray<HTMLElement>('.img-wrapper');

      // Initial states
      gsap.set(imageWrappers, {
        zIndex: (i) => imageWrappers.length - i,
        clipPath: 'inset(0% 0% 0% 0%)',
      });

      const imgs = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');

      // Media Query for Desktop/Mobile logic
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        // Desktop Animation
        gsap.set(imgs, {
          objectPosition: '0px 0%',
          filter: 'blur(0px)', // Starting first image clear
          opacity: 1,
        });

        // Ensure subsequent images start blurred/faded if we want that transition
        // But referencing CodePen, it relies on revealing the *next* image which is underneath.
        // So the image underneath (z-index lower) should probably be visible?
        // Actually, CodePen wipes the TOP image to reveal the BOTTOM one.
        // So standard state is enough.

        // Main Timeline pinned to the container
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: rightRef.current,
            scrub: true,
            // markers: true // Debug if needed
          },
        });

        imgs.forEach((img, index) => {
          // If there is a next image (meaning we are not at the last one),
          // we want to transition from Current -> Next.
          // In this stack, Current is on TOP (higher z-index).
          // We hide Current to reveal Next.

          const nextImage = imgs[index + 1];
          if (nextImage) {
            const sectionTimeline = gsap.timeline();

            sectionTimeline
              .to(img, {
                clipPath: 'inset(0% 0% 100% 0%)', // Wipe from bottom up (hide)
                objectPosition: '0px 60%', // Parallax effect during wipe
                filter: 'blur(4px)', // Fade out effect
                opacity: 0.85,
                duration: 1,
                ease: 'none',
              })
              // Animate the next image slightly as it is revealed
              .fromTo(
                nextImage,
                {
                  objectPosition: '0px 40%',
                  filter: 'blur(4px)',
                  opacity: 0.85,
                },
                {
                  objectPosition: '0px 0%',
                  filter: 'blur(0px)',
                  opacity: 1,
                  duration: 1,
                  ease: 'none',
                },
                '<' // Start at same time
              );
            // Optional: Body background color transition if desired
            // .to('body', { backgroundColor: bgColors[index], duration: 1 }, 0);

            mainTimeline.add(sectionTimeline);
          }
        });
      });

      mm.add('(max-width: 768px)', () => {
        // Mobile Layout & Animation
        // In mobile, we might want to reset styles set by desktop if window resized
        // Use CSS order classes for interleaving or just render flow?
        // CodePen uses JS order. Typescript/React: We use CSS classes.

        const imgs = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');

        gsap.set(imgs, {
          objectPosition: '50% 50%',
          clipPath: 'inset(0%)',
          filter: 'blur(0px)',
          opacity: 1,
        });

        // Simple Parallax for mobile images
        imgs.forEach((img) => {
          gsap.fromTo(
            img,
            { objectPosition: '50% 60%' },
            {
              objectPosition: '50% 30%',
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="origem-criativa relative w-full" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-20 max-w-[1440px]">
        <h1 className="text-center text-5xl md:text-[64px] font-extrabold pb-16 md:pb-24 text-text tracking-tighter">
          Origem
        </h1>

        {/* 
          Main Grid 
          Desktop: Flex row with gap.
          Mobile: Flex col with specific order usage handled via classes. 
          The style block handles display: contents for mobile.
        */}
        <div
          className="arch flex flex-col md:flex-row gap-5 md:gap-[60px] justify-between max-w-[1100px] mx-auto relative"
          ref={triggerRef}
        >
          {/* Left Column: Texts */}
          <div className="arch__left flex flex-col min-w-[300px] w-full md:w-auto md:block">
            {contentBlocks.map((block, index) => (
              <div
                key={index}
                className={`arch__info h-auto md:h-screen grid place-items-center w-full px-0 md:px-0 py-10 md:py-0 md:order-0 ${
                  index === 0
                    ? 'order-0'
                    : index === 1
                      ? 'order-2'
                      : index === 2
                        ? 'order-4'
                        : 'order-6'
                }`}
              >
                <div
                  className={`content w-full max-w-[356px] text-${block.align === 'end' ? 'right' : 'left'} md:text-${block.align === 'end' ? 'right' : 'left'}`}
                >
                  <h2 className="text-primary font-extrabold text-[32px] md:text-[42px] leading-[1.1] mb-6 tracking-tight uppercase">
                    {block.title}
                  </h2>
                  <h3 className="text-text font-normal text-[18px] md:text-[20px] leading-[1.6] whitespace-pre-line opacity-90">
                    {block.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Images */}
          <div className="arch__right relative w-full md:max-w-[540px] md:h-screen flex flex-col md:flex">
            {contentBlocks.map((block, index) => (
              <div
                key={`img-${index}`}
                className={`img-wrapper relative w-full h-[360px] md:h-[400px] rounded-[16px] md:rounded-[24px] overflow-hidden mb-5 md:mb-0 md:absolute md:top-1/2 md:-translate-y-1/2 left-0 ${
                  index === 0
                    ? 'order-1'
                    : index === 1
                      ? 'order-3'
                      : index === 2
                        ? 'order-5'
                        : 'order-7'
                }`}
              >
                <Image
                  src={block.imageUrl}
                  alt={block.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="spacer h-[20vh] md:h-[30vh] w-full" />
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .arch__left,
          .arch__right {
            display: contents;
          }
        }
      `}</style>
    </section>
  );
}
