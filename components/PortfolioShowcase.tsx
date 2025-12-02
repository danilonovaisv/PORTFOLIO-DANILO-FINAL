
import React, { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../constants';

const PortfolioShowcaseSection: FC = () => {
  // Estado para controlar qual categoria está sendo hoverada para efeitos globais se necessário
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Função para determinar o alinhamento baseada no índice
  const getAlignmentClass = (index: number) => {
    switch (index) {
      case 0: return 'md:justify-end';   // 1º item: Direita
      case 1: return 'md:justify-center'; // 2º item: Centro
      case 2: return 'md:justify-start';  // 3º item: Esquerda
      default: return 'md:justify-start';
    }
  };

  return (
    <section className="w-full bg-[#f5f5f5] py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 md:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="relative mb-8 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-4 md:mb-0 md:absolute md:left-0 md:top-2">
              [ what we love working on ]
            </span>
            
            <div className="w-full flex justify-center">
              <h2 className="text-center text-3xl font-light md:text-5xl tracking-tight">
                <span className="text-[#1557ff] font-medium">portfólio</span>{' '}
                <span className="text-neutral-900">showcase</span>
              </h2>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-200/80 w-full" />
        </div>

        {/* Lista de Categorias */}
        <div className="flex flex-col group/list">
          {CATEGORIES.map((category, index) => {
            const Wrapper = 'a'; // Usando 'a' diretamente pois é SPA sem Next Router configurado
            const href = `/portfolio?category=${category.id}`;

            return (
              <motion.div
                key={category.id}
                initial="rest"
                whileHover="hover"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative border-b border-neutral-200 last:border-b-0 overflow-hidden"
              >
                {/* Imagem de Fundo (Thumbnail Reveal) */}
                <motion.div
                  variants={{
                    rest: { opacity: 0, scale: 1.05 },
                    hover: { opacity: 1, scale: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 z-0 pointer-events-none"
                >
                  <div className="absolute inset-0 bg-black/10 z-10" /> {/* Overlay leve para contraste */}
                  <img 
                    src={category.thumbnailUrl} 
                    alt={category.label}
                    className="w-full h-full object-cover opacity-90"
                  />
                </motion.div>
                
                {/* Container do Link Interativo */}
                <Wrapper
                  href={href}
                  className={`relative z-10 flex min-h-[140px] w-full cursor-pointer items-center gap-6 px-2 py-8 md:min-h-[220px] md:px-8 ${getAlignmentClass(index)}`}
                >
                  {/* Conteúdo: Dot + Texto */}
                  {/* Agrupados para manterem-se juntos independentemente do alinhamento da linha */}
                  <div className="flex items-center gap-4 md:gap-6">
                    
                    {/* Dot Azul com Seta (Agora à esquerda do texto) */}
                    <motion.div
                      variants={{
                        rest: { scale: 1, backgroundColor: '#1557ff' },
                        hover: { scale: 1.1, backgroundColor: '#ffffff', color: '#1557ff' } // Inverte cor no hover para destacar sobre a imagem
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#1557ff] text-white md:h-12 md:w-12 shadow-sm order-1"
                    >
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                       </svg>
                    </motion.div>

                    {/* Texto da Categoria */}
                    <motion.p 
                      variants={{
                        rest: { x: 0, color: '#171717' },
                        hover: { x: 10, color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' } // Texto fica branco no hover
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="text-2xl md:text-6xl font-bold leading-tight tracking-tight order-2"
                    >
                      {category.label}
                    </motion.p>

                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Inferior */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 rounded-full bg-[#1557ff] px-8 py-4 text-sm md:text-base font-medium text-white shadow-lg hover:shadow-blue-500/30 transition-shadow"
          >
            <span>let’s build something great</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
               <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
               </svg>
            </div>
          </motion.a>
        </div>

      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
