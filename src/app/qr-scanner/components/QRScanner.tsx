'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import type { ScanResult, ScannerConfig } from '@/app/qr-scanner/types';
import { resolveQR } from '@/app/qr-scanner/lib/qr-mapping';

interface QRScannerProps {
  onScan: (_result: ScanResult) => void;
  onError: (_error: string) => void;
  config?: Partial<ScannerConfig>;
}

export function QRScanner({ onScan, onError, config }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<PermissionState | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const lastScanRef = useRef<string>('');
  const scanCooldownRef = useRef(false);

  // Configuração padrão
  const scannerConfig: ScannerConfig = {
    videoSelector: '#qr-video',
    cameraConfig: {
      facingMode: 'environment',
      width: { ideal: 1280, min: 640 },
      height: { ideal: 720, min: 480 },
    },
    fps: 10,
    tryInverted: true,
    ...config,
  };

  // Verificar permissão de câmera (com fallback seguro para Safari/iOS)
  useEffect(() => {
    let active = true;
    if (typeof navigator !== 'undefined' && 'permissions' in navigator && navigator.permissions?.query) {
      navigator.permissions
        .query({ name: 'camera' as PermissionName })
        .then((result) => {
          if (!active) return;
          setHasPermission(result.state);
          result.onchange = () => {
            if (active) setHasPermission(result.state);
          };
        })
        .catch(() => {
          // Safari/iOS não suporta query de 'camera' - fluxo segue via getUserMedia no startScanner
        });
    }
    return () => {
      active = false;
    };
  }, []);

  // Callback de sucesso do scan
  const onScanSuccess = useCallback(
    (decodedText: string) => {
      // Debounce: evitar scans duplicados em sequência
      if (scanCooldownRef.current || lastScanRef.current === decodedText) {
        return;
      }

      lastScanRef.current = decodedText;
      scanCooldownRef.current = true;

      // Resolver QR
      const result = resolveQR(decodedText);

      if (result.success) {
        onScan(result);
      } else {
        onError(result.error || 'QR code não reconhecido');
      }

      // Cooldown de 2 segundos
      setTimeout(() => {
        scanCooldownRef.current = false;
        lastScanRef.current = '';
      }, 2000);
    },
    [onScan, onError]
  );

  // Callback de erro do scan
  const onScanFailure = useCallback((error: string) => {
    // Erros de "QR code não encontrado" são normais durante o scan
    // Só logar erros reais
    if (!error.includes('QR code') && !error.includes('not found')) {
      console.warn('QR Scan failure:', error);
    }
  }, []);

  // Iniciar scanner
  const startScanner = useCallback(async () => {
    if (!elementRef.current || isScanning) return;

    try {
      setCameraError(null);
      setIsScanning(true);

      // Criar instância do scanner
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: scannerConfig.cameraConfig.facingMode },
        {
          fps: scannerConfig.fps,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          disableFlip: false,
        },
        onScanSuccess,
        onScanFailure
      );
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao iniciar câmera';
      setCameraError(errorMsg);
      onError(errorMsg);
      setIsScanning(false);
    }
  }, [isScanning, scannerConfig, onScanSuccess, onScanFailure, onError]);

  // Parar scanner
  const stopScanner = useCallback(async () => {
    if (!scannerRef.current || !isScanning) return;

    try {
      await scannerRef.current.stop();
      scannerRef.current.clear();
      scannerRef.current = null;
      setIsScanning(false);
    } catch (err) {
      console.error('Erro ao parar scanner:', err);
      setIsScanning(false);
    }
  }, [isScanning]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(console.error);
        scannerRef.current.clear();
      }
    };
  }, [isScanning]);

  // Render
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Container do vídeo */}
      <div
        ref={elementRef}
        id="qr-reader"
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-ghost-void-black"
        aria-label="Visualização da câmera para leitura de QR code"
      >
        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-ghost-void-black/90 text-center z-10">
            <div className="space-y-3">
              <svg
                className="w-12 h-12 mx-auto text-ghost-deep-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-ghost-text-muted text-sm">
                Não foi possível acessar a câmera
              </p>
              <p className="text-ghost-text-muted text-xs">
                {cameraError}
              </p>
              <button
                onClick={startScanner}
                className="mt-3 px-4 py-2 text-sm font-medium text-ghost-void-black bg-ghost-deep-blue rounded-lg hover:opacity-90 transition-opacity"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {!cameraError && !isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-ghost-void-black/90 text-center z-10">
            {hasPermission === 'denied' && (
              <p className="text-amber-400 text-xs mb-3 max-w-xs">
                Acesso à câmera bloqueado nas preferências do navegador. Libere a permissão para escanear.
              </p>
            )}
            <button
              onClick={startScanner}
              className="px-6 py-3 text-base font-medium text-ghost-void-black bg-ghost-deep-blue rounded-xl hover:opacity-90 transition-opacity"
            >
              Iniciar Scanner
            </button>
          </div>
        )}

        {/* Overlay de scan ativo */}
        {isScanning && !cameraError && (
          <>
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-5"
              aria-hidden="true"
            >
              <div className="relative w-[250px] h-[250px]">
                {/* Cantos do frame de scan */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-2 border-ghost-deep-blue rounded-tl-lg" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-2 border-ghost-deep-blue rounded-tr-lg" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-2 border-ghost-deep-blue rounded-bl-lg" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-2 border-ghost-deep-blue rounded-br-lg" />

                {/* Linha de scan animada */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-ghost-deep-blue/80 animate-ping" />
                </div>
              </div>
            </div>

            {/* Botão parar */}
            <button
              onClick={stopScanner}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 text-sm font-medium text-ghost-deep-blue bg-ghost-void-black/90 rounded-lg border border-ghost-deep-blue/50 backdrop-blur-sm hover:bg-ghost-void-black transition-colors z-10"
            >
              Parar
            </button>
          </>
        )}
      </div>

      {/* Instruções */}
      <div className="mt-4 text-center">
        <p className="text-sm text-ghost-text-muted">
          {isScanning
            ? 'Posicione o QR code dentro da área demarcada'
            : 'Toque em "Iniciar Scanner" para começar'}
        </p>
      </div>
    </div>
  );
}
