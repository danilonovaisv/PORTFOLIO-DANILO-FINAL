
import React from 'react';
import Section from './components/Section';
import FinalSection from './components/FinalSection';
import FixedHeader from './components/FixedHeader';

const PHRASES = [
  "Um vídeo\nque respira.",
  "Uma marca que\nse reconhece.",
  "Um detalhe\nque fica.",
  "Crio para gerar\npresença.",
  "Mesmo quando\nnão estou ali.",
  "Ghost\nDesign."
];

const COLORS = [
  "#0048ff", // Azul Real
  "#8705f2", // Roxo Vibrante
  "#f501d3", // Rosa Choque
  "#0048ff", // Azul Real
  "#8705f2", // Roxo Vibrante
  "#f501d3", // Rosa Choque (Final)
];

const App: React.FC = () => {
  return (
    <main className="relative w-full bg-[#0048ff]">
      <FixedHeader />

      {PHRASES.map((phrase, index) => (
        <Section 
          key={index} 
          text={phrase} 
          bgColor={COLORS[index]} 
        />
      ))}

      <FinalSection bgColor={COLORS[5]} />
    </main>
  );
};

export default App;
