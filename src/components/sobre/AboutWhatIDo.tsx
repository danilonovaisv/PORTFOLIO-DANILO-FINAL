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

  // Desktop Animation: Scroll Driven
  // The cards enter from the right (+120vw) and move to their original position (0)
  // We stagger them by index so they arrive one after another as we scroll.
  const staggerOffset = index * 0.08;
  const start = 0.15 + staggerOffset;
  const end = 0.5 + staggerOffset;

  const cardProgress = useTransform(scrollProgress, [start, end], [0, 1], {
    clamp: true,
  });

  const translateX = useTransform(cardProgress, [0, 1], ['120vw', '0vw']);
  const opacity = useTransform(cardProgress, [0, 0.4], [0, 1]);

  // Mobile Animation: Viewport Driven
  const mobileAnimationProps = prefersReducedMotion
    ? {
        initial: { opacity: 1, x: 0 },
      }
    : {
        initial: { opacity: 0, x: 80 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: {
          duration: 0.5,
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
        'group flex w-full flex-row items-center gap-4 rounded-[12px] bg-bluePrimary px-[18px] py-[20px] text-white outline-none transition-all duration-300 ease-out will-change-transform',
        'focus-visible:ring-2 focus-visible:ring-blueAccent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'hover:brightness-110 hover:-translate-y-1',
        'md:min-h-[140px] md:w-[400px] md:shrink-0 md:rounded-[16px] md:px-8 md:py-6 md:gap-5'
      )}
      {...(isDesktop && !prefersReducedMotion
        ? { style: { x: translateX, opacity } }
        : !isDesktop
          ? mobileAnimationProps
          : {})}
    >
      <div className="text-3xl font-extrabold leading-none text-purpleDetails transition-colors duration-300 group-hover:text-white md:text-5xl">
        {formattedNumber}
      </div>
      <p className="text-base font-bold leading-tight md:text-[1.25rem]">
        <span className="text-blueAccent transition-colors duration-300 group-hover:text-white">
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
          'flex flex-wrap items-center justify-center gap-6 px-4 py-5 text-[0.85rem] font-black uppercase tracking-[0.2em] text-purpleDetails',
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

  // Multiplier for seamless scroll depending on item length
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
          'text-marquee flex items-center gap-10 text-purpleDetails',
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
      className="relative w-full overflow-hidden bg-background py-20 text-text md:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <header className="mb-16 text-center md:mb-32 md:text-left">
          <h2 className="text-display-about max-w-[15ch] text-white">
            Do <span className="text-bluePrimary">insight</span> ao{' '}
            <span className="text-bluePrimary">impacto</span>.
          </h2>
          <p className="mt-4 text-[1.25rem] font-medium text-textSecondary md:mt-6 md:text-[2.25rem] md:leading-tight">
            Mesmo quando você não percebe.
          </p>
        </header>

        {/* Cards Container */}
        <div className="relative">
          <div
            className={cn(
              'flex flex-col gap-3',
              'md:flex-row md:flex-nowrap md:gap-5'
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

      {/* Rodapé Animado — Marquee */}
      <div className="mt-24 w-full bg-bluePrimary py-6 md:mt-40 md:py-10">
        <div className="flex flex-col gap-6 md:gap-10">
          <Marquee
            items={MARQUEE_LINE_A}
            direction={1}
            baseVelocity={isMobile ? 8 : 12}
            reducedMotion={prefersReducedMotion}
          />
          <Marquee
            items={MARQUEE_LINE_B}
            direction={-1}
            baseVelocity={isMobile ? 8 : 12}
            reducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
