import React, { useState } from 'react';
import Image from 'next/image';
// Se estiveres a usar CSS Modules, importa aqui. Se for CSS global, ignora.

// 1. CONFIGURAÇÃO DOS DADOS
// Aqui definimos as tuas categorias e os projetos (baseado nos arquivos que enviaste)
const projects = [
  { id: 1, title: 'Projeto Art 1', category: 'graphic', image: '/assets/images/art/p1.jpg' },
  { id: 2, title: 'Web Design Pro', category: 'web', image: '/assets/images/art/p2.jpg' },
  { id: 3, title: 'Motion Graphic', category: 'motion', image: '/assets/images/art/p3.jpg' },
  { id: 4, title: 'Fotografia X', category: 'photography', image: '/assets/images/art/p4.jpg' },
  { id: 5, title: 'Brand Identity', category: 'graphic', image: '/assets/images/art/p5.jpg' },
  { id: 6, title: 'App Interface', category: 'web', image: '/assets/images/art/p6.jpg' },
  // ... adiciona mais itens conforme necessário, olhando para o teu portfolio6.html original
];

const filters = [
  { label: 'All', value: '*' },
  { label: 'Graphic', value: 'graphic' },
  { label: 'Web Design', value: 'web' },
  { label: 'Motion', value: 'motion' },
  { label: 'Photography', value: 'photography' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('*');

  // Lógica de filtragem
  const filteredProjects = filter === '*' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section className="portfolio-section">
      <div className="container">
        
        {/* MENU DE TAGS (FILTROS) */}
        <div className="filter-menu">
          <ul className="nav nav-pills">
            {filters.map((item) => (
              <li key={item.value} className={filter === item.value ? 'active' : ''}>
                <button onClick={() => setFilter(item.value)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* GRID DE CARDS */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-item">
              <div className="card-inner">
                <figure>
                  {/* Usamos o componente Image do Next.js para otimização */}
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={400} 
                    height={300} 
                    className="img-responsive"
                  />
                  <div className="overlay">
                    <div className="info">
                      <h3>{project.title}</h3>
                      <span>{project.category}</span>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}