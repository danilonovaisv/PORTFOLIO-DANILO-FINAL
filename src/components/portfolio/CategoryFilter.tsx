// =============================================================================
// CategoryFilter - Ghost Era v2.0
// Filtro de categorias com pills animados
// =============================================================================

'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import type { ProjectCategory } from '@/types/project';
import { PROJECT_CATEGORIES } from '@/data/projects';

interface CategoryFilterProps {
  activeCategory: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
  className?: string;
}

const easing = [0.22, 1, 0.36, 1] as const;

const CategoryFilter: FC<CategoryFilterProps> = ({
  activeCategory,
  onChange,
  className = '',
}) => {
  return (
    <div 
      className={`flex flex-wrap items-center gap-2 md:gap-3 ${className}`}
      role="tablist"
      aria-label="Filtrar projetos por categoria"
    >
      {PROJECT_CATEGORIES.map((category, index) => {
        const isActive = activeCategory === category.id;
        
        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: easing,
              delay: index * 0.05 
            }}
            onClick={() => onChange(category.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`projects-${category.id}`}
            className={`
              relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium
              transition-colors duration-300 whitespace-nowrap
              ${isActive 
                ? 'text-white' 
                : 'text-white/60 hover:text-white/90'
              }
            `}
          >
            {/* Background animado */}
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-focus-ring rounded-full"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
            
            {/* Border para inativos */}
            {!isActive && (
              <div className="absolute inset-0 rounded-full border border-white/20 hover:border-white/40 transition-colors duration-300" />
            )}
            
            {/* Label */}
            <span className="relative z-10 hidden md:inline">
              {category.label}
            </span>
            <span className="relative z-10 md:hidden">
              {category.labelMobile}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
