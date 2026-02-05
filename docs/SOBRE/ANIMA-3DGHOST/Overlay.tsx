
import React from 'react';
import { motion } from 'framer-motion';

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <section className={`h-screen flex flex-col justify-center px-8 md:px-24 max-w-7xl mx-auto w-full ${className}`}>
    {children}
  </section>
);

const Overlay: React.FC = () => {
  return (
    <div className="w-full pointer-events-none select-none">
      {/* Intro Section */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ margin: "-100px" }}
          className="max-w-2xl"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-cyan-400 text-xs font-bold tracking-[0.4em] uppercase mb-4 block"
          >
            Project Ghost v3.0
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-black text-white leading-none mb-8 tracking-tighter">
            ETHEREAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 animate-gradient">
              SPECTRE
            </span>
          </h1>
          <p className="text-lg md:text-xl text-cyan-100/40 max-w-sm font-light tracking-widest uppercase leading-relaxed">
            A digital apparition manifesting through the scroll.
          </p>
        </motion.div>
      </Section>

      {/* Feature Section */}
      <Section className="items-end text-right">
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ margin: "-100px" }}
          className="max-w-xl"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            SPECTRAL <br />PHYSICS
          </h2>
          <p className="text-lg text-cyan-200/40 leading-relaxed max-w-md ml-auto">
            Interactive translucency driven by real-time refraction. The spirit reacts to your journey as it traverses the digital void.
          </p>
        </motion.div>
      </Section>

      {/* Detail Section */}
      <Section>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ margin: "-100px" }}
          className="group bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 rounded-[2rem] max-w-lg pointer-events-auto cursor-crosshair hover:bg-white/[0.07] hover:border-cyan-500/30 transition-all duration-500"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping absolute inset-0" />
              <div className="w-3 h-3 rounded-full bg-cyan-400 relative" />
            </div>
            <h3 className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Refractive Analysis</h3>
          </div>
          <p className="text-cyan-50/90 text-xl font-medium leading-snug mb-4">
            Utilizing high-index transmission kernels to simulate glass caught in a temporal rift.
          </p>
          <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent my-6" />
          <p className="text-cyan-200/30 text-sm font-mono uppercase tracking-tighter">
            Sampling: 8pts • Distortion: 10% • Aberration: 5%
          </p>
        </motion.div>
      </Section>

      {/* Final Section */}
      <Section className="items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-cyan-500/10 blur-[100px] rounded-full -z-10" />
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12 italic tracking-tight opacity-80">
            "The soul persists in the machine."
          </h2>
          <button className="group pointer-events-auto relative px-12 py-5 bg-white overflow-hidden rounded-full transition-all duration-300 hover:scale-110 active:scale-95">
            <span className="relative z-10 text-black font-black uppercase tracking-[0.2em] text-sm">
              Initiate Link
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>
      </Section>

      {/* Global Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="relative w-px h-16 bg-white/10 overflow-hidden">
          <motion.div 
            animate={{ y: [0, 64, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent" 
          />
        </div>
        <span className="text-[9px] uppercase tracking-[0.4em] text-cyan-400/60 font-bold">Scroll to Manifest</span>
      </motion.div>
    </div>
  );
};

export default Overlay;
