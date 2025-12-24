export default function Portfolio() {
  // Optimize animation timing - reduce delays
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Remove any unnecessary delays
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">portfólio showcase</h2>
            <p className="text-blue-500">Let's build something amazing together</p>
          </div>
          
          {/* Portfolio grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{ 
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)', 
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="relative aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}