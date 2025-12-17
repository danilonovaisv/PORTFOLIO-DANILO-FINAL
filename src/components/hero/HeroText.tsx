type Props = {
  align?: 'left' | 'center';
};

export function HeroText({ align = 'left' }: Props) {
  const isCenter = align === 'center';

  const renderWord = (text: string, className = '') => (
    <h1 className={`word ${className} ${isCenter ? 'justify-center' : ''}`}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ '--i': i } as any}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );

  return (
    <div className={isCenter ? 'text-center max-w-2xl' : 'text-left max-w-2xl'}>
      {/* Desktop da sua imagem: "Design," azul e o resto preto */}
      {renderWord('Design,', 'blue-start')}
      {renderWord('não é só')}
      {renderWord('estética.')}

      <p className={`word small mt-4 text-primary ${isCenter ? 'justify-center' : ''}`}>
        [É intenção, é estratégia, é experiência.]
      </p>

      <div className={isCenter ? 'flex justify-center' : ''}>
        <button className="mt-10 inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-medium">
          get to know me better
          <span className="text-xl">↗</span>
        </button>
      </div>
    </div>
  );
}
