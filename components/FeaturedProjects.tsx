import React from 'react';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '../constants';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const FeaturedProjects: React.FC = () => {
  return (
    <section id="featured-projects" className="py-24 bg-[#F4F5F7]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-dark"
          >
            Projetos em Destaque
          </motion.h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          
          {FEATURED_PROJECTS.map((project, index) => {
             const isHero = project.isHero;
             // Determine aspect ratio based on layout position visually matching the reference
             // Hero gets wide, others get portrait/standard
             const aspectRatioClass = isHero 
                ? 'aspect-video md:aspect-[2.2/1]' 
                : 'aspect-[4/5]';

             return (
              <motion.a
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.1 }}
                className={`group relative flex flex-col w-full ${isHero ? 'md:col-span-2' : ''}`}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden rounded-sm bg-gray-200 w-full ${aspectRatioClass} mb-6 shadow-sm`}>
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/5 transition-colors duration-500 z-10" />
                    
                    <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                    />
                    
                    {/* Category Tag (Pill) */}
                    <div className="absolute top-4 right-4 z-20">
                        <span className="bg-white/90 backdrop-blur-md text-dark text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                            {project.displayCategory}
                        </span>
                    </div>
                </div>

                {/* Content Info */}
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1 pr-4">
                        <h3 className="text-xl md:text-2xl font-bold text-dark leading-tight group-hover:text-primary transition-colors duration-300">
                            {project.title}
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base font-medium">
                            {project.client}
                        </p>
                    </div>

                    {/* Arrow Button Icon */}
                    <div className="mb-1 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300 shadow-md hover:shadow-lg">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>
              </motion.a>
             );
          })}

          {/* "Like what you see?" Block - Occupies the last slot in the grid */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="flex flex-col justify-center items-center text-center bg-white rounded-sm p-12 shadow-sm h-full min-h-[350px] aspect-[4/5]"
          >
              <h3 className="text-4xl md:text-5xl font-normal text-dark mb-8 leading-tight">
                  Like what<br/>you see?
              </h3>
              <a 
                href="/portfolio"
                className="group inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full text-base font-bold shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                  view projects
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;