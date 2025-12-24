export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mb-12">
          <p className="text-blue-400 text-sm uppercase tracking-wider mb-6">
            [BRAND AWARENESS]
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto">
                <GhostIcon className="w-full h-full" />
              </div>
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
            </div>
            
            <div className="text-left">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
                Design, não é<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  só estética.
                </span>
              </h1>
              
              <p className="text-blue-400 text-lg md:text-xl mb-8">
                [É intenção, é estratégia, é experiência.]
              </p>
            </div>
          </div>
        </div>
        
        <button className="group inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black">
          <span>get to know me better</span>
          <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
      
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}