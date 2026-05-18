/**
 * Ghost System Media Selection Utility
 * 
 * Centraliza a lógica de seleção de mídias (vídeos/imagens) baseada no breakpoint mobile.
 * Prioriza a performance evitando o carregamento de mídias pesadas de desktop em dispositivos móveis.
 */

export interface ResponsiveMedia {
  desktop: string;
  mobile?: string;
}

/**
 * Resolve qual fonte de mídia usar baseado no estado isMobile.
 * Se mobile não estiver presente, retorna desktop como fallback.
 */
export function resolveResponsiveMedia(
  media: ResponsiveMedia,
  isMobile: boolean
): string {
  if (isMobile && media.mobile) {
    return media.mobile;
  }
  return media.desktop;
}

/**
 * Helper para decidir se deve renderizar um vídeo ou imagem com base na extensão.
 */
export function getMediaType(url: string): 'video' | 'image' {
  if (!url) return 'image';
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
  const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase();
  
  return videoExtensions.some(ext => cleanUrl.endsWith(ext)) ? 'video' : 'image';
}
