'use client';

import React from 'react';
import { motion, useTransform, cubicBezier, MotionValue } from 'framer-motion';

interface MorphTextProps {
    children: React.ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
    className?: string;
}

export const MorphText: React.FC<MorphTextProps> = ({
    children,
    progress,
    range,
    className,
}) => {
    const ghostEase = cubicBezier(0.22, 1, 0.36, 1);
    const blur = useTransform(progress, range, ['blur(12px)', 'blur(0px)'], {
        ease: ghostEase,
    });
    const opacity = useTransform(progress, range, [0, 1], { ease: ghostEase });
    const y = useTransform(progress, range, [40, 0], { ease: ghostEase });

    return (
        <motion.span
            style={{ filter: blur, opacity, y }}
            className={`block ${className || ''}`}
        >
            {children}
        </motion.span>
    );
};
