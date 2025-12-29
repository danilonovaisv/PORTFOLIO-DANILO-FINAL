'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollNarrative } from '@/hooks/useScrollNarrative';
import { cn } from '@/lib/utils'; // Assuming generic utility exists, otherwise standard clsx

interface NarrativeSectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
    allowWebGL?: boolean;
}

export const NarrativeSection: React.FC<NarrativeSectionProps> = ({
    id,
    className,
    children,
    allowWebGL: _allowWebGL = false
}) => {
    // Hook into the narrative system
    const { containerRef, transforms } = useScrollNarrative();

    return (
        <section
            id={id}
            ref={containerRef}
            className={cn(
                "relative w-full min-h-screen flex flex-col items-center justify-start",
                className
            )}
            data-antigravity-section={id}
        >
            {/* Optional: Background Layer controlled by motion */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ opacity: transforms.heroOpacity }} // Example mapping
            />

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-[var(--container-width,1440px)] px-4 md:px-8">
                {children}
            </div>

            {/* Debug Marker (Invisible in prod) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="absolute top-2 left-2 text-[10px] text-blue-500/50 pointer-events-none border border-blue-500/20 px-1 rounded">
                    {id}
                </div>
            )}
        </section>
    );
};
