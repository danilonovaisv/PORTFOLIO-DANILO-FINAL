'use client';

import React, { FC, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../lib/constants';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const PortfolioShowcaseSection: FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleExpand = (id: string) => {
    setHoveredId(null);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as const,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] as const 
      }
    }
  };

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F7] py-20 md:py-24 overflow-hidden min-h-screen flex flex-col justify-center items-center"
    >
      <div className="container mx-auto px-[clamp(1.25rem,5vw,6rem)] max-w-[92%] xl:max-w-[1680px] relative z-10">
        {/* Cabeçalho da Seção */}
        <motion.div 
          className="flex flex-col w-full mb-12 md:mb-16 items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeInUp}
        >
          {/* Título Principal */}
          <div className="w-full flex justify-center mb-6 md:mb-8">
            <h2 className="text-center text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold tracking-tighter leading-none">
              <span className="text-[#0057FF]">portfólio</span>{' '}
              <span className="text-[#111111]">showcase</span>
            </h2>
          </div>
        </motion.div>

        {/* Lista de Categorias */}
        <motion.div 
          className="flex flex-col w-full border-t border-neutral-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <AnimatePresence mode="sync">
            {CATEGORIES.map((category, index) => {
              const isExpanded = expandedId === category.id;
              const isHidden = expandedId !== null && !isExpanded;
              const isHovered = hoveredId === category.id;
              
              const isWebItem = category.id === 'websites-webcampaigns-tech';

              if (isHidden) return null;

              const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleExpand(id);
                }
              };

              return (
                <motion.div
                  key={category.id}
                  layout
                  variants={itemVariants}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  onClick={() => handleExpand(category.id)}
                  onKeyDown={(e) => handleKeyDown(e, category.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  className={`
                    relative border-b border-neutral-300 group cursor-pointer w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-inset
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
                    className={`flex w-full transition-all duration-500 ease-out relative
                      ${
                        isExpanded
                          ? 'py-8 flex-col items-center md:items-start gap-8'
                          : `py-10 md:py-14 flex-row items-center ${
                              index === 0
                                ? 'justify-between md:justify-end'
                                : index === 1
                                  ? 'justify-between md:justify-center'
                                  : 'justify-between md:justify-start'
                            }`
                      }
                    `}
                  >
                    {/* Conteúdo do Item (Texto + Ícone) - Wrapper para garantir z-index acima da thumb */}
                    <div
                      className={`relative z-20 flex items-center gap-4 md:gap-6
                        ${isExpanded ? 'w-full flex-col md:flex-row md:items-start' : 'w-full md:w-auto flex-row'}
                      `}
                    >
                      {/* Texto da Categoria */}
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
                                ${isExpanded ? 'text-3xl md:text-6xl' : 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl'}
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
                                <span className="text-[10px] leading-none">
                                  ·
                                </span>
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      {/* Ícone Azul (Seta) */}
                      <motion.div
                        layout="position"
                        className={`
                          flex items-center justify-center rounded-full bg-[#0057FF] text-white shrink-0 transition-all duration-500 shadow-sm relative z-30
                          ${isExpanded ? 'w-12 h-12 md:w-16 md:h-16' : 'w-8 h-8 md:w-12 md:h-12'}
                          ${isWebItem && !isExpanded ? 'self-end md:self-end mb-1' : ''}
                          group-hover:bg-[#111111] group-hover:scale-110
                        `}
                      >
                        <motion.div
                          animate={{ 
                            rotate: isExpanded ? 90 : (isHovered ? 45 : 0),
                            scale: isHovered ? 1.1 : 1
                          }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                        >
                          <ArrowRight
                            className={`${isExpanded ? 'w-6 h-6' : 'w-4 h-4 md:w-6 md:h-6'}`}
                          />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Thumbnail Animada (Slide-in on Hover - Atrás do texto) */}
                    <AnimatePresence>
                      {isHovered && !isExpanded && (
                        <motion.div
                          initial={{ width: 0, opacity: 0, x: index === 0 ? -20 : (index === 2 ? 20 : 0) }}
                          animate={{
                            width: 320, 
                            opacity: 1,
                            x: 0
                          }}
                          exit={{ width: 0, opacity: 0, x: index === 0 ? -20 : (index === 2 ? 20 : 0) }}
                          transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                          className={`hidden md:block absolute h-[120%] top-1/2 -translate-y-1/2 overflow-hidden rounded-lg z-0 pointer-events-none shadow-lg
                            ${
                              index === 0
                                ? 'right-full origin-right' /* Right aligned item -> thumb appears to left */
                                : index === 1
                                  ? 'left-[60%] -translate-x-1/2 origin-center' /* Center aligned -> thumb appears behind/center */
                                  : 'left-full origin-left' /* Left aligned -> thumb appears to right */
                            }
                           `}
                          style={{
                            /* Fine tune positioning based on reference */
                            ...(index === 1 ? { left: '50%', zIndex: 0 } : {}),
                            ...(index === 0 ? { right: 'calc(100% + 1.5rem)' } : {}),
                            ...(index === 2 ? { left: 'calc(100% + 1.5rem)' } : {}),
                          }}
                        >
                          <img
                            src={category.thumbnailUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Conteúdo Expandido (Detalhes) */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
                        className="w-full mt-6 flex flex-col md:flex-row gap-8 md:gap-12 text-center md:text-left"
                      >
                        {/* Imagem Grande */}
                        <div className="w-full md:w-2/3 aspect-video rounded-xl overflow-hidden bg-gray-200 shadow-xl">
                          <img
                            src={category.thumbnailUrl}
                            alt={category.label}
                            loading="lazy"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          />
                        </div>

                        {/* Texto descritivo / Links */}
                        <div className="w-full md:w-1/3 flex flex-col justify-between py-2">
                          <div>
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-light">
                              Explorando os limites da criatividade em{' '}
                              <span className="text-[#0057FF] font-medium tracking-tight">
                                {category.label.replace(',', '').toLowerCase()}
                              </span>
                              . Nossos projetos combinam estratégia e design para criar experiências memoráveis.
                            </p>

                            <h4 className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6 font-bold border-b border-gray-100 pb-3">
                              Destaques
                            </h4>
                            <ul className="space-y-3 mb-10">
                              {[1, 2, 3].map((i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-4 text-base md:text-lg font-medium text-[#111111] group/item cursor-pointer py-1"
                                >
                                  <span className="w-2 h-2 rounded-full bg-[#0057FF] group-hover/item:scale-150 transition-transform duration-500" />
                                  <span className="group-hover/item:translate-x-1.5 transition-transform duration-500">
                                    Projeto Exemplo {i}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col gap-4">
                            <a
                              href={`/portfolio?category=${category.id}`}
                              className="inline-flex items-center gap-3 text-[#0057FF] font-bold text-base md:text-lg hover:underline underline-offset-4 decoration-2"
                            >
                              Ver todos os projetos
                              <ArrowUpRight className="w-5 h-5" />
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
        </motion.div>

        {/* CTA Inferior */}
        {!expandedId && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-24 md:mt-32 flex justify-center w-full"
          >
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 md:px-12 md:py-6 text-white shadow-xl hover:shadow-[#0057FF]/40 transition-all duration-300"
            >
              <span className="text-lg md:text-xl font-semibold tracking-wide">
                let’s build something great
              </span>
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
              <span className="group-hover:-translate-x-1 transition-transform">
                ←
              </span>{' '}
              Voltar para a lista
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
