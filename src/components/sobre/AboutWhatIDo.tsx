'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ABOUT_CONTENT } from '@/config/content';

/**
 * AboutWhatIDo - Section 03
 * Ajustado para fidelidade visual estrita às referências (Mobile vs Desktop)
 */
export function AboutWhatIDo() {
  const prefersReducedMotion = useReducedMotion();
  const { title, items } = ABOUT_CONTENT.whatIDo;

  // Split title lines and highlight keywords
  const renderTitle = () => {
    const line1Parts = title.line1.split(/(insight|impacto)/i);
    return (
      <div className="text-center pt-8 md:pt-16 mb-12 md:mb-20 space-y-2 max-w-[900px] mx-auto z-10 relative">
        <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold tracking-tight leading-[1.1] text-white">
          {line1Parts.map((part, i) =>
            /insight|impacto/i.test(part) ? (
              <span key={i} className="text-ghost-blue">
                {part}
              </span>
            ) : (
              part
            )
          )}
          <br className="hidden md:block" />
          <span className="text-white block md:inline mt-2 md:mt-0">
            {title.line2}
          </span>
        </h2>
      </div>
    );
  };

  return (
    <section
      className="min-h-screen bg-[#050511] py-20 relative overflow-hidden flex flex-col justify-center"
      aria-label="O que eu faço"
    >
      {/* Background Ambience / Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-ghost-blue/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-ghost mx-auto px-6 max-w-[1240px] relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderTitle()}
        </motion.div>

        {/* 
          Cards Layout
          Mobile: Flex Col (Lista de barras)
          Desktop: Grid (Cards verticais)
          
          Referência Visual:
          Mobile: Ícone grande à esquerda, Texto à direita fluído. Card Horizontal.
          Desktop: Ícone pequeno inline no início do texto. Card Vertical.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-5 justify-center">
          {items.map((item, index) => {
            // Lógica para centralizar itens na última linha do Desktop se necessário
            // Para 7 itens em 4 colunas: 4 na primeira, 3 na segunda (centralizados)
            const isLastRowDesktop = index >= 4;

            return (
              <motion.div
                key={item.id}
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1], // Custom ease
                }}
                className={`
                  group relative 
                  bg-[#0a051e] md:bg-[#0d0a25] /* Cor baseada na ref */
                  border border-white/5 md:border-transparent md:border-t-2 md:border-t-[#222240]
                  rounded-xl md:rounded-lg
                  p-5 md:p-8
                  hover:bg-[#130d30] hover:border-ghost-blue/50 md:hover:border-t-ghost-blue
                  transition-all duration-300
                  flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-4
                  ${isLastRowDesktop ? 'lg:col-span-1 lg:last:col-start-auto' : ''}
                  ${
                    index === 6
                      ? 'lg:col-start-2'
                      : '' /* Centraliza o 7º item na grade de 4 colunas (posição 2 da linha 2 visualmente se for 3 itens embaixo? não, grade 4cols. 4 em cima. 3 embaixo. Items 4,5,6 (0-index). Item 6 deve estar no meio? Vamos usar Flex wrap para desktop para garantir alinhamento centralizado perfeito dos 7 itens como na imagem 0 se for grid fluido, mas grid permite controle melhor. 
                  Vamos tentar grid-cols-4 e fazer os ultimos 3 centralizarem.
                  Melhor: Usar classe condicional para o wrapper do grid no desktop se quiser linha única, mas 7 não cabe.
                  Vou usar a lógica: Desktop Grid 4 colunas.
                  Linha 1: Itens 0,1,2,3
                  Linha 2: Itens 4,5,6. Para centralizar esses 3, posso usar col-start.
                  Item 4 (primeiro da lin 2) -> col-start-auto?
                  Para centralizar 3 itens em 4 colunas:
                  Não dá perfeito com grid fixo sem spans complexos.
                  Vou usar Flexbox com wrap e justify-center para Desktop para garantir que fiquem centralizados naturalmente.
                  */
                  }
                `}
                // Override Grid classes for Desktop Flex behavior to match "Justify Center" visual
                style={{}}
              >
                {/* Ícone */}
                {/* Mobile: Circle grande. Desktop: Circle pequeno inline? 
                    Na ref Desktop (img 0), o ícone é inline com o texto.
                    Na ref Mobile (img 1), o ícone é destacado a esquerda.
                */}
                <div
                  className="
                  shrink-0 
                  flex items-center justify-center 
                  rounded-full bg-ghost-blue text-white
                  w-10 h-10 md:w-5 md:h-5 md:mt-1.5
                "
                >
                  <ArrowUpRight className="w-5 h-5 md:w-3 md:h-3" />
                </div>

                {/* Texto */}
                <div className="text-left">
                  {/* Mobile: Título Azul + Descrição Branca fluindo
                       Desktop: Igual, mas quebra linha diferente
                   */}
                  <p className="text-base md:text-lg lg:text-xl leading-tight md:leading-snug tracking-tight">
                    <span className="font-bold text-ghost-blue block md:inline md:mr-1.5">
                      {item.title}
                    </span>
                    <span className="font-normal text-white/90">
                      {item.description}
                    </span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ajuste de Grid para Flex no Desktop para lidar com 7 itens centralizados */}
        <style jsx global>{`
          @media (min-width: 1024px) {
            .grid-cols-1 {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
            .grid-cols-1 > div {
              width: calc(25% - 1.25rem); /* 4 por linha aprox com gap */
              min-width: 260px;
              flex-grow: 1;
              max-width: 320px;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
