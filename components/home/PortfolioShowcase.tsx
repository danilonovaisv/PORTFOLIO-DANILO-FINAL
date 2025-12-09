"use client";

import React, { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../lib/constants';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const PortfolioShowcaseSection: FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Função para determinar o alinhamento do container do item na linha
  const getItemAlignment = (index: number) => {
    switch (index) {
      case 0: return 'justify-end';   // 1. Direita (Brand)
      case 1: return 'justify-center'; // 2. Centro (Videos)
      case 2: return 'justify-start';  // 3. Esquerda (Web)
      default: return 'justify-start';
    }
  };

  return (
    <section className="relative w-full bg-[#f5f5f5] py-24 overflow-hidden min-h-screen flex flex-col justify-center">
      
      <div className="container mx-auto px-4 md:px-8 max-w-[90%] md:max-w-7xl relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col w-full mb-12">
          
          {/* Título Principal */}
          <div className="w-full flex justify-center mb-8">
            <h2 className="text-center text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-[#0057FF]">portfólio</span>{' '}
              <span className="text-[#111111]">showcase</span>
            </h2>
          </div>
        </div>

        {/* Lista de Categorias */}
        <div className="flex flex-col w-full border-t border-neutral-300">
          <AnimatePresence mode="popLayout">
            {CATEGORIES.map((category, index) => {
              const isExpanded = expandedId === category.id;
              const isHidden = expandedId !== null && !isExpanded;
              const isHovered = hoveredId === category.id;
              const alignmentClass = getItemAlignment(index);
              
              // Verifica se é o 3º item para formatação especial
              const isWebItem = category.id === 'websites-webcampaigns-tech';

              if (isHidden) return null;

              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
                  onClick={() => handleExpand(category.id)}
                  className={`
                    relative border-b border-neutral-300 group cursor-pointer w-full
                    ${isExpanded ? 'border-none' : ''}
                  `}
                  onMouseEnter={() => !isExpanded && setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  
                  {/* Subtítulo alinhado com o primeiro item (Desktop Only) */}
                  {index === 0 && !isExpanded && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                       <span className="text-[10px] md:text-xs text-gray-400 font-medium tracking-[0.25em] uppercase">
                        [ what we love working on ]
                      </span>
                    </div>
                  )}

                  {/* Container Principal do Item */}
                  <motion.div 
                    layout="position"
                    className={`flex w-full transition-all duration-500 ease-out
                      ${isExpanded ? 'py-8 flex-col items-start gap-8' : 'py-10 md:py-14 items-center'}
                      ${!isExpanded ? alignmentClass : ''}
                    `}
                  >
                    
                    {/* Conteúdo do Item (Texto + Ícone) */}
                    <div className={`flex items-center relative ${!isExpanded ? 'gap-6 md:gap-8' : 'gap-6 w-full'}`}>
                      
                      {/* Thumbnail Animada (Slide-in on Hover - aparece à esquerda do texto) */}
                      <AnimatePresence>
                        {isHovered && !isExpanded && (
                          <motion.div
                            initial={{ width: 0, opacity: 0, marginRight: 0 }}
                            animate={{ width: 140, opacity: 1, marginRight: 24 }}
                            exit={{ width: 0, opacity: 0, marginRight: 0 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                            className="hidden md:block h-20 relative overflow-hidden rounded-md shrink-0 origin-right order-first"
                          >
                            <img 
                              src={category.thumbnailUrl} 
                              alt="" 
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Texto da Categoria - Fonte alterada para font-light (suave) */}
                      <div className="flex flex-col items-end text-right">
                        {isWebItem && !isExpanded ? (
                          // Layout especial para o 3º item quando fechado
                          <motion.h3
                            layout="position"
                            className="font-light text-[#111111] transition-all duration-300 tracking-tight leading-[1.0] text-3xl md:text-5xl lg:text-6xl group-hover:text-[#0057FF]"
                          >
                            <span className="block">Web Campaigns,</span>
                            <span className="block">Websites & Tech</span>
                          </motion.h3>
                        ) : (
                          // Layout padrão
                          <motion.h3
                            layout="position"
                            className={`
                              font-light text-[#111111] transition-all duration-300 tracking-tight leading-[1.1] group-hover:text-[#0057FF]
                              ${isExpanded ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl lg:text-6xl'}
                            `}
                          >
                            {category.label}
                          </motion.h3>
                        )}
                      </div>

                      {/* Ícone Azul (Seta) - Agora à DIREITA do texto */}
                      <motion.div
                        layout="position"
                        className={`
                          flex items-center justify-center rounded-full bg-[#0057FF] text-white shrink-0 transition-all duration-500 shadow-sm
                          ${isExpanded ? 'w-12 h-12 md:w-16 md:h-16' : 'w-8 h-8 md:w-12 md:h-12'}
                          ${isWebItem && !isExpanded ? 'self-end mb-1' : ''} /* Alinha ícone com a última linha no item 3 */
                        `}
                      >
                         <motion.div
                           animate={{ rotate: isExpanded ? 90 : 0 }}
                           transition={{ duration: 0.4 }}
                         >
                           <ArrowRight className={`${isExpanded ? 'w-6 h-6' : 'w-4 h-4 md:w-6 md:h-6'}`} />
                         </motion.div>
                      </motion.div>

                    </div>

                    {/* Conteúdo Expandido (Detalhes) */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-full mt-4 flex flex-col md:flex-row gap-8 md:gap-16"
                      >
                        {/* Imagem Grande */}
                        <div className="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden bg-gray-200 shadow-lg">
                          <img 
                            src={category.thumbnailUrl} 
                            alt={category.label} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        {/* Texto descritivo / Links */}
                        <div className="w-full md:w-1/2 flex flex-col justify-between py-2">
                          <div>
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-10 font-light">
                              Explorando os limites da criatividade em <span className="text-[#0057FF] font-medium">{category.label.replace(',', '').toLowerCase()}</span>. 
                              Nossos projetos combinam estratégia e design para criar experiências memoráveis.
                            </p>
                            
                            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-bold border-b border-gray-100 pb-2">Destaques</h4>
                            <ul className="space-y-4 mb-10">
                              {[1, 2, 3].map((i) => (
                                <li key={i} className="flex items-center gap-4 text-lg md:text-xl font-medium text-[#111111] group/item cursor-pointer">
                                  <span className="w-2 h-2 rounded-full bg-[#0057FF] group-hover/item:scale-150 transition-transform" />
                                  <span className="group-hover/item:translate-x-2 transition-transform">Projeto Exemplo {i}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-4">
                             <a 
                               href={`/portfolio?category=${category.id}`}
                               className="inline-flex items-center gap-3 text-[#0057FF] font-bold text-lg md:text-xl hover:underline underline-offset-8 decoration-2"
                             >
                               Ver todos os projetos
                               <ArrowUpRight className="w-6 h-6" />
                             </a>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* CTA Inferior */}
        {!expandedId && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-24 md:mt-32 flex justify-center w-full"
          >
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 md:px-12 md:py-6 text-white shadow-xl hover:shadow-[#0057FF]/40 transition-all duration-300"
            >
              <span className="text-lg md:text-xl font-semibold tracking-wide">let’s build something great</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-[#0057FF] transition-colors duration-300">
                 <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#0057FF]" />
              </span>
            </motion.a>
          </motion.div>
        )}
        
        {/* Botão para fechar expansão */}
        {expandedId && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="mt-16 flex justify-start border-t border-neutral-200 pt-8"
          >
             <button 
               onClick={() => setExpandedId(null)}
               className="text-gray-500 hover:text-[#0057FF] text-sm tracking-widest uppercase font-bold flex items-center gap-3 group"
             >
               <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar para a lista
             </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;