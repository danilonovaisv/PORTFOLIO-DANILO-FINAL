import { FC } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProjectCategory } from '@/lib/types';
import { Button } from '@/ui/Button';

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
          {/* Texto */}
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
                  {category.label}
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

          {/* Seta */}
          <motion.div
            layout="position"
            className={`
              flex items-center justify-center rounded-full bg-[#0057FF] text-white shrink-0 transition-all duration-500 shadow-sm relative z-30
              ${
                isExpanded
                  ? 'w-12 h-12 md:w-16 md:h-16'
                  : 'w-8 h-8 md:w-12 md:h-12'
              }
              ${isWebItem && !isExpanded ? 'self-end md:self-end mb-1' : ''}
              group-hover:bg-[#111111] group-hover:scale-110
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

          {/* Thumbnail Hover */}
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
                    <Image
                      src={
                        category.posterUrl ||
                        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                      }
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Detalhes Expandidos */}
        {isExpanded && (
          <motion.div
            transition={{
              delay: 0.1,
              duration: 0.5,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="w-full mt-6 flex flex-col md:flex-row gap-8 md:gap-12 text-center md:text-left"
          >
            <div className="w-full md:w-2/3 aspect-video rounded-xl overflow-hidden bg-gray-200 shadow-xl">
              <video
                src={category.thumbnailUrl}
                poster={category.posterUrl}
                preload="metadata"
                playsInline
                autoPlay={false}
                muted
                loop
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer bg-gray-100"
                onClick={(e) => {
                  const video = e.currentTarget;
                  if (video.paused) {
                    video.play();
                  } else {
                    video.pause();
                  }
                }}
              />
            </div>

            <div className="w-full md:w-1/3 flex flex-col justify-between py-2">
              <div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-light">
                  Explorando os limites da criatividade em{' '}
                  <span className="text-[#0057FF] font-medium tracking-tight">
                    {category.label.replace(',', '').toLowerCase()}
                  </span>
                  . Nossos projetos combinam estratégia e design para criar
                  experiências memoráveis.
                </p>

                <h4 className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6 font-bold border-b border-gray-100 pb-3">
                  Destaques
                </h4>
                <ul className="space-y-3 mb-10">
                  {[1, 2, 3].map((i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 * i,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex items-center gap-4 text-base md:text-lg font-medium text-[#111111] group/item cursor-pointer py-1"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#0057FF] group-hover/item:scale-150 transition-transform duration-500" />
                      <div className="group-hover/item:translate-x-1.5 transition-transform duration-500">
                        Projeto Exemplo {i}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  href={`/portfolio?category=${category.id}`}
                  variant="link"
                  className="justify-start gap-3 text-base md:text-lg pl-0 h-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Ver todos os projetos
                  <ArrowUpRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CategoryStripe;
