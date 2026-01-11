import { FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CategoryArrowProps {
  isExpanded: boolean;
  isHovered: boolean;
  isWebItem: boolean;
}

const CategoryArrow: FC<CategoryArrowProps> = ({
  isExpanded,
  isHovered,
  isWebItem,
}) => {
  return (
    <motion.div
      layout="position"
      className={`
        flex items-center justify-center rounded-full bg-focus-ring text-white shrink-0 transition-all duration-500 shadow-sm relative z-30
        ${isExpanded ? 'w-12 h-12 md:w-16 md:h-16' : 'w-8 h-8 md:w-12 md:h-12'}
        ${isWebItem && !isExpanded ? 'self-end md:self-end mb-1' : ''}
        group-hover:bg-[#F0F0F0] group-hover:text-focus-ring group-hover:scale-110
      `}
    >
      <motion.div
        animate={{
          rotate: isExpanded ? 90 : 0,
          scale: isHovered ? 1.05 : 1,
          x: isHovered && !isExpanded ? 3 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        <ArrowRight
          className={`${isExpanded ? 'w-6 h-6' : 'w-4 h-4 md:w-6 md:h-6'}`}
        />
      </motion.div>
    </motion.div>
  );
};

export default CategoryArrow;
