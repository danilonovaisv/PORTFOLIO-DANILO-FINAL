'use client';

import React from 'react';
import { motion, MotionValue, useTransform, cubicBezier } from 'framer-motion';

// Easing Ghost Padrão: cubic-bezier(0.22, 1, 0.36, 1)
const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

interface MobileTextLayerProps {
  phrases: string[];
  scrollYProgress: MotionValue<number>;
}

export const BeliefMobileTextLayer: React.FC<MobileTextLayerProps> = ({
  phrases,
  scrollYProgress,
}) => {
  // Divisão do scroll total em segmentos para cada frase
  const totalPhrases = phrases.length;

  return (
    <div className="fixed inset-0 z-70 pointer-events-none md:hidden">
      {phrases.map((phrase, index) => (
        <MobilePhrase
          key={index}
          text={phrase}
          index={index}
          totalPhrases={totalPhrases}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

interface MobilePhraseProps {
  text: string;
  index: number;
  totalPhrases: number;
  scrollYProgress: MotionValue<number>;
}

const MobilePhrase: React.FC<MobilePhraseProps> = ({
  text,
  index,
  totalPhrases,
  scrollYProgress,
}) => {
  // MobilePhrase: Calcula seus próprios segmentos baseados no range útil
  // O container pai tem (PHRASES.length + 2) * 100vh de altura
  // com offset ['start end', 'end end'], o progress vai de 0 a 1
  // Cada frase ocupa 1 tela (100vh), então cada segmento é aprox. 1/(totalPhrases+2)
  const totalScreens = totalPhrases + 1; // +1 = final section
  const segmentSize = 1 / totalScreens;
  const timelineOffset = 0.08;

  // Ajuste fino para alinhar a primeira frase visível logo no topo da seção.
  const startPoint = index * segmentSize + timelineOffset;
  const endPoint = startPoint + segmentSize;

  // Entry/Exit mais longos para evitar "piscar" e manter legibilidade.
  const entryStart = startPoint;
  const entryEnd = startPoint + segmentSize * 0.35;
  const exitStart = endPoint - segmentSize * 0.35;
  const exitEnd = endPoint;

  // X: Entra da ESQUERDA (-40px), mantém centro (0px), sai para a DIREITA (+40px)
  const x = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['-40px', '0px', '0px', '40px'],
    { ease: ghostEase }
  );

  // Opacity: Fade in com entrada, fade out antes da próxima
  const opacity = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    [0, 1, 1, 0],
    { ease: ghostEase }
  );

  // Blur: 8px na entrada/saída, 0 no centro
  const blur = useTransform(
    scrollYProgress,
    [entryStart, entryEnd, exitStart, exitEnd],
    ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'],
    { ease: ghostEase }
  );

  // Remover newlines para mobile — mostrar como frase corrida com quebras naturais
  const mobileText = text.replace(/\n/g, ' ');

  return (
    <motion.div
      style={{ x, opacity, filter: blur }}
      className="absolute bottom-[20vh] left-0 right-0 text-center pointer-events-none px-6"
    >
      {/* 🟣 [CONFIG VISUAL]: Define cor e tamanho do texto (Mobile: clamp 1.8rem-3rem) */}
      <span className="text-blueAccent italic font-bold text-[clamp(1.8rem,7vw,3rem)] leading-[1.3] tracking-tight block w-full mx-auto">
        {mobileText}
      </span>
    </motion.div>
  );
};
