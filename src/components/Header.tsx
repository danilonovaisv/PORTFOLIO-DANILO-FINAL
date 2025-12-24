export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Add mobile hamburger menu
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-blue-500 hover:text-blue-400 transition-colors">home</Link>
          <Link href="/about" className="text-white hover:text-gray-300 transition-colors">sobre</Link>
          <Link href="/portfolio" className="text-white hover:text-gray-300 transition-colors">portfolio showcase</Link>
          <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">contato</Link>
        </nav>
        
        {/* Mobile Hamburger */}
        <button 
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/" className="block text-blue-500 hover:text-blue-400 transition-colors">home</Link>
            <Link href="/about" className="block text-white hover:text-gray-300 transition-colors">sobre</Link>
            <Link href="/portfolio" className="block text-white hover:text-gray-300 transition-colors">portfolio showcase</Link>
            <Link href="/contact" className="block text-white hover:text-gray-300 transition-colors">contato</Link>
          </nav>
        </div>
      )}
    </header>
  );
}