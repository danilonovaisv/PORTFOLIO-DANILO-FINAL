/**
 * Representa uma frase de impacto exibida na seção "O que me move".
 * Utiliza o índice de parada para sincronizar com a cor de fundo do manifesto.
 */
export interface BeliefPhrase {
  id: string;
  text: string;
  backgroundStopIndex: number;
}

/**
 * Define a tupla imutável com 8 cores de parada (stops) para o fundo animado
 * ou de gradiente utilizado na seção de crenças do Ghost Design System.
 */
export type BeliefBackgroundStop = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];
