'use client';

import React, { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../lib/constants';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const PortfolioShowcaseSection: FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const shouldReduceMotion = usePrefersReducedMotion();

  const handleExpand = (id: string) => {
    setHoveredId(null);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <section
      id="portfolio-showcase"
      className="relative w-full bg-[#F4F5F7] py-24 overflow-hidden min-h-screen flex flex-col justify-center items-center"
    >
      <div className="container mx-auto px-[clamp(1.25rem,5vw,6rem)] max-w-[92%] xl:max-w-[1680px] relative z-10">
        {/* Cabeçalho da Seção */}
        <motion.div 
          className="flex flex-col w-full mb-12 items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeInUp}
        >
          {/* Título Principal */}
          <div className="w-full flex justify-center mb-8">
            <h2 className="text-center text-4xl md:text-6xl font-bold tracking-tight">
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
                            className="font-light text-[#111111] transition-all duration-300 tracking-tight leading-tight md:leading-none text-2xl sm:text-3xl md:text-5xl lg:text-6xl group-hover:text-[#0057FF]"
                          >
                            <span className="block">Web Campaigns,</span>
                            <span className="block">Websites & Tech</span>
                          </motion.h3>
                        ) : (
                          <>
                            <motion.h3
                              layout="position"
                              className={`
                                font-light text-[#111111] transition-all duration-300 tracking-tight leading-tight md:leading-[1.1]
                                group-hover:text-[#0057FF]
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
                                <span className="h-3 w-3 rounded-full bg-[#0057FF] transition-transform duration-300 group-hover:scale-150" />
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
                        `}
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.4 }}
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
                          initial={{ width: 0, opacity: 0 }}
                          animate={{
                            width: 300, 
                            opacity: 1,
                          }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.33, 1, 0.68, 1],
                          }}
                          className={`hidden md:block absolute h-[140%] top-1/2 -translate-y-1/2 overflow-hidden rounded-md z-10 pointer-events-none
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
                            ...(index === 0 ? { right: 'calc(100% + 2rem)' } : {}),
                            ...(index === 2 ? { left: 'calc(100% + 2rem)' } : {}),
                          }}
                        >
                          <img
                            src={category.thumbnailUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Conteúdo Expandido (Detalhes) */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-full mt-4 flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left"
                      >
                        {/* Imagem Grande */}
                        <div className="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden bg-gray-200 shadow-lg">
                          <img
                            src={category.thumbnailUrl}
                            alt={category.label}
                            loading="lazy"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        {/* Texto descritivo / Links */}
                        <div className="w-full md:w-1/2 flex flex-col justify-between py-2">
                          <div>
                            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-10 font-light">
                              Explorando os limites da criatividade em{' '}
                              <span className="text-[#0057FF] font-medium">
                                {category.label.replace(',', '').toLowerCase()}
                              </span>
                              . Nossos projetos combinam estratégia e design
                              para criar experiências memoráveis.
                            </p>

                            <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-bold border-b border-gray-100 pb-2">
                              Destaques
                            </h4>
                            <ul className="space-y-4 mb-10">
                              {[1, 2, 3].map((i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-4 text-lg md:text-xl font-medium text-[#111111] group/item cursor-pointer"
                                >
                                  <span className="w-2 h-2 rounded-full bg-[#0057FF] group-hover/item:scale-150 transition-transform" />
                                  <span className="group-hover/item:translate-x-2 transition-transform">
                                    Projeto Exemplo {i}
                                  </span>
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
