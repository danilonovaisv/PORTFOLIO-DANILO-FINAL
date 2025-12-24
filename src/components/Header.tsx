export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      isSticky ? 'bg-black/90 backdrop-blur-sm border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        
        <nav className="hidden md:flex space-x-8">
          {['home', 'sobre', 'portfolio showcase', 'contato'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`text-white hover:text-blue-400 transition-colors duration-200 ${
                item === 'home' ? 'text-blue-400 underline' : ''
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <button 
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}