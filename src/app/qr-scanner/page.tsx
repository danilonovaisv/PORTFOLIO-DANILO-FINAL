'use client';

import { useState, useCallback, useEffect } from 'react';
import { QRScanner } from '@/app/qr-scanner/components/QRScanner';
import { ScanResult } from '@/app/qr-scanner/components/ScanResult';
import { InstallPrompt } from '@/app/qr-scanner/components/InstallPrompt';
import { useSWRegistration } from '@/app/qr-scanner/sw-register';
import type { ScanResult as ScanResultType } from '@/app/qr-scanner/types';
import { resolveQR } from '@/app/qr-scanner/lib/qr-mapping';

export default function QRScannerPage() {
  // Registrar Service Worker
  useSWRegistration();

  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);
  const [scanHistory, setScanHistory] = useState<ScanResultType[]>([]);

  // Carregar histórico do localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('qr-scanner-history');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setScanHistory(parsed.slice(-10));
        }
      }
    } catch {
      // Ignorar erros de parsing
    }
  }, []);

  // Salvar histórico
  useEffect(() => {
    if (scanHistory.length > 0) {
      localStorage.setItem('qr-scanner-history', JSON.stringify(scanHistory));
    }
  }, [scanHistory]);

  const handleScan = useCallback((result: ScanResultType) => {
    setScanResult(result);
    setScanHistory((prev) => [result, ...prev.filter((r) => r.rawText !== result.rawText)].slice(0, 10));
  }, []);

  const handleError = useCallback((error: string) => {
    const errorResult = resolveQR('');
    errorResult.error = error;
    errorResult.success = false;
    setScanResult(errorResult);
  }, []);

  const handleOpenUrl = useCallback(() => {
    if (scanResult?.resolvedUrl && scanResult.resolvedUrl.startsWith('http')) {
      window.open(scanResult.resolvedUrl, '_blank', 'noopener,noreferrer');
    }
    setScanResult(null);
  }, [scanResult]);

  const handleCloseResult = useCallback(() => {
    setScanResult(null);
  }, []);

  const handleDismissInstall = useCallback(() => {
    setShowInstallPrompt(false);
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  }, []);

  return (
    <div className="min-h-screen bg-ghost-void-black text-ghost-text-primary flex flex-col">
      {/* Header */}
      <header className="border-b border-ghost-deep-blue/20 bg-ghost-surface/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ghost-deep-blue/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-ghost-deep-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-ghost-text-primary">QR Scanner</h1>
              <p className="text-xs text-ghost-text-muted">Match the Mountain</p>
            </div>
          </div>
          <a
            href="https://match-the-mountain.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-ghost-deep-blue hover:underline flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Site Oficial
          </a>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col items-center">
        {/* Scanner */}
        <section className="w-full mb-8" aria-label="Scanner de QR Code">
          <QRScanner onScan={handleScan} onError={handleError} />
        </section>

        {/* Histórico */}
        {scanHistory.length > 0 && (
          <section className="w-full mb-8" aria-label="Histórico de scans">
            <h2 className="text-sm font-semibold text-ghost-text-primary mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-ghost-deep-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Histórico Recente
            </h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {scanHistory.map((item, index) => (
                <button
                  key={`${item.rawText}-${index}`}
                  onClick={() => handleScan(item)}
                  className="w-full text-left p-3 rounded-xl bg-ghost-surface border border-ghost-deep-blue/10 hover:border-ghost-deep-blue/30 hover:bg-ghost-deep-blue/5 transition-all text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-ghost-text-primary truncate max-w-[60%]">
                      {item.mapping?.label || item.resolvedUrl}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${item.success ? 'bg-ghost-deep-blue/20 text-ghost-deep-blue' : 'bg-red-500/20 text-red-500'}`}>
                      {item.success ? '✓' : '✗'}
                    </span>
                  </div>
                  <p className="text-xs text-ghost-text-muted mt-1 truncate">{item.rawText}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Instruções */}
        <section className="w-full" aria-label="Instruções">
          <details className="bg-ghost-surface/50 rounded-xl border border-ghost-deep-blue/10 p-4">
            <summary className="cursor-pointer font-medium text-ghost-text-primary flex items-center gap-2">
              <svg className="w-5 h-5 text-ghost-deep-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.5-3.772 2.5-2.21 0-4-1.343-4-3 0-1.4 1.278-2.5 3.772-2.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Como usar
            </summary>
            <div className="mt-4 space-y-3 text-sm text-ghost-text-muted">
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-ghost-deep-blue/20 text-ghost-deep-blue flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <p>Toque em <strong>"Iniciar Scanner"</strong> e permita o acesso à câmera</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-ghost-deep-blue/20 text-ghost-deep-blue flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <p>Posicione o <strong>QR code dentro da área demarcada</strong> (cantos azuis)</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-ghost-deep-blue/20 text-ghost-deep-blue flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <p>Aguarde a leitura automática — o resultado aparecerá em um modal</p>
              </div>
              <div className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-ghost-deep-blue/20 text-ghost-deep-blue flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <p>Toque em <strong>"Abrir Destino"</strong> ou escaneie outro código</p>
              </div>
              <div className="pt-2 border-t border-ghost-deep-blue/10 text-xs">
                <p className="font-medium text-ghost-text-primary">QR Codes Suportados:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>QR promocional <strong>Match the Mountain</strong> (código: hAVpDF)</li>
                  <li>Qualquer URL válida (abre diretamente)</li>
                </ul>
              </div>
            </div>
          </details>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-ghost-deep-blue/10 bg-ghost-surface/95 backdrop-blur-sm py-4 px-4">
        <div className="max-w-3xl mx-auto text-center text-xs text-ghost-text-muted">
          <p>Ghost System • QR Scanner PWA</p>
          <p className="mt-1">Funciona offline após primeira carga • Dados ficam no seu dispositivo</p>
        </div>
      </footer>

      {/* Modais */}
      {scanResult && (
        <ScanResult
          result={scanResult}
          onClose={handleCloseResult}
          onOpenUrl={handleOpenUrl}
        />
      )}

      {showInstallPrompt && (
        <InstallPrompt onDismiss={handleDismissInstall} />
      )}
    </div>
  );
}
