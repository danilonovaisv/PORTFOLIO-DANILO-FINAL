import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'QR Scanner | Match the Mountain',
  description:
    'Scanner de QR codes promocionais para Match the Mountain. Funciona offline como PWA.',
  manifest: '/manifest-qr.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'QR Scanner',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#040013',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function QRScannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ghost-void-black text-ghost-text-primary antialiased">
      {children}
    </div>
  );
}
