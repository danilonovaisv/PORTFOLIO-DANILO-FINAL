import { Play } from 'lucide-react';

export default function PlayButton() {
  return (
    <div className="group relative flex items-center justify-center">
      {/* Pulse Effect */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/30 opacity-75 duration-1000" />

      {/* Button */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 border border-white/20">
        <Play className="ml-1 h-8 w-8 fill-white text-white opacity-90" />
      </div>

      {/* Label */}
      <span className="absolute -bottom-8 text-xs font-medium uppercase tracking-widest text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Play Reel
      </span>
    </div>
  );
}
