import { getAssetUrl } from '@/utils/utils';

export const ABOUT_ORIGIN_SECTIONS = [
  {
    id: 'permanence',
    title: 'O QUE PERMANECE',
    text: `Desde cedo, sempre prestei atenção no que ficava —
não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.`,
    img: getAssetUrl('sobre_page/sobre-1.webp'),
    alt: 'O que permanece - essência que sobrevive ao tempo',
    textAlign: 'right' as const,
  },
  {
    id: 'intention',
    title: 'DO TRAÇO À INTENÇÃO',
    text: `Rabiscos viraram ideias.
Ideias viraram projetos.
E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.`,
    img: getAssetUrl('sobre_page/sobre-2.webp'),
    alt: 'Do traço à intenção - processo criativo',
    textAlign: 'right' as const,
  },
  {
    id: 'invisible',
    title: 'A DESCOBERTA DO INVISÍVEL',
    text: `Foi ali que entendi:
design não é enfeite.
É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.`,
    img: getAssetUrl('sobre_page/sobre-3.webp'),
    alt: 'A descoberta do invisível - design como ferramenta de transformação',
    textAlign: 'right' as const,
  },
  {
    id: 'expansion',
    title: 'EXPANSÃO COM PROPÓSITO',
    text: `Estudei Comunicação, mergulhei no design, no branding
e hoje uso inteligência artificial para expandir o alcance
sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.`,
    img: getAssetUrl('sobre_page/sobre-4.webp'),
    alt: 'Expansão com propósito - união de intuição e método',
    textAlign: 'right' as const,
  },
];
