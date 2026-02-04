
import React from 'react';

const FixedHeader: React.FC = () => {
  return (
    <header className="fixed top-1/2 -translate-y-1/2 right-0 z-[100] pr-6 md:pr-12 lg:pr-24 text-right pointer-events-none w-full max-w-sm md:max-w-md lg:max-w-4xl">
      <div className="flex flex-col items-end">
        {/* Bloco principal: Mantendo as 4 linhas mas com peso visual equilibrado */}
        <h1 className="text-white text-xl md:text-3xl lg:text-[3.2rem] font-display leading-[0.88] tracking-tighter mb-8 uppercase">
          Acredito no<br />
          design que<br />
          muda o dia<br />
          de alguém.
        </h1>
        {/* Bloco secundário: 3 linhas */}
        <h2 className="text-white text-[10px] md:text-lg lg:text-xl font-h2 opacity-80 leading-[1.2] tracking-normal">
          Não pelo<br />
          choque, mas<br />
          pela conexão.
        </h2>
      </div>
    </header>
  );
};

export default FixedHeader;
