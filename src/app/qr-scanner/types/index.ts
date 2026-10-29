/**
 * Tipos para o QR Scanner PWA
 * Ghost System - Match the Mountain
 */

export interface QRMapping {
  /** Código extraído do QR (ex: 'hAVpDF') */
  code: string;
  /** URL de destino final */
  destination: string;
  /** Descrição amigável */
  label: string;
  /** Se ativo */
  active: boolean;
}

export interface ScanResult {
  /** Texto bruto decodificado */
  rawText: string;
  /** Mapeamento encontrado (se houver) */
  mapping?: QRMapping;
  /** URL final resolvida */
  resolvedUrl: string;
  /** Timestamp do scan */
  timestamp: number;
  /** Se foi bem-sucedido */
  success: boolean;
  /** Mensagem de erro (se falhou) */
  error?: string;
}

export interface ScannerConfig {
  /** Seletor do elemento de vídeo */
  videoSelector: string;
  /** Configurações de câmera */
  cameraConfig: {
    facingMode: 'environment' | 'user';
    width: { ideal: number; min: number };
    height: { ideal: number; min: number };
  };
  /** FPS de scan */
  fps: number;
  /** Tentar decodificar códigos invertidos */
  tryInverted: boolean;
}

export interface PWAInstallPrompt {
  /** Evento beforeinstallprompt */
  event: BeforeInstallPromptEvent;
  /** Se o prompt pode ser mostrado */
  canShow: boolean;
}

/** Declaração do BeforeInstallPromptEvent para TypeScript */
export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
