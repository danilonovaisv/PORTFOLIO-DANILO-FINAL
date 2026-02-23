'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { VolumeX } from 'lucide-react';

interface YouTubePlayerProps {
    videoId: string;
    autoplay?: boolean;
    hasNarration?: boolean;
    className?: string;
    onReady?: () => void;
}

export function YouTubePlayer({
    videoId,
    autoplay = true,
    hasNarration = false,
    className = '',
    onReady,
}: YouTubePlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [showUnmuteCTA, setShowUnmuteCTA] = useState(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    // Use Framer Motion's useInView to pause/play based on visibility
    const isInView = useInView(containerRef, { amount: 0.2 });

    useEffect(() => {
        // Load YouTube API script if not already loaded
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const initPlayer = () => {
            if (!window.YT || !window.YT.Player) {
                setTimeout(initPlayer, 100);
                return;
            }

            if (playerRef.current) return;

            playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
                videoId,
                playerVars: {
                    autoplay: autoplay ? 1 : 0,
                    mute: autoplay ? 0 : 1, // Try unmuted first if autoplaying
                    controls: 1,
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    loop: autoplay ? 1 : 0,
                    playlist: autoplay ? videoId : undefined,
                    cc_load_policy: hasNarration ? 1 : 0,
                },
                events: {
                    onReady: (event: any) => {
                        setIsPlayerReady(true);
                        onReady?.();

                        if (autoplay) {
                            // Try playing unmuted
                            event.target.unMute();
                            event.target.playVideo();

                            // Give it a short moment to see if playback actually started (browser autoplay policy)
                            setTimeout(() => {
                                const state = event.target.getPlayerState();
                                // -1 = unstarted, 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = cued
                                if (state !== 1 && state !== 3) {
                                    // Browser blocked autoplay with sound
                                    event.target.mute();
                                    event.target.playVideo();
                                    setIsMuted(true);
                                    setShowUnmuteCTA(true);

                                    // Double check if muted playback also fails
                                    setTimeout(() => {
                                        const stateAfterMute = event.target.getPlayerState();
                                        if (stateAfterMute !== 1 && stateAfterMute !== 3) {
                                            // Keep paused
                                        }
                                    }, 500);
                                } else {
                                    setIsMuted(false);
                                    setShowUnmuteCTA(false);
                                }
                            }, 500);
                        }
                    },
                    onStateChange: (event: any) => {
                        // Handle state changes
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            // Video is playing, check if it's currently muted by the user interaction
                            setIsMuted(event.target.isMuted());
                        }
                    }
                },
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            // Setup global callback for when API is ready
            const previousCallback = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (previousCallback) previousCallback();
                initPlayer();
            };
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [videoId, autoplay, hasNarration, onReady]);

    // Handle intersection observer changes
    useEffect(() => {
        if (!isPlayerReady || !playerRef.current || !autoplay) return;

        if (isInView) {
            const state = playerRef.current.getPlayerState();
            if (state !== 1 && state !== 3) {
                playerRef.current.playVideo();
            }
        } else {
            playerRef.current.pauseVideo();
        }
    }, [isInView, isPlayerReady, autoplay]);

    const handleUnmute = () => {
        if (playerRef.current) {
            playerRef.current.unMute();
            setIsMuted(false);
            setShowUnmuteCTA(false);
        }
    };

    return (
        <div ref={containerRef} className={`relative w-full h-full ${className}`}>
            <div id={`youtube-player-${videoId}`} className="absolute inset-0 w-full h-full" />

            {showUnmuteCTA && isMuted && (
                <button
                    onClick={handleUnmute}
                    className="absolute bottom-6 right-6 z-10 flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all shadow-lg border border-white/10"
                >
                    <VolumeX className="w-5 h-5" />
                    <span className="text-sm font-medium tracking-wide">Activar Som</span>
                </button>
            )}
        </div>
    );
}

// Add TypeScript support for global YT object
declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}
