/**
 * Ghost Interaction Hook
 * Handles mouse, touch, and scroll interactions
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface InteractionState {
    mouse: THREE.Vector2;
    scrollY: number;
    hasReceivedInput: boolean;
    isMobile: boolean;
}

/**
 * Custom hook for ghost interaction management
 */
export function useGhostInteraction(): InteractionState {
    const [scrollY, setScrollY] = useState(0);
    const [hasReceivedInput, setHasReceivedInput] = useState(false);
    const mouseRef = useRef(new THREE.Vector2());
    const touchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Device detection
    const isTouchDevice = typeof window !== 'undefined' &&
        ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const isMobileWidth = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isMobile = isTouchDevice || isMobileWidth;

    useEffect(() => {
        const updateMousePos = (x: number, y: number) => {
            setHasReceivedInput(true);
            mouseRef.current.x = (x / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(y / window.innerHeight) * 2 + 1;

            if (touchTimeoutRef.current) {
                clearTimeout(touchTimeoutRef.current);
            }
            touchTimeoutRef.current = setTimeout(() => {
                setHasReceivedInput(false);
            }, 3000);
        };

        const onMouseMove = (e: MouseEvent) => {
            updateMousePos(e.clientX, e.clientY);
        };

        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const onScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchstart', onTouchMove, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchstart', onTouchMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('scroll', onScroll);
            if (touchTimeoutRef.current) {
                clearTimeout(touchTimeoutRef.current);
            }
        };
    }, []);

    return {
        mouse: mouseRef.current,
        scrollY,
        hasReceivedInput,
        isMobile,
    };
}
