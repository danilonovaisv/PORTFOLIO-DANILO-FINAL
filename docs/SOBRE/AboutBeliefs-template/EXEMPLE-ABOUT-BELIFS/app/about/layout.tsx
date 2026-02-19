import '../globals.css'
import { ReactNode } from 'react'

// Carregamento das fontes conforme especificação do Design System
// Primary: TT Norms Pro (UI, Body, Headings)
// Mono: PPSupplyMono (Code, metadata, coordinates)
// Display: Outfit (Optional, for massive headers)

// Definição das variáveis CSS para o Design System
const designSystemCSSVars = {
  '--color-bluePrimary': '#0048ff',
  '--color-blueAccent': '#4fe6ff',
  '--color-pinkDetails': '#f501d3',
  '--background': '#040013',
  '--color-neutral': '#0b0d3a',
  '--color-text': '#fcffff',
  '--color-textSecondary': '#a1a3a3',
  '--color-purpleDetails': '#8705f2',
  '--color-redAccent': '#E50914',
  
  // Variáveis de tipografia para mobile
  '--font-body-mobile': 'clamp(1.25rem, 4.6vw, 1.375rem)',
  
  // Easing function padrão do Ghost
  '--ghost-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
  
  // Z-index layers conforme especificação
  '--z-index-0': '0',
  '--z-index-10': '10',
  '--z-index-20': '20',
  '--z-index-30': '30',
  '--z-index-50': '50',
  '--z-index-55': '55',
  '--z-index-60': '60',
  '--z-index-65': '65',
  '--z-index-cursor': '9999',
  
  // Spacing tokens
  '--spacing-4': '1rem',
  '--spacing-6': '1.5rem',
  '--spacing-8': '2rem',
  '--spacing-12': '3rem',
  '--spacing-16': '4rem',
  '--spacing-24': '6rem',
} as React.CSSProperties

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html 
      lang="pt-BR" 
      className="dark"
      style={designSystemCSSVars}
    >
      <head>
        {/* Carregamento das fontes com preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* TT Norms Pro - Primary font */}
        <link 
          href="https://fonts.googleapis.com/css2?family=TT+Norms+Pro:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        
        {/* PPSupplyMono - Mono font */}
        <link 
          href="https://fonts.googleapis.com/css2?family=PP+Supply+Mono:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Outfit - Display font */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      
      <body 
        className={`
          bg-[var(--background)] 
          text-[var(--color-text)] 
          min-h-screen
          overflow-x-hidden
          antialiased
        `}
      >
        <div 
          id="root"
          className="relative"
        >
          {children}
        </div>
      </body>
    </html>
  )
}