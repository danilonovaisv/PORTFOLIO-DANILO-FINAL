import { motion } from 'framer-motion';

export default function HeroPreloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
    >
      <svg className="ghost-svg mb-4" height="80" viewBox="0 0 512 512" width="80">
        <path fill="white" d="M508.3 432.8s-46.6-39-79.5-275.8C420 69.3 346 0 256 0S92 69.3 83.2 157C50.3 393.7 3.7 432.8 3.7 432.8-11.4 458 24.4 461 42.4 460.7c35.3-.5 35.3 40.3 70.5 40.3s35.3-35.3 70.5-35.3 37.4 45.3 72.7 45.3 37.4-45.3 72.7-45.3 35.3 35.3 70.5 35.3 35.3-40.8 70.6-40.3c18 0.3 53.8-2.8 38.7-27.9z"/>
      </svg>
      <p className="font-mono text-xs uppercase tracking-widest text-[#e0e0e0] mb-2">Summoning spirits</p>
      <div className="w-24 h-0.5 bg-[#06071f] rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
        />
      </div>
    </motion.div>
  );
}
