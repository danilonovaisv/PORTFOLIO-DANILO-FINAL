import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  return (
    <AnimatePresence>
      {isHovered && !isExpanded && (
        <motion.div
          key="thumbnail"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 1, 0.5, 1],
          }}
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[180px] overflow-hidden rounded-lg z-[-1] pointer-events-none shadow-lg
            ${
              index >= 2
                ? 'left-full ml-8 origin-left'
                : 'right-full mr-8 origin-right'
            }
          `}
        >
          <motion.div
            className="w-[320px] h-full relative"
            initial={{
              x: index >= 2 ? -20 : 20,
              scale: 1.1,
            }}
            animate={{ x: 0, scale: 1 }}
            exit={{
              x: index >= 2 ? -20 : 20,
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1],
            }}
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
