/**
 * Origin Section Data
 * Content blocks for the AboutOrigin component
 * Aligned with Ghost System SOBRE-PROTOTIPO-INTERATIVO.md specification
 *
 * Workflow Reference:
 * A: O QUE PERMANECE
 * B: DO TRAÇO À INTENÇÃO
 * C: A DESCOBERTA DO INVISÍVEL
 * D: EXPANSÃO COM PROPÓSITO
 */

export type FallbackImage =
  | 'about/origin/about.origin_image.1.webp'
  | 'about/origin/about.origin_image.2.webp'
  | 'about/origin/about.origin_image.3.webp'
  | 'about/origin/about.origin_image.4.webp';

export interface OriginBlock {
  id: number;
  title: string;
  subtitle: string;
  paragraph: string;
  fallback: FallbackImage;
  textAlign: 'left' | 'right';
  img?: string;
}

/**
 * Content blocks with fallback images stored in Supabase
 * Each block represents a chapter in the origin story
 * Images base path: [SUPABASE_STORAGE]/site-assets/about/origin/
 */
export const ORIGIN_CONTENT: OriginBlock[] = [
  {
    id: 1,
    title: 'O QUE PERMANECE',
    subtitle: 'A',
    paragraph: `Desde cedo, sempre prestei atenção no que ficava —
não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,
eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.`,
    fallback: 'about/origin/about.origin_image.1.webp',
    textAlign: 'right',
  },
  {
    id: 2,
    title: 'DO TRAÇO À INTENÇÃO',
    subtitle: 'B',
    paragraph: `Rabiscos viraram ideias.
Ideias viraram projetos.
E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.`,
    fallback: 'about/origin/about.origin_image.2.webp',
    textAlign: 'left',
  },
  {
    id: 3,
    title: 'A DESCOBERTA DO INVISÍVEL',
    subtitle: 'C',
    paragraph: `Foi ali que entendi:
design não é enfeite.
É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.`,
    fallback: 'about/origin/about.origin_image.3.webp',
    textAlign: 'right',
  },
  {
    id: 4,
    title: 'EXPANSÃO COM PROPÓSITO',
    subtitle: 'D',
    paragraph: `Estudei Comunicação, mergulhei no design, no branding
e hoje uso inteligência artificial para expandir o alcance
sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.`,
    fallback: 'about/origin/about.origin_image.4.webp',
    textAlign: 'left',
  },
];
