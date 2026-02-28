'use client';

import { useState, useEffect } from 'react';
import { BackgroundLayer } from './BackgroundLayer';
import { OverlayLayer } from './OverlayLayer';
import { FixedHeader } from './FixedHeader';
import { TextRotator } from './TextRotator';
import { Ghost3D } from './Ghost3D';

export const BeliefsSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  
  // Detecta a seção atual baseado no scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calcula a seção atual baseado na posição do scroll
      const sectionIndex = Math.min(
        Math.floor(scrollPosition / windowHeight), 
        5 // Limitado às 6 frases
      );
      
      setCurrentSection(sectionIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="relative w-full overflow-hidden">
      {/* Camada 0 - Background */}
      <BackgroundLayer currentSection={currentSection} />
      
      {/* Camada 1 - Overlay */}
      <OverlayLayer currentSection={currentSection} />
      
      {/* Camada 2 - Cabeçalho Fixo */}
      <FixedHeader />
      
      {/* Camada 3 - Texto Rotativo */}
      <div className="h-screen w-full">
        <TextRotator />
      </div>
      
      {/* Camada 5 - Ghost 3D (acima de todas) */}
      <Ghost3D currentSection={currentSection} />
      
      {/* Camada 4 - Manifesto Final */}
      {currentSection === 5 && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="text-center text-white font-display text-[120px] md:text-[180px] font-black leading-[0.8] opacity-0 animate-manifesto">
            <div>ISSO É</div>
            <div>GHOST</div>
            <div>DESIGN.</div>
          </div>
        </div>
      )}
      
      {/* Estilos de animação */}
      <style jsx global>{`
        @keyframes manifesto {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-manifesto {
          animation: manifesto 1.2s ease-out forwards;
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
};
