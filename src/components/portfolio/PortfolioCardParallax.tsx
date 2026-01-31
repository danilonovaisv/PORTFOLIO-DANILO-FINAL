'use client';

import { FC, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { PortfolioProject } from '@/types/project';
import { applyImageFallback } from '@/utils/utils';

interface PortfolioCardParallaxProps {
    project: PortfolioProject;
    index: number;
}

export const PortfolioCardParallax: FC<PortfolioCardParallaxProps> = ({
    project,
    index: _index,
}) => {
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

    const handleNavigate = () => {
        if (project.landingPageSlug) {
            router.push(`/projects/${project.landingPageSlug}`);
        }
    };

    return (
        <motion.div
            ref={ref}
            className="parallax-card relative overflow-hidden group cursor-pointer"
            onClick={handleNavigate}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            }}
            viewport={{ once: true, margin: '-10%' }}
        >
            <div className="card-image-wrapper relative w-full h-full overflow-hidden aspect-[4/5] md:aspect-[3/4]">
                <motion.div style={{ y }} className="w-full h-[140%] -mt-[20%] relative">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        onError={applyImageFallback}
                    />
                </motion.div>

                <div className="text-overlay absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="info transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <span className="text-sm uppercase tracking-widest text-white/80">
                            {project.displayCategory}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
