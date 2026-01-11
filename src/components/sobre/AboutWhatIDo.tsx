'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useAnimationFrame,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  wrap,
  MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { ABOUT_CONTENT } from '@/config/content';

const MARQUEE_LINE_A = ABOUT_CONTENT.whatIDo.marquee;
const MARQUEE_LINE_B = [...ABOUT_CONTENT.whatIDo.marquee].reverse();

interface MarqueeProps {
  items: string[];
  direction?: number;
  baseVelocity?: number;
  reducedMotion?: boolean;
  className?: string;
}

// --- DESKTOP CARD: Scroll-driven horizontal animation ---
const DesktopCard = ({
  index,
  text,
  scrollProgress,
  prefersReducedMotion,
  totalCards,
}: {
  index: number;
  text: string;
  scrollProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
  totalCards: number;
}) => {
  // Distribui os cards uniformemente ao longo do scroll
  // Cada card ocupa uma "fatia" do progresso total
  const sliceSize = 1 / totalCards;
  const cardOffset = index * sliceSize * 0.3; // 30% de overlap para entrada suave

  // Movimento horizontal: fora direita → centro → fora esquerda
  // Usando 120vw para garantir que saia completamente da tela
  const translateX = useTransform(
    scrollProgress,
    [cardOffset, cardOffset + 0.3, cardOffset + 0.7],
    ['120vw', '0vw', '-120vw']
  );

  // Opacidade: SEM FADE - sempre 100% visível enquanto está na tela
  // Só desaparece quando está completamente fora da viewport

  const formattedNumber = `${index + 1}`.padStart(2, '0');

  if (prefersReducedMotion) {
    return (
      <article
        tabIndex={0}
        aria-label={text}
        className="group relative flex flex-row items-center text-white outline-none bg-[#0048ff] min-h-[140px] w-[260px] shrink-0 rounded-[16px] px-5 py-5 gap-4 focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
      >
        <div className="text-[2.5rem] font-black leading-none text-[#8705f2]">
          {formattedNumber}
        </div>
        <p className="text-[0.95rem] font-bold leading-[1.25]">
          <span className="text-white">{text}</span>
        </p>
      </article>
    );
  }

  return (
    <motion.article
      tabIndex={0}
      aria-label={text}
      className="group relative flex flex-row items-center text-white outline-none will-change-transform bg-[#0048ff] min-h-[140px] w-[260px] shrink-0 rounded-[16px] px-5 py-5 gap-4 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
      style={{
        x: translateX,
      }}
    >
      <div className="text-[2.5rem] font-black leading-none text-[#8705f2] transition-colors duration-200 group-hover:text-white">
        {formattedNumber}
      </div>
      <p className="text-[0.95rem] font-bold leading-[1.25]">
        <span className="text-white">{text}</span>
      </p>
    </motion.article>
  );
};

// --- MOBILE CARD: Enter animation then stay fixed ---
const MobileCard = ({
  index,
  text,
  prefersReducedMotion,
}: {
  index: number;
  text: string;
  prefersReducedMotion: boolean;
}) => {
  const formattedNumber = `${index + 1}`.padStart(2, '0');

  const variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.article
      tabIndex={0}
      aria-label={text}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={variants}
      className="group relative flex flex-row items-center text-white outline-none bg-[#0048ff] w-full h-[70px] rounded-[12px] px-[18px] gap-3 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
    >
      <div className="text-[1.5rem] font-black leading-none text-[#8705f2] transition-colors duration-200 group-hover:text-white">
        {formattedNumber}
      </div>
      <p className="text-[0.875rem] font-bold leading-[1.3]">
        <span className="text-white">{text}</span>
      </p>
    </motion.article>
  );
};

// Componente Marquee (rodapé animado)
function Marquee({
  items,
  direction = 1,
  baseVelocity = 10,
  reducedMotion = false,
  className,
}: MarqueeProps) {
  const { scrollY } = useScroll();
  const baseX = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionRef = useRef<number>(direction);
  useAnimationFrame((_t, delta) => {
    if (reducedMotion) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() !== 0) {
      moveBy += directionRef.current * moveBy * velocityFactor.get();
    }

    baseX.set(baseX.get() + moveBy);
  });

  const repeatedItems = [...items, ...items, ...items, ...items];

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'flex flex-wrap items-center justify-center gap-4 px-4 py-4 font-black uppercase tracking-[0.15em] text-[#8705f2] text-sm',
          className
        )}
      >
        {items.map((item, idx) => (
          <span key={`${item}-${idx}`} className="flex items-center gap-2">
            <span>{item}</span>
            {idx < items.length - 1 && <span className="opacity-60">・</span>}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden whitespace-nowrap" aria-hidden="true">
      <motion.div
        className={cn(
          'flex items-center gap-8 font-black uppercase tracking-[0.2em] text-[#8705f2] text-sm lg:text-base lg:gap-10',
          className
        )}
        style={{ x }}
      >
        {repeatedItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-8 lg:gap-10"
          >
            <span>{item}</span>
            <span className="opacity-40">・</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function AboutWhatIDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = !!useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Scroll progress para toda a seção (Desktop)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 15,
    restDelta: 0.001,
  });

  const cards = ABOUT_CONTENT.whatIDo.cards;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#040013] py-16 text-white lg:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center lg:mb-20">
          <motion.h2
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-display text-[2rem] font-black leading-[1.1] tracking-tight text-white lg:text-[4rem]"
          >
            Do <span className="text-[#0048ff]">insight</span> ao{' '}
            <span className="text-[#0048ff]">impacto</span>.
          </motion.h2>
          <motion.p
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="mt-4 text-base font-medium text-[#a1a3a3] lg:mt-6 lg:text-xl"
          >
            Mesmo quando você não percebe.
          </motion.p>
        </header>
      </div>

      {/* DESKTOP: Cards com animação horizontal full-viewport */}
      {isDesktop && (
        <div className="relative w-full overflow-hidden py-8">
          {/* Container flex com GAP REDUZIDO */}
          <div className="flex flex-row flex-nowrap gap-3 items-center justify-center">
            {cards.map((service, index) => (
              <DesktopCard
                key={service.id}
                index={index}
                text={service.text}
                scrollProgress={smoothProgress}
                prefersReducedMotion={prefersReducedMotion}
                totalCards={cards.length}
              />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE: Barras com entrada e depois seguem scroll normal */}
      {!isDesktop && (
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col gap-3 w-full">
            {cards.map((service, index) => (
              <MobileCard
                key={service.id}
                index={index}
                text={service.text}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      )}

      {/* Marquee Footer */}
      <div className="mt-16 w-full bg-[#0048ff] py-6 lg:mt-32 lg:py-10">
        <div className="flex flex-col gap-6 lg:gap-10">
          <Marquee
            items={MARQUEE_LINE_A}
            direction={1}
            baseVelocity={12}
            reducedMotion={prefersReducedMotion}
          />
          <Marquee
            items={MARQUEE_LINE_B}
            direction={-1}
            baseVelocity={12}
            reducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
