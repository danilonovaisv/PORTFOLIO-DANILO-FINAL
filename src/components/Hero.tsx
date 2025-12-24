import Image from 'next/image';
import React from 'react';
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-blue-900 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-blue-500 mb-6">[BRAND AWARENESS]</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Ghost element - centered */}
            <div className="relative">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-75 animate-pulse"></div>
                <Image
                  src="/ghost.png"
                  alt="Ghost"
                  fill
                  sizes="(min-width: 768px) 160px, 128px"
                  className="relative object-contain"
                />
              </div>
            </div>
            
            <div className="text-left md:text-right">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
                Design, não é<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">só estética.</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-500 mb-8">
                [É intenção, é estratégia, é experiência.]
              </p>
              
              <button
                type="button"
                className="group inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-colors duration-200 transform hover:scale-105"
              >
                <span>get to know me better</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Navegar para mais detalhes</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-white text-sm">Scroll down</span>
        </div>
      </div>
    </section>
  );
}