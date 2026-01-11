'use client';

import { useEffect, useRef, useState } from 'react';
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

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

const MARQUEE_LINE_A = ABOUT_CONTENT.whatIDo.marquee;
const MARQUEE_LINE_B = [...ABOUT_CONTENT.whatIDo.marquee].reverse();

interface ServiceCardProps {
  index: number;
  text: string;
  scrollProgress: MotionValue<number>;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
}

const ServiceCard = ({
  index,
  text,
  scrollProgress,
  isDesktop,
  prefersReducedMotion,
}: ServiceCardProps) => {
  const [firstWord, ...restWords] = text.split(' ');
  const restOfText = restWords.join(' ');

  // Desktop Animation: Full horizontal cross (Right to Left)
  // Tightened stagger and range for cards to follow each other closely
  const staggerOffset = index * 0.06;
  const start = 0.1 + staggerOffset;
  const end = 0.5 + staggerOffset;

  const cardProgress = useTransform(scrollProgress, [start, end], [0, 1], {
    clamp: true,
  });

  const translateX = useTransform(cardProgress, [0, 1], ['100vw', '-120vw']);
  const opacity = useTransform(cardProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Mobile Animation: Viewport Driven
  const mobileAnimationProps = prefersReducedMotion
    ? {
        initial: { opacity: 1, x: 0 },
      }
    : {
        initial: { opacity: 0, x: 60 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: '-20px' },
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        },
      };

  const formattedNumber = `${index + 1}`.padStart(2, '0');

  return (
    <motion.article
      tabIndex={0}
      aria-label={text}
      className={cn(
        'group flex w-full flex-row items-center gap-4 rounded-[12px] bg-[#0048ff] px-[24px] py-[28px] text-white outline-none transition-all duration-300 ease-out will-change-transform',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040013]',
        'hover:brightness-110 hover:-translate-y-1',
        'md:min-h-[160px] md:w-[450px] md:shrink-0 md:rounded-[20px] md:px-10 md:py-10 md:gap-8'
      )}
      style={{
        ...(isDesktop && !prefersReducedMotion
          ? { x: translateX, opacity }
          : {}),
      }}
      {...(!isDesktop ? mobileAnimationProps : {})}
    >
      <div className="text-4xl font-extrabold leading-none text-[#8705f2] transition-colors duration-300 group-hover:text-white md:text-6xl">
        {formattedNumber}
      </div>
      <p className="text-lg font-black leading-[1.2] md:text-[1.5rem]">
        <span className="text-[#4fe6ff] transition-colors duration-300 group-hover:text-white">
          {firstWord}
        </span>
        {restOfText ? <span className="text-white"> {restOfText}</span> : null}
      </p>
    </motion.article>
  );
};

interface MarqueeProps {
  items: string[];
  direction?: 1 | -1;
  baseVelocity?: number;
  reducedMotion?: boolean;
  className?: string;
}

function Marquee({
  items,
  direction = 1,
  baseVelocity = 10,
  reducedMotion = false,
  className,
}: MarqueeProps) {
  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'flex flex-wrap items-center justify-center gap-6 px-4 py-5 font-black uppercase tracking-[0.2em] text-[#8705f2]',
          className
        )}
      >
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-2">
            <span>{item}</span>
            {index < items.length - 1 && <span className="opacity-60">・</span>}
          </span>
        ))}
      </div>
    );
  }

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
  useAnimationFrame((t, delta) => {
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() !== 0) {
      moveBy += directionRef.current * moveBy * velocityFactor.get();
    }

    baseX.set(baseX.get() + moveBy);
  });

  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className={cn(
          'flex items-center gap-10 font-black uppercase tracking-[0.3em] text-[#8705f2] md:text-[1.25rem]',
          className
        )}
        style={{ x }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-10">
            <span>{item}</span>
            <span className="opacity-40">・</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function AboutWhatIDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const prefersReducedMotion = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = viewportWidth >= DESKTOP_BREAKPOINT;
  const isMobile = viewportWidth <= MOBILE_BREAKPOINT;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#040013] py-24 text-white md:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <header className="mb-24 text-center md:mb-40">
          <h2 className="font-display text-[2.5rem] font-black leading-[1.05] tracking-tight text-white md:text-[5.5rem]">
            Do <span className="text-[#0048ff]">insight</span> ao{' '}
            <span className="text-[#0048ff]">impacto</span>.
          </h2>
          <p className="mt-6 text-[1.25rem] font-bold text-[#a1a3a3] md:mt-10 md:text-[2.25rem] md:leading-tight">
            Mesmo quando você não percebe.
          </p>
        </header>

        {/* Cards Container */}
        <div className="relative">
          <div
            className={cn(
              'flex flex-col gap-5',
              'md:flex-row md:flex-nowrap md:gap-8'
            )}
          >
            {ABOUT_CONTENT.whatIDo.cards.map((service, index) => (
              <ServiceCard
                key={service.id}
                index={index}
                text={service.text}
                scrollProgress={scrollYProgress}
                isDesktop={isDesktop}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="mt-32 w-full bg-[#0048ff] py-10 md:mt-64 md:py-14">
        <div className="flex flex-col gap-10 md:gap-14">
          <Marquee
            items={MARQUEE_LINE_A}
            direction={1}
            baseVelocity={isMobile ? 12 : 18}
            reducedMotion={prefersReducedMotion}
          />
          <Marquee
            items={MARQUEE_LINE_B}
            direction={-1}
            baseVelocity={isMobile ? 12 : 18}
            reducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
