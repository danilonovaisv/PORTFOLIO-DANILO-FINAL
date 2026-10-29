'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import type { ScanResult, ScannerConfig } from '@/app/qr-scanner/types';
import { resolveQR } from '@/app/qr-scanner/lib/qr-mapping';

interface QRScannerProps {
  onScan: (result: ScanResult) => void;
  onError: (error: string) => void;
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

  // Configuração padrão - sem pointerEvents no container pai
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

  // Verificar permissão de câmera
  useEffect(() => {
    let active = true;
    if (
      typeof navigator !== 'undefined' &&
      'permissions' in navigator &&
      navigator.permissions?.query
    ) {
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
      if (scanCooldownRef.current || lastScanRef.current === decodedText) {
        return;
      }

      lastScanRef.current = decodedText;
      scanCooldownRef.current = true;

      const result = resolveQR(decodedText);

      if (result.success) {
        onScan(result);
      } else {
        onError(result.error || 'QR code não reconhecido');
      }

      setTimeout(() => {
        scanCooldownRef.current = false;
        lastScanRef.current = '';
      }, 2000);
    },
    [onScan, onError]
  );

  // Callback de erro do scan
  const onScanFailure = useCallback((error: string) => {
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

  // Render - SIMPLES E DIRETO
  return (
    <div className="relative w-full max-w-md mx-auto bg-ghost-void-black text-ghost-text-primary">
      {/* Botão principal - SEMPRE clicável */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden">
        {/* Botão "Iniciar Scanner" - sempre visível até o scan começar */}
        {!isScanning && (
          <button
            onClick={startScanner}
            className="w-full py-8 text-lg font-medium text-ghost-void-black bg-ghost-deep-blue rounded-2xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ghost-deep-blue focus:ring-offset-2"
            style={{ pointerEvents: 'auto' }}
            aria-label="Iniciar scanner de QR code"
          >
            <span className="text-center">
              Iniciar Scanner
            </span>
          </button>
        )}

        {/* Área de scan - só aparece quando isScanning */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[280px] h-[280px]">
              {/* Cantos do frame */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-2 border-ghost-deep-blue rounded-tl-lg" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-2 border-ghost-deep-blue rounded-tr-lg" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-2 border-ghost-deep-blue rounded-bl-lg" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-2 border-ghost-deep-blue rounded-br-lg" />

              {/* Linha de scan */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-ghost-deep-blue/80 animate-ping" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instruções */}
      <p className="mt-4 text-center text-sm text-ghost-text-muted">
        Toque em "Iniciar Scanner" para começar
      </p>
    </div>
  );
}