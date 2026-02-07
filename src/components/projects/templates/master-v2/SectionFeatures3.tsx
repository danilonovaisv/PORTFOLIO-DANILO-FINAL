'use client';

import { motion } from 'framer-motion';
import { GHOST_EASE } from '@/config/motion';
import type {
  MasterProjectV2FeatureItem,
  MasterProjectV2GalleryItem,
} from '@/types/project-template';
import BlockMedia from './BlockMedia';

type SectionFeatures3Props = {
  item: MasterProjectV2GalleryItem;
  index: number;
  accentColor: string;
  prefersReducedMotion: boolean;
};

function deriveFeatures(
  item: MasterProjectV2GalleryItem
): MasterProjectV2FeatureItem[] {
  if (item.features && item.features.length > 0) {
    return item.features.slice(0, 3);
  }

  const candidates: MasterProjectV2FeatureItem[] = [
    {
      id: 'feature-1',
      title: item.title || 'Direção',
      description: item.description || '',
    },
    {
      id: 'feature-2',
      title: item.eyebrow || 'Execução',
      description: '',
    },
    {
      id: 'feature-3',
      title: item.quote || 'Resultado',
      description: '',
    },
  ];

  return candidates.filter((feature) => feature.title.trim().length > 0);
}

export default function SectionFeatures3({
  item,
  index,
  accentColor,
  prefersReducedMotion,
}: SectionFeatures3Props) {
  const revealInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 18, filter: 'blur(8px)' };
  const revealVisible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  const features = deriveFeatures(item);

  return (
    <motion.section
      initial={revealInitial}
      whileInView={revealVisible}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.74,
        ease: GHOST_EASE,
        delay: prefersReducedMotion ? 0 : index * 0.02,
      }}
      className="std-grid py-8 md:py-12"
    >
      <div className="space-y-6 rounded-3xl border border-white/10 bg-black/24 p-5 md:p-8">
        {(item.title || item.description) && (
          <div className="space-y-3">
            {item.title ? (
              <h3 className="text-3xl font-semibold leading-tight md:text-5xl">
                {item.title}
              </h3>
            ) : null}
            {item.description ? (
              <p className="max-w-3xl text-base leading-relaxed text-white/78 md:text-lg">
                {item.description}
              </p>
            ) : null}
          </div>
        )}

        {item.src ? (
          <BlockMedia
            item={item}
            title={item.title || `Features ${index + 1}`}
            aspectClassName="aspect-[16/8] md:aspect-[22/9]"
            sizes="100vw"
          />
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, featureIndex) => (
            <article
              key={feature.id || `${item.id}-feature-${featureIndex}`}
              className="rounded-2xl border border-white/10 bg-black/30 p-5"
            >
              <p
                className="text-[11px] uppercase tracking-[0.16em]"
                style={{ color: accentColor }}
              >
                {String(featureIndex + 1).padStart(2, '0')}
              </p>
              <h4 className="mt-2 text-xl font-semibold leading-tight md:text-2xl">
                {feature.title}
              </h4>
              {feature.description ? (
                <p className="mt-3 text-sm leading-relaxed text-white/76 md:text-base">
                  {feature.description}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
