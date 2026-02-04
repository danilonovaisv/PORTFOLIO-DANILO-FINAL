
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionProps {
  text: string;
  bgColor: string;
}

const Section: React.FC<SectionProps> = ({ text, bgColor }) => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // ENTRA RETO (Horizontal: -100vw para 0vw)
  const x = useTransform(scrollYProgress, [0.05, 0.35, 0.6, 0.9], ["-100vw", "0vw", "0vw", "0vw"]);
  
  // SOBE RETO (Vertical: 0vh para -100vh)
  const y = useTransform(scrollYProgress, [0.05, 0.35, 0.6, 0.95], ["0vh", "0vh", "0vh", "-100vh"]);
  
  // Opacidade
  const opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="relative w-full h-[100vh] flex items-center justify-start overflow-hidden px-8 md:px-20 lg:px-32 transition-colors duration-300"
    >
      <motion.div
        style={{ x, y, opacity }}
        className="w-full flex justify-start z-10"
      >
        <span className="text-[#4fe6ff] font-h2 text-4xl md:text-6xl lg:text-[6.5rem] leading-[0.9] tracking-tighter text-left whitespace-pre-line select-none">
          {text}
        </span>
      </motion.div>
    </section>
  );
};

export default Section;
