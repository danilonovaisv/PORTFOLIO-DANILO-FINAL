import Image from 'next/image';
import { type MotionValue, motion } from 'framer-motion';
import type { ActiveItem } from './index';

type CursorImageProps = {
  activeItem: ActiveItem;
  x: MotionValue<number>;
  y: MotionValue<number>;
};

const CursorImage = ({ activeItem, x, y }: CursorImageProps) => {
  return (
    <motion.div
      style={{ x, y }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="pointer-events-none fixed top-0 left-0 z-50 hidden h-[320px] w-[440px] overflow-hidden rounded-2xl border border-[#dcdfe6] bg-white/90 shadow-[0_32px_90px_rgba(0,0,0,0.18)] backdrop-blur-sm md:block"
    >
      <div className="relative h-full w-full bg-white">
        <Image
          src={activeItem.src}
          alt={activeItem.label}
          fill
          sizes="440px"
          priority
          className="object-cover"
        />
      </div>
    </motion.div>
  );
};

export default CursorImage;
