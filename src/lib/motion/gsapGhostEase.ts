import gsap from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import { GHOST_EASE } from '@/config/motion';

export const GSAP_GHOST_EASE =
  typeof window !== 'undefined'
    ? (() => {
        gsap.registerPlugin(CustomEase);
        // Using the standard GHOST_EASE [0.22, 1, 0.36, 1] joined as string for GSAP
        return CustomEase.create('ghostEase', GHOST_EASE.join(', '));
      })()
    : 'power4.out';
