import { FC } from 'react';
import { motion } from 'framer-motion';

interface CategoryTextProps {
  label: string;
  isExpanded: boolean;
  isWebItem: boolean;
  index: number;
}

const CategoryText: FC<CategoryTextProps> = ({
  label,
  isExpanded,
  isWebItem,
  index,
}) => {
  return (
    <div
      className={`flex flex-col gap-1 min-w-0 items-center text-center
        ${
          isExpanded
            ? 'md:items-start md:text-left'
            : index === 0
              ? 'md:items-end md:text-right'
              : index === 1
                ? 'md:items-center md:text-center'
                : 'md:items-start md:text-left'
        }
      `}
    >
      {isWebItem && !isExpanded ? (
        <>
          <motion.h3
            layout="position"
            className="font-light text-text-dark transition-all duration-500 tracking-tight leading-tight md:leading-none text-2xl sm:text-3xl md:text-5xl lg:text-6xl group-hover:text-primary group-hover:tracking-normal"
          >
            {label.split(', ').map((part, i, arr) => (
              <span key={i} className="block">
                {part}
                {i < arr.length - 1 ? ',' : ''}
              </span>
            ))}
          </motion.h3>
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.6em] text-primary mt-1">
            <span className="h-3 w-3 rounded-full bg-primary transition-transform duration-500 group-hover:scale-150 group-hover:bg-text-dark" />
            <span className="text-[10px] leading-none">·</span>
          </span>
        </>
      ) : (
        <>
          <motion.h3
            layout="position"
            className={`
              font-light text-text-dark transition-all duration-500 tracking-tight leading-tight md:leading-[1.1]
              group-hover:text-primary group-hover:tracking-normal group-hover:font-medium
              ${
                isExpanded
                  ? 'text-3xl md:text-6xl'
                  : 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl'
              }
            `}
          >
            {label}
          </motion.h3>
          {!isExpanded && (
            <span
              className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.6em] text-primary mt-1
                ${
                  index === 0
                    ? 'md:flex-row-reverse' /* Dot on left for right-aligned text */
                    : ''
                }
              `}
            >
              <span className="h-3 w-3 rounded-full bg-primary transition-transform duration-500 group-hover:scale-150 group-hover:bg-text-dark" />
              <span className="text-[10px] leading-none">·</span>
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryText;
