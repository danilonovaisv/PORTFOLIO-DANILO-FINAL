import type { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export default function Section({
  children,
  title,
  className = '',
}: SectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
            <p className="text-blue-500">Explore our work in this category</p>
          </div>
        )}
        
        <div className="transition-all duration-300">
          {children}
        </div>
      </div>
    </section>
  );
}
