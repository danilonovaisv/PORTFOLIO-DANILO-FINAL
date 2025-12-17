'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { ASSETS } from '../../lib/constants';
import { useHeroMouse } from './useHeroMouse';

const HeroOrbLayer = dynamic(() => import('./HeroOrbLayer'), { ssr: false });

/* ===== TEXTO ANIMADO (INALTERADO) ===== */
const RefAnimatedText: React.FC<{
  text: string;
  blueStart?: boolean;
  delayBase?: number;
}> = ({ text, blueStart = false, delayBase = 0 }) => {
  const words = text.split(' ');
  let i = delayBase;

  return (
    <div className="flex flex-wrap gap-[0.25em]">
      {words.map((word, w) => (
        <span key={w} className={`word ${blueStart ? 'blue-start' : ''}`}>
          {word.split('').map((char, c) => {
            const index = i++;
            return (
              <span key={c} style={{ '--i': index } as React.CSSProperties}>
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouse = useHeroMouse();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (videoRef.current) videoRef.current.muted = v <= 0.01;
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <section ref={sectionRef} className="relative h-[350vh] bg-[#F4F4F4]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* TEXTO */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
          className={`absolute inset-0 z-10 container mx-auto px-12 flex items-center ${
            visible ? 'hero-text-visible' : ''
          }`}
        >
          <div className="max-w-5xl">
            <div className="text-[6rem] font-extrabold leading-[0.9]">
              <RefAnimatedText text="Design," blueStart />
              <RefAnimatedText text="não é só" delayBase={6} />
              <RefAnimatedText text="estética." delayBase={14} />
            </div>

            <p className="mt-6 text-[#0057FF] text-xl">
              [ É intenção, é estratégia, é experiência. ]
            </p>

            <a
              href="/sobre"
              className="inline-flex mt-10 items-center gap-3 bg-[#0057FF] text-white rounded-full px-8 py-4"
            >
              get to know me better
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        {/* ORB */}
        <HeroOrbLayer mouse={mouse} scroll={scrollYProgress} />

        {/* VÍDEO */}
        <div className="absolute right-12 bottom-12 w-[360px] rounded-xl overflow-hidden z-40">
          <video
            ref={videoRef}
            src={ASSETS.videoManifesto}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
