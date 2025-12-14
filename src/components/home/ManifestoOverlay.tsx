'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';
import { ASSETS } from '../../lib/constants';

interface ManifestoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  layoutId?: string;
  defaultMuted?: boolean;
}

export default function ManifestoOverlay({
  isOpen,
  onClose,
  layoutId = 'manifesto-video-main',
  defaultMuted = false,
}: ManifestoOverlayProps) {
  const [isMuted, setIsMuted] = useState(defaultMuted);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Ensure video plays unmuted (if allowed) or respects user choice
      setIsMuted(false);
    } else {
      document.body.style.overflow = '';
      setIsMuted(true);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose} // Click outside to close
      role="dialog"
      aria-modal="true"
    >
      {/* Container Layout Animation */}
      <motion.div
        layoutId={layoutId} // Matches the thumb layoutId
        className="relative w-full h-full md:w-[90vw] md:h-[90vh] md:max-w-7xl md:rounded-2xl overflow-hidden bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video area
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        <video
          ref={videoRef}
          src={ASSETS.videoManifesto}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          loop
          muted={isMuted}
        />

        {/* Controls Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 bg-linear-to-b from-black/60 to-transparent pointer-events-none">
          {/* Sound Toggle - Pointer events re-enabled */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-colors group"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>

          {/* Close Button - Pointer events re-enabled */}
          <button
            onClick={onClose}
            className="pointer-events-auto p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-colors group"
            aria-label="Close Fullscreen"
          >
            <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
