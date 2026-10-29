'use client';

import type { ScanResult as ScanResultType } from '@/app/qr-scanner/types';
import { extractQRCode } from '@/app/qr-scanner/lib/qr-mapping';

interface ScanResultProps {
  result: ScanResultType;
  onClose: () => void;
  onOpenUrl: () => void;
}

export function ScanResult({ result, onClose, onOpenUrl }: ScanResultProps) {
  if (!result) return null;

  const detectedCode = extractQRCode(result.rawText) || result.rawText;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ghost-void-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scan-result-title"
    >
      <div className="w-full max-w-md bg-ghost-surface rounded-2xl border border-ghost-deep-blue/30 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-ghost-deep-blue/20">
          <h2
            id="scan-result-title"
            className="text-lg font-semibold text-ghost-text-primary"
          >
            {result.success ? 'QR Code Reconhecido' : 'QR Code Não Reconhecido'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-ghost-text-muted hover:text-ghost-text-primary transition-colors rounded-lg hover:bg-ghost-deep-blue/10"
            aria-label="Fechar resultado"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-4 space-y-4">
          {/* Status visual */}
          <div className="flex items-center justify-center gap-3">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                result.success
                  ? 'bg-ghost-deep-blue/20 text-ghost-deep-blue'
                  : 'bg-red-500/20 text-red-500'
              }`}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {result.success ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-ghost-text-primary">
                {result.mapping?.label || (result.success ? 'URL Válida' : 'Não Mapeado')}
              </p>
              <p className="text-xs text-ghost-text-muted">
                {result.success ? 'Destino confirmado' : 'Verifique o código'}
              </p>
            </div>
          </div>

          {/* Detalhes */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ghost-text-muted">
              <span>Código detectado:</span>
              <span className="font-mono text-ghost-text-primary">{detectedCode}</span>
            </div>
            <div className="flex justify-between text-ghost-text-muted">
              <span>Destino:</span>
              <span className="font-mono text-ghost-text-primary truncate max-w-[60%] text-right">
                {result.resolvedUrl}
              </span>
            </div>
            {result.mapping && (
              <div className="flex justify-between text-ghost-text-muted">
                <span>Campanha:</span>
                <span className="font-medium text-ghost-text-primary">{result.mapping.label}</span>
              </div>
            )}
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3 pt-2">
            {result.success && result.resolvedUrl.startsWith('http') && (
              <button
                onClick={onOpenUrl}
                className="flex-1 py-3 px-4 font-medium text-ghost-void-black bg-ghost-deep-blue rounded-xl hover:opacity-90 transition-opacity"
              >
                Abrir Destino
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 font-medium text-ghost-deep-blue bg-transparent border border-ghost-deep-blue/50 rounded-xl hover:bg-ghost-deep-blue/10 transition-colors"
            >
              {result.success ? 'Escanear Outro' : 'Tentar Novamente'}
            </button>
          </div>

          {/* Detalhes técnicos (expandível) */}
          <details className="mt-4 border-t border-ghost-deep-blue/10 pt-4">
            <summary className="cursor-pointer text-xs text-ghost-text-muted font-medium flex items-center gap-1">
              Detalhes técnicos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-3 space-y-1 text-xs font-mono text-ghost-text-muted">
              <div>Timestamp: {new Date(result.timestamp).toLocaleString('pt-BR')}</div>
              <div>Raw: {result.rawText}</div>
              {result.error && <div className="text-red-500">Erro: {result.error}</div>}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
