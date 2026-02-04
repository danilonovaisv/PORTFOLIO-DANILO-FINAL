
import React from 'react';
import { motion } from 'framer-motion';

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <section className={`h-screen flex flex-col justify-center px-8 md:px-24 ${className}`}>
    {children}
  </section>
);

const Overlay: React.FC = () => {
  return (
    <div className="w-full pointer-events-none">
      {/* Intro Section */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6">
            ETHEREAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">
              PRESENCE
            </span>
          </h1>
          <p className="text-xl text-cyan-100/60 max-w-md font-light tracking-wide uppercase">
            Scroll to summon the spirit of the digital realm.
          </p>
        </motion.div>
      </Section>

      {/* Feature Section */}
      <Section className="items-end text-right">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            FLUID MOTION
          </h2>
          <p className="text-lg text-cyan-200/50">
            Reactive physics tied to your journey. The ghost ascends as you descend deeper into the ethereal void.
          </p>
        </motion.div>
      </Section>

      {/* Detail Section */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-lg pointer-events-auto cursor-help hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-sm uppercase tracking-widest text-cyan-400 font-bold">Spectral Analysis</h3>
          </div>
          <p className="text-cyan-50 font-medium">
            Crafted with high-index refraction and chromatic aberration, the form mimics glass caught in a temporal rift.
          </p>
        </motion.div>
      </Section>

      {/* Footer / Call to action */}
      <Section className="items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-light text-cyan-200 mb-8 italic">
            "The spirit never truly leaves the machine."
          </h2>
          <button className="pointer-events-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-transform">
            Connect Now
          </button>
        </motion.div>
      </Section>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-1 h-12 bg-gradient-to-b from-transparent to-cyan-400 rounded-full" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">Scroll</span>
      </div>
    </div>
  );
};

export default Overlay;
