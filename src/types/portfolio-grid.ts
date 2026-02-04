import type { ReactNode } from 'react';

/**
 * Projeto usado na nova grid híbrida (DOM + R3F View).
 * Mantém somente os campos necessários para o card, CTA e modal rico.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  landingPageUrl?: string;
  technologies: string[];
  details: ProjectDetails;
  /**
   * Opcional: usado apenas para estilo/SEO, não obrigatório para renderizar.
   */
  slug?: string;
  accentColor?: string;
}

export interface ProjectDetailsLink {
  label: string;
  url: string;
}

export interface ProjectDetails {
  /** Texto corrido principal do modal */
  body: string;
  /** Destaques em bullet list */
  highlights?: string[];
  /** Galeria curta exibida dentro do modal */
  gallery?: Array<{ src: string; alt?: string }>;
  /** Links externos adicionais (behance, demo, repo) */
  links?: ProjectDetailsLink[];
  /** Rich content opcional (markdown/rendered) */
  richContent?: ReactNode;
}
