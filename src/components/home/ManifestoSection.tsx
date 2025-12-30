'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';

export default function ManifestoSection() {
    return (
        <section className="relative w-full aspect-video md:hidden overflow-hidden bg-black">
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
            >
                <video
                    src={BRAND.video.manifesto}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Overlay mobile to match aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    Manifesto
                </span>
            </div>
        </section>
    );
}
