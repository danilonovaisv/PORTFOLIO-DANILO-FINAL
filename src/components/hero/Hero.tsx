'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroGlassScene from './HeroGlassScene';
import { ASSETS } from '../../lib/constants';

function AnimatedWord({
                          text,
                          className = '',
                          delayStart = 0,
                          as = 'h1',
                      }: {
    text: string;
    className?: string;
    delayStart?: number;
    as?: 'h1' | 'p';
}) {
    const Tag = as as any;
    return (
        <Tag className={`word ${className}`}>
            {text.split('').map((ch, i) => (
                <span key={i} style={{ '--i': i + delayStart } as React.CSSProperties}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
            ))}
        </Tag>
    );
}

export default function Hero() {
    const [reduceMotion, setReduceMotion] = useState(false);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduceMotion(mq.matches);
        onChange();
        mq.addEventListener?.('change', onChange);
        return () => mq.removeEventListener?.('change', onChange);
    }, []);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            setMouse({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, []);

    const nav = useMemo(
        () => [
            { label: 'home', href: '#home' },
            { label: 'sobre', href: '#sobre' },
            { label: 'portfolio showcase', href: '#portfolio' },
            { label: 'contato', href: '#contato' },
        ],
        []
    );

    // vídeo: gatilho confiável (não “falha” como whileInView)
    const videoRef = useRef<HTMLDivElement | null>(null);
    const videoInView = useInView(videoRef, { once: true, margin: '-20% 0px -20% 0px' });

    return (
        <main id="home" className="bg-surface-main">
            {/* HEADER (igual referência) */}
            <header className="container-custom pt-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="text-primary font-semibold">anilo</div>
                    <div className="hidden sm:block font-semibold text-black/90">Danilo.</div>
                </div>

                <nav className="hidden md:flex items-center gap-10 text-primary">
                    {nav.map((item) => (
                        <a key={item.href} href={item.href} className="hover:underline underline-offset-8">
                            {item.label}
                        </a>
                    ))}
                </nav>

                <button
                    className="md:hidden w-12 h-12 rounded-xl bg-white/40 border border-black/10 flex items-center justify-center"
                    aria-label="Abrir menu"
                >
                    <span className="text-2xl leading-none">≡</span>
                </button>
            </header>

            {/* HERO AREA */}
            <section className="container-custom relative">
                {/* MOBILE (igual imagem: globo em cima + texto centralizado) */}
                <div className="md:hidden relative min-h-[78vh] flex flex-col items-center pt-10 pb-12">
                    <div className="relative w-full max-w-[520px] h-[280px]">
                        <div className="absolute inset-0 pointer-events-none">
                            <HeroGlassScene reduceMotion={reduceMotion} mouse={mouse} />
                        </div>
                    </div>

                    <div className="mt-8 text-center w-full flex flex-col items-center">
                        <AnimatedWord text="Design," className="blue-start justify-center" delayStart={0} />
                        <AnimatedWord text="não é só" className="justify-center" delayStart={7} />
                        <AnimatedWord text="estética." className="justify-center" delayStart={15} />

                        <AnimatedWord
                            as="p"
                            text="[É intenção, é estratégia, é experiência.]"
                            className="small justify-center mt-4 text-primary"
                        />

                        <button className="mt-10 inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-medium">
                            get to know me better <span className="text-xl">↗</span>
                        </button>
                    </div>
                </div>

                {/* DESKTOP (igual imagem: texto esquerda, globo centro, brand+thumb direita) */}
                <div className="hidden md:grid relative min-h-[78vh] grid-cols-12 items-center py-12">
                    {/* LEFT */}
                    <div className="col-span-5">
                        <div className="max-w-[520px]">
                            <AnimatedWord text="Design," className="blue-start" delayStart={0} />
                            <AnimatedWord text="não é só" delayStart={7} />
                            <AnimatedWord text="estética." delayStart={15} />

                            <AnimatedWord
                                as="p"
                                text="[É intenção, é estratégia, é experiência.]"
                                className="small mt-4 text-primary"
                            />

                            <button className="mt-10 inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-medium">
                                get to know me better <span className="text-xl">↗</span>
                            </button>
                        </div>
                    </div>

                    {/* CENTER (globo) */}
                    <div className="col-span-4 relative h-[520px]">
                        <div className="absolute inset-0 pointer-events-none">
                            <HeroGlassScene reduceMotion={reduceMotion} mouse={mouse} />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <aside className="col-span-3 flex flex-col items-end gap-10">
                        <div className="w-full bg-white/20 border border-black/5 rounded-2xl p-10 flex items-center justify-center">
                            <span className="text-primary tracking-wide font-medium">[ BRAND AWARENESS ]</span>
                        </div>

                        <div className="relative w-[200px]">
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-primary">↙</div>

                            {/* Troque pelo seu thumbnail real se quiser */}
                            <div className="rounded-xl border border-black/10 bg-cyan-100 p-2">
                                <div className="rounded-lg overflow-hidden bg-black/10 aspect-video flex items-center justify-center text-black/50">
                                    thumb/video
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* VIDEO MANIFESTO (animação real tipo loandbehold) */}
            <section className="container-custom pb-14">
                <motion.div
                    ref={videoRef}
                    style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
                    initial={{ opacity: 0, y: 140, rotateX: 16, scale: 0.98 }}
                    animate={videoInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
                    transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                    className="video-thumb"
                >
                    <video
                        src={ASSETS.videoManifesto}
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="w-full rounded-2xl shadow-2xl"
                    />
                </motion.div>
            </section>
        </main>
    );
}
