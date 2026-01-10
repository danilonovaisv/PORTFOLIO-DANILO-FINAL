'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
  MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Types ---
interface ServiceCardProps {
  index: number;
  text: string;
  scrollProgress: MotionValue<number>;
  isDesktop: boolean;
}

interface MarqueeProps {
  children: React.ReactNode;
  baseVelocity: number;
}

// --- Content Data ---
const SERVICES = [
  'Direção criativa que organiza o caos',
  'Design estratégico que guia decisões',
  'Identidades que permanecem na memória',
  'Campanhas multicanais com lógica e emoção',
  'Branding que não grita — mas marca',
  'Inteligência artificial aplicada à criação e automação',
  'Liderança criativa com visão e método',
];

const MARQUEE_TEXT = [
  'DIREÇÃO CRIATIVA',
  'DESIGN ESTRATÉGICO',
  'IDENTIDADES',
  'CAMPANHAS',
  'BRANDING',
  'INTELIGÊNCIA ARTIFICIAL',
  'LIDERANÇA CRIATIVA',
];

const MOBILE_BREAKPOINT = 768;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// --- Sub-components ---

// 1. Marquee Component
function Marquee({ children, baseVelocity = 100 }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex flex-nowrap gap-8" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// 2. Service Card Component
const ServiceCard = ({
  index,
  text,
  scrollProgress,
  isDesktop,
}: ServiceCardProps) => {
  // Split text into first keyword (blue) and rest (white)
  const words = text.split(' ');
  const firstWord = words[0];
  const restOfText = words.slice(1).join(' ');

  // Calculate entry direction based on position relative to center (index 3)
  // "Sair das bases das laterais": Bottom-Left for first half, Bottom-Right for second half
  const isLeft = index < 3;
  const isRight = index > 3;

  // X Offset: Move in from sides
  const xOffsetVal = isLeft ? -150 : isRight ? 150 : 0;

  // Y Offset: Move in from bottom
  const yOffsetVal = 120;

  const cardProgress = useTransform(scrollProgress, (value) => {
    // Timing configuration to ensure all cards enter before section leaves
    // Range [0, 0.75] ensures completion while section is still 25% valid
    const totalRange = 0.75;
    const cardDuration = 0.35;
    const staggerDelay = (totalRange - cardDuration) / 6; // Distributed across 7 items (indices 0-6)

    const start = index * staggerDelay;
    const end = start + cardDuration;

    // Smooth stepping
    return clamp((value - start) / (end - start), 0, 1);
  });

  const translateX = useTransform(cardProgress, [0, 1], [xOffsetVal, 0]);
  const translateY = useTransform(cardProgress, [0, 1], [yOffsetVal, 0]);
  const opacity = useTransform(cardProgress, [0, 1], [0, 1]);
  const blur = useTransform(cardProgress, [0, 1], ['blur(10px)', 'blur(0px)']);

  const mobileMotionProps = {
    initial: { opacity: 0, x: 80, filter: 'blur(6px)' },
    whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-80px 0px -80px 0px' },
    transition: {
      duration: 0.4,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <motion.div
      className={cn(
        'group flex items-center gap-4',
        'bg-white/5 border border-white/5 backdrop-blur-sm',
        'rounded-2xl p-5 md:p-6',
        'w-full md:w-auto md:min-w-[320px]', // Desktop constraints
        'hover:bg-white/10 hover:border-l-4 hover:border-l-bluePrimary transition-all duration-300'
      )}
      {...(!isDesktop ? mobileMotionProps : {})}
      style={
        isDesktop
          ? { x: translateX, y: translateY, opacity, filter: blur }
          : undefined
      }
    >
      {/* Circle Icon */}
      <div className="shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-bluePrimary/20 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-bluePrimary shadow-[0_0_10px_rgba(0,72,255,0.6)]" />
      </div>

      {/* Text */}
      <p className="text-base md:text-lg font-medium leading-tight">
        <span className="text-bluePrimary font-bold">{firstWord}</span>{' '}
        <span className="text-text">{restOfText}</span>
      </p>
    </motion.div>
  );
};

// --- Main Component ---
export function AboutWhatIDo() {
  const cardsSectionRef = useRef<HTMLDivElement>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardsSectionRef,
    offset: ['start end', 'end start'],
  });

  const isDesktop = !isMobileViewport;

  return (
    <section className="relative w-full bg-background overflow-hidden py-16 md:py-24">
      {/* Container */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 space-y-16 md:space-y-24">
        {/* 1. Display Title */}
        <header className="flex justify-center text-center">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.1] md:leading-[1.2] tracking-tight max-w-4xl"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Do <span className="text-bluePrimary">insight</span> ao{' '}
            <span className="text-bluePrimary">impacto</span>.
            <br className="hidden md:block" />
            <span className="text-white block mt-2 md:mt-0">
              Mesmo quando você não percebe.
            </span>
          </motion.h2>
        </header>

        {/* 2. Services List */}
        <div className="w-full" ref={cardsSectionRef}>
          {/* Desktop: Horizontal Layout (wrapping if needed, but per blueprint 'sem wrap' on large... lets adapt to usable responsive grid/flex) */}
          {/* Blueprint says: "Faixa horizontal única com 7 cards... Sem wrap". This implies a horizontal scroll or huge width. 
              However, for usability, a flex-wrap or grid is often better unless it's a specific horizontal scroll section.
              Blueprint: "Centralizada em telas >= 1440px".
              Let's use a wrapping flex container for desktop to ensure all are visible without horizontal scrolling the page, 
              unless strictly requested as horizontal scroll. "Todos os cards se movem no eixo X" suggests entry animation.
              "Lista de Cards - Desktop: Faixa horizontal única... Sem wrap". Okay, strict compliance.
              If "Sem wrap", it must overflow. "Centralizada em telas >= 1440px".
              Let's create a scrolling container for desktop if it overflows, or wrap if it fits. 
              Actually, 7 cards in one row is very wide. 
              Let's try a responsive Grid that looks like a list on mobile and organized chaos on desktop. 
              WAIT: Blueprint says "Faixa horizontal única ... Sem wrap". I will implement horizontal scroll for this specific 'strip' feel if it overflows.
          */}
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-4 md:gap-5 justify-center lg:justify-start lg:overflow-x-auto lg:pb-8 lg:px-4 no-scrollbar">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={`${service}-${index}`}
                index={index}
                text={service}
                scrollProgress={scrollYProgress}
                isDesktop={isDesktop}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. Marquee Footer */}
      <div className="w-full mt-24 md:mt-32 space-y-4 md:space-y-8 select-none pointer-events-none">
        {/* Line 1 */}
        <div className="relative bg-bluePrimary py-3 md:py-4 -rotate-1 transform scale-105 origin-left">
          <Marquee baseVelocity={1}>
            <span className="flex items-center gap-8 px-4">
              {MARQUEE_TEXT.map((item, i) => (
                <React.Fragment key={i}>
                  <span className="text-purpleDetails font-black text-2xl md:text-4xl tracking-wider">
                    {item}
                  </span>
                  <span className="text-white/30 text-xl md:text-2xl">•</span>
                </React.Fragment>
              ))}
            </span>
          </Marquee>
        </div>

        {/* Line 2 (Reverse) */}
        <div className="relative bg-transparent border-t border-b border-bluePrimary/30 py-3 md:py-4 rotate-1 transform scale-105 origin-right">
          <Marquee baseVelocity={-1}>
            <span className="flex items-center gap-8 px-4">
              {[...MARQUEE_TEXT].reverse().map((item, i) => (
                <React.Fragment key={i}>
                  <span className="text-white/80 font-black text-2xl md:text-4xl tracking-wider opacity-60">
                    {item}
                  </span>
                  <span className="text-bluePrimary/50 text-xl md:text-2xl">
                    •
                  </span>
                </React.Fragment>
              ))}
            </span>
          </Marquee>
        </div>
      </div>

      {/* Styles for hiding scrollbar but allowing scroll */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
