// cspell:ignore webp
export type FallbackImage = `${string}.${'webp' | 'jpg' | 'png'}`;

export interface ContentBlock {
  id: string;
  title: string;
  desc: string;
  fallback: FallbackImage;
  alt: string;
}

export const ORIGIN_CONTENT: readonly ContentBlock[] = [
  {
    id: '1',
    title: 'O que permanece',
    desc: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. Enquanto muitos olhavam para o brilho imediato, eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo. A essência das coisas sempre falou mais alto do que a superfície.',
    fallback: 'about/origin/about.origin_image.1.webp',
    alt: 'O que permanece - essência que sobrevive ao tempo',
  },
  {
    id: '2',
    title: 'Do traço à intenção',
    desc: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
    fallback: 'about/origin/about.origin_image.2.webp',
    alt: 'Do traço à intenção - processo criativo emergente',
  },
  {
    id: '3',
    title: 'A descoberta do invisível',
    desc: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
    fallback: 'about/origin/about.origin_image.3.webp',
    alt: 'Descoberta do invisível - design como transformação',
  },
  {
    id: '4',
    title: 'Expansão com propósito',
    desc: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
    fallback: 'about/origin/about.origin_image.4.webp',
    alt: 'Expansão com propósito - intuição + tecnologia',
  },
] as const;
