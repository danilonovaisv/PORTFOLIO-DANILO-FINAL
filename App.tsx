import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PortfolioShowcase from './components/PortfolioShowcase';
import FeaturedProjects from './components/FeaturedProjects';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-light text-dark font-sans selection:bg-primary selection:text-white">
      <Header />
      
      <main>
        <Hero />
        {/* Manifesto agora está integrado ao Hero */}
        <PortfolioShowcase />
        <FeaturedProjects />
        <Clients />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;