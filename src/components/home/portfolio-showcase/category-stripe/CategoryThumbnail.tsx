import { FC } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface CategoryThumbnailProps {
  thumb: string;
  isHovered: boolean;
  isExpanded: boolean;
  index: number;
}

const CategoryThumbnail: FC<CategoryThumbnailProps> = ({
  thumb,
  isHovered,
  isExpanded,
  index,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const transition = {
    duration: 0.7,
    ease: [0.33, 1, 0.68, 1],
  } as const;

  const initialMotion = shouldReduceMotion
    ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : {
        opacity: 0,
        x: index >= 2 ? -16 : 16,
        y: 12,
        scale: 0.98,
      };

  const animateMotion = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition,
  };

  const exitMotion = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: index >= 2 ? -10 : 10,
        y: 8,
        scale: 0.98,
        transition,
      };

  return (
    <AnimatePresence>
      {isHovered && !isExpanded && (
        <motion.div
          key="thumbnail"
          initial={initialMotion}
          animate={animateMotion}
          exit={exitMotion}
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[180px] w-[320px] overflow-hidden rounded-xl z-[-1] pointer-events-none shadow-lg will-change-transform
            ${
              index >= 2
                ? 'left-full ml-8 origin-left'
                : 'right-full mr-8 origin-right'
            }
          `}
          >
            <motion.div
              className="w-full h-full relative"
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.02 }}
              animate={{ scale: 1, transition }}
              exit={shouldReduceMotion ? { scale: 1 } : { scale: 1.02, transition }}
            >
            <div className="w-full h-full relative">
              {thumb.match(/\.(mp4|webm|ogg)$/i) ? (
                <video
                  src={thumb}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={
                    thumb ||
                    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                  }
                  alt="Visual representation of the project category"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              )}
            </div>
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryThumbnail;
