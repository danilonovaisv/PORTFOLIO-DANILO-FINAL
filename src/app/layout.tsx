import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Viewport meta garante escala correta em dispositivos móveis */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
