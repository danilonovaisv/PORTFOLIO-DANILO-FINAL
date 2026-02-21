'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMotionGate } from '@/hooks/useMotionGate';

interface HeroBackCTAProps {
    href: string;
    label: string;
    className?: string;
}

export const HeroBackCTA = ({ href, label, className }: HeroBackCTAProps) => {
    const reduceMotion = useMotionGate();

    return (
        <Link
            href={href}
            className={cn(
                'group inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
                className
            )}
        >
            <div
                className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full bg-bluePrimary text-white shadow-[0_4px_24px_rgba(0,122,255,0.4)]',
                    'sm:h-[60px] sm:w-[60px]',
                    !reduceMotion &&
                    'transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95'
                )}
            >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
            </div>
            <span className="text-[24px] font-medium lowercase tracking-tight text-white sm:text-[34px]">
                {label}
            </span>
        </Link>
    );
};
