import { FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ProjectCategory } from '@/lib/types';

interface CategoryExpandedProps {
  category: ProjectCategory;
}

const CategoryExpanded: FC<CategoryExpandedProps> = ({ category }) => {
  return (
    <motion.div
      transition={{
        delay: 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="w-full mt-6 flex flex-col md:flex-row gap-8 md:gap-12 text-center md:text-left"
    >
      <div className="w-full md:w-2/3 aspect-video rounded-xl overflow-hidden bg-gray-200 shadow-xl relative">
        {category.thumb.match(/\.(mp4|webm|ogg)$/i) ? (
          <video
            src={category.thumb}
            poster={category.thumb}
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
        ) : (
          <Image
            src={category.thumb}
            alt={category.label}
            fill
            className="object-cover hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        )}
      </div>

      <div className="w-full md:w-1/3 flex flex-col justify-between py-2">
        <div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-light">
            Explorando os limites da criatividade em{' '}
            <span className="text-primary font-medium tracking-tight">
              {category.label.replace(',', '').toLowerCase()}
            </span>
            . Nossos projetos combinam estratégia e design para criar
            experiências memoráveis.
          </p>

          <h4 className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6 font-bold border-b border-gray-100 pb-3">
            Destaques
          </h4>
          <div className="space-y-3 mb-10">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1 * i,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="flex items-center gap-4 text-base md:text-lg font-medium text-text-dark group/item cursor-pointer py-1"
              >
                <div className="w-2 h-2 rounded-full bg-primary group-hover/item:scale-150 transition-transform duration-500" />
                <div className="group-hover/item:translate-x-1.5 transition-transform duration-500">
                  Projeto Exemplo {i}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              href={`/portfolio?category=${category.id}`}
              variant="link"
              className="justify-start gap-3 text-base md:text-lg pl-0 h-auto"
            >
              Ver todos os projetos
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryExpanded;
