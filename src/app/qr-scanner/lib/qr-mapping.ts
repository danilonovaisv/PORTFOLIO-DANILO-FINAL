/**
 * Lógica de mapeamento de QR codes para Match the Mountain
 * Ghost System - PWA QR Scanner
 */

import type { QRMapping, ScanResult } from '@/app/qr-scanner/types';

/**
 * Mapeamento estático de códigos QR conhecidos
 * Em produção, isso poderia vir de uma API ou banco de dados
 */
export const QR_MAPPINGS: QRMapping[] = [
  {
    code: 'hAVpDF',
    destination: 'https://match-the-mountain.netlify.app',
    label: 'Match the Mountain - Promocional',
    active: true,
  },
  // Adicionar mais mapeamentos conforme necessário
];

/**
 * Extrai o código do QR a partir de diferentes formatos de URL
 * Exemplos:
 * - https://qr.codes/hAVpDF -> hAVpDF
 * - https://qr.io/hAVpDF -> hAVpDF
 * - hAVpDF -> hAVpDF
 */
export function extractQRCode(text: string): string | null {
  if (!text) return null;

  const trimmed = text.trim();

  // Se já é apenas o código (sem URL)
  if (!trimmed.includes('/') && !trimmed.includes('.')) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    // Extrair último segmento do pathname
    const pathParts = url.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      return pathParts[pathParts.length - 1];
    }
    return null;
  } catch {
    // Não é uma URL válida, retornar como está se parecer com um código
    if (/^[a-zA-Z0-9]{6,}$/.test(trimmed)) {
      return trimmed;
    }
    return null;
  }
}

/**
 * Busca mapeamento para um código QR
 */
export function findMapping(code: string): QRMapping | undefined {
  return QR_MAPPINGS.find((m) => m.code === code && m.active);
}

/**
 * Resolve a URL final a partir do texto bruto do QR
 */
export function resolveQR(text: string): ScanResult {
  const rawText = text.trim();
  const timestamp = Date.now();

  // Tentar extrair código
  const code = extractQRCode(rawText);

  if (!code) {
    return {
      rawText,
      resolvedUrl: rawText,
      timestamp,
      success: false,
      error: 'Não foi possível extrair código do QR',
    };
  }

  // Buscar mapeamento
  const mapping = findMapping(code);

  if (mapping) {
    return {
      rawText,
      mapping,
      resolvedUrl: mapping.destination,
      timestamp,
      success: true,
    };
  }

  // Se não há mapeamento, tentar usar o texto original como URL
  const resolvedUrl = rawText;
  try {
    new URL(rawText);
  } catch {
    // Se não é URL válida, não resolve
    return {
      rawText,
      resolvedUrl: rawText,
      timestamp,
      success: false,
      error: `QR code não reconhecido: ${code}`,
    };
  }

  return {
    rawText,
    resolvedUrl,
    timestamp,
    success: true,
  };
}

/**
 * Adiciona novo mapeamento dinamicamente (para expansão futura)
 */
export function addMapping(mapping: QRMapping): void {
  const existingIndex = QR_MAPPINGS.findIndex((m) => m.code === mapping.code);
  if (existingIndex >= 0) {
    QR_MAPPINGS[existingIndex] = mapping;
  } else {
    QR_MAPPINGS.push(mapping);
  }
}

/**
 * Remove mapeamento
 */
export function removeMapping(code: string): boolean {
  const index = QR_MAPPINGS.findIndex((m) => m.code === code);
  if (index >= 0) {
    QR_MAPPINGS.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Lista todos os mapeamentos ativos
 */
export function listActiveMappings(): QRMapping[] {
  return QR_MAPPINGS.filter((m) => m.active);
}
