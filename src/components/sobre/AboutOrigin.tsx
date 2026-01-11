'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ABOUT_CONTENT } from '@/config/content';
import Image from 'next/image';
import { useAntigravityStore } from '@/store/antigravity.store';

gsap.registerPlugin(ScrollTrigger);

export default function AboutOrigin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { flags } = useAntigravityStore();
  const originBlocks = ABOUT_CONTENT.origin.blocks;

  useEffect(() => {
    if (flags.reducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: PIN + MASK REVEAL (Ajustado para simular o efeito do CodePen)
      mm.add('(min-width: 1024px)', () => {
        // Pin the right column
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${originBlocks.length * window.innerHeight}`, // Estende o scroll baseado no número de blocos
          pin: rightRef.current,
          pinSpacing: true, // Mantém o espaçamento para o fluxo natural
          anticipatePin: 1, // Pequeno buffer para evitar flicker
        });

        const imageWrappers = gsap.utils.toArray<HTMLElement>('.img-wrapper');
        const imagens = gsap.utils.toArray<HTMLElement>('.img-wrapper img');
        const textBlocks = gsap.utils.toArray<HTMLElement>('.arch__info');

        // Garante que a primeira imagem esteja visível inicialmente
        gsap.set(imagens, { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }); // Começa invisível
        gsap.set(imagens[0], {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }); // Primeira visível

        // Reverse Z-Index para sobreposição correta
        imageWrappers.forEach((wrapper, i) => {
          (wrapper as HTMLElement).style.zIndex = String(
            originBlocks.length - i
          );
        });

        // Configuração das transições de scroll para cada par de imagens
        originBlocks.forEach((_, index) => {
          if (index >= originBlocks.length - 1) return; // Último não tem próximo

          const currentImg = imagens[index];
          const nextImg = imagens[index + 1];
          const triggerBlock = textBlocks[index + 1]; // O bloco que dispara a transição para a próxima imagem

          // Timeline para a transição entre currentImg e nextImg
          const tl = gsap.timeline({
            scrollTrigger: {
              id: `transition-${index}`, // ID único para debug
              trigger: triggerBlock, // Usa o bloco de texto como trigger
              start: 'top center', // Pode ajustar conforme o timing desejado
              end: 'bottom center', // Pode ajustar conforme o timing desejado
              scrub: true, // Liga o scroll ao progresso da animação
              // markers: true, // Descomente para debug visual dos triggers
            },
          });

          // Animação de transição: currentImg fecha e nextImg abre
          // Usando um polígono dinâmico para simular o efeito de cortina vertical centralizada
          tl.to(
            currentImg,
            {
              clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)', // Fecha horizontalmente ao centro
              duration: 1, // A duração é determinada pelo scrub
              ease: 'none', // Importante para scrub
            },
            0
          ).to(
            nextImg,
            {
              clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)', // Abre horizontalmente a partir do centro
              duration: 1,
              ease: 'none',
            },
            0
          );

          // Opcional: Mudança de fundo suave (ajuste cores se necessário)
          if (index > 0) {
            // Evita aplicar ao primeiro bloco novamente
            tl.to(
              containerRef.current,
              {
                backgroundColor: index % 2 === 0 ? '#040013' : '#0a001a', // Exemplo de alternância
                duration: 1,
                ease: 'power2.inOut', // Ease opcional para mudança de cor
              },
              0
            );
          }
        });
      });

      // MOBILE: PARALLAX & REVEAL (Mantido conforme original)
      mm.add('(max-width: 1023px)', () => {
        const imagens = gsap.utils.toArray<HTMLElement>('.mobile-img img');

        imagens.forEach((img) => {
          gsap.fromTo(
            img,
            { objectPosition: '0px 70%', filter: 'blur(4px)', opacity: 0.75 }, // Estado inicial mais nítido e opaco
            {
              objectPosition: '0px 30%',
              filter: 'blur(0px)',
              opacity: 1,
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
    }, containerRef);

    return () => ctx.revert(); // Limpeza correta ao desmontar
  }, [flags.reducedMotion, originBlocks.length]); // Adicionado length como dependência caso blocks mudem

  return (
    <section
      ref={containerRef}
      className="relative bg-background text-text overflow-hidden transition-colors duration-1000"
      aria-label="Origem Criativa"
    >
      <div className="container mx-auto px-6 py-20 lg:py-32">
        <h1 className="text-center font-extrabold text-[clamp(40px,8vw,64px)] mb-[10vh] uppercase tracking-[0.15em] text-[#fcffff]">
          {ABOUT_CONTENT.origin.title}
        </h1>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-[1100px] mx-auto relative">
          {/* LEFT COLUMN: TEXTS */}
          <div ref={leftRef} className="w-full lg:w-1/2 flex flex-col">
            {originBlocks.map((block) => (
              <div
                key={block.id}
                className={`arch__info min-h-[40vh] lg:min-h-[100vh] flex items-center mb-16 lg:mb-0 ${
                  // Ajustado min-h para 100vh no desktop
                  block.align === 'right' || block.id === '1'
                    ? 'lg:justify-end'
                    : 'lg:justify-start'
                }`}
              >
                <div
                  className={`max-w-[356px] w-full text-center lg:translate-y-[-10%] ${
                    block.align === 'right' || block.id === '1'
                      ? 'lg:text-right'
                      : 'lg:text-left'
                  }`}
                >
                  <h3 className="text-bluePrimary font-extrabold text-[clamp(32px,5vw,48px)] leading-[0.9] mb-6 uppercase tracking-tight">
                    {block.title}
                  </h3>
                  <h4 className="text-[#fcffff] font-normal text-[clamp(16px,2.5vw,20px)] leading-[1.6] opacity-90 mx-auto lg:mx-0 max-w-[28ch]">
                    {block.text}
                  </h4>

                  {/* MOBILE IMAGE (Interleaved) */}
                  <div className="lg:hidden mt-10 w-full aspect-4/5 rounded-[24px] overflow-hidden relative mobile-img border border-white/10 shadow-2xl">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 540px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: PINNED IMAGES (Desktop only) */}
          <div
            ref={rightRef}
            className="hidden lg:block w-1/2 h-screen max-w-[540px] relative shrink-0" // Ajustado width e height
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[540px] h-[500px] rounded-[24px] overflow-hidden shadow-2xl border border-white/5">
              {' '}
              {/* Centralizado e dimensionado */}
              {originBlocks.map((block, i) => (
                <div
                  key={block.id}
                  className="img-wrapper absolute inset-0 w-full h-full"
                >
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-cover"
                    sizes="540px"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Spacers para controle do scroll total */}
        <div className="h-[20vh] lg:h-[100vh]" />{' '}
        {/* Ajustado para dar espaço no final */}
      </div>
    </section>
  );
}
