'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { floatingCardsData } from '@/data/cards.data';


gsap.registerPlugin(ScrollTrigger);

export default function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.card-item');

      // 1. Initial Infinite Float Loop
      cards.forEach((card) => {
        const element = card as HTMLElement;
        gsap.to(element, {
          y: '-=20',
          rotationX: 'random(-5, 5)',
          rotationY: 'random(-5, 5)',
          duration: 'random(2, 4)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // 2. Scroll Parallax (Desacoplado)
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.to(cards, {
            yPercent: (i) => -self.progress * (20 + i * 10),
            ease: 'none',
            overwrite: 'auto',
          });
        },
      });

      // Fade in background on scroll
      gsap.to(containerRef.current, {
        background: '#1a1a3a',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      rotateY: 10,
      rotateX: -5,
      boxShadow: '0 25px 50px rgba(147, 51, 234, 0.4)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={containerRef}
      className="floating-cards-container relative min-h-screen w-full overflow-hidden bg-[#0f0f23] py-24 px-6 md:px-12"
    >
      <div
        ref={gridRef}
        className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {floatingCardsData.map((card) => (
          <div
            key={card.id}
            className="card-item card-3d-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            tabIndex={0}
            role="article"
            aria-label={card.title}
          >
            <div className="card-glass relative flex h-[320px] w-full flex-col overflow-hidden rounded-[24px] p-6 transition-colors hover:bg-white/10 group">
              <div className="relative mb-4 h-40 w-full overflow-hidden rounded-[16px]">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              <h3 className="text-glow-primary mb-2 text-xl font-bold text-white transition-colors group-hover:text-[#4fe6ff]">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                {card.desc}
              </p>

              <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#8705f2] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
