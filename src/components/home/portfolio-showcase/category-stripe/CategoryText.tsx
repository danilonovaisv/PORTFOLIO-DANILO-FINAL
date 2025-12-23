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
      className={`flex flex-col gap-1 min-w-0
        ${
          isExpanded
            ? 'items-center text-center md:items-start md:text-left'
            : index === 0
              ? 'items-start text-left md:items-end md:text-right'
              : index === 1
                ? 'items-start text-left md:items-center md:text-center'
                : 'items-start text-left md:items-start md:text-left'
        }
      `}
    >
      {isWebItem && !isExpanded ? (
        <motion.h3
          layout="position"
          className="font-light text-[#111111] transition-all duration-500 tracking-tight leading-tight md:leading-none text-2xl sm:text-3xl md:text-5xl lg:text-6xl group-hover:text-[#0057FF] group-hover:tracking-normal"
        >
          <span className="block">Web Campaigns,</span>
          <span className="block">Websites & Tech</span>
        </motion.h3>
      ) : (
        <>
          <motion.h3
            layout="position"
            className={`
              font-light text-[#111111] transition-all duration-500 tracking-tight leading-tight md:leading-[1.1]
              group-hover:text-[#0057FF] group-hover:tracking-normal group-hover:font-medium
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
              className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.6em] text-[#0057FF] mt-1
                ${
                  index === 0
                    ? 'md:flex-row-reverse' /* Dot on left for right-aligned text */
                    : ''
                }
              `}
            >
              <span className="h-3 w-3 rounded-full bg-[#0057FF] transition-transform duration-500 group-hover:scale-150 group-hover:bg-[#111111]" />
              <span className="text-[10px] leading-none">·</span>
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryText;
