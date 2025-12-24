import { FC } from 'react';
import { motion, Variants } from 'framer-motion';
import { ProjectCategory } from '@/lib/types';
import CategoryText from './portfolio-showcase/category-stripe/CategoryText';
import CategoryArrow from './portfolio-showcase/category-stripe/CategoryArrow';
import CategoryThumbnail from './portfolio-showcase/category-stripe/CategoryThumbnail';
import CategoryExpanded from './portfolio-showcase/category-stripe/CategoryExpanded';

interface CategoryStripeProps {
  category: ProjectCategory;
  index: number;
  isExpanded: boolean;
  isHovered: boolean;
  onExpand: (_id: string) => void;
  onHover: (_id: string | null) => void;
  isWebItem: boolean;
  itemVariants: Variants;
}

const CategoryStripe: FC<CategoryStripeProps> = ({
  category,
  index,
  isExpanded,
  isHovered,
  onExpand,
  onHover,
  isWebItem,
  itemVariants,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onExpand(category.id);
    }
  };

  return (
    <motion.div
      layout
      variants={itemVariants}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      onClick={() => onExpand(category.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${category.label} ${isExpanded ? 'collapse' : 'expand'}`}
      className={`relative border-b border-black/10 group cursor-pointer w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-inset
        ${isExpanded ? 'border-none' : ''}
        ${isHovered ? 'z-30' : 'z-10'}
      `}
      onMouseEnter={() => !isExpanded && onHover(category.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Subtítulo (Desktop Only) */}
      {index === 0 && !isExpanded && (
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <span className="text-[10px] md:text-xs text-gray-400 font-medium tracking-[0.25em] uppercase">
            [ what we love working on ]
          </span>
        </div>
      )}

      {/* Container Principal */}
      <motion.div
        layout="position"
        className={`flex w-full transition-all duration-500 ease-out relative
          ${
            isExpanded
              ? 'py-8 flex-col items-center md:items-start gap-8'
              : `py-10 md:py-14 flex-row items-center ${
                  index === 0
                    ? 'justify-between md:justify-end'
                    : index === 1
                      ? 'justify-between md:justify-center'
                      : 'justify-between md:justify-start hover:md:translate-x-20'
                }`
          }
        `}
      >
        {/* Conteúdo (Texto + Seta) */}
        <div
          className={`relative z-20 flex items-center gap-4 md:gap-6
            ${
              isExpanded
                ? 'w-full flex-col md:flex-row md:items-start'
                : 'w-full md:w-auto flex-row'
            }
          `}
        >
          <CategoryText
            label={category.label}
            isExpanded={isExpanded}
            isWebItem={isWebItem}
            index={index}
          />

          <CategoryArrow
            isExpanded={isExpanded}
            isHovered={isHovered}
            isWebItem={isWebItem}
          />

          <CategoryThumbnail
            thumb={category.thumb}
            isHovered={isHovered}
            isExpanded={isExpanded}
            index={index}
          />
        </div>

        {/* Detalhes Expandidos */}
        {isExpanded && <CategoryExpanded category={category} />}
      </motion.div>
    </motion.div>
  );
};

export default CategoryStripe;
