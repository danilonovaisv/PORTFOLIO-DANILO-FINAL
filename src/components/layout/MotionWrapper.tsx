'use client';

import { motion } from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';

interface MotionWrapperProps {
    children: React.ReactNode;
    pathname: string;
}

/**
 * MotionWrapper — isolated framer-motion boundary.
 * Loaded via next/dynamic from template.tsx so Turbopack tracks
 * the framer-motion module graph separately. This prevents the
 * "proxy.mjs module factory is not available" HMR crash.
 */
export default function MotionWrapper({ children, pathname }: MotionWrapperProps) {
    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.95,
                ease: GHOST_EASE,
            }}
            className="w-full flex-col flex grow"
        >
            {children}
        </motion.div>
    );
}
