import { motion, MotionStyle } from 'framer-motion';

interface ManifestoThumbProps {
  style?: MotionStyle;
}

export default function ManifestoThumb({ style }: ManifestoThumbProps) {
  return (
    <motion.div
      style={style}
      className="hidden lg:block absolute bottom-12 right-12 z-30 aspect-video overflow-hidden shadow-2xl origin-bottom-right cursor-pointer group"
      role="button"
      aria-label="Assistir manifesto em fullscreen"
      initial={{ opacity: 0, scale: 0.9, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.5 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => {
        // Lógica de Click: Scrollar para o ponto onde ele fica Fullscreen
        // Como agora é controlado pelo scroll do Hero, podemos scrollar para o fim da seção Hero
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          const bottom =
            heroSection.getBoundingClientRect().bottom +
            window.scrollY -
            window.innerHeight;
          window.scrollTo({ top: bottom, behavior: 'smooth' });
        }
      }}
    >
      <video
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Icone de seta ou indicador visual opcional */}
      <div className="absolute bottom-3 right-3 text-white/50 bg-black/20 p-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
}
